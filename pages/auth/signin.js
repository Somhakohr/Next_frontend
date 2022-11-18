import Head from "next/head";
import Image from 'next/image';
import Link from 'next/link'
import Auth_Slider from "./auth-slider";
import Google_Icon from '../../public/images/google-icon.png';
import Facebook_Icon from '../../public/images/facebook-icon.png';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Sign In</title>
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
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-24 min-h-[550px] flex flex-col justify-center">
                      <h1 className="font-medium text-3xl mb-12">
                        Sign in
                      </h1>
                      <form className="mb-16">
                        <div className="mb-6">
                          <label htmlFor="email" className="font-medium mb-2 leading-none inline-block">Email</label>
                          <input id="email" type="email" className="w-full rounded-full border-slate-300" />
                        </div>
                        <div className="mb-6">
                          <label htmlFor="password" className="font-medium mb-2 leading-none inline-block">Password</label>
                          <input id="password" type="password" className="w-full rounded-full border-slate-300" />
                        </div>
                        <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                          <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]">
                            Sign in
                            <i className="fa-solid fa-arrow-right-to-bracket ml-2"></i>
                          </button>
                          <Link href="/auth/forgot-password" className="my-3 inline-block text-[#6D27F9] hover:underline">Forgot Password</Link>
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
