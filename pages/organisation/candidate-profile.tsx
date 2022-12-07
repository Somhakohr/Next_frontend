import Image from 'next/image';
import Link from "next/link";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import userImg from '../../public/images/user-image.png';

export default function OrganisationCandidateProfileView() {
    const [addRoundPopup, addRoundPopupOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    return (
        <>
            <main className="py-8">
                <div className="container">
                    <button type="button" className="mb-2 rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full lg:max-w-[75%] xl:max-w-[80%] lg:pr-6 mb-6 lg:mb-0">
                            <div className="bg-white shadow-normal border rounded-[25px] flex flex-wrap">
                                <div className="w-[310px] mx-auto p-8">
                                    <div className="userBgImage min-h-[268px] flex items-center justify-center">
                                        <Image src={userImg} width={220} height={220} alt="User" className="w-[220px] h-[220px] rounded-full object-cover mx-auto " />
                                    </div>
                                </div>
                                <div className="w-full md:max-w-[calc(100%-310px)] p-6 xl:p-8 relative bg-white border rounded-[25px] flex items-center">
                                    <aside className="w-full text-[#7e7e7e]">
                                        <h2 className="font-semibold text-xl md:text-3xl mb-2">
                                        Joseph Roger
                                        </h2>
                                        <p className="font-light text-[12px] mb-2">ID-491170</p>
                                        <p className="text-sm mb-6">
                                        Web Developer
                                        </p>
                                        <ul className="flex flex-wrap mx-[-10px]">
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px] break-all">
                                                <i className="fa-solid fa-envelope xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>xyz@email.com</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-phone xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>91-9865896598</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-wallet xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>3000 - 5000 </p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-briefcase xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>Fresher</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-location-dot xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>Remote</p>
                                            </li>
                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:max-w-[25%] xl:max-w-[20%] bg-white shadow-normal rounded-[25px] overflow-hidden">
                            <div className="p-6 pb-0 shadow-md border-b">
                                <h4 className="font-semibold text-lg text-center">Social Links</h4>
                                <ul className="flex flex-wrap text-center">
                                    <li className="w-[50%] p-4">
                                        <Link href="#" target="_blank" className="text-2xl hover:text-[#6D27F9]">
                                            <i className="fa-brands fa-behance"></i>
                                        </Link>
                                    </li>
                                    <li className="w-[50%] p-4">
                                        <Link href="#" target="_blank" className="text-2xl hover:text-[#6D27F9]">
                                            <i className="fa-brands fa-linkedin-in"></i>
                                        </Link>
                                    </li>
                                    <li className="w-[50%] p-4">
                                        <Link href="#" target="_blank" className="text-2xl hover:text-[#6D27F9]">
                                            <i className="fa-brands fa-stack-overflow"></i>
                                        </Link>
                                    </li>
                                    <li className="w-[50%] p-4">
                                        <Link href="#" target="_blank" className="text-2xl hover:text-[#6D27F9]">
                                            <i className="fa-brands fa-github"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-6 text-center">
                                <h6 className="text-[#7e7e7e] mb-4">JD-491170</h6>
                                <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-sm text-white font-semibold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">
                                    Download Resume
                                    <i className="fa-solid fa-download ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-[30%] mb-6">
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6">
                                <h3 className="text-lg font-semibold mb-2">Update Status</h3>
                                <ul className="flex flex-wrap mx-[-10px] text-[#7e7e7e]">
                                    <li className="w-[50%] px-[10px]">
                                        <button type="button" className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#6D27F9] hover:text-white">
                                            <i className="fa-solid fa-thumbs-up mr-2"></i>
                                            Shortlist
                                        </button>
                                    </li>
                                    <li className="w-[50%] px-[10px]">
                                        <button type="button" className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#FEF401] hover:text-black">
                                            <i className="fa-solid fa-circle-pause mr-2"></i>
                                            On Hold
                                        </button>
                                    </li>
                                    <li className="w-[50%] px-[10px]">
                                        <button type="button" className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#58E780] hover:text-white">
                                            <i className="fa-solid fa-user mr-2"></i>
                                            Hire
                                        </button>
                                    </li>
                                    <li className="w-[50%] px-[10px]">
                                        <button type="button" className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#FF5E5E] hover:text-white">
                                            <i className="fa-solid fa-thumbs-down mr-2"></i>
                                            Reject
                                        </button>
                                    </li>
                                </ul>
                                <div className="text-right border-t border-slate-300 pt-3 mt-3 mb-6">
                                    <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-semibold text-sm rounded-full py-1.5 px-4 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]" onClick={() => addRoundPopupOpen(true)}>+ Add Interview</button>
                                </div>
                                <div className="max-w-[350px] ml-auto">
                                    <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1]">
                                        <div className="relative z-[2]">
                                            <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#6D27F9] text-center rounded-full min-w-[115px]">
                                                Shortlisted
                                            </span>
                                        </div>
                                        <p className="text-[#7e7e7e] text-[12px]">Nov 29, 2022 - 12:00pm</p>
                                    </div>
                                    <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1] before:content-[''] before:w-[2px] before:h-[72px] before:bg-slate-300 before:absolute before:right-0 before:bottom-[38px] before:z-[1]">
                                        <div className="relative z-[2]">
                                            <div className="flex items-center absolute top-[5px] left-0">
                                                <button type="button" className="border-2 border-[#646464] rounded-full w-[25px] h-[25px] p-1 text-sm flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                                                    <i className="fa-regular fa-edit text-[12px]"></i>
                                                    <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Edit</span>
                                                </button>
                                                <button type="button" className="border-2 border-[#646464] rounded-full w-[25px] h-[25px] p-1 text-sm flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3">
                                                    <i className="fa-solid fa-trash text-[12px]"></i>
                                                    <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                                                </button>
                                            </div>
                                            <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#6D27F9] text-center rounded-full min-w-[115px]">
                                                Interview
                                            </span>
                                        </div>
                                        <p className="text-[#7e7e7e] text-[12px]">Nov 29, 2022 - 12:00pm</p>
                                    </div>
                                    <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1] before:content-[''] before:w-[2px] before:h-[72px] before:bg-slate-300 before:absolute before:right-0 before:bottom-[38px] before:z-[1]">
                                        <div className="relative z-[2]">
                                            <div className="flex items-center absolute top-[5px] left-0">
                                                <button type="button" className="border-2 border-[#646464] rounded-full w-[25px] h-[25px] p-1 text-sm flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                                                    <i className="fa-regular fa-edit text-[12px]"></i>
                                                    <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Edit</span>
                                                </button>
                                                <button type="button" className="border-2 border-[#646464] rounded-full w-[25px] h-[25px] p-1 text-sm flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3">
                                                    <i className="fa-solid fa-trash text-[12px]"></i>
                                                    <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                                                </button>
                                            </div>
                                            <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#FEF401] text-center rounded-full min-w-[115px]">
                                                On Hold
                                            </span>
                                        </div>
                                        <p className="text-[#7e7e7e] text-[12px]">Nov 29, 2022 - 12:00pm</p>
                                    </div>
                                    <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1] before:content-[''] before:w-[2px] before:h-[72px] before:bg-slate-300 before:absolute before:right-0 before:bottom-[38px] before:z-[1]">
                                        <div className="relative z-[2]">
                                            <div className="flex items-center absolute top-[5px] left-0">
                                                <button type="button" className="border-2 border-[#646464] rounded-full w-[25px] h-[25px] p-1 text-sm flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                                                    <i className="fa-regular fa-edit text-[12px]"></i>
                                                    <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Edit</span>
                                                </button>
                                                <button type="button" className="border-2 border-[#646464] rounded-full w-[25px] h-[25px] p-1 text-sm flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3">
                                                    <i className="fa-solid fa-trash text-[12px]"></i>
                                                    <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                                                </button>
                                            </div>
                                            <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#FF5E5E] text-center rounded-full min-w-[115px]">
                                                Reject
                                            </span>
                                        </div>
                                        <p className="text-[#7e7e7e] text-[12px]">Nov 29, 2022 - 12:00pm</p>
                                    </div>
                                    <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1] before:content-[''] before:w-[2px] before:h-[72px] before:bg-slate-300 before:absolute before:right-0 before:bottom-[38px] before:z-[1]">
                                        <div className="relative z-[2]">
                                            <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#58E780] text-center rounded-full min-w-[115px]">
                                                Hired
                                            </span>
                                        </div>
                                        <p className="text-[#7e7e7e] text-[12px]">Nov 29, 2022 - 12:00pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-[70%] lg:pl-6">
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                                <article>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </article>
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                                <div className="flex flex-wrap items-start">
                                    <p className="bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3">
                                        English
                                        <span className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]">
                                            <i className="fa-solid fa-star ml-1"></i>
                                            <i className="fa-solid fa-star ml-1"></i>
                                            <i className="fa-solid fa-star ml-1"></i>
                                        </span>
                                    </p>
                                    <p className="bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3">
                                        Hindi
                                        <span className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]">
                                            <i className="fa-solid fa-star ml-1"></i>
                                            <i className="fa-solid fa-star ml-1"></i>
                                            <i className="fa-solid fa-star ml-1"></i>
                                            <i className="fa-solid fa-star ml-1"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Education</h3>
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                    <article>
                                        <h4 className="font-semibold mb-1">Certificate Name Here</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2 text-sm">Certificate Company</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Issued Date:- 01-02-2012 <br/> Expiry Date:- 01-02-2013</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Credentials:- Cred Id</p>
                                        <a type="button" href="#" target="_blank" className="border border-[#6D27F9] rounded-full py-1.5 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" >Show Certificate</a>
                                    </article>
                                </div> 
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                    <article>
                                        <h4 className="font-semibold mb-1">Certificate Name Here</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2 text-sm">Certificate Company</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Issued Date:- 01-02-2012 <br/> Expiry Date:- 01-02-2013</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Credentials:- Cred Id</p>
                                        <a type="button" href="#" target="_blank" className="border border-[#6D27F9] rounded-full py-1.5 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" >Show Certificate</a>
                                    </article>
                                </div> 
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Education</h3>
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                    <article>
                                        <h4 className="font-semibold mb-1">BCA</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2 text-sm">Lovely University</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Started Date:- 01-02-2012 <br/> End Date:- 01-02-2013</p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#7e7e7e] font-light text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </article>
                                </div>
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                    <article>
                                        <h4 className="font-semibold mb-1">BCA</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2 text-sm">Lovely University</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Started Date:- 01-02-2012 <br/> End Date:- 01-02-2013</p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#7e7e7e] font-light text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </article>
                                </div>
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Experience</h3>
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                    <article>
                                        <h4 className="font-semibold mb-1">Experience Title</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2 text-sm">Experience Company</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Started Date:- 01-02-2012 <br/> End Date:- 01-02-2016</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Type:- Fulltime</p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#7e7e7e] font-light text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </article>
                                </div>
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                    <article>
                                        <h4 className="font-semibold mb-1">Experience Title</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2 text-sm">Experience Company</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Started Date:- 01-02-2012 <br/> End Date:- 01-02-2016</p>
                                        <p className="text-[#7e7e7e] font-light text-sm mb-2">Type:- Fulltime</p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#7e7e7e] font-light text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </article>
                                </div>
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                    <article>
                                        <h4 className="font-semibold mb-1 text-lg">Achievements Title</h4>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#7e7e7e] font-light text-sm">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Transition.Root show={addRoundPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={addRoundPopupOpen}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Interview</h4>
                                    <button type="button" className="leading-none" onClick={() => addRoundPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <aside>
                                    <div className="mb-6">
                                        <label htmlFor="interViewTitle" className="font-medium mb-2 leading-none inline-block">Title</label>
                                        <input type="text" id="interViewTitle" className="w-full rounded-full border-slate-300" />
                                    </div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="interViewRound" className="font-medium mb-2 leading-none inline-block">Round No.</label>
                                            <input id="interViewRound" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="interViewDate" className="font-medium mb-2 leading-none inline-block">Interview Date</label>
                                            <input id="interViewDate" type="date" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="interViewStartTime" className="font-medium mb-2 leading-none inline-block">Interview Start Time</label>
                                            <input id="interViewStartTime" type="time" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="interViewEndTime" className="font-medium mb-2 leading-none inline-block">Interview End Time</label>
                                            <input id="interViewEndTime" type="time" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Submit</button>
                                    </div>
                                </aside>
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