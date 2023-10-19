import httpRequest from "@/utils/httpRequest";

/**
 *
 *     private String userId;
 *     private Long planId;
 *     private Long levelId;
 *     String userPaymentMethodId;
 */

interface Membership {
    userId: string;
    planId: number;
    levelId: number;
    price: number;
    userPaymentMethodId: string;
}

// register user membership
export function registerMembership(membership: Membership) {
    return httpRequest.post("/api/membership/register", membership);
}

// get all membership plans
export function getMembershipPlans() {
    return httpRequest.get("/api/membership/plan/all", {});
}

// get all membership levels
export function getMembershipLevels() {
    return httpRequest.get("/api/membership/level/all", {});
}