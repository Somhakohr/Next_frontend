//@ts-nocheck
import Image from "next/image"
import { Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import JobCard from "../../../components/job-card"
import Slider from "react-slick"
import { useRouter } from "next/router"
import { axiosInstance, axiosInstanceAuth } from "../../api/axiosApi"
import { useStore } from "../../../constants/code"
import { useEffect, useState } from "react"
import shallow from "zustand/shallow"
import moment from "moment"
import toastcomp from "../../../components/toast"
import { FacebookShareButton, LinkedinShareButton } from "react-share"
import TwitterShareButton from "react-share/lib/TwitterShareButton"
import TelegramShareButton from "react-share/lib/TelegramShareButton"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function JobDetail(props) {
  const [mainShareJob, mainShareJobOpen] = useState(false)
  const [jobDetail, setJobDetail] = useState([])
  const [pskill, setPSkill] = useState([])
  const [rskill, setRSkill] = useState([])
  const [finfo, setFInfo] = useState([])
  const [Similar, setSimilar] = useState([])
  const [refid, setRefid] = useState("")
  const [applied, setapplied] = useState(false)
  const [bookmarked, setbookmarked] = useState(false)
  const [loader1, setloader1] = useState(false)
  const [loader2, setloader2] = useState(false)
  const [ske, setske] = useState(false)
  const cancelButtonRef = useRef(null)
  const { asPath } = useRouter()
  const [param1, updateParam1] = useStore(
    state => [state.param1, state.updateParam1],
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
  const [accessToken, updateAccessToken] = useStore(
    state => [state.accessToken, state.updateAccessToken],
    shallow
  )
  const { session, router } = props
  //axios auth var
  const axiosInstanceAuth2 = axiosInstanceAuth(accessToken)

  function dbook() {
    return bookmarked || loader2
  }

  function dapy() {
    return applied || loader1
  }

  async function loadJobDetail(id) {
    setske(true)
    if (accessToken.length > 0) {
      console.log(userType)
      await axiosInstanceAuth2
        .get("/job/job/detail/" + id + "/")
        .then(async res => {
          setJobDetail(res.data)
        })
        .catch(async err => {
          await axiosInstance
            .get("/job/job/detail/" + id + "/")
            .then(async res => {
              setJobDetail(res.data)
            })
            .catch(err => {})
          // console.log(err)
          // if(err.message != "Request failed with status code 401"){
          //     toastcomp("Job Detail Not Loaded","error");
          // }
        })
    } else {
      console.log(0)
      await axiosInstance
        .get("/job/job/detail/" + id + "/")
        .then(async res => {
          setJobDetail(res.data)
        })
        .catch(err => {
          // router.push('/marketplace/jobs')
          // console.log(err)
          // if(err.message != "Request failed with status code 401"){
          //     toastcomp("Job Detail Not Loaded","error");
          // }
        })
    }
  }

  async function similar(id) {
    setske(true)
    await axiosInstance
      .get("/job/similar/" + id + "/")
      .then(async res => {
        setSimilar(res.data)
      })
      .catch(err => {
        router.push("/marketplace/jobs")
        // console.log(err)
        // if(err.message != "Request failed with status code 401"){
        //     toastcomp("Job Detail S Not Loaded","error");
        // }
      })
    setske(false)
  }

  useEffect(() => {
    if (!param1) {
      if (window.location.href.split("/").length > 0) {
        updateParam1(window.location.href.toString().split("/").pop())
      } else {
        router.push("/marketplace/jobs")
      }
    } else if (!param1.includes("OR")) {
      loadJobDetail(param1)
      similar(param1)
    }
  }, [param1])

  useEffect(() => {
    if (refid) {
      appliedCheck()
      bookmarkedCheck()
    }
  }, [refid])

  function companyDetail(orefid) {
    updateParam1(orefid)
    router.push("/marketplace/company-detail/" + orefid)
  }

  useEffect(() => {
    if (jobDetail.length > 0) {
      for (let i = 0; i < jobDetail.length; i++) {
        setFInfo([
          {
            icon: <i className="fa-solid fa-recycle"></i>,
            title: "Experience",
            desc: jobDetail[i]["exp"] ? jobDetail[i]["exp"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: "Job Type",
            desc: jobDetail[i]["type"] ? jobDetail[i]["type"] : "N/A",
          },
          // {
          //     icon: <i className="fa-solid fa-recycle"></i>,
          //     title: 'Experience Level',
          //     desc: (jobDetail[i]["level"])?jobDetail[i]["level"]:'N/A'
          // },
          {
            icon: <i className="fa-solid fa-location-dot"></i>,
            title: "Location",
            desc: jobDetail[i]["location"] ? jobDetail[i]["location"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-building"></i>,
            title: "Work Type",
            desc: jobDetail[i]["worktype"] ? jobDetail[i]["worktype"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-graduation-cap"></i>,
            title: "Qualification",
            desc: jobDetail[i]["qualification"]
              ? jobDetail[i]["qualification"]
              : "N/A",
          },
          {
            icon: <i className="fa-solid fa-dollar-sign"></i>,
            title: "Offered Salary",
            desc: jobDetail[i]["salary"] ? jobDetail[i]["salary"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-industry"></i>,
            title: "Industry",
            desc: jobDetail[i]["industry"] ? jobDetail[i]["industry"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-building-user"></i>,
            title: "Department",
            desc: jobDetail[i]["dept"] ? jobDetail[i]["dept"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-clipboard"></i>,
            title: "Application Deadline",
            desc: jobDetail[i]["deadline"]
              ? moment(jobDetail[i]["deadline"]).format("YYYY-MM-DD")
              : "N/A",
          },
          // if(jobDetail[i]["lang1"])
          // {
          //     icon: <i className="fa-solid fa-briefcase"></i>,
          //     title: 'Language',
          //     desc: jobDetail[i]["lang1"]+' '+jobDetail[i]["exp1"]+jobDetail[i]["lang1"]+' '+jobDetail[i]["exp3"]+jobDetail[i]["lang3"]+' '+jobDetail[i]["exp3"] +jobDetail[i]["lang4"]+' '+jobDetail[i]["exp4"]
          // },
          {
            icon: <i className="fa-solid fa-users-rays"></i>,
            title: "Vacancy",
            desc: jobDetail[i]["vacancy"] ? jobDetail[i]["vacancy"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-dollar-sign"></i>,
            title: "Bonus",
            desc: jobDetail[i]["bonus"] ? jobDetail[i]["bonus"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-money-bill-trend-up"></i>,
            title: "Stock Options",
            desc: jobDetail[i]["stock"] ? jobDetail[i]["stock"] : "N/A",
          },
          {
            icon: <i className="fa-brands fa-cc-visa"></i>,
            title: "Visa Sponsership",
            desc: jobDetail[i]["visa"] ? jobDetail[i]["visa"] : "N/A",
          },
          {
            icon: <i className="fa-solid fa-map-location-dot"></i>,
            title: "Paid Relocation",
            desc: jobDetail[i]["relocation"]
              ? jobDetail[i]["relocation"]
              : "N/A",
          },
        ])

        let arr = [],
          rarr = []
        if (jobDetail[i]["preskill"]) {
          let preskill = jobDetail[i]["preskill"].split(",")
          for (let j = 0; j < preskill.length; j++) {
            arr.push({
              title: preskill[j],
            })
          }
          setPSkill(arr)
        }
        if (jobDetail[i]["recsskill"]) {
          let recskill = jobDetail[i]["recskill"].split(",")
          for (let j = 0; j < recskill.length; j++) {
            rarr.push({
              title: recskill[j],
            })
          }
          setRSkill(rarr)
        }

        setRefid(jobDetail[i]["refid"])
      }
    }
  }, [jobDetail])

  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    rows: 2,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2.2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
  }

  async function apply() {
    setloader1(true)
    if (!session || userType != "Candidate") {
      toastcomp("Register Yourself As Candidate", "error")
      setloader1(false)
    } else {
      await axiosInstanceAuth2
        .get("/candidate/progress/" + userObj["erefid"] + "/")
        .then(async res => {
          if (parseInt(res.data.count) >= 60) {
            await axiosInstanceAuth2
              .post(
                "/job/applicant/apply/" + userObj["erefid"] + "/" + refid + "/"
              )
              .then(async res => {
                toastcomp(res.data.Message, "success")
              })
              .catch(err => {
                console.log(err)
                if (err.message != "Request failed with status code 401") {
                  toastcomp("Job Applied Error", "error")
                }
              })
          } else {
            toastcomp(
              "Profile Completation Progress Must Be 60% For Applying The Job",
              "error"
            )
          }
        })
        .catch(err => {
          if (err.message != "Request failed with status code 401") {
            // toastcomp("Lang Not Loaded",'error')
            console.log(err)
          }
        })

      bookmarkedCheck()
      appliedCheck()
    }
  }

  async function bookmark() {
    setloader2(true)
    if (!session || userType != "Candidate") {
      toastcomp("Register Yourself As Candidate", "error")
      setloader2(false)
    } else {
      await axiosInstanceAuth2
        .post(
          "/job/applicant/bookmark/" + userObj["erefid"] + "/" + refid + "/"
        )
        .then(async res => {
          toastcomp(res.data.Message, "success")
        })
        .catch(err => {
          console.log(err)
          if (err.message != "Request failed with status code 401") {
            toastcomp("Job Bookmarked Error", "error")
          }
        })
      bookmarkedCheck()
      appliedCheck()
    }
  }

  async function bookmarkedCheck() {
    if (!session || userType != "Candidate") {
      setbookmarked(false)
    } else {
      await axiosInstanceAuth2
        .post(
          "/job/applicant/bookmarked/" + userObj["erefid"] + "/" + refid + "/"
        )
        .then(async res => {
          console.log(res)
          if (res.data.Message) {
            setbookmarked(true)
          } else {
            setbookmarked(false)
          }
        })
        .catch(err => {
          setbookmarked(true)
        })
      setloader2(false)
    }
  }

  async function appliedCheck() {
    if (!session || userType != "Candidate") {
      setapplied(false)
    } else {
      await axiosInstanceAuth2
        .post("/job/applicant/applied/" + userObj["erefid"] + "/" + refid + "/")
        .then(async res => {
          console.log(res)
          if (res.data.Message) {
            setapplied(true)
          } else {
            setapplied(false)
          }
        })
        .catch(err => {
          setapplied(true)
        })
      setloader1(false)
    }
  }

  return (
    <>
      {jobDetail.length > 0 && !ske ? (
        <>
          {jobDetail.map((data, i) => (
            <>
              <main className="py-8" key={i}>
                <section className="container">
                  <div className="flex flex-wrap mb-8">
                    <div className="w-full lg:max-w-[30%] 2xl:max-w-[20%] mb-6 lg:mb-0 relative bg-white shadow-lg rounded-[25px] py-6 px-8 text-center min-h-[350px] flex flex-col justify-between items-center">
                      <aside>
                        <div className="w-[150px] h-[150px] mx-auto block mb-4 rounded-full p-4 shadow-insetview flex items-center justify-center">
                          <div className="w-full h-full rounded-full bg-white shadow-lg p-5">
                            <Image
                              src={data.org.profile}
                              width={150}
                              height={150}
                              alt="Company Name"
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <h2 className="font-semibold text-2xl">
                          {data.user.company_name}
                        </h2>
                      </aside>
                      <button
                        onClick={e => companyDetail(data.user.orefid)}
                        type="button"
                        className="w-full font-semibold bg-white shadow-normal rounded-lg py-2 px-4 hover:bg-[#6D27F9] hover:text-white"
                      >
                        Comapny Details
                      </button>
                    </div>
                    <div className="w-full lg:max-w-[70%] 2xl:max-w-[80%] bg-white shadow-lg rounded-[25px] py-6 px-6 md:px-10">
                      <div className="flex flex-wrap md:items-center justify-between flex-col-reverse md:flex-row mb-4">
                        <aside>
                          <h3 className="font-bold text-xl mb-2">
                            {data.title}
                          </h3>
                          <p className="text-[#7e7e7e]">
                            <span>{moment(data.publish_date).fromNow()}</span>
                            <span className="mx-3">|</span>
                            <span>Job ID:{data.refid}</span>
                          </p>
                        </aside>
                        <aside className="flex items-center flex-wrap mb-4 md:mb-0">
                          <button
                            type="button"
                            className="cursor-pointer flex items-center mr-8"
                            onClick={() => mainShareJobOpen(true)}
                          >
                            <span className="mr-2">Share Job</span>
                            <i className="fa-solid fa-share text-[#6D27F9]"></i>
                          </button>
                          <button
                            type="button"
                            className="disabled:opacity-30 disabled:cursor-normal cursor-pointer bg-white py-1.5 px-4 text-sm rounded-full border border-[#6D27F9] hover:bg-[#6D27F9] hover:text-white"
                            onClick={e => bookmark()}
                            disabled={dbook()}
                          >
                            {loader2 && (
                              <i className="fa-solid fa-circle-notch fa-spin mr-2 text-sm"></i>
                            )}
                            {bookmarked ? <>Already Saved</> : <>Save Job</>}
                          </button>
                        </aside>
                      </div>
                      <button
                        type="button"
                        className="disabled:opacity-30 disabled:cursor-normal mb-8 bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                        onClick={e => apply()}
                        disabled={dapy()}
                      >
                        {loader1 && (
                          <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                        )}
                        {applied ? <>Already Applied</> : <>Apply Now</>}
                      </button>
                      <div>
                        <Slider {...settings} className="sliderArrows">
                          {finfo.map((featuredInfo, i) => (
                            <div className="p-2" key={i}>
                              <div className="shadow-normal rounded-[25px]">
                                <div className="flex items-center">
                                  <div className="w-[70px] py-3 mr-4 bg-white shadow flex items-center justify-center rounded-tl-[25px] rounded-br-[10px] text-[20px] text-[#A382E5]">
                                    {featuredInfo.icon}
                                  </div>
                                  <p className="grow font-bold text-sm lg:text-md">
                                    {featuredInfo.title}
                                  </p>
                                </div>
                                <div className="py-6 px-8">
                                  <p className="text-[#7e7e7e] text-sm lg:text-md font-light">
                                    {featuredInfo.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-[1100px] mx-auto jobDetailDesc">
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                      <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                        <h2 className="text-white">Job Overview</h2>
                      </div>
                      <div className="py-4 px-6 md:px-10">
                        {{__html: data.desc} ? 
                        <>
                        <article className="text-[#7e7e7e] font-light">
                          <p
                            dangerouslySetInnerHTML={{ __html: data.desc }}
                          ></p>
                        </article>
                        </> : 
                        <>
                        <p className="text-sm text-gray-500">No data found</p>
                        </>
                        }
                      </div>
                    </div>
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                      <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                        <h2 className="text-white">What is the Job</h2>
                      </div>
                      <div className="py-4 px-6 md:px-10">
                        {{__html: data.resp} ? 
                        <>
                        <article className="text-[#7e7e7e] font-light">
                          <p
                            dangerouslySetInnerHTML={{ __html: data.resp }}
                          ></p>
                        </article>
                        </> : 
                        <>
                        <p className="text-sm text-gray-500">No data found</p>
                        </>
                        }
                      </div>
                    </div>
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                      <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                        <h2 className="text-white">Preferred Skills</h2>
                      </div>
                      <div className="py-4 px-6 md:px-10">
                        {pskill.length > 1 ? 
                        <>
                        <div className="flex flex-wrap items-start">
                          {pskill.map((skill, i) => (
                            <p
                              className="bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3"
                              key={i}
                            >
                              {skill.title}
                            </p>
                          ))}
                        </div>
                        </> : 
                        <>
                        <p className="text-sm text-gray-500">No Preferred Skills</p>
                        </>
                        }
                      </div>
                    </div>
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                      <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                        <h2 className="text-white">Recommended Skills</h2>
                      </div>
                      <div className="py-4 px-6 md:px-10">
                        {rskill.length > 1 ? 
                        <>
                        <div className="flex flex-wrap items-start">
                          {rskill.map((skill, i) => (
                            <p
                              className="bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3"
                              key={i}
                            >
                              {skill.title}
                            </p>
                          ))}
                        </div>
                        </> : 
                        <>
                        <p className="text-sm text-gray-500">No Recommended Skills</p>
                        </>
                        }
                      </div>
                    </div>
                    {Similar.length > 0 && (
                      <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                          <h2 className="text-white">Similar to this Job</h2>
                        </div>
                        <div className="py-4 px-6 md:px-10">
                          <div className="flex flex-wrap mx-[-10px]">
                            {Similar.map((job, i) => (
                              <div
                                className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4"
                                key={i}
                              >
                                <JobCard data={job} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </main>

              <Transition.Root show={mainShareJob} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  initialFocus={cancelButtonRef}
                  onClose={mainShareJobOpen}
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
                                Share Job Via
                              </h4>
                              <button
                                type="button"
                                className="leading-none"
                                onClick={() => mainShareJobOpen(false)}
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </div>
                            <div className="shadow-md rounded-[20px] p-6">
                              <ul className="flex items-center flex-wrap justify-center text-center text-[#6D27F9] text-xl">
                                <li className="w-[33.33%] px-[10px] mb-2">
                                  <LinkedinShareButton
                                    url={window.location.href}
                                  >
                                    <i className="fa-brands fa-linkedin-in hover:text-black"></i>
                                  </LinkedinShareButton>
                                </li>
                                <li className="w-[33.33%] px-[10px] mb-2">
                                  <TwitterShareButton
                                    url={window.location.href}
                                  >
                                    <i className="fa-brands fa-twitter hover:text-black"></i>
                                  </TwitterShareButton>
                                  {/* <button type="button" className="hover:text-black">
                                                <i className="fa-brands fa-twitter"></i>
                                            </button> */}
                                </li>
                                <li className="w-[33.33%] px-[10px] mb-2">
                                  <FacebookShareButton
                                    url={window.location.href}
                                  >
                                    <i className="fa-brands fa-facebook-f hover:text-black"></i>
                                  </FacebookShareButton>
                                  {/* <button type="button" className="hover:text-black">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </button> */}
                                </li>
                                <li className="w-[33.33%] px-[10px] mb-2">
                                  <TelegramShareButton
                                    url={window.location.href}
                                  >
                                    <i className="fa-brands fa-telegram hover:text-black"></i>
                                  </TelegramShareButton>
                                  {/* <button type="button" className="hover:text-black">
                                                <i className="fa-brands fa-telegram"></i>
                                            </button> */}
                                </li>
                                <li className="w-[33.33%] px-[10px] mb-2">
                                  <button
                                    type="button"
                                    className="hover:text-black"
                                    onClick={e => {
                                      navigator.clipboard
                                        .writeText(window.location.href)
                                        .then(e => {
                                          toastcomp(
                                            "Copid Successfully",
                                            "Success"
                                          )
                                        })
                                        .catch(e => {
                                          toastcomp(
                                            "Copid Unsuccessfully",
                                            "error"
                                          )
                                        })
                                    }}
                                  >
                                    <i className="fa-regular fa-copy"></i>
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </>
          ))}
        </>
      ) : (
        <main className="py-8">
          <section className="container">
            <div className="flex flex-wrap mb-8">
              <div className="w-full lg:max-w-[30%] 2xl:max-w-[20%] mb-6 lg:mb-0 relative bg-white shadow-lg rounded-[25px] py-6 px-8 min-h-[350px] flex flex-col justify-between items-center">
                <Skeleton
                  width={120}
                  height={120}
                  style={{ borderRadius: "100%" }}
                />
                <Skeleton width={200} height={30} />
              </div>
              <div className="w-full lg:max-w-[70%] 2xl:max-w-[80%] bg-white shadow-lg rounded-[25px] py-6 px-6 md:px-10">
                <div className="flex flex-wrap justify-between flex-col-reverse md:flex-row mb-10">
                  <aside>
                    <Skeleton
                      width={200}
                      height={30}
                      style={{ margin: "0 0 10px" }}
                    />
                    <Skeleton width={120} height={20} />
                  </aside>
                  <Skeleton width={200} height={30} />
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:max-w-[50%] lg:max-w-[33.3333%] p-2">
                    <Skeleton height={100} />
                  </div>
                  <div className="w-full md:max-w-[50%] lg:max-w-[33.3333%] p-2">
                    <Skeleton height={100} />
                  </div>
                  <div className="w-full md:max-w-[50%] lg:max-w-[33.3333%] p-2">
                    <Skeleton height={100} />
                  </div>
                  <div className="w-full md:max-w-[50%] lg:max-w-[33.3333%] p-2">
                    <Skeleton height={100} />
                  </div>
                  <div className="w-full md:max-w-[50%] lg:max-w-[33.3333%] p-2">
                    <Skeleton height={100} />
                  </div>
                  <div className="w-full md:max-w-[50%] lg:max-w-[33.3333%] p-2">
                    <Skeleton height={100} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[1100px] mx-auto">
              <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-8">
                <Skeleton height={250} />
              </div>
              <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-8">
                <Skeleton height={250} />
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  )
}
