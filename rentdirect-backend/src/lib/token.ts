import { randomBytes } from "crypto";
export function generateEditToken(): string {
    return randomBytes(32).toString("base64url");
}