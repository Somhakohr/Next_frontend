import React,{useState} from 'react';

import { Session } from 'next-auth';
import { useEffect } from "react";
import useSwr, { mutate } from "swr";

import { useRouter } from "next/router";
import axios from 'axios';
const sessionUrl = "/api/auth/session";

async function fetchSession(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch session from ${url}`);
  }

  const session: Session = await response.json();

  if (!session || Object.keys(session).length === 0) {
    return null;
  }

  return session;
}

const useStore = () => {
    // const [isauth,setIsAuth] = useState(false);
    const router = useRouter();
    const axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      timeout: 5000,
      headers: {
          // 'Authorization': "JWT " + access_token,
          'Content-Type': 'application/json',
          'accept': 'application/json'
      }
    });
    return {router,axiosInstance};
    // return {isauth,setIsAuth,router};
};

export function useAuth22(refreshInterval?: number) {
    /*
      custom hook that keeps the session up-to-date by refreshing it
  
      @param {number} refreshInterval: The refresh/polling interval in seconds. default is 20.
      @return {object} An object of the Session and boolean loading value
    */
    const { data, error } = useSwr(sessionUrl, fetchSession, {
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
    });
  
    useEffect(() => {
      const intervalId = setInterval(
        () => mutate(sessionUrl),
        (refreshInterval || 20) * 1000,
      );
  
      return () => clearInterval(intervalId);
    }, []);
  
    return {
      session: data,
      loading: typeof data === "undefined" && typeof error === "undefined",
    };
  }

export default useStore;