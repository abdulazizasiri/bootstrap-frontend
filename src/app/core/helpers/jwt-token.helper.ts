export function parseJwt(token) {
    if (!token || token == "null") return null;
    try {
        const base64Url = token.split('.')[1];  // Get the payload part of the token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Replace URL-safe characters
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}


export function isTokenExpired(token) {
    if (!token || token == "null") return true;
    const payload = parseJwt(token);
    // Get current time and compare it to the exp time in the payload
    const currentTime = Math.floor(Date.now() / 1000);
    return payload?.exp ? payload.exp < currentTime : true;
}
