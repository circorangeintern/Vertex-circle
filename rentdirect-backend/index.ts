import "dotenv/config";
import { Hono, type Context } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { listingsRoute } from "./src/routes/listings";
import { auth } from "./src/lib/auth";
import { errorResponse, ApiException, Errors } from "./src/lib/error";

const app = new Hono();

app.use("*", logger());
app.use(
    "/api/*",
    cors({
        origin: process.env.CLIENT_ORIGIN ?? "*",
        credentials: true,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "PATCH", "PUT", "DELETE", "OPTIONS"],
    })
);

// ── Health check ────────────────────────────────────────────────
app.get("/", (c: Context) => c.text("RentDirect API is running"));

// ── Auth (Better Auth — reviewer/admin only) ───────────────────
app.on(["POST", "GET"], "/api/auth/*", (c: Context) => auth.handler(c.req.raw));

// ── Listings (landlord/tenant — no login, token-based management) ─
app.route("/api/listings", listingsRoute);

// ── Errors ──────────────────────────────────────────────────────
app.notFound((c: Context) => errorResponse(c, Errors.notFound("Route")));

app.onError((err: Error | ApiException, c: Context) => {
    if (err instanceof ApiException) return errorResponse(c, err);
    console.error(err);
    return errorResponse(c, Errors.internal());
});

export default {
    port: process.env.PORT ?? 3000,
    fetch: app.fetch,
};