import httpRequest from "@/utils/httpRequest";

export function signUp(user: object) {
    return httpRequest.post("/api/auth/signup", user);
}

export function signIn(email: String, password: String) {
    return httpRequest.post("/api/auth/login", {email, password});
}

export function emailRegisteredCheck(email: String) {
    return httpRequest.get("/api/auth/email-registered-check", {email});
}

export const getUserInfo = (email: string) => {
    return httpRequest.get("/api/auth/user", {email});
}