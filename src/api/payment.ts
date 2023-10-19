import httpRequest from "@/utils/httpRequest";


interface BankCard {
    cardName: string;
    cardNumber: number;
    expiryDate: string;
    cvc: string;
}

interface UserPaymentMethod {
    userId: string;
    paymentMethod: string;
    bankCard: BankCard;
}

// add user payment method
export function addUserPaymentMethod(userPaymentMethod: UserPaymentMethod) {
    return httpRequest.post("/api/payment/add-user-payment-method", userPaymentMethod);
}

// update user payment method
export function updateUserPaymentMethod(userPaymentMethod: UserPaymentMethod) {
    return httpRequest.put("/api/payment/update-user-payment-method", userPaymentMethod);
}

// get user payment methods
export function getUserPaymentMethods(userId: string) {
    return httpRequest.get("/api/payment/user-payment-methods", {userId});
}

// delete user payment method
export function deleteUserPaymentMethod(userPaymentMethodId: string) {
    return httpRequest.delete(`/api/payment/delete-user-payment-method/${userPaymentMethodId}`);
}

