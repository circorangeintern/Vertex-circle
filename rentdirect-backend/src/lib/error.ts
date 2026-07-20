import type { Context } from "hono";
import type { ApiError } from "../../types";

export class ApiException extends Error {
    constructor(
        public status: 400 | 401 | 403 | 404 | 409 | 500,
        public code: string,
        message: string,
        public details?: unknown
    ) {
        super(message);
    }
}

export function errorResponse(c: Context, err: ApiException) {
    const body: ApiError = {
        error: { code: err.code, message: err.message, details: err.details },
    };
    return c.json(body, err.status);
}

// Common, reusable error factories — keeps error codes consistent
// across routes (see API-CONTRACT.md for the full table).
export const Errors = {
    validation: (details: unknown) =>
        new ApiException(400, "VALIDATION_ERROR", "Request failed validation.", details),
    notFound: (resource: string) =>
        new ApiException(404, "NOT_FOUND", `${resource} not found.`),
    invalidToken: () =>
        new ApiException(401, "INVALID_EDIT_TOKEN", "Edit token is invalid or expired."),
    conflict: (message: string) => new ApiException(409, "CONFLICT", message),
    internal: () =>
        new ApiException(500, "INTERNAL_ERROR", "Something went wrong. Please try again."),
};