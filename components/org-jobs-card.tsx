import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import googleIcon from "../public/images/google-icon.png";
import organisation from "../pages/organisation";
import moment from "moment";
import { useStore } from "../constants/code";
import shallow from "zustand/shallow";
import { useRouter } from "next/navigation";
import toastcomp from "./toast";



export default function OrganisationJobsCard(props) {
    const [shareJob, shareJobPopupOpen] = useState(false)
    const [appnum, setAppNum] = useState([])
    const cancelButtonRef = useRef(null)
    const {data} = props
    const router = useRouter();
    
    const [param1, updateParam1] = useStore(
        (state) => [state.param1, state.updateParam1],
        shallow
    )

    const {axiosInstanceAuth2,setJobReload} = props

    function viewJob(refid){
        refid = refid.toUpperCase()
        updateParam1(refid);
        router.push(`/organisation/job/preview/${refid}`)
    }

    async function getApplicant() {
        await axiosInstanceAuth2.get('/job/job/applicant/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            setAppNum(res.data)
        }).catch((err)=>{
        });
    }

    async function deleteJob() {
        await axiosInstanceAuth2.post('/job/closejob/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            toastcomp("Job CLosed Successfully","Success")
            setJobReload(true)
        }).catch((err)=>{
            toastcomp("Job Not CLosed","error")
        });
    }

    async function archievedJob() {
        await axiosInstanceAuth2.post('/job/archived/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            toastcomp("Job Archived Successfully","Success")
            setJobReload(true)
        }).catch((err)=>{
            toastcomp("Job Not CLosed","error")
        });
    }

    async function activateJob() {
        await axiosInstanceAuth2.post('/job/archivedtoactive/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            toastcomp("Job In Review Mode","Success")
            setJobReload(true)
        }).catch((err)=>{
            toastcomp("Job Not In Review Mode","error")
        });
    }

    useEffect(() => {
        if(data.jobStatus == "Active")
            getApplicant()
    }, [])
    


    return (
        <>
            <div className="bg-[#f4f4f4] border border-2 border-slate-300 rounded-[25px] overflow-hidden">
                <div className="p-5">
                    <div className="flex mb-8">
                        <div className="bg-white rounded-full p-2.5 flex items-center justify-center w-[50px] h-[50px]">
                            <Image src={data.org.profile} width={50} height={50} alt="Google" className="w-full" />
                        </div>
                        <div className="pl-3 w-[calc(100%-60px)]">
                            <h3 className="font-bold text-[15px] mb-1">{data.title}</h3>
                            <div className="flex items-center">
                                <h5 className="font-medium text-sm my-1 mr-6">{data.user.company_name}</h5>
                                <div className="flex items-center text-[12px] mt-[2px]">
                                    <p className="text-[#7e7e7e] mr-2">{data.refid ? data.refid : <>Not Specified</>}</p>
                                    <button type="button" onClick={() => shareJobPopupOpen(true)}>
                                        <i className="fa-solid fa-share text-[#6D27F9]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-[#787878] text-[12px] flex flex-wrap">
                        <p className="w-full sm:max-w-[50%] mb-3">
                            Place: {data.location ? data.location : <>Not Specified</>}
                        </p>
                        <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                            {data.level ? data.level : <>Not Specified</>}
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                        <p>
                            {data.publish_date ? moment(data.publish_date).fromNow(): <>Not Specified</>}
                        </p>
                        {data.jobStatus == "Active" && 
                        <button type="button" onClick={(e)=>viewJob(data.refid)} className="text-[#6D27F9] hover:underline hover:text-black">View Job</button>}
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white p-5 shadow-normal">
                    <div className="flex items-center">

                        {data.jobStatus == "Active" && 
                        <>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3" onClick={(e)=>archievedJob()}>
                            <i className="fa-regular fa-folder-open"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Archived</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3" onClick={(e)=>deleteJob()}>
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        </>
                        
                        }
                        {data.jobStatus == "Archived" && 
                        <>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3" onClick={(e)=>activateJob()}>
                            <i className="fa-regular fa-folder-open"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Activate</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-regular fa-edit"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Edit</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3" onClick={(e)=>deleteJob()}>
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        </>
                        }

                        {data.jobStatus == "Draft" && 
                        <>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-regular fa-edit"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Edit</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3" onClick={(e)=>deleteJob()}>
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        </>
                        }

                        {data.jobStatus == "Close" && 
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-solid fa-copy"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Clone</span>
                        </button>
                        }

                    </div>
                    <div className="text-right">
                        
                        {data.jobStatus == "Active" && 
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]">{appnum.length} Applicants</button>
                        }
                        
                        {data.jobStatus != "Active" && 
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e)=>viewJob(data.refid)}>View Job</button>
                        }
                    </div>
                </div>
            </div>
            <Transition.Root show={shareJob} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={shareJobPopupOpen}>
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                                    <h4 className="leading-none font-semibold text-xl">Share Job Via</h4>
                                    <button type="button" className="leading-none" onClick={() => shareJobPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="shadow-md rounded-[20px] p-6">
                                    <ul className="flex items-center flex-wrap justify-center text-center text-[#6D27F9] text-xl">
                                        <li className="w-[33.33%] px-[10px] mb-2">
                                            <button type="button" className="hover:text-black">
                                                <i className="fa-brands fa-linkedin-in"></i>
                                            </button>
                                        </li>
                                        <li className="w-[33.33%] px-[10px] mb-2">
                                            <button type="button" className="hover:text-black">
                                                <i className="fa-brands fa-twitter"></i>
                                            </button>
                                        </li>
                                        <li className="w-[33.33%] px-[10px] mb-2">
                                            <button type="button" className="hover:text-black">
                                                <i className="fa-brands fa-facebook-f"></i>
                                            </button>
                                        </li>
                                        <li className="w-[33.33%] px-[10px] mb-2">
                                            <button type="button" className="hover:text-black">
                                                <i className="fa-brands fa-telegram"></i>
                                            </button>
                                        </li>
                                        <li className="w-[33.33%] px-[10px] mb-2">
                                            <button type="button" className="hover:text-black">
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
    )
}