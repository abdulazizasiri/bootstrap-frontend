import { SafeResourceUrl } from "@angular/platform-browser";

export function isResourceUrlSafe(apiUrl: string): SafeResourceUrl | null {
    try {
        const url = new URL(apiUrl);
        if (url.protocol !== "https:") { //Allow only HTTPS
            console.error("Blocked: Only HTTPS URLs are allowed", apiUrl);
            return false;
        }
        const unsafeSchemes = ["javascript:", "data:", "file:", "blob:"]; //Block dangerous schemes
        if (unsafeSchemes.some(scheme => apiUrl.startsWith(scheme))) {
            console.error("Blocked: Unsafe URL scheme detected", apiUrl);
            return false;
        }
        return true;
    } catch (error) {
        console.error("Invalid URL format:", apiUrl);
        return false;
    }
}