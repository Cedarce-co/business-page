/** Max upload size safe for Vercel serverless request bodies (~4.5 MB limit). */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
export const MAX_UPLOAD_MB = MAX_UPLOAD_BYTES / (1024 * 1024);
