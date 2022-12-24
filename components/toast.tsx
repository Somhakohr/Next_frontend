//@ts-nocheck
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function toastcomp(title, type) {
  toast(title, {
    type: type,
    duration: 4000,
    position: "top-right",
    // reverseOrder=false
  });
}
