import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link'
import Auth_Slider from "./auth-slider";
import Google_Icon from '../../public/images/google-icon.png';
import Facebook_Icon from '../../public/images/facebook-icon.png';
import {react,useState,useEffect} from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from "../../hooks/useAuth";
// import axiosInstance from '../api/axiosApi';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isauth,setIsAuth} = useAuth();
  const router = useRouter();
  // const [access_token, setaccess_token] = useState('');

  useEffect(() => {
    if(isauth){
      router.push('/');
    }
    // setaccess_token(localStorage.getItem('access_token'));
  }, []);

  const axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      timeout: 5000,
      headers: {
          // 'Authorization': "JWT " + access_token,
          'Content-Type': 'application/json',
          'accept': 'application/json'
      }
  });



  function validateForm() {
    return email.length > 0 && password.length >= 8;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(email);
    console.log(password);

    await axiosInstance.post('/auth/login/', {
        email: email,
        password: password,
    }).then((response)=>{
      console.log(response);
      setIsAuth(true);     
      router.push('/');
       // localStorage.setItem('access_token', response.data.tokens.access);
      // localStorage.setItem('refresh_token', response.data.tokens.refresh);
      // setIsAuth(true);
    }).catch((err)=>{
      setIsAuth(false);
      // console.log(err);
      // setIsAuth(false);
    });


    // try {
    //     const response = axiosInstance.post('/auth/login/', {
    //         email: email,
    //         password: password
    //     });
    //     console.log(response);
    //     axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.tokens.access;
    //     console.log(response.data);
    //     localStorage.setItem('access_token', response.data.tokens.access);
    //     localStorage.setItem('refresh_token', response.data.tokens.refresh);
    //     return data;
    // } catch (error) {
    //     // throw error;
    //     console.log(error)
    // }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#FAF8FF]">
      {/* ALERT EXAMPLE */}
      {/* <div class="flex flex-col justify-center">
  <div class="bg-blue-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
    <div class="bg-blue-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-blue-500 rounded-t-lg">
      <p class="font-bold text-white flex items-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
        </svg>
        MDBootstrap</p>
      <div class="flex items-center">
        <p class="text-white opacity-90 text-xs">11 mins ago</p>
        <button type="button" class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    <div class="p-3 bg-blue-600 rounded-b-lg break-words text-white">
      Hello, world! This is a toast message.
    </div>
  </div>
  <div class="bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
    <div class="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
      <p class="font-bold text-white flex items-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>
        MDBootstrap</p>
      <div class="flex items-center">
        <p class="text-white opacity-90 text-xs">11 mins ago</p>
        <button type="button" class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    <div class="p-3 bg-green-500 rounded-b-lg break-words text-white">
      Hello, world! This is a toast message.
    </div>
  </div>
  <div class="bg-yellow-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
    <div class="bg-yellow-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-yellow-400 rounded-t-lg">
      <p class="font-bold text-white flex items-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path>
        </svg>
        MDBootstrap</p>
      <div class="flex items-center">
        <p class="text-white opacity-90 text-xs">11 mins ago</p>
        <button type="button" class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    <div class="p-3 bg-yellow-500 rounded-b-lg break-words text-white">
      Hello, world! This is a toast message.
    </div>
  </div>
  <div class="bg-red-600 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
    <div class="bg-red-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-red-500 rounded-t-lg">
      <p class="font-bold text-white flex items-center">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
        </svg>
        MDBootstrap</p>
      <div class="flex items-center">
        <p class="text-white opacity-90 text-xs">11 mins ago</p>
        <button type="button" class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" data-mdb-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    <div class="p-3 bg-red-600 rounded-b-lg break-words text-white">
      Hello, world! This is a toast message.
    </div>
  </div>
      </div> */} 
      {/* <div class="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd" />
          </svg>
          <p class="ml-3 text-sm font-bold text-green-600">Successfully Toast Message !</p>
        </div>
        <span class="inline-flex items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div>
      <div class="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd" />
          </svg>
          <p class="ml-3 text-sm font-bold text-blue-600">Info Toast Message !</p>
        </div>
        <span class="inline-flex items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div>
      <div class="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd" />
          </svg>
          <p class="ml-3 text-sm font-bold text-yellow-600">Warning Toast Message !</p>
        </div>
        <span class="inline-flex items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div>
      <div class="flex items-center justify-between max-w-xs p-4 bg-white border rounded-md shadow-sm">
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd" />
          </svg>
          <p class="ml-3 text-sm font-bold text-red-600">Error Toast Message !</p>
        </div>
        <span class="inline-flex items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
      </div> */}
        <section className="py-12">
          <div className="mx-auto max-w-[1200px] w-full px-4 flex flex-wrap items-center">
              <div className="mb-6 lg:mb-0 lg:pr-20 w-full lg:w-[40%] hidden lg:block">
                <Auth_Slider />
              </div>
              <div className="w-full lg:w-[60%]">
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-24 min-h-[550px] flex flex-col justify-center">
                      <h1 className="font-medium text-3xl mb-12">
                        Sign in
                      </h1>
                      <form className="mb-16" onSubmit={handleSubmit}>
                        <div className="mb-6">
                          <label htmlFor="email" className="font-medium mb-2 leading-none inline-block">Email</label>
                          <input id="email" type="email" className="w-full rounded-full border-slate-300" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="password" className="font-medium mb-2 leading-none inline-block">Password</label>
                          <input id="password" type="password" className="w-full rounded-full border-slate-300" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                          <button type="submit" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!validateForm()}>
                            Sign in
                            <i className="fa-solid fa-arrow-right-to-bracket ml-2"></i>
                          </button>
                          <div>
                          <Link href="/auth/forgot-password" className="my-3 inline-block text-[#6D27F9] hover:underline">Forgot Password</Link>&nbsp;|&nbsp; 
                          <Link href="/auth/signup" className="my-3 inline-block text-[#6D27F9] hover:underline">Register</Link>
                          </div>
                          
                        </div>
                      </form>
                      <div className="relative mb-8">
                        <hr className="border-slate-600" />
                        <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">Or sign in with</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="border rounded border-slate-300 p-3 cursor-pointer mx-2">
                          <Image src={Google_Icon} width={15} alt="Google" />
                        </div>
                        <div className="border rounded border-slate-300 p-3 cursor-pointer mx-2">
                          <Image src={Facebook_Icon} width={15} alt="Facebook" />
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </main>
    </>
  );
}