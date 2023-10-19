import httpRequest from "@/utils/httpRequest";


interface Consultation {
    userId: string;
    userName: string;
    email: string;
    phone: string;
    message: string;
}

/**
 * add consultation
 */
export function addConsultation(consultation: Consultation) {
    return httpRequest.post("/api/fitness/consultation/add", consultation);
}


