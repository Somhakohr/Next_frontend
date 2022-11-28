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
    const [username,setUserName] = useState('');
    const [userimg,setUserImg] = useState('');
    
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
    const { session } = useAuth22(3 * 60);

    useEffect(() => {
      if(session){
        if(session.type == 'Candidate'){
          if(!session.user.name){
              setUserName(session.userObj.first_name + ' ' + session.userObj.last_name)
          }
          else{
              setUserName(session.user.name)
          }
  
          if(session.profile.profile == '/media/default_image.jpeg' && session.user.image){
              setUserImg(session.user.image);
          }
          else{
              setUserImg('http://127.0.0.1:8000'+session.profile.profile);
          }
        }
      }
      }, [session])

    return {router,axiosInstance,session,username,setUserName,userimg,setUserImg};
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

    // const axiosInstance = axios.create({
    //   baseURL: 'http://127.0.0.1:8000/api/',
    //   timeout: 5000,
    //   headers: {
    //       // 'Authorization': "JWT " + access_token,
    //       'Content-Type': 'application/json',
    //       'accept': 'application/json'
    //   }
    // });

    // useEffect(function () {
    //   if (data) {
    //     (async () => {
    //       const res = await axiosInstance.post('/auth/getuser/', {
    //         email: data.user.email
    //       });
    //       console.log(res); 
    //     })();
        
    //   }
    // }, [data])
    
   
    // const res = axiosInstance.post('/auth/getuser/', {
    //   email: data.user.email,
    // });
    // console.log(res);
  
    return {
      session: data,
      loading: typeof data === "undefined" && typeof error === "undefined",
    };
  }

export default useStore;