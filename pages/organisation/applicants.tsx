import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Sidebar from "../../components/org-sidebar";
import { withAuth } from "../../constants/HOCs";
import shallow from "zustand/shallow";
import { useStore } from "../../constants/code";
import toastcomp from "../../components/toast";
import axios from "axios";

function OrganisationApplicants(props) {
    const {session,router} = props
    const [shareCandidate, shareCandidatePopupOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    const [userName, updateUserName] = useStore(
        (state) => [state.userName, state.updateUserName],
        shallow
    )

    const [userImg, updateUserImg] = useStore(
        (state) => [state.userImg, state.updateUserImg],
        shallow
    )

    const [userType, updateUserType] = useStore(
        (state) => [state.userType, state.updateUserType],
        shallow
    )

    const [userObj, updateUserObj] = useStore(
        (state) => [state.userObj, state.updateUserObj],
        shallow
    )

    const [userProfile, updateUserProfile] = useStore(
        (state) => [state.userProfile, state.updateUserProfile],
        shallow
    )
    
    const [accessToken, updateAccessToken] = useStore(
        (state) => [state.accessToken, state.updateAccessToken],
        shallow
    )

    const [param1, updateParam1] = useStore(
        (state) => [state.param1, state.updateParam1],
        shallow
    )

    const [applicant,setApplicant] = useState([])
    const [name,setName] = useState('')
    const [fname,setFName] = useState('')
    const [dept,setdept] = useState('')
    
    //axios auth var
    const axiosInstanceAuth2 = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer '+accessToken,
            "Content-Type": "multipart/form-data",
        }
    });
    
    async function loadApplicant(orefid) {
        await axiosInstanceAuth2.get('/job/applicants/alls/'+orefid+'/').then(async (res)=>{
            setApplicant(res.data)
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Applicant Fetch Error","error");
            }
        })
    }
    
    async function loadApplicantF(orefid) {
        await axiosInstanceAuth2.get(`/job/applicants/alls/${orefid}/?user__first_name=${name}&job__dept=${dept}`).then(async (res)=>{
            console.log("res",res.data)
            setApplicant(res.data)
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Applicant F Fetch Error","error");
            }
        })
    }

    useEffect(() => {
        if(!session){
          router.push("/");
        }
        else if(session && userObj){
            loadApplicant(userObj["orefid"])
        }
      }, [session,userObj]);

    useEffect(()=>{
        var formData = new FormData()
        formData.append('first_name',name);
        loadApplicantF(userObj["orefid"]);
    },[fname])

    
    return (
        <>
        { userType == "Organisation" &&<>
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
                                        <input type="search" placeholder="JA no, Job Title, Location, Name" className="w-full rounded-full border-slate-300" value={name} onChange={(e)=>setName(e.target.value)} onBlur={(e)=>setFName(e.target.value)} />
                                        <i className="fa-solid fa-search iconGroup__icon"></i>
                                    </div>
                                </div>
                                <div className="w-full lg:w-[47%] my-3">
                                    <select className="w-full rounded-full border-slate-300" value={dept} onChange={(e)=>setdept(e.target.value)}>
                                        <option value="Department">Department</option>
                                        <option value="HR">HR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden py-6 px-10 mb-6">
                            <div className="flex flex-wrap items-center justify-between mb-2">
                                <article>
                                    <h2 className="font-bold text-lg mb-3">
                                        All Applicants
                                    </h2>
                                    {/* <p className="flex flex-wrap items-center text-[#16C098] text-[12px]">
                                        <span className="mr-6">
                                            Web Developer
                                        </span>
                                        <span>
                                            JD-1141709
                                        </span>
                                    </p> */}
                                </article>
                                {userObj['company_type'] == 'Agency' && 
                                <aside>
                                    <button type="button" className="border border-[#6D27F9] font-semibold rounded-full py-1.5 px-4 my-2 text-[12px] hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => shareCandidatePopupOpen(true)}>Share Profiles</button>
                                    <button type="button" className="ml-4 border border-[#9F09FB] bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-semibold rounded-full py-1.5 px-4 my-2 text-[12px] transition-all hover:from-[#391188] hover:to-[#391188]">Share</button>
                                    <button type="button" className="ml-4 border border-[#DF0404] font-semibold rounded-full py-1.5 px-4 my-2 text-[12px] text-[#DF0404] hover:bg-[#DF0404] hover:text-white">Cancel</button>
                                </aside>
                                }
                            </div>
                            <div className="responsive-table">
                                {applicant.length > 0 && 
                                <table className="table-auto min-w-[800px] w-full text-left border-collapse text-[#646464] text-[12px]">
                                    <thead className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white">
                                        <tr>
                                            {userObj['company_type'] == 'Agency' && 
                                            <th className="py-2 px-3 w-[15px]">
                                                <input type="checkbox" className="w-[12px] h-[12px]" />
                                            </th>
                                            }
                                            <th className="py-2 px-3 w-[15%]">Applicant Name</th>
                                            <th className="py-2 px-3 w-[12%]">Applicant ID</th>
                                            <th className="py-2 px-3 text-center">Experience</th>
                                            <th className="py-2 px-3 w-[15%]">Email</th>
                                            <th className="py-2 px-3 text-center w-[15%]">Notice Period</th>
                                            <th className="py-2 px-3 text-center">Status</th>
                                            <th className="py-2 px-3 text-center">Profile</th>
                                            {userObj['company_type'] == 'Agency' && 
                                            <th className="py-2 px-3 text-center">Share</th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicant.map((data, i) => (
                                            <tr key={i}>
                                                {userObj['company_type'] == 'Agency' && 
                                                <td className="p-3 w-[15px]">
                                                    <input type="checkbox" className="w-[12px] h-[12px]" />
                                                </td>
                                                }
                                                <td className="p-3 w-[15%]">{data.user.first_name || data.user.last_name? <>{data.user.first_name}  {data.user.last_name}</> : <>N/A</> }</td>
                                                <td className="p-3 w-[12%]">{data.arefid}</td>
                                                <td className="p-3 text-center">{data.cand.yearofexp?data.cand.yearofexp:<>N/A</>}</td>
                                                <td className="p-3 w-[15%]">{data.user.email}</td>
                                                <td className="p-3 text-center w-[15%]">{data.cand.noticeperiod?data.cand.noticeperiod:<>N/A</>}</td>
                                                <td className="p-3 text-center">
                                                    {data.status ? 
                                                    <span className="border border-[#008767] text-[#008767] rounded-full py-1 px-4 text-center text-[12px] min-w-[90px] inline-block">
                                                        {data.status}
                                                    </span>
                                                    :
                                                    <>N/A</>
                                                    }
                                                </td>
                                                <td className="p-3 text-center">
                                                    <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View</Link>
                                                </td>
                                                {userObj['company_type'] == 'Agency' && 
                                                <td className="p-3 text-center">
                                                    <button type="button" className="text-[#6D27F9]" onClick={() => shareCandidatePopupOpen(true)}>
                                                        <i className="fa-solid fa-share-nodes"></i>
                                                    </button>
                                                </td>
                                                }
                                            </tr>
                                        ))}
                                        {/* <tr>
                                            <td className="p-3 w-[15px]">
                                                <input type="checkbox" className="w-[12px] h-[12px]" />
                                            </td>
                                            <td className="p-3 w-[15%]">Jane Cooper</td>
                                            <td className="p-3 w-[12%]">JA138488</td>
                                            <td className="p-3 text-center">5+</td>
                                            <td className="p-3 w-[15%]">jane@microsoft.com</td>
                                            <td className="p-3 text-center w-[15%]">30 Days</td>
                                            <td className="p-3 text-center">
                                                <span className="border border-[#008767] text-[#008767] rounded-full py-1 px-4 text-center text-[12px] min-w-[90px] inline-block">
                                                    Hired
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View</Link>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button type="button" className="text-[#6D27F9]" onClick={() => shareCandidatePopupOpen(true)}>
                                                    <i className="fa-solid fa-share-nodes"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 w-[15px]">
                                                <input type="checkbox" className="w-[12px] h-[12px]" />
                                            </td>
                                            <td className="p-3 w-[15%]">Jane Cooper</td>
                                            <td className="p-3 w-[12%]">JA138488</td>
                                            <td className="p-3 text-center">5+</td>
                                            <td className="p-3 w-[15%]">jane@microsoft.com</td>
                                            <td className="p-3 text-center w-[15%]">30 Days</td>
                                            <td className="p-3 text-center">
                                                <span className="border border-[#DF0404] text-[#DF0404] rounded-full py-1 px-4 text-center text-[12px] min-w-[90px] inline-block">
                                                    Rejected
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View</Link>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button type="button" className="text-[#6D27F9]">
                                                    <i className="fa-solid fa-share-nodes"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 w-[15px]">
                                                <input type="checkbox" className="w-[12px] h-[12px]" />
                                            </td>
                                            <td className="p-3 w-[15%]">Jane Cooper</td>
                                            <td className="p-3 w-[12%]">JA138488</td>
                                            <td className="p-3 text-center">5+</td>
                                            <td className="p-3 w-[15%]">jane@microsoft.com</td>
                                            <td className="p-3 text-center w-[15%]">30 Days</td>
                                            <td className="p-3 text-center">
                                                <span className="border border-[#efb800] text-[#efb800] rounded-full py-1 px-4 text-center text-[12px] min-w-[90px] inline-block">
                                                    On Hold
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View</Link>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button type="button" className="text-[#6D27F9]">
                                                    <i className="fa-solid fa-share-nodes"></i>
                                                </button>
                                            </td>
                                        </tr> */}
                                    </tbody>
                                </table>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Transition.Root show={shareCandidate} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={shareCandidatePopupOpen}>
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
                                    <h4 className="leading-none font-semibold text-md">Share Candidates Profile Via Mail</h4>
                                    <button type="button" className="leading-none" onClick={() => shareCandidatePopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="shareCandViaEmail" className="font-medium mb-2 leading-none inline-block text-sm">Enter Email</label>
                                    <input id="shareCandViaEmail" type="text" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="shareCandViaEmailList" className="font-medium mb-2 leading-none inline-block text-sm">Candidates List</label>
                                    <select id="shareCandViaEmailList" className="w-full rounded-full border-slate-300">
                                        <option value="User One">User one</option>
                                        <option value="User Two">User two</option>
                                    </select>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[130px] transition-all hover:from-[#391188] hover:to-[#391188]">
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
        </>}
        </>
    )
}

export default withAuth(3*60)(OrganisationApplicants)