import httpRequest from "@/utils/httpRequest";

// get all facilities
export function getAllFacilities() {
    return httpRequest.get("/api/fitness/facilities/all", {});
}

// book facility
export function bookFacility(facilityId: number, userId: string, userPaymentMethodId: string) {
    console.log(facilityId, userId, userPaymentMethodId)
    return httpRequest.post("/api/fitness/facilities/book", { facilityId, userId, userPaymentMethodId});
}