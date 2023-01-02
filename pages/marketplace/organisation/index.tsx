import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import Image from "next/image"
import Sidebar from "../../../components/org-sidebar"
import JobCard from "../../../components/job-card"
import Token from "../../../public/images/token.png"
import { withAuth } from "../../../constants/HOCs"
import axios from "axios"
import { useStore } from "../../../constants/code"
import shallow from "zustand/shallow"
import { useEffect, useState } from "react"
import toastcomp from "../../../components/toast"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { axiosInstanceAuth } from "../../api/axiosApi"

export default function Organisation(props) {
  const { router, session } = props

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

  const [application, setApplication] = useState(0)
  const [shortlisted, setShortlisted] = useState(0)
  const [inreview, setInReview] = useState(0)
  const [interviewscheduled, setInterviewScheduled] = useState(0)
  const [hire, setHire] = useState(0)
  const [reject, setReject] = useState(0)
  const [hold, setHold] = useState(0)
  const [token, setToken] = useState(0)
  const [archivedjob, setArchivedjob] = useState(0)
  const [reviewjob, setReviewjob] = useState(0)
  const [closedjob, setClosedjob] = useState(0)
  const [remainingjob, setRemainingjob] = useState(0)
  const [upcomiginterview, setUpcomingInterview] = useState([])
  const [recentJob, setRecentJob] = useState([])

  //axios auth var
  const axiosInstanceAuth2 = axiosInstanceAuth(accessToken)

  async function loadDashboard() {
    await axiosInstanceAuth2
      .get("/job/dashboad/" + userObj["orefid"] + "/")
      .then(async res => {
        updateUserProfile(res.data)
        setApplication(res.data.applicants)
        setShortlisted(res.data.Shortlist)
        setInReview(res.data["In review"])
        setInterviewScheduled(res.data.Interview)
        setHire(res.data.Hire)
        setReject(res.data.rejected)
        setHold(res.data.hold)
        setArchivedjob(res.data.archivedJobs)
        setReviewjob(res.data.reviewJobs)
        setClosedjob(res.data.closedJobs)
        setRemainingjob(res.data["Remaining Job"])
        setUpcomingInterview(res.data["Upcoming Interviews"])
        // setRecentJob(res.data['Recent Jobs'])
      })
      .catch(err => {
        console.log(err)
        if (err.message != "Request failed with status code 401") {
          toastcomp("Dashboard Fetch Error", "error")
        }
      })
  }

  async function loadJobs() {
    await axiosInstanceAuth2
      .get("/job/dashboard/jobs/" + userObj["orefid"] + "/")
      .then(async res => {
        setRecentJob(res.data)
      })
      .catch(err => {
        console.log(err)
        if (err.message != "Request failed with status code 401") {
          toastcomp("Dashboard Fetch Error", "error")
        }
      })
  }

  function getColor(num) {
    if (num < 10) {
      return "#FE8F66"
    } else if (num < 20) {
      return "#FFCC40"
    } else {
      return "#12E700"
    }
  }

  useEffect(() => {
    if (!session) {
      router.push("/")
    } else if (session && userObj) {
      loadDashboard()
      loadJobs()
    }
  }, [session, userObj])

  return (
    <>
      <main className="py-8">
        <div className="container flex flex-wrap items-start">
          <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
            <Sidebar />
          </div>
          <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6">
            <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6 orgDashTabs">
              <Tabs>
                <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                  <TabList>
                    <Tab>
                      <span className="md:text-lg font-semibold">
                        Applicants Overview
                      </span>
                    </Tab>
                    <Tab>
                      <span className="md:text-lg font-semibold">
                        Jobs Overview
                      </span>
                    </Tab>
                  </TabList>
                </div>
                <div className="py-6 px-4 md:px-10 orgDashCards">
                  <TabPanel>
                    <ul className="flex flex-wrap justify-between">
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(application)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(
                              application
                            )}`,
                          }}
                        >
                          <i className="fa-solid fa-window-maximize"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {application}
                          </p>
                          <h5 className="font-light">Application</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(shortlisted)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(
                              shortlisted
                            )}`,
                          }}
                        >
                          <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {shortlisted}
                          </p>
                          <h5 className="font-light">Shortlisted</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(inreview)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(inreview)}`,
                          }}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {inreview}
                          </p>
                          <h5 className="font-light">In Review</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(
                            interviewscheduled
                          )}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(
                              interviewscheduled
                            )}`,
                          }}
                        >
                          <i className="fa-solid fa-calendar-days"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {interviewscheduled}
                          </p>
                          <h5 className="font-light">Interviews Scheduled</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(hire)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(hire)}`,
                          }}
                        >
                          <i className="fa-solid fa-users-rays"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">{hire}</p>
                          <h5 className="font-light">Hire</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(reject)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(reject)}`,
                          }}
                        >
                          <i className="fa-solid fa-eject"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">{reject}</p>
                          <h5 className="font-light">Rejected</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(hold)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(hold)}`,
                          }}
                        >
                          <i className="fa-solid fa-circle-pause"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">{hold}</p>
                          <h5 className="font-light">Hold</h5>
                        </article>
                      </li>
                      <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center overflow-hidden">
                        <Image
                          src={Token}
                          alt="Token"
                          className="w-[50px] mb-1"
                        />
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">{token}</p>
                          <h5 className="font-light">Tokens</h5>
                        </article>
                      </li>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <ul className="flex flex-wrap justify-between">
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(archivedjob)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(
                              archivedjob
                            )}`,
                          }}
                        >
                          <i className="fa-solid fa-box-archive"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {archivedjob}
                          </p>
                          <h5 className="font-light">Archived Jobs</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(reviewjob)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(
                              reviewjob
                            )}`,
                          }}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {reviewjob}
                          </p>
                          <h5 className="font-light">In Review</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(closedjob)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(
                              closedjob
                            )}`,
                          }}
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {closedjob}
                          </p>
                          <h5 className="font-light">Closed</h5>
                        </article>
                      </li>
                      <li
                        className={`w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#ddd] p-6 flex flex-col items-center justify-center overflow-hidden`}
                        style={{
                          ["border-color" as any]: `${getColor(remainingjob)}`,
                        }}
                      >
                        <div
                          className={`bg-[#ddd] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white`}
                          style={{
                            ["backgroundColor" as any]: `${getColor(
                              remainingjob
                            )}`,
                          }}
                        >
                          <i className="fa-solid fa-circle-notch"></i>
                        </div>
                        <article className="text-center">
                          <p className="font-semibold text-xl mb-1">
                            {remainingjob}
                          </p>
                          <h5 className="font-light">Remaining</h5>
                        </article>
                      </li>
                    </ul>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
              <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                  <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
                </div>
                <div className="py-6 px-4 md:px-10">
                {upcomiginterview.length > 0 ? (
                  <div className="responsive-table">
                    <table className="table-auto min-w-[800px] w-full text-left border-collapse text-[#646464] text-[12px]">
                      <thead className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white">
                        <tr>
                           <th className="py-2 px-3">
                            <Skeleton />
                           </th>
                           <th className="py-2 px-3">
                            <Skeleton />
                           </th>
                           <th className="py-2 px-3">
                            <Skeleton />
                           </th>
                           <th className="py-2 px-3">
                            <Skeleton />
                           </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                          <td className="py-2 px-3">
                          <Skeleton />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table-auto min-w-[800px] w-full text-left border-collapse text-[#646464] text-sm">
                      <thead className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white">
                        <tr>
                          <th className="py-2 px-3 ">Candidate ID</th>
                          <th className="py-2 px-3">Job ID</th>
                          <th className="py-2 px-3">Job Title</th>
                          <th className="py-2 px-3 ">Interview Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomiginterview.map((interview, i) => (
                          <tr key={i}>
                            <td className="py-1 px-3">{interview.user_id}</td>
                            <td className="py-1 px-3">{interview.job_id}</td>
                            <td className="py-1 px-3">{interview.title}</td>
                            <td className="py-1 px-3">
                              {interview.interview_date}{" "}
                              {interview.interview_stime}-
                              {interview.interview_etime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No Upcoming Interviews
                    </p>
                    )}
                </div>
              </div>

            {recentJob.length > 0 ? (
              <div className="bg-white shadow-normal rounded-[30px] overflow-hidden">
                <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                  <h2 className="text-lg font-semibold">Recent Jobs</h2>
                </div>
                <div className="py-6 px-4 md:px-10">
                  <div className="flex flex-wrap mx-[-15px]">
                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                      <div className="">
                        <div className="flex flex-wrap items-center mb-4">
                          <Skeleton
                            width={40}
                            height={40}
                            style={{
                              borderRadius: "100%",
                              marginRight: "10px",
                            }}
                          />
                          <Skeleton width={150} height={20} />
                        </div>
                        <Skeleton
                          height={25}
                          style={{ margin: "0 0 10px 0" }}
                        />
                        <Skeleton
                          width={180}
                          height={20}
                          style={{ margin: "0 0 10px 0" }}
                        />
                        <Skeleton width={120} height={20} />
                      </div>
                    </div>
                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                      <div className="">
                        <div className="flex flex-wrap items-center mb-4">
                          <Skeleton
                            width={40}
                            height={40}
                            style={{
                              borderRadius: "100%",
                              marginRight: "10px",
                            }}
                          />
                          <Skeleton width={150} height={20} />
                        </div>
                        <Skeleton
                          height={25}
                          style={{ margin: "0 0 10px 0" }}
                        />
                        <Skeleton
                          width={180}
                          height={20}
                          style={{ margin: "0 0 10px 0" }}
                        />
                        <Skeleton width={120} height={20} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap mx-[-10px]">
                    {recentJob.map((job, i) => (
                      <div
                        className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4"
                        key={i}
                      >
                        <JobCard data={job} org={true} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-normal rounded-[30px] overflow-hidden">
                <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                  <h2 className="text-lg font-semibold">No Recent Jobs</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
