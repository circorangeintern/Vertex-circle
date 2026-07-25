import { Hono } from "hono";
import * as listingController from "../controllers/listing.controller";
import { auth } from "../lib/auth";
import { errorResponse, Errors } from "../lib/error";

export const listingsRoute = new Hono();

listingsRoute.post("/", listingController.create);
listingsRoute.get("/", listingController.search);
listingsRoute.get("/:id", listingController.getById);
listingsRoute.post("/:id/reveal", listingController.reveal);

// Reviewer-only — session required (Better Auth)
listingsRoute.post("/:id/review", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return errorResponse(c, Errors.notFound("Session"));
    return next();
}, listingController.review);

// Landlord token-based management — no login
listingsRoute.get("/manage/:token", listingController.getByToken);
listingsRoute.patch("/manage/:token", listingController.updateByToken);