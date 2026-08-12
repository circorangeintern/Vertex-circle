import { pgTable, uuid, text, numeric, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Enums ──────────────────────────────────────────────────────────
export const listingStatusEnum = pgEnum("listing_status", [
    "pending",
    "verified",
    "rejected",
]);

export const contactMethodEnum = pgEnum("contact_method", [
    "phone",
    "whatsapp",
]);

export const reviewDecisionEnum = pgEnum("review_decision", [
    "approved",
    "rejected",
]);

// ── Tables ─────────────────────────────────────────────────────────

// No landlord accounts (no-auth MVP). Identity is handled via a
// random, unguessable `editToken` issued at submission time and
// sent to the landlord — this is what powers the "dashboard"
// (GET/PATCH /api/manage/:token) without a login system.
export const listings = pgTable("listings", {
    id: uuid("id").defaultRandom().primaryKey(),

    landlordName: text("landlord_name").notNull(),
    contactMethod: contactMethodEnum("contact_method").notNull(),
    contactValue: text("contact_value").notNull(),

    price: numeric("price", { precision: 12, scale: 2 }).notNull(),
    locationCity: text("location_city").notNull(),
    locationArea: text("location_area"),
    description: text("description").notNull(),
    photoUrls: text("photo_urls").array().notNull().default([]),

    status: listingStatusEnum("status").notNull().default("pending"),

    // Unguessable token, returned once at creation, used instead of a
    // login to let the landlord manage this listing later.
    editToken: text("edit_token").notNull().unique(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const listingReviews = pgTable("listing_reviews", {
    id: uuid("id").defaultRandom().primaryKey(),
    listingId: uuid("listing_id")
        .notNull()
        .references(() => listings.id, { onDelete: "cascade" }),

    // No reviewer accounts either in the MVP — free-text name/tag.
    reviewerName: text("reviewer_name").notNull(),
    checklistPassed: jsonb("checklist_passed").notNull(),
    decision: reviewDecisionEnum("decision").notNull(),
    notes: text("notes"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const contactReveals = pgTable("contact_reveals", {
    id: uuid("id").defaultRandom().primaryKey(),
    listingId: uuid("listing_id")
        .notNull()
        .references(() => listings.id, { onDelete: "cascade" }),

    revealedAt: timestamp("revealed_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Relations ──────────────────────────────────────────────────────
export const listingsRelations = relations(listings, ({ many }) => ({
    reviews: many(listingReviews),
    reveals: many(contactReveals),
}));

export const listingReviewsRelations = relations(listingReviews, ({ one }) => ({
    listing: one(listings, {
        fields: [listingReviews.listingId],
        references: [listings.id],
    }),
}));

export const contactRevealsRelations = relations(contactReveals, ({ one }) => ({
    listing: one(listings, {
        fields: [contactReveals.listingId],
        references: [listings.id],
    }),
}));