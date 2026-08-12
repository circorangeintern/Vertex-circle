import { and, eq, gte, lte, desc, sql } from "drizzle-orm";
import { db } from "../db";
import { listings, listingReviews, contactReveals } from "../db/schema";
import type {
    CreateListingInput,
    UpdateListingInput,
    ListingQuery,
    ReviewListingInput,
} from "../../types";
import { generateEditToken } from "../lib/token";
import { Errors } from "../lib/error";

export async function createListing(input: CreateListingInput) {
    const editToken = generateEditToken();
    const [row] = await db
        .insert(listings)
        .values({ ...input, price: String(input.price), editToken })
        .returning();
    if (!row) throw Errors.internal();
    return { row, editToken };
}
export async function searchListings(query: ListingQuery) {
    const { locationCity, minPrice, maxPrice, status, page, limit } = query;

    const conditions = [
        locationCity ? eq(listings.locationCity, locationCity) : undefined,
        minPrice !== undefined ? gte(listings.price, String(minPrice)) : undefined,
        maxPrice !== undefined ? lte(listings.price, String(maxPrice)) : undefined,
        eq(listings.status, status ?? "verified"),
    ].filter(Boolean);
    const where = and(...conditions);

    const [rows, countRows] = await Promise.all([
        db.select().from(listings).where(where).orderBy(desc(listings.createdAt))
            .limit(limit).offset((page - 1) * limit),
        db.select({ count: sql<number>`count(*)::int` }).from(listings).where(where),
    ]);

    const total = countRows[0]?.count ?? 0;
    return { rows, total };
}

export async function getListingById(id: string) {
    return db.query.listings.findFirst({ where: eq(listings.id, id) });
}

export async function revealContact(id: string) {
    const row = await getListingById(id);
    if (!row) return null;
    await db.insert(contactReveals).values({ listingId: id });
    return row;
}

export async function reviewListing(id: string, input: ReviewListingInput) {
    const listing = await getListingById(id);
    if (!listing) return null;

    const newStatus = input.decision === "approved" ? "verified" : "rejected";

    const [review] = await db
        .insert(listingReviews)
        .values({ listingId: id, ...input })
        .returning();
    if (!review) throw Errors.internal();

    await db
        .update(listings)
        .set({ status: newStatus, updatedAt: new Date() })
        .where(eq(listings.id, id));

    return { review, status: newStatus };
}

export async function getListingByToken(token: string) {
    return db.query.listings.findFirst({ where: eq(listings.editToken, token) });
}

export async function updateListingByToken(token: string, input: UpdateListingInput) {
    const existing = await getListingByToken(token);
    if (!existing) return null;

    const { price, ...rest } = input;

    const [updated] = await db.update(listings)
        .set({
            ...rest,
            ...(price !== undefined ? { price: String(price) } : {}),
            updatedAt: new Date(),
        })
        .where(eq(listings.editToken, token))
        .returning();

    if (!updated) throw Errors.internal();
    return updated;
}

