import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link'
import AuthSlider from "../../components/auth-slider";
import Google_Icon from '../../public/images/google-icon.png';
import Github_Icon from '../../public/images/github-icon.png';
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getCsrfToken, getSession, SessionProvider, signIn, useSession } from "next-auth/react";
import toastcomp from "../../components/toast";

async function setCSRF(setCsrf) {
  const csrfToken = await getCsrfToken()
  console.log(csrfToken);
  setCsrf(csrfToken);
}

export default function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrf, setCsrf] = useState('');
  const router = useRouter();  

  useEffect(() => {
    setCSRF(setCsrf);
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

  async function handleClick(event) {
    event.preventDefault();
    console.log(email);
    console.log(password);

    await axiosInstance.post('/auth/login/', {
        email: email,
        password: password,
    }).then(async (response)=>{
      // console.log(response);
      await signIn('credentials', { redirect: false, password: password,email: email, }).then(()=>{
        router.push("/");
      }) 
      // return true;
    }).catch((err)=>{
      console.log(err);
      if(err.response.data.non_field_errors){
        err.response.data.non_field_errors.map((text) =>
          toastcomp(text,"error")
        );
        return false;
      }
      if(err.response.data.detail){
        toastcomp(err.response.data.detail,"error");
        return false;
      }
      
    });
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="py-12">
          <div className="mx-auto max-w-[1200px] w-full px-4 flex flex-wrap items-center">
            <div className="mb-6 lg:mb-0 lg:pr-20 w-full lg:w-[40%] hidden lg:block">
              <AuthSlider />
            </div>
            <div className="w-full lg:w-[60%]">
              <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-24 min-h-[550px] flex flex-col justify-center">
                <h1 className="font-medium text-xl md:text-3xl mb-12">
                  Sign in
                </h1>

                      <form className="mb-16">
                      {/* <form className="mb-16" action="http://localhost:3000/api/auth/callback/credentials" method="POST"> */}
                      {/* <input type="hidden" name="csrfToken" value={csrf} /> */}
                        <div className="mb-6">
                          <label htmlFor="email" className="font-medium mb-2 leading-none inline-block">Email</label>
                          <input type="email" name="email" id="input-email-for-credentials-provider" className="w-full rounded-full border-slate-300" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="password" className="font-medium mb-2 leading-none inline-block">Password</label>
                          <input type="password" name="password" id="input-password-for-credentials-provider" className="w-full rounded-full border-slate-300" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                          <button type="button" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!validateForm()} onClick={(e) => handleClick(e)}>
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
                        <form action="http://localhost:3000/api/auth/signin/google" method="POST">
                          <div className="border rounded border-slate-300 p-3 cursor-pointer mx-2">
                            <input type="hidden" name="csrfToken" value={csrf} />
                            <input type="hidden" name="callbackUrl" value="http://localhost:3000/" />
                            <button type="submit"><Image src={Google_Icon} width={15} alt="Google" /></button>
                          </div>
                        </form>

                        <form action="http://localhost:3000/api/auth/signin/github" method="POST">
                          <div className="border rounded border-slate-300 p-3 cursor-pointer mx-2">
                            <input type="hidden" name="csrfToken" value={csrf} />
                            <input type="hidden" name="callbackUrl" value="http://localhost:3000/" />
                            <button type="submit"><Image src={Github_Icon} width={15} alt="GitHub" /></button>
                          </div>
                        </form>
                      </div>
                  </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
