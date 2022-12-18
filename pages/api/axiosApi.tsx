import React from "react";
import axios from 'axios';



export const axiosInstance = axios.create({
    baseURL: 'https://marketplace.somhako.com/api/',
    timeout: 5000,
    headers: {
        // 'Authorization': "JWT " + access_token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});