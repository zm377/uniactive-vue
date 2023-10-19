import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:4080/',  // Replace with your API base URL
    timeout: 10000,  // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    }
});

const httpService = {
    get: async (endpoint: string, params: object) => {
        try {
            const response = await axiosInstance.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error("Error making GET request:", error);
            throw error;
        }
    },

    post: async (endpoint: string, data: object) => {
        try {
            const response = await axiosInstance.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("Error making POST request:", error);
            throw error;
        }
    },

    put: async (endpoint: string, data: any) => {
        try {
            const response = await axiosInstance.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error("Error making PUT request:", error);
            throw error;
        }
    },

    delete: async (endpoint: string) => {
        try {
            const response = await axiosInstance.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error("Error making DELETE request:", error);
            throw error;
        }
    },

    // Add more methods as needed...
};

export default httpService;
