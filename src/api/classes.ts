import httpRequest from "@/utils/httpRequest";

// get all classes
export function getAllClasses() {
    return httpRequest.get("/api/fitness/classes/all", {});
}

// book class
export function bookClass(classesId: number, userId: string, userPaymentMethodId: string) {
    console.log(classesId, userId, userPaymentMethodId)
    return httpRequest.post("/api/fitness/classes/book", { classesId, userId, userPaymentMethodId});
}