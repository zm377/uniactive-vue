import {defineStore} from "pinia";

interface MedicalHistory {
    heartCondition: boolean;
    chestPain: boolean;
    dizzy: boolean;
    asthma: boolean;
    diabetes: boolean;
    muscleProblem: boolean;
    otherMedicalCondition: boolean;
    newToGym: boolean;
}

interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    gander: string;
    birthday: string;
    country: string;
    city: string;
    address: string;
    addressAddition: string;
    email: string;
    phone: string;
    emergencyContact: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;
    fpNumber: string;
    medicalHistory: MedicalHistory;
    password: string;
    createdDate: string;
}
const userInfo: UserInfo = {} as UserInfo;

// Define a store for saved user information
export const useUserStore = defineStore("user",{
    state: () => ({
        email: "",
        token: "",
        userInfo: userInfo,
        membership: {},
        userPaymentInformation: {}
    }),
    getters: {
        isLoggedIn: (state) => state.token !== "",
        getToken: (state) => state.token,
        getMembership: (state) => state.membership,
    },
    actions: {
        // Set the user's email and token
        setUserInfo(email: string, token: string, userInfo: UserInfo) {
            this.email = email;
            this.token = token;
            this.userInfo = userInfo;
        },
        setMembership(membership: object) {
            this.membership = membership;
        },
        setUserPaymentInformation(userPaymentInformation: object) {
            this.userPaymentInformation = userPaymentInformation;
        }
    }
});