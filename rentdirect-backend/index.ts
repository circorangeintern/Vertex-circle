import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { listingsRoute } from "./src/routes/listings";
import { auth } from "./src/lib/auth";
import { errorResponse, ApiException, Errors } from "./src/lib/error";

const app = new Hono();

app.use("*", logger());
app.use(
    "/api/auth/*",
    cors({
        origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
        credentials: true,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
    })
);

// ── Health check ────────────────────────────────────────────────
app.get("/", (c) => c.text("RentDirect API is running"));

// ── Auth (Better Auth — reviewer/admin only) ───────────────────
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// ── Listings (landlord/tenant — no login, token-based management) ─
app.route("/api/listings", listingsRoute);

// ── Errors ──────────────────────────────────────────────────────
app.notFound((c) => errorResponse(c, Errors.notFound("Route")));

app.onError((err, c) => {
    if (err instanceof ApiException) return errorResponse(c, err);
    console.error(err);
    return errorResponse(c, Errors.internal());
});

export default {
    port: process.env.PORT ?? 3000,
    fetch: app.fetch,
};