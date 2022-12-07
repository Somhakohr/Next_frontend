import Link from 'next/link'
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function OrganisationSidebar() {
    const router = useRouter();
    const [scoutComingsoonPopup, scoutComingsoonPopupOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    return (
        <>
            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] py-8 px-4">
                <ul className="flex flex-wrap justify-between">
                    <li className="w-[49%] lg:w-full">
                        <Link href="/organisation" className={`flex items-center py-2 px-3 lg:px-8 rounded-lg my-1 hover:bg-[#6D27F9] hover:text-white ${router.pathname == "/organisation" ? "bg-[#6D27F9] text-white" : ""}`}>
                            <i className="fa-solid fa-chart-simple mr-2"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="w-[49%] lg:w-full">
                        <Link href="/organisation/jobs" className={`flex items-center py-2 px-3 lg:px-8 rounded-lg my-1 hover:bg-[#6D27F9] hover:text-white ${router.pathname == "/organisation/jobs" ? "bg-[#6D27F9] text-white" : ""}`}>
                            <i className="fa-solid fa-briefcase mr-1"></i>
                            Jobs
                        </Link>
                    </li>
                    <li className="w-[49%] lg:w-full">
                        <Link href="/organisation/applicants" className={`flex items-center py-2 px-3 lg:px-8 rounded-lg my-1 hover:bg-[#6D27F9] hover:text-white ${router.pathname == "/organisation/applicants" ? "bg-[#6D27F9] text-white" : ""}`}>
                            <i className="fa-solid fa-users mr-1"></i>
                            Applicant
                        </Link>
                    </li>
                    <li className="w-[49%] lg:w-full">
                        <button type="button" onClick={() => scoutComingsoonPopupOpen(true)} className="w-full flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                            <i className="fa-solid fa-circle-radiation mr-1"></i>
                            Scout
                        </button>
                    </li>
                </ul>
            </div>
            <Transition.Root show={scoutComingsoonPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={scoutComingsoonPopupOpen}>
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
                                    <h4 className="leading-none font-semibold text-xl">Scouting</h4>
                                    <button type="button" className="leading-none" onClick={() => scoutComingsoonPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <i className="fa-regular fa-face-smile text-6xl text-[#6D27F9] mb-4"></i>
                                    <h4 className="text-[#6D27F9] text-2xl font-bold">Coming Soon</h4>
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