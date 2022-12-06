import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import googleIcon from "../public/images/google-icon.png";

export default function OrganisationJobsCard() {
    const [shareJob, shareJobPopupOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    return (
        <>
            <div className="bg-[#f4f4f4] border border-2 border-slate-300 rounded-[25px] overflow-hidden">
                <div className="p-5">
                    <div className="flex mb-8">
                        <div className="bg-white rounded-full p-2.5 flex items-center justify-center w-[50px] h-[50px]">
                            <Image src={googleIcon} alt="Google" className="w-full" />
                        </div>
                        <div className="pl-3 w-[calc(100%-60px)]">
                            <h3 className="font-bold text-[15px] mb-1">User Experience Designer</h3>
                            <div className="flex items-center">
                                <h5 className="font-medium text-sm my-1 mr-6">Google</h5>
                                <div className="flex items-center text-[12px] mt-[2px]">
                                    <p className="text-[#7e7e7e] mr-2">JB-491170</p>
                                    <button type="button" onClick={() => shareJobPopupOpen(true)}>
                                        <i className="fa-solid fa-share text-[#6D27F9]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-[#787878] text-[12px] flex flex-wrap">
                        <p className="w-full sm:max-w-[50%] mb-3">
                            Place: Bangalore
                        </p>
                        <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                            Mid Career
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                        <p>
                            5 days ago
                        </p>
                        <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View Job</Link>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white p-5 shadow-normal">
                    <div className="flex items-center">
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-regular fa-folder-open"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Archive</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-regular fa-edit"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Edit</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3">
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-solid fa-copy"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Clone</span>
                        </button>
                    </div>
                    <div className="text-right">
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]">10 Applicants</button>
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]">View Job</button>
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