import React from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function toastcomp(title,type) {
    toast(title, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: type,
        });
}