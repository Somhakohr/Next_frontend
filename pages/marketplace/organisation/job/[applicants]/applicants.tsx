//@ts-nocheck
import { Fragment, useEffect, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import Sidebar from "../../../../../components/org-sidebar"
import shallow from "zustand/shallow"
import { useStore } from "../../../../../constants/code"
import toastcomp from "../../../../../components/toast"
import Multiselect from "multiselect-react-dropdown"
import { axiosInstanceAuth } from "../../../../api/axiosApi"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function OrganisationJOBApplicants(props) {
  const { session, router } = props
  const [shareCandidate, shareCandidatePopupOpen] = useState(false)
  const [ske, setske] = useState(true)
  const cancelButtonRef = useRef(null)

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

  const [param1, updateParam1] = useStore(
    state => [state.param1, state.updateParam1],
    shallow
  )

  const [applicant, setApplicant] = useState([])
  const [name, setName] = useState("")
  const [fname, setFName] = useState("")
  const [dept, setdept] = useState("")
  const [check, setCheck] = useState([])

  const [email, setemail] = useState("")
  // const [clist,setclist] = useState('')

  function verifySharePopup() {
    return email.length > 0 && check.length > 0
  }
  //axios auth var
  const axiosInstanceAuth2 = axiosInstanceAuth(accessToken)

  async function loadApplicant(refid, orefid) {
    setske(true)
    await axiosInstanceAuth2
      .get("/job/job/applicant/" + orefid + "/" + refid + "/")
      .then(async res => {
        setApplicant(res.data)
      })
      .catch(err => {
        // console.log(err)
        // if(err.message != "Request failed with status code 401"){
        //     toastcomp("Applicant Fetch Error","error");
        // }
        router.push("/marketplace/organisation/jobs")
      })
    setske(false)
  }

  async function loadApplicantF(refid, orefid) {
    setske(true)
    await axiosInstanceAuth2
      .get(
        `/job/job/applicant/${orefid}/${refid}/?user__first_name=${fname}&job__dept=${dept}`
      )
      .then(async res => {
        setApplicant(res.data)
      })
      .catch(err => {
        console.log(err)
        if (err.message != "Request failed with status code 401") {
          toastcomp("Applicant Fetch Error", "error")
        }
      })
    setske(false)
  }

  async function sharetoClient() {
    var f = new FormData()
    f.append("email", email)
    f.append("applicant", check.toString())
    await axiosInstanceAuth2
      .post(`/job/agency/${userObj["orefid"]}/`, f)
      .then(async res => {
        toastcomp("Link & Password Send To The Client", "success")
        shareCandidatePopupOpen(false)
      })
      .catch(err => {
        console.log(err)
        if (err.message != "Request failed with status code 401") {
          toastcomp("Applicant Share Error", "error")
        }
      })
  }

  useEffect(() => {
    if (!session) {
      router.push("/")
    } else if (session && userObj) {
      loadApplicant(param1, userObj["orefid"])
    }
  }, [session, userObj])

  useEffect(() => {
    loadApplicantF(param1, userObj["orefid"])
  }, [fname, dept])

  function getColor(status) {
    if (status == "Hired") {
      return "#008767"
    } else if (status == "Rejected") {
      return "#DF0404"
    } else if (status == "On Hold") {
      return "#efb800"
    } else {
      return ""
    }
  }

  function viewApplicant(id) {
    id = id.toUpperCase()
    updateParam1(id)
    router.push(`/marketplace/organisation/applicant/${id}`)
  }

  return (
    <>
      {userType == "Organisation" && (
        <>
          <main className="py-8">
            <div className="container flex flex-wrap items-start">
              <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
                <Sidebar />
              </div>
              <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6">
                <div className="bg-white border border-teal-400 rounded-[30px] shadow-lg py-6 px-10 mb-6">
                  <div className="flex flex-wrap justify-between">
                    <div className="w-full lg:w-[47%] my-3">
                      <div className="iconGroup">
                        <input
                          type="search"
                          placeholder="JA no, Job Title, Location, Name"
                          className="w-full rounded-full border-slate-300"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          onBlur={e => setFName(e.target.value)}
                        />
                        <i className="fa-solid fa-search iconGroup__icon"></i>
                      </div>
                    </div>
                    <div className="w-full lg:w-[47%] my-3">
                      {/* <select className="w-full rounded-full border-slate-300" value={dept} onChange={(e)=>setdept(e.target.value)}>
                                        <option value="Department">Department</option>
                                        <option value="HR">HR</option>
                                    </select> */}
                      <Multiselect
                        options={[
                          "Software/Testing/Networking",
                          "IT Hardware & Telecom",
                          "Sales",
                          "Analytics & Business Intelligence",
                          "Design",
                          "HR & Admin",
                          "Customer Service & Operations",
                          "R&D",
                          "Marketing",
                          "Accounting/Finance",
                          "Planning & Consulting",
                          "Education",
                          "Content",
                          "Banking/Insurance",
                          "Self Employed / Consultants",
                          "Hospitality",
                          "Construction",
                          "Travel",
                          "Architecture & Interior Design",
                          "TV/Flims",
                          "Manufacturing",
                          "Top Management",
                          "Pharma/Healthcare",
                        ]}
                        isObject={false}
                        customCloseIcon={
                          <>
                            <i className="fa-solid fa-xmark"></i>
                          </>
                        }
                        showArrow={true}
                        closeOnSelect={true}
                        onSelect={(selectedList, selectedItem) => {
                          setdept(selectedList.join(","))
                        }}
                        onRemove={(selectedList, selectedItem) => {
                          setdept(selectedList.join(","))
                        }}
                        placeholder="Find Department"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden py-6 px-10 mb-6">
                  <div className="flex flex-wrap items-center justify-between mb-2">
                    <article>
                      <h2 className="font-bold text-lg mb-3">All Applicants</h2>
                      {/* <p className="flex flex-wrap items-center text-[#16C098] text-[12px]">
                                        <span className="mr-6">
                                            Web Developer
                                        </span>
                                        <span>
                                            JD-1141709
                                        </span>
                                    </p> */}
                    </article>
                    {userObj["company_type"] == "Agency" && (
                      <aside>
                        <button
                          type="button"
                          className="border border-[#6D27F9] font-semibold rounded-full py-1.5 px-4 my-2 text-[12px] hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                          onClick={() => shareCandidatePopupOpen(true)}
                        >
                          Share Profiles
                        </button>
                        {/* <button type="button" className="ml-4 border border-[#9F09FB] bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-semibold rounded-full py-1.5 px-4 my-2 text-[12px] transition-all hover:from-[#391188] hover:to-[#391188]">Share</button>
                                    <button type="button" className="ml-4 border border-[#DF0404] font-semibold rounded-full py-1.5 px-4 my-2 text-[12px] text-[#DF0404] hover:bg-[#DF0404] hover:text-white">Cancel</button> */}
                      </aside>
                    )}
                  </div>
                  <div className="responsive-table">
                    {ske ? (
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
                    ) : (
                      <>
                        {applicant.length > 0 && (
                          <table className="table-auto min-w-[800px] w-full text-left border-collapse text-[#646464] text-[12px]">
                            <thead className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white">
                              <tr>
                                {userObj["company_type"] == "Agency" && (
                                  <th className="py-2 px-3 w-[15px]">
                                    <input
                                      type="checkbox"
                                      className="w-[12px] h-[12px]"
                                      onChange={e => {
                                        let arr2 = applicant
                                        let arr = []
                                        if (e.target.checked) {
                                          for (
                                            let i = 0;
                                            i < arr2.length;
                                            i++
                                          ) {
                                            document.getElementById(
                                              `cb${arr2[i]["arefid"]}`
                                            ).checked = true
                                            if (
                                              !arr.includes(arr2[i]["arefid"])
                                            ) {
                                              arr.push(arr2[i]["arefid"])
                                            }
                                          }
                                          setCheck(arr)
                                        } else {
                                          for (
                                            let i = 0;
                                            i < arr2.length;
                                            i++
                                          ) {
                                            document.getElementById(
                                              `cb${arr2[i]["arefid"]}`
                                            ).checked = false
                                          }
                                          setCheck([])
                                        }
                                      }}
                                    />
                                  </th>
                                )}
                                <th className="py-2 px-3 w-[15%]">
                                  Applicant Name
                                </th>
                                <th className="py-2 px-3 w-[12%]">
                                  Applicant ID
                                </th>
                                <th className="py-2 px-3 text-center">
                                  Experience
                                </th>
                                <th className="py-2 px-3 w-[15%]">Email</th>
                                <th className="py-2 px-3 text-center w-[15%]">
                                  Notice Period
                                </th>
                                <th className="py-2 px-3 text-center">
                                  Status
                                </th>
                                <th className="py-2 px-3 text-center">
                                  Profile
                                </th>
                                {userObj["company_type"] == "Agency" && (
                                  <th className="py-2 px-3 text-center">
                                    Share
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {applicant.map((data, i) => (
                                <tr key={i}>
                                  {userObj["company_type"] == "Agency" && (
                                    <td className="p-3 w-[15px]">
                                      <input
                                        type="checkbox"
                                        className="w-[12px] h-[12px]"
                                        id={`cb${data.arefid}`}
                                        onChange={e => {
                                          let arr = check
                                          if (
                                            !e.target.checked &&
                                            arr.includes(data.arefid)
                                          ) {
                                            for (
                                              let i = 0;
                                              i < arr.length;
                                              i++
                                            ) {
                                              if (arr[i] === data.arefid) {
                                                arr.splice(i, 1)
                                              }
                                            }
                                          } else if (
                                            e.target.checked &&
                                            arr.includes(data.arefid)
                                          ) {
                                          } else {
                                            arr.push(data.arefid)
                                          }
                                          setCheck(arr)
                                        }}
                                      />
                                    </td>
                                  )}
                                  <td className="p-3 w-[15%]">
                                    {data.user.first_name ||
                                    data.user.last_name ? (
                                      <>
                                        {data.user.first_name}{" "}
                                        {data.user.last_name}
                                      </>
                                    ) : (
                                      <>N/A</>
                                    )}
                                  </td>
                                  <td className="p-3 w-[12%]">{data.arefid}</td>
                                  <td className="p-3 text-center">
                                    {data.cand.yearofexp ? (
                                      data.cand.yearofexp
                                    ) : (
                                      <>N/A</>
                                    )}
                                  </td>
                                  <td className="p-3 w-[15%]">
                                    {data.user.email}
                                  </td>
                                  <td className="p-3 text-center w-[15%]">
                                    {data.cand.noticeperiod ? (
                                      data.cand.noticeperiod
                                    ) : (
                                      <>N/A</>
                                    )}
                                  </td>
                                  <td className="p-3 text-center">
                                    {data.status ? (
                                      <span
                                        className="border rounded-full py-1 px-4 text-center text-[12px] min-w-[110px] inline-block"
                                        style={{
                                          ["border-color" as any]: `${getColor(
                                            data.status
                                          )}`,
                                          ["color" as any]: `${getColor(
                                            data.status
                                          )}`,
                                        }}
                                      >
                                        {data.status}
                                      </span>
                                    ) : (
                                      <>N/A</>
                                    )}
                                  </td>
                                  <td className="p-3 text-center">
                                    <button
                                      onClick={e => viewApplicant(data.arefid)}
                                      className="text-[#6D27F9] hover:underline hover:text-black"
                                    >
                                      View
                                    </button>
                                  </td>
                                  {userObj["company_type"] == "Agency" && (
                                    <td className="p-3 text-center">
                                      <button
                                        type="button"
                                        className="text-[#6D27F9]"
                                        onClick={() => {
                                          let arr = []
                                          arr.push(data.arefid)
                                          setCheck(arr)
                                          shareCandidatePopupOpen(true)
                                        }}
                                      >
                                        <i className="fa-solid fa-share-nodes"></i>
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Transition.Root show={shareCandidate} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={shareCandidatePopupOpen}
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
                          <h4 className="leading-none font-semibold text-md">
                            Share Candidates Profile Via Mail
                          </h4>
                          <button
                            type="button"
                            className="leading-none"
                            onClick={() => shareCandidatePopupOpen(false)}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="shareCandViaEmail"
                            className="font-medium mb-2 leading-none inline-block text-sm"
                          >
                            Enter Email
                          </label>
                          <input
                            id="shareCandViaEmail"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            htmlFor="shareCandViaEmailList"
                            className="font-medium mb-2 leading-none inline-block text-sm"
                          >
                            Candidates List
                          </label>
                          <input
                            id="shareCandViaEmailList"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={check.toString()}
                            readOnly
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[130px] transition-all hover:from-[#391188] hover:to-[#391188]"
                            disabled={!verifySharePopup()}
                            onClick={() => sharetoClient()}
                          >
                            Save
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
      )}
    </>
  )
}
