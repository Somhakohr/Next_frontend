import React from "react";
import axios from 'axios';



export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
    timeout: process.env.NODE_ENV === 'production' ? 5000 : 10000,
    headers: {
        // 'Authorization': "JWT " + access_token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});