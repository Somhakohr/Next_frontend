//@ts-nocheck
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Auth_Slider from "../../../components/auth-slider";
import graphic_1 from "../../../public/images/graphic-1.png";
import graphic_2 from "../../../public/images/graphic-2.png";
import Google_Icon from "../../../public/images/google-icon.png";
import Github_Icon from "../../../public/images/github-icon.png";
import React from "react";
import { useState, useEffect } from "react";
import toastcomp from "../../../components/toast";
import { useRouter } from "next/router";
import axios from "axios";
import { getCsrfToken } from "next-auth/react";
import Multiselect from "multiselect-react-dropdown";

async function setCSRF(setCsrf) {
  const csrfToken = await getCsrfToken();
  setCsrf(csrfToken);
}

export default function SignUp() {
  const [section, setSection] = useState(0);
  const [choice, setChoice] = useState(0);
  const [csrf, setCsrf] = useState("");
  const [ref, setref] = useState("");
  const router = useRouter();
  const { asPath } = useRouter();

  const [orgInputPass, orgInputPassToggle] = useState(false);
  const [orgInputConfPass, orgInputConfPassToggle] = useState(false);
  const [canInputPass, canInputPassToggle] = useState(false);
  const [canInputConfPass, canInputConfPassToggle] = useState(false);

  function orgInputPassToggled() {
    orgInputPassToggle(!orgInputPass);
  }
  function orgInputConfPassToggled() {
    orgInputConfPassToggle(!orgInputConfPass);
  }
  function canInputPassToggled() {
    canInputPassToggle(!canInputPass);
  }
  function canInputConfPassToggled() {
    canInputConfPassToggle(!canInputConfPass);
  }

  useEffect(() => {
    setCSRF(setCsrf);
  }, []);

  const axiosInstance = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE
        : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
    timeout: process.env.NODE_ENV === "production" ? 5000 : 10000,
    headers: {
      // 'Authorization': "JWT " + access_token,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  // const {axiosInstance,router} = useStore();

  //candidate state
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //org state
  const [cname, setCName] = useState("");
  const [name, setName] = useState("");
  const [cemail, setCEmail] = useState("");
  const [ctype, setCType] = useState("Agency");
  const [cpassword, setCPassword] = useState("");
  const [cpassword2, setCPassword2] = useState("");

  function validateCForm() {
    return (
      email.length > 0 &&
      password.length >= 8 &&
      password2 == password &&
      firstname.length > 0 &&
      lastname.length > 0 &&
      phone.length == 10
    );
  }

  function validateOForm() {
    return (
      cemail.length > 0 &&
      cpassword.length >= 8 &&
      cpassword2 == cpassword &&
      name.length > 0 &&
      cname.length > 0 &&
      ctype &&
      ctype.length > 0
    );
  }

  async function handleCandClick(event) {
    event.preventDefault();

    const axiosInstance2 = axios.create({
      baseURL:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE
          : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
      timeout: process.env.NODE_ENV === "production" ? 5000 : 10000,
      headers: {
        // 'Authorization': 'Bearer '+accessToken,
        "Content-Type": "multipart/form-data",
      },
    });

    var formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("mobile", mobile);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    if (ref.length > 0) {
      formData.append("refferal", ref);
    }

    await axiosInstance2
      .post("/auth/candidateregister/", formData)
      .then((response) => {
        router.push("/");
        toastcomp("Successfully Registerd", "success");
        setTimeout(() => {
          toastcomp("We Send Verification Email", "info");
        }, 100);
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.data.errors.email) {
          err.response.data.errors.email.map((text) =>
            toastcomp(text, "error")
          );
          return false;
        }
      });

    // if(ref.length > 0){
    //   await axiosInstance.get("/auth/main_view/" + ref + "/")
    //   .then(async (res) => {
    //     console.log(res);
    //     toastcomp("Refer Code Valid", "success");

    //   })
    //   .catch((err) => {
    //     if (err.message != "Request failed with status code 401") {
    //       toastcomp("Refer Code Not Valid", "error");
    //     }
    //     console.log(err);
    //     return false;
    //   });
    // }
  }

  async function handleOrgClick(event) {
    event.preventDefault();
    await axiosInstance
      .post("/auth/orgregister/", {
        email: cemail,
        password: cpassword,
        password2: cpassword2,
        name: name,
        company_name: cname,
        company_type: ctype,
      })
      .then((response) => {
        router.push("/");
        toastcomp("Successfully Registerd", "success");
        setTimeout(() => {
          toastcomp("We Send Verification Email", "info");
        }, 100);
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.data.errors.non_field_errors) {
          err.response.data.errors.non_field_errors.map((text) =>
            toastcomp(text, "error")
          );
          return false;
        }
        if (err.response.data.errors.email) {
          err.response.data.errors.email.map((text) =>
            toastcomp(text, "error")
          );
          return false;
        }
      });
  }

  function validateChoice() {
    return choice != 0;
  }

  function creatAccBtn() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setPassword2("");
    setCName("");
    setName("");
    setCEmail("");
    setCType("");
    setCPassword("");
    setCPassword2("");
    setSection(choice);
  }

  function resetFun() {
    setSection(0);
  }

  useEffect(() => {
    var refer = asPath.substring(1).split("/")[2].split("?")[1];
    if (refer && refer.includes("referral") && refer.split("=")[1].length > 0) {
      setSection(2);
      setref(refer.split("=")[1]);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Sign Up</title>
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
              <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-16 min-h-[550px] flex flex-col justify-center">
                {section > 0 ? (
                  <>
                    {section == 1 ? (
                      <>
                        <aside>
                          <h1 className="font-medium text-xl md:text-3xl mb-12 flex flex-wrap items-center justify-between md:flex-row-reverse">
                            <button
                              type="button"
                              className="my-2 border border-[#6D27F9] text-[#6D27F9] text-sm font-medium rounded-full py-1.5 px-4 transition-all hover:bg-gray-900 hover:border-gray-900 hover:text-white"
                              onClick={resetFun}
                            >
                              Go Back
                            </button>
                            <span>Sign Up as organisation</span>
                          </h1>
                          <form>
                            <div className="flex flex-wrap justify-between">
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="companyname"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Company Name
                                </label>
                                <input
                                  id="companyname"
                                  type="text"
                                  className="w-full rounded-full border-slate-300"
                                  value={cname}
                                  onChange={(e) => setCName(e.target.value)}
                                />
                              </div>
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="fullname"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Your Name
                                </label>
                                <input
                                  id="fullname"
                                  type="text"
                                  className="w-full rounded-full border-slate-300"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="email"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Email
                                </label>
                                <input
                                  id="email"
                                  type="email"
                                  className="w-full rounded-full border-slate-300"
                                  value={cemail}
                                  onChange={(e) => setCEmail(e.target.value)}
                                />
                              </div>
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="accounttype"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Account Type
                                </label>
                                {/* <select id="accounttype" className="w-full rounded-full border-slate-300" value={ctype} onChange={(e) => setCType(e.target.value)}>
                                <option value="Agency">Agency</option>
                                <option value="Corporate">Corporate</option>
                              </select> */}
                                <Multiselect
                                  options={["Agency", "Corporate"]}
                                  isObject={false}
                                  customCloseIcon={
                                    <>
                                      <i className="fa-solid fa-xmark"></i>
                                    </>
                                  }
                                  showArrow={true}
                                  closeOnSelect={true}
                                  selectionLimit={1}
                                  selectedValues={ctype && ctype.split(",")}
                                  onSelect={(selectedList, selectedItem) => {
                                    setCType(selectedItem);
                                  }}
                                  onRemove={(selectedList, selectedItem) => {
                                    setCType("");
                                  }}
                                  placeholder="Find Account Type"
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="password"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Password
                                </label>
                                <div className="iconGroup right">
                                  <input
                                    type={`${
                                      orgInputPass ? "text" : "password"
                                    }`}
                                    name="password"
                                    id="input-password-for-credentials-provider"
                                    className="w-full rounded-full border-slate-300"
                                    value={cpassword}
                                    onChange={(e) =>
                                      setCPassword(e.target.value)
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="iconGroup__icon-right"
                                    onClick={orgInputPassToggled}
                                  >
                                    <i
                                      className={`fa-solid text-black ${
                                        orgInputPass ? "fa-eye-slash" : "fa-eye"
                                      }`}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="confirmpassword"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Confirm Password
                                </label>
                                <div className="iconGroup right">
                                  <input
                                    type={`${
                                      orgInputConfPass ? "text" : "password"
                                    }`}
                                    name="password"
                                    id="input-password-for-credentials-provider"
                                    className="w-full rounded-full border-slate-300"
                                    value={cpassword2}
                                    onChange={(e) =>
                                      setCPassword2(e.target.value)
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="iconGroup__icon-right"
                                    onClick={orgInputConfPassToggled}
                                  >
                                    <i
                                      className={`fa-solid text-black ${
                                        orgInputConfPass
                                          ? "fa-eye-slash"
                                          : "fa-eye"
                                      }`}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                              <button
                                type="submit"
                                className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                                disabled={!validateOForm()}
                                onClick={(e) => handleOrgClick(e)}
                              >
                                Submit
                              </button>
                              <span>
                                Already have an account?{" "}
                                <Link
                                  href="/marketplace/auth/signin"
                                  className="my-3 inline-block text-[#6D27F9] hover:underline"
                                >
                                  Sign In
                                </Link>
                              </span>
                            </div>
                          </form>
                        </aside>
                      </>
                    ) : (
                      <></>
                    )}
                    {section == 2 ? (
                      <>
                        <aside>
                          <h1 className="font-medium text-xl md:text-3xl mb-12 flex flex-wrap items-center justify-between md:flex-row-reverse">
                            <button
                              type="button"
                              className="my-2 border border-[#6D27F9] text-[#6D27F9] text-sm font-medium rounded-full py-1.5 px-4 transition-all hover:bg-gray-900 hover:border-gray-900 hover:text-white"
                              onClick={resetFun}
                            >
                              Go Back
                            </button>
                            <span>Sign Up as candidate</span>
                          </h1>
                          <form className="mb-16">
                            <div className="flex flex-wrap justify-between">
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="fname"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  First Name
                                </label>
                                <input
                                  id="fname"
                                  type="text"
                                  className="w-full rounded-full border-slate-300"
                                  value={firstname}
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                              </div>
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="lname"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Last Name
                                </label>
                                <input
                                  id="lname"
                                  type="text"
                                  className="w-full rounded-full border-slate-300"
                                  value={lastname}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="cand_email"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Email
                                </label>
                                <input
                                  id="cand_email"
                                  type="email"
                                  className="w-full rounded-full border-slate-300"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="phone"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Phone
                                </label>
                                <input
                                  id="phone"
                                  type="number"
                                  className="w-full rounded-full border-slate-300"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="cand_password"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Password
                                </label>
                                <div className="iconGroup right">
                                  <input
                                    type={`${
                                      canInputPass ? "text" : "password"
                                    }`}
                                    name="password"
                                    id="input-password-for-credentials-provider"
                                    className="w-full rounded-full border-slate-300"
                                    value={password}
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="iconGroup__icon-right"
                                    onClick={canInputPassToggled}
                                  >
                                    <i
                                      className={`fa-solid text-black ${
                                        canInputPass ? "fa-eye-slash" : "fa-eye"
                                      }`}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                              <div className="w-full lg:w-[47%] mb-6">
                                <label
                                  htmlFor="cand_confirmpassword"
                                  className="font-medium mb-2 leading-none inline-block"
                                >
                                  Confirm Password
                                </label>
                                <div className="iconGroup right">
                                  <input
                                    type={`${
                                      canInputConfPass ? "text" : "password"
                                    }`}
                                    name="password"
                                    id="input-password-for-credentials-provider"
                                    className="w-full rounded-full border-slate-300"
                                    value={password2}
                                    onChange={(e) =>
                                      setPassword2(e.target.value)
                                    }
                                  />
                                  <button
                                    type="button"
                                    className="iconGroup__icon-right"
                                    onClick={canInputConfPassToggled}
                                  >
                                    <i
                                      className={`fa-solid text-black ${
                                        canInputConfPass
                                          ? "fa-eye-slash"
                                          : "fa-eye"
                                      }`}
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            {ref.length > 0 && (
                              <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                  <label
                                    htmlFor="cand_code"
                                    className="font-medium mb-2 leading-none inline-block"
                                  >
                                    Referral code
                                  </label>
                                  <input
                                    id="cand_code"
                                    type="text"
                                    className="w-full rounded-full border-slate-300"
                                    value={ref}
                                    readOnly
                                  />
                                </div>
                              </div>
                            )}
                            <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                              <button
                                type="submit"
                                className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                                disabled={!validateCForm()}
                                onClick={(e) => handleCandClick(e)}
                              >
                                Submit
                              </button>
                              <span>
                                Already have an account?{" "}
                                <Link
                                  href="/marketplace/auth/signin"
                                  className="my-3 inline-block text-[#6D27F9] hover:underline"
                                >
                                  Sign In
                                </Link>
                              </span>
                            </div>
                          </form>
                          <div className="relative mb-8">
                            <hr className="border-slate-600" />
                            <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">
                              Or Sign Up With
                            </span>
                          </div>
                          <div className="flex items-center justify-center">
                            <form
                              action={`${
                                process.env.NODE_ENV === "production"
                                  ? "https://somhako.com/"
                                  : "http://localhost:3000/"
                              }api/auth/signin/google`}
                              method="POST"
                            >
                              <div className="border rounded border-slate-300 cursor-pointer mx-2 flex item-center justify-center">
                                <input
                                  type="hidden"
                                  name="csrfToken"
                                  value={csrf}
                                />
                                <input
                                  type="hidden"
                                  name="callbackUrl"
                                  value={`${
                                    process.env.NODE_ENV === "production"
                                      ? process.env.NEXT_PUBLIC_PROD_FRONTEND
                                      : process.env.NEXT_PUBLIC_DEV_FRONTEND
                                  }`}
                                />
                                <button type="submit" className="p-3">
                                  <Image
                                    src={Google_Icon}
                                    width={15}
                                    alt="Google"
                                  />
                                </button>
                              </div>
                            </form>

                            <form
                              action={`${
                                process.env.NODE_ENV === "production"
                                  ? "https://somhako.com/"
                                  : "http://localhost:3000/"
                              }api/auth/signin/github`}
                              method="POST"
                            >
                              <div className="border rounded border-slate-300 cursor-pointer mx-2 flex item-center justify-center">
                                <input
                                  type="hidden"
                                  name="csrfToken"
                                  value={csrf}
                                />
                                <input
                                  type="hidden"
                                  name="callbackUrl"
                                  value={`${
                                    process.env.NODE_ENV === "production"
                                      ? process.env.NEXT_PUBLIC_PROD_FRONTEND
                                      : process.env.NEXT_PUBLIC_DEV_FRONTEND
                                  }`}
                                />
                                <button type="submit" className="p-3">
                                  <Image
                                    src={Github_Icon}
                                    width={15}
                                    alt="GitHub"
                                  />
                                </button>
                              </div>
                            </form>
                          </div>
                        </aside>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <>
                    <aside>
                      <h2 className="font-medium text-xl md:text-3xl mb-12 text-center">
                        How do you want to Sign Up with us?
                      </h2>
                      <div className="mb-16">
                        <div className="flex flex-wrap items-center justify-between w-full max-w-[500px] mx-auto mb-8">
                          <label
                            htmlFor="organisation"
                            className="rounded w-full sm:max-w-[47%] mb-4 sm:mb-0 bg-gradient-to-r from-[#A382E5] to-[#60C3E2] relative p-4 flex flex-col items-center text-center cursor-pointer"
                          >
                            <Image
                              src={graphic_1}
                              alt="Organisation"
                              width={80}
                              className="mb-3"
                            />
                            <span className="mb-3 text-white">
                              Sign Up as organisation
                            </span>
                            <input
                              id="organisation"
                              type="radio"
                              name="singupAs"
                              value={1}
                              onChange={(e) => setChoice(1)}
                            />
                          </label>
                          <label
                            htmlFor="candidate"
                            className="rounded w-full sm:max-w-[47%] bg-gradient-to-r from-[#A382E5] to-[#60C3E2] relative p-4 flex flex-col items-center text-center cursor-pointer"
                          >
                            <Image
                              src={graphic_2}
                              alt="Candidate"
                              width={80}
                              className="mb-3"
                            />
                            <span className="mb-3 text-white">
                              Sign Up as candidate
                            </span>
                            <input
                              id="candidate"
                              type="radio"
                              name="singupAs"
                              value={2}
                              onChange={(e) => setChoice(2)}
                            />
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[230px] transition-all hover:from-[#391188] hover:to-[#391188]"
                            disabled={!validateChoice()}
                            onClick={creatAccBtn}
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                      <div className="relative mb-8">
                        <hr className="border-slate-600" />
                        <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">
                          Already have an Account
                        </span>
                      </div>
                      <div className="text-center">
                        <Link
                          href="/marketplace/auth/signin"
                          className="text-[#6D27F9] hover:underline"
                        >
                          Sign In
                        </Link>
                      </div>
                    </aside>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
