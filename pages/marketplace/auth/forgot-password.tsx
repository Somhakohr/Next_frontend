import axios from "axios";
import Head from "next/head";
import Link from 'next/link'
import { useState } from "react";
import Auth_Slider from "../../../components/auth-slider";
import toastcomp from "../../../components/toast";

export default function ForgotPassword() {

  const [email,setemail] = useState('')

  function validbtn(){
    return email.length > 0
  }

  const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
    timeout: 5000,
    headers: {
        // 'Authorization': "JWT " + access_token,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
  });

  async function forgetpass() {
    await axiosInstance.post('/auth/request-reset-email/',{'email':email}).then((response)=>{
      toastcomp("Forget Password Mail Sent","success")
      setemail('')
    }).catch((err)=>{
      // console.log(err);
      toastcomp("Forget Password Error","error")      
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
                  <Auth_Slider />
              </div>
              <div className="w-full lg:w-[60%]">
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-24 min-h-[550px] flex flex-col justify-center">
                      <h1 className="font-medium text-xl md:text-3xl mb-12">
                        Forgot Password
                      </h1>
                      <div className="mb-16">
                        <div className="mb-6">
                          <label htmlFor="email" className="font-medium mb-2 leading-none inline-block">Email</label>
                          <input id="email" type="email" className="w-full rounded-full border-slate-300" value={email} onChange={(e)=>setemail(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                          <button type="submit" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!validbtn()} onClick={(e)=>forgetpass()}>
                            Submit
                          </button>
                        </div>
                      </div>
                      <div className="relative mb-8">
                        <hr className="border-slate-600" />
                        <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">Not a member yet?</span>
                      </div>
                      <div className="text-center">
                        <Link href="/marketplace/auth/signup" className="text-[#6D27F9] hover:underline">Sign Up</Link>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </main>
    </>
  );
}
