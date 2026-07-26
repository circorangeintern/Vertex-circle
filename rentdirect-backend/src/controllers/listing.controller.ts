import type { Context } from "hono";
import {
    createListingSchema, updateListingSchema, listingQuerySchema, reviewListingSchema,
} from "../../types";
import type { PublicListing, Paginated } from "../../types";
import { Errors, errorResponse } from "../lib/error";
import * as listingService from "../services/listing.service";
import type { listings } from "../db/schema";

function toPublic(row: typeof listings.$inferSelect): PublicListing {
    const { contactValue, editToken, ...rest } = row;
    return rest;
}

export async function create(c: Context) {
    const body = await c.req.json().catch(() => null);
    const parsed = createListingSchema.safeParse(body);
    if (!parsed.success) return errorResponse(c, Errors.validation(parsed.error.flatten()));

    const { row, editToken } = await listingService.createListing(parsed.data);
    if (!row) throw Errors.internal();
    return c.json({ listing: toPublic(row), editToken }, 201);
}

export async function search(c: Context) {
    const parsed = listingQuerySchema.safeParse(c.req.query());
    if (!parsed.success) return errorResponse(c, Errors.validation(parsed.error.flatten()));

    const { rows, total } = await listingService.searchListings(parsed.data);
    const result: Paginated<PublicListing> = {
        data: rows.map(toPublic), page: parsed.data.page, limit: parsed.data.limit, total,
    };
    return c.json(result, 200);
}

export async function getById(c: Context) {
    const id = c.req.param("id");
    if (!id) return errorResponse(c, Errors.validation({ id: "Missing listing id" }));

    const row = await listingService.getListingById(id);
    if (!row) return errorResponse(c, Errors.notFound("Listing"));
    return c.json({ listing: toPublic(row) }, 200);
}
export async function review(c: Context) {
    const body = await c.req.json().catch(() => null);
    const parsed = reviewListingSchema.safeParse(body);
    if (!parsed.success) return errorResponse(c, Errors.validation(parsed.error.flatten()));

    const id = c.req.param("id");
    if (!id) return errorResponse(c, Errors.validation({ id: "Missing listing id" }));

    const result = await listingService.reviewListing(id, parsed.data); // ← use `id`, not c.req.param("id") again
    if (!result) return errorResponse(c, Errors.notFound("Listing"));
    return c.json(result, 200);
}

export async function getByToken(c: Context) {
    const token = c.req.param("token");
    if (!token) return errorResponse(c, Errors.invalidToken());

    const row = await listingService.getListingByToken(token);
    if (!row) return errorResponse(c, Errors.invalidToken());
    return c.json({ listing: row }, 200);
}

export async function updateByToken(c: Context) {
    const token = c.req.param("token");
    if (!token) return errorResponse(c, Errors.invalidToken());

    const body = await c.req.json().catch(() => null);
    const parsed = updateListingSchema.safeParse(body);
    if (!parsed.success) return errorResponse(c, Errors.validation(parsed.error.flatten()));

    const updated = await listingService.updateListingByToken(token, parsed.data);
    if (!updated) return errorResponse(c, Errors.invalidToken());
    return c.json({ listing: updated }, 200);
}