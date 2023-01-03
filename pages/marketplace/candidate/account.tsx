//@ts-nocheck
import React from "react"
import { Fragment, useEffect, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import shallow from "zustand/shallow"
import toastcomp from "../../../components/toast"
import { useStore } from "../../../constants/code"
import { axiosInstance, axiosInstanceAuth } from "../../api/axiosApi"
import Multiselect from "multiselect-react-dropdown"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function CandidateAcc(props) {
  const [deletePopup, deletePopupOpen] = useState(false)
  const [changePassword, changePasswordOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [loader, setloader] = useState(false)
  const [loader1, setloader1] = useState(false)

  const [userName, updateUserName] = useStore(
    state => [state.userName, state.updateUserName],
    shallow
  )

  const [userImg, updateUserImg] = useStore(
    state => [state.userImg, state.updateUserImg],
    shallow
  )

  const [userType, updateUserType] = useStore(
    state => [state.userType, state.updateUserType],
    shallow
  )

  const [userObj, updateUserObj] = useStore(
    state => [state.userObj, state.updateUserObj],
    shallow
  )

  const [userProfile, updateUserProfile] = useStore(
    state => [state.userProfile, state.updateUserProfile],
    shallow
  )

  const [accessToken, updateAccessToken] = useStore(
    state => [state.accessToken, state.updateAccessToken],
    shallow
  )

  const [country, updateCountry] = useStore(
    state => [state.country, state.updateCountry],
    shallow
  )

  const [fcountry, setfcountry] = useState([])

  const { router, session } = props

  useEffect(() => {
    if (!session) {
      router.push("/")
    } else {
      setEmail(userObj["email"])
      setFName(userName.split(" ")[0])
      setLName(userName.split(" ")[1])
      if (userObj["mobile"]) {
        setMobile(userObj["mobile"])
      }
    }
  }, [session])

  const [email, setEmail] = useState("")
  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [mobile, setMobile] = useState("")
  const [countryDrop, setCountryDrop] = useState("")
  const [file, setFile] = useState()
  const [pfile, setPFile] = useState()
  //chnage pass
  const [pass, setpass] = useState("")
  const [pass2, setpass2] = useState("")

  const axiosInstanceAuth2 = axiosInstanceAuth(accessToken)

  function valudateCP() {
    return pass.length >= 8 && pass2.length >= 8 && pass == pass2 && !loader1
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0
  }

  function validateForm() {
    return fname.length > 0 && lname.length > 0 && !loader
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axiosInstance.get("/job/load/country/")
      updateCountry(res.data)
    }
    if (isEmpty(country)) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    if (userProfile["country"]) {
      setCountryDrop(userProfile["country"])
    }
  }, [userProfile])

  async function saveChange(event) {
    setloader(true)
    event.preventDefault()
    if (fname.length <= 0 || lname.length <= 0) {
      toastcomp("Enter Name", "Error")
      return
    }

    var formData2 = new FormData()
    mobile ? formData2.append("mobile", mobile) : formData2.append("mobile", "")
    formData2.append("first_name", fname)
    formData2.append("last_name", lname)
    await axiosInstanceAuth2
      .put("/auth/candidateaccont/" + userObj["erefid"] + "/", formData2)
      .then(async res => {
        userObj["mobile"] = res.data.mobile
        userObj["first_name"] = res.data.first_name
        userObj["last_name"] = res.data.last_name
        updateUserName(fname + " " + lname)
        var formData = new FormData()
        if (file) {
          formData.append("profile", file)
        }
        countryDrop
          ? formData.append("country", countryDrop)
          : formData.append("country", "")

        if (Array.from(formData.keys()).length > 0) {
          await axiosInstanceAuth2
            .put(
              "/candidate/candidateprofileaccont/" + userObj["erefid"] + "/",
              formData
            )
            .then(async res2 => {
              updateUserImg(
                (process.env.NODE_ENV === "production"
                  ? process.env.NEXT_PUBLIC_PROD_BACKEND
                  : process.env.NEXT_PUBLIC_DEV_BACKEND) + res2.data.profile
              )
              userProfile["country"] = res2.data.country
              userProfile["profile"] = res2.data.profile
              toastcomp("Account Updated :)", "success")
              setloader(false)
            })
            .catch(err => {
              console.log(err)
              toastcomp("Account Not Updated :)", "error")
            })
        } else {
          toastcomp("Account Updated :)", "success")
          setloader(false)
        }
      })
      .catch(err => {
        toastcomp("Account Not Updated :)", "error")
      })
  }

  async function delacc() {
    setloader1(true)

    await axiosInstanceAuth2
      .get("/auth/deleteCandidateAccount/" + userObj["erefid"] + "/")
      .then(res => {
        toastcomp("Account Deleted :)", "success")
        updateUserType("")
        updateUserName("")
        updateUserImg("")
        updateUserObj({})
        updateUserProfile({})
        updateAccessToken("")
        signOut()
        setloader1(false)
      })
      .catch(err => {
        toastcomp("Account Not Deleted :)", "error")
      })
  }
  async function changePass() {
    setloader1(true)
    await axiosInstanceAuth2
      .post("/auth/changepassword/", {
        password: pass,
        password2: pass2,
      })
      .then(async res => {
        changePasswordOpen(false)
        toastcomp("Password Successfully Changed", "successs")
        setloader1(false)
      })
      .catch(err => {
        changePasswordOpen(false)
        toastcomp("Password Not Successfully Changed", "error")
      })
    setpass("")
    setpass2("")
  }

  useEffect(() => {
    if (fcountry.length <= 0 && country) {
      let arr = []
      for (const [key, value] of Object.entries(country)) {
        // let a = {}
        // a["name"] = country[key];
        // arr.push(a)
        arr.push(country[key])
      }
      setfcountry(arr)
    }
  }, [country])

  return (
    <>
      {userType == "Candidate" ? (
        <>
          <main className="py-12">
            <div className="mx-auto max-w-[900px] w-full px-4">
              <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-24 min-h-[550px] flex flex-col justify-center">
                <div className="flex items-center flex-wrap mb-12">
                  <button
                    type="button"
                    className="rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h1 className="font-medium text-xl md:text-3xl">
                    Account Settings
                  </h1>
                </div>
                <form className="mb-16">
                  <div className="mb-6">
                    <div className="relative inline-block">
                      {userImg ? (
                        <>
                          <Image
                            src={pfile ? pfile : userImg}
                            // src={userImg}
                            alt="Users"
                            height={300}
                            width={300}
                            className="rounded-full object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"
                          />
                        </>
                      ) : (
                        <>
                          <Skeleton
                            width={125}
                            height={125}
                            style={{ borderRadius: "100%", margin: "0 0 10px" }}
                          />
                        </>
                      )}
                      <label
                        htmlFor="uploadImage"
                        className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white"
                      >
                        <i className="fa-solid fa-plus text-xl"></i>
                        <input
                          type="file"
                          id="uploadImage"
                          className="absolute left-0 top-0 z-20"
                          hidden
                          accept="image/png, image/jpeg"
                          onChange={e => {
                            setPFile(URL.createObjectURL(e.target.files[0]))
                            setFile(e.target.files[0])
                          }}
                        />
                      </label>
                    </div>
                  </div>
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
                        value={fname}
                        onChange={e => setFName(e.target.value)}
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
                        value={lname}
                        onChange={e => setLName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="font-medium mb-2 leading-none inline-block"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="disabled:opacity-90 disabled:cursor-normal w-full rounded-full border-slate-300"
                      value={email}
                      disabled
                    />
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <div className="w-full lg:w-[47%] mb-6">
                      <label
                        htmlFor="phone"
                        className="font-medium mb-2 leading-none inline-block"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="number"
                        className="w-full rounded-full border-slate-300"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                      />
                    </div>
                    <div className="w-full lg:w-[47%] mb-6">
                      <label
                        htmlFor="country"
                        className="font-medium mb-2 leading-none inline-block"
                      >
                        Country
                      </label>
                      <Multiselect
                        options={fcountry}
                        isObject={false}
                        customCloseIcon={
                          <>
                            <i className="fa-solid fa-xmark"></i>
                          </>
                        }
                        showArrow={true}
                        closeOnSelect={true}
                        selectionLimit={1}
                        selectedValues={countryDrop && countryDrop.split(",")}
                        onSelect={(selectedList, selectedItem) => {
                          setCountryDrop(selectedItem)
                        }}
                        onRemove={(selectedList, selectedItem) => {
                          setCountryDrop(null)
                        }}
                        placeholder="Find Country"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                    <button
                      type="submit"
                      className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                      onClick={e => {
                        saveChange(e)
                      }}
                      disabled={!validateForm()}
                    >
                      {loader && (
                        <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
                <div className="relative mb-8">
                  <hr className="border-slate-600" />
                  <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">
                    Update your account
                  </span>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => deletePopupOpen(true)}
                    className="bg-red-700 text-white font-bold rounded-full py-2.5 px-6 min-w-[200px] transition-all hover:bg-red-900 ml-3 mr-3"
                  >
                    Delete Account
                  </button>
                  <button
                    type="button"
                    onClick={() => changePasswordOpen(true)}
                    className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188] ml-3 mr-3"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </main>
          <Transition.Root show={deletePopup} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={deletePopupOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md">
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                          <h4 className="leading-none font-semibold text-xl">
                            Delete Account
                          </h4>
                          <button
                            type="button"
                            className="leading-none"
                            onClick={() => deletePopupOpen(false)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        <div className="text-center">
                          <h3 className="font-semidbold text-lg mb-6">
                            Are you sure want to delete your account?
                          </h3>
                          <div className="flex flex-wrap items-center justify-center">
                            <button
                              type="submit"
                              onClick={() => deletePopupOpen(false)}
                              className="border border-[#6D27F9] font-bold rounded-full py-2.5 px-6 my-2 mx-3 md:min-w-[90px] text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                            >
                              No
                            </button>
                            <button
                              type="submit"
                              onClick={delacc}
                              className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 my-2 mx-3 md:min-w-[90px] transition-all hover:from-[#391188] hover:to-[#391188]"
                            >
                              {loader1 && (
                                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                              )}
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <Transition.Root show={changePassword} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={changePasswordOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md">
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-8">
                          <h4 className="leading-none font-semibold text-xl">
                            Change Password
                          </h4>
                          <button
                            type="button"
                            className="leading-none"
                            onClick={() => changePasswordOpen(false)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        {/* <div className="mb-6">
                          <label
                            htmlFor="orgOldPass"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Old Password
                          </label>
                          <input
                            type="password"
                            id="orgOldPass"
                            className="w-full rounded-full border-slate-300"
                          />
                        </div> */}
                        <div className="mb-6">
                          <label
                            htmlFor="orgNewPass"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="orgNewPass"
                            className="w-full rounded-full border-slate-300"
                            value={pass}
                            onChange={e => setpass(e.target.value)}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="orgConfirmPass"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="orgConfirmPass"
                            className="w-full rounded-full border-slate-300"
                            value={pass2}
                            onChange={e => setpass2(e.target.value)}
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                            disabled={!valudateCP()}
                            onClick={e => changePass()}
                          >
                            {loader1 && (
                              <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                            )}
                            Submit
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      ) : (
        <></>
      )}
    </>
  )
}
