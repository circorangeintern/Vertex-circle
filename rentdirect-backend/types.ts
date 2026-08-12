import { z } from "zod";
import type { listings, listingReviews, contactReveals } from "./src/db/schema";
import type { InferSelectModel } from "drizzle-orm";

// ── DB-inferred row types ─────────────────────────────────────────
export type Listing = InferSelectModel<typeof listings>;
export type ListingReview = InferSelectModel<typeof listingReviews>;
export type ContactReveal = InferSelectModel<typeof contactReveals>;

// Public-facing listing shape (contact_value stripped until revealed)
export type PublicListing = Omit<Listing, "contactValue" | "editToken">;

// ── Request validation (Zod) ──────────────────────────────────────
export const createListingSchema = z.object({
    landlordName: z.string().min(2).max(100),
    contactMethod: z.enum(["phone", "whatsapp"]),
    contactValue: z.string().min(7).max(20),
    price: z.number().positive(),
    locationCity: z.string().min(2).max(100),
    locationArea: z.string().max(100).optional(),
    description: z.string().min(10).max(2000),
    photoUrls: z.array(z.string().url()).max(10).default([]),
});
export type CreateListingInput = z.infer<typeof createListingSchema>;

export const updateListingSchema = createListingSchema.partial();
export type UpdateListingInput = z.infer<typeof updateListingSchema>;

export const listingQuerySchema = z.object({
    locationCity: z.string().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    status: z.enum(["pending", "verified", "rejected"]).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(20),
});
export type ListingQuery = z.infer<typeof listingQuerySchema>;

export const reviewListingSchema = z.object({
    reviewerName: z.string().min(2).max(100),
    decision: z.enum(["approved", "rejected"]),
    checklistPassed: z.record(z.boolean()),
    notes: z.string().max(1000).optional(),
});
export type ReviewListingInput = z.infer<typeof reviewListingSchema>;

// ── Standard API envelope ─────────────────────────────────────────
export type ApiError = {
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
};

export type Paginated<T> = {
    data: T[];
    page: number;
    limit: number;
    total: number;
};