import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link'
import Auth_Slider from "./auth-slider";
import graphic_1 from '../../public/images/graphic-1.png';
import graphic_2 from '../../public/images/graphic-2.png';
import Google_Icon from '../../public/images/google-icon.png';
import Facebook_Icon from '../../public/images/facebook-icon.png';
import {react,useState,useEffect} from "react";

export default function SignUp() {
  const [section, setSection] = useState(0);
  const [choice, setChoice] = useState(0);

  function validateChoice() {
    return choice!=0;
  }

  function creatAccBtn() {
    setSection(choice);
  }

  function resetFun() {
    setSection(0);
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#FAF8FF]">
        <section className="py-12">
          <div className="mx-auto max-w-[1200px] w-full px-4 flex flex-wrap items-center">
              <div className="mb-6 lg:mb-0 lg:pr-20 w-full lg:w-[40%] hidden lg:block">
                <Auth_Slider />
              </div>
              <div className="w-full lg:w-[60%]">
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-16 min-h-[550px] flex flex-col justify-center">
                    {section>0?
                      <>
                      {section==1?
                      <>
                      <aside>
                        <h1 className="font-medium text-3xl mb-12">
                          Sign up as organisation &nbsp;<span onClick={resetFun}>Go Back</span>
                        </h1>
                        <form>
                          <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="companyname" className="font-medium mb-2 leading-none inline-block">Company Name</label>
                              <input id="companyname" type="text" className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="fullname" className="font-medium mb-2 leading-none inline-block">Your Name</label>
                              <input id="fullname" type="text" className="w-full rounded-full border-slate-300" />
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="email" className="font-medium mb-2 leading-none inline-block">Email</label>
                              <input id="email" type="email" className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="accounttype" className="font-medium mb-2 leading-none inline-block">Account Type</label>
                              <select id="accounttype" className="w-full rounded-full border-slate-300">
                                <option value="Agency">Agency</option>
                                <option value="Corporate">Corporate</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="password" className="font-medium mb-2 leading-none inline-block">Password</label>
                              <input id="password" type="password" className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="confirmpassword" className="font-medium mb-2 leading-none inline-block">Confirm Password</label>
                              <input id="confirmpassword" type="password" className="w-full rounded-full border-slate-300" />
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                            <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]">
                              Submit
                            </button>
                            <span>Already have an account? <Link href="/auth/signin" className="my-3 inline-block text-[#6D27F9] hover:underline">Sign In</Link></span>
                          </div>
                        </form>
                      </aside>
                      </>
                      :<></>}
                      {section==2?
                      <>
                      <aside>
                        <h1 className="font-medium text-3xl mb-12">
                          Sign up as candidate&nbsp;<span onClick={resetFun}>Go Back</span>
                        </h1>
                        <form className="mb-16">
                          <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="fname" className="font-medium mb-2 leading-none inline-block">First Name</label>
                              <input id="fname" type="text" className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="lname" className="font-medium mb-2 leading-none inline-block">Last Name</label>
                              <input id="lname" type="text" className="w-full rounded-full border-slate-300" />
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="cand_email" className="font-medium mb-2 leading-none inline-block">Email</label>
                              <input id="cand_email" type="email" className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="phone" className="font-medium mb-2 leading-none inline-block">Phone</label>
                              <input id="phone" type="number" className="w-full rounded-full border-slate-300" />
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="cand_password" className="font-medium mb-2 leading-none inline-block">Password</label>
                              <input id="cand_password" type="password" className="w-full rounded-full border-slate-300" />
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                              <label htmlFor="cand_confirmpassword" className="font-medium mb-2 leading-none inline-block">Confirm Password</label>
                              <input id="cand_confirmpassword" type="password" className="w-full rounded-full border-slate-300" />
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                            <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]">
                              Submit
                            </button>
                            <span>Already have an account? <Link href="/auth/signin" className="my-3 inline-block text-[#6D27F9] hover:underline">Sign In</Link></span>
                          </div>
                        </form>
                        <div className="relative mb-8">
                          <hr className="border-slate-600" />
                          <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">Or sign up with</span>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="border rounded border-slate-300 p-3 cursor-pointer mx-2">
                            <Image src={Google_Icon} width={15} alt="Google" />
                          </div>
                          <div className="border rounded border-slate-300 p-3 cursor-pointer mx-2">
                            <Image src={Facebook_Icon} width={15} alt="Facebook" />
                          </div>
                        </div>
                      </aside>
                      </>
                      :<></>}
                      </>
                    :
                    <>                    
                      <aside>
                        <h2 className="font-medium text-3xl mb-12 text-center">
                          How do you want to Signup us?
                        </h2>
                        <div className="mb-16">
                          <div className="flex items-center justify-between w-full max-w-[500px] mx-auto mb-8">
                            <label htmlFor="organisation" className="rounded w-full max-w-[47%] bg-gradient-to-r from-[#A382E5] to-[#60C3E2] relative p-4 flex flex-col items-center text-center cursor-pointer">
                              <Image src={graphic_1} alt="Organisation" width={80} className="mb-3" />
                              <span className="mb-3 text-white">Signup as organisation</span>
                              <input id="organisation" type="radio" name="singupAs" value={1} onChange={(e) => setChoice(1)}/>
                            </label>
                            <label htmlFor="candidate" className="rounded w-full max-w-[47%] bg-gradient-to-r from-[#A382E5] to-[#60C3E2] relative p-4 flex flex-col items-center text-center cursor-pointer">
                              <Image src={graphic_2} alt="Candidate" width={80} className="mb-3" />
                              <span className="mb-3 text-white">Signup as candidate</span>
                              <input id="candidate" type="radio" name="singupAs" value={2} onChange={(e) => setChoice(2)}/>
                            </label>
                          </div>
                          <div className="text-center">
                            <button type="button" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[230px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!validateChoice()} onClick={creatAccBtn}>
                              Create Account
                            </button>
                          </div>
                        </div>
                        <div className="relative mb-8">
                          <hr className="border-slate-600" />
                          <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">Already have an Account</span>
                        </div>
                        <div className="text-center">
                          <Link href="/auth/signin" className="text-[#6D27F9] hover:underline">Sign In</Link>
                        </div>
                      </aside>
                    </>}    
                    
                  </div>
              </div>
          </div>
        </section>
      </main>
    </>
  );
}
