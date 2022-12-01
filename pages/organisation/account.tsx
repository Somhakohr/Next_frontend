import Link from 'next/link'
import Image from "next/image";
import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import userImg from "../../public/images/user-image.png";
import uploadImages from "../../public/images/upload_images.png";
import gallery_1 from '../../public/images/gallery-1.png';
import gallery_2 from '../../public/images/gallery-2.png';
import gallery_3 from '../../public/images/gallery-3.png';
import gallery_4 from '../../public/images/gallery-4.png';
import gallery_5 from '../../public/images/gallery-5.png';

export default function OrganisationAccount() {
    const cancelButtonRef = useRef(null)
    const [socialPopup, socialPopupOpen] = useState(false)
    const [galleryImages, galleryImagesAdd] = useState(false)
    const [changePassword, changePasswordOpen] = useState(false)
    return (
        <>
            <main className="py-8">
                <div className="container flex flex-wrap items-start">
                    <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
                        <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] py-8 px-4">
                            <ul className="flex flex-wrap items-center justify-between text-sm">
                                <li className="w-[49%] lg:w-full">
                                    <Link href="#" className="flex items-center py-2 px-3 lg:px-8 bg-[#6D27F9] text-white hover:bg-[#6D27F9] hover:text-white rounded-lg my-1">
                                        About Company
                                    </Link>
                                </li>
                                <li className="w-[49%] lg:w-full">
                                    <Link href="#" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                                        Organisation Settings
                                    </Link>
                                </li>
                                <li className="w-[49%] lg:w-full">
                                    <Link href="#" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                                        Gallery
                                    </Link>
                                </li>
                                <li className="w-[49%] lg:w-full">
                                    <button type="button" onClick={() => changePasswordOpen(true)} className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2 w-full">
                                        Change Password
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6">
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8 mb-6">
                            <aside className="w-full max-w-[330px] xl:max-w-[380px] mb-6">
                                <div className="flex flex-wrap mb-4">
                                    <div className="w-full sm:w-[50%] sm:pr-10">
                                        <div className="relative inline-block">
                                            <p className="text-center mb-2 font-medium">Comapny Logo</p>
                                            <Image
                                                src={userImg}
                                                alt="User"
                                                height={100}
                                                width={100}
                                                className="rounded-full object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"
                                            />
                                            <label htmlFor="uploadImage" className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white">
                                                <i className="fa-solid fa-plus text-xl"></i>
                                                <input type="file" id="uploadImage" className="absolute left-0 top-0 z-20" hidden />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-[50%] sm:pl-10 sm:border-l">
                                        <div className="relative inline-block">
                                            <p className="text-center mb-2 font-medium">Cover Image</p>
                                            <Image
                                                src={userImg}
                                                alt="User"
                                                height={100}
                                                width={100}
                                                className="rounded-full object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"
                                            />
                                            <label htmlFor="uploadImage" className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white">
                                                <i className="fa-solid fa-plus text-xl"></i>
                                                <input type="file" id="uploadImage" className="absolute left-0 top-0 z-20" hidden />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[#7e7e7e] text-[12px] text-center block">Supported Formats: png, jpg upto 2 MB</span>
                            </aside>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompName" className="font-medium mb-2 leading-none inline-block">Company Name</label>
                                    <input type="text" id="orgCompName" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompIndustry" className="font-medium mb-2 leading-none inline-block">Industry</label>
                                    <select id="orgCompIndustry" className="w-full rounded-full border-slate-300">
                                        <option value="Industry 1">Industry 1</option>
                                        <option value="Industry 2">Industry 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompURL" className="font-medium mb-2 leading-none inline-block">Company URL</label>
                                    <input type="text" id="orgCompURL" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFoundedDate" className="font-medium mb-2 leading-none inline-block">Founded Date</label>
                                    <input type="date" id="orgCompFoundedDate" className="w-full rounded-full border-slate-300" />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFounders" className="font-medium mb-2 leading-none inline-block">Founders</label>
                                    <input type="text" id="orgCompFounders" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompEmail" className="font-medium mb-2 leading-none inline-block">Company Email</label>
                                    <input type="text" id="orgCompEmail" className="w-full rounded-full border-slate-300" />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompLegalName" className="font-medium mb-2 leading-none inline-block">Loegal Name</label>
                                    <input type="text" id="orgCompLegalName" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompRecruiterName" className="font-medium mb-2 leading-none inline-block">Recruiter Name</label>
                                    <input type="text" id="orgCompRecruiterName" className="w-full rounded-full border-slate-300" />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompRecruiterDesg" className="font-medium mb-2 leading-none inline-block">Recruiter Designation</label>
                                    <input type="text" id="orgCompRecruiterDesg" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompStrength" className="font-medium mb-2 leading-none inline-block">Company Strength</label>
                                    <select id="orgCompStrength" className="w-full rounded-full border-slate-300">
                                        <option value="0-10">0-10</option>
                                        <option value="10-20">10-20</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompStatus" className="font-medium mb-2 leading-none inline-block">Organisation Status</label>
                                    <select id="orgCompStatus" className="w-full rounded-full border-slate-300">
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </select>
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompOperation" className="font-medium mb-2 leading-none inline-block">Operation Status</label>
                                    <select id="orgCompOperation" className="w-full rounded-full border-slate-300">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFundingRound" className="font-medium mb-2 leading-none inline-block">Total Round of Funding</label>
                                    <input type="text" id="orgCompFundingRound" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFundingAmount" className="font-medium mb-2 leading-none inline-block">Funding Amount</label>
                                    <select id="orgCompFundingAmount" className="w-full rounded-full border-slate-300">
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="orgCompHeadAddress" className="font-medium mb-2 leading-none inline-block">Headquarters Location Address</label>
                                <textarea id="orgCompHeadAddress" className="w-full rounded-[25px] resize-none border-slate-300 h-[150px]"></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="orgCompDesc" className="font-medium mb-2 leading-none inline-block">Company Description</label>
                                <textarea id="orgCompDesc" className="w-full rounded-[25px] resize-none border-slate-300 h-[150px]"></textarea>
                            </div>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8 mb-6">
                            <div className="mb-6">
                                <label htmlFor="orgCompDepartment" className="font-medium mb-2 leading-none inline-block">Organization Department</label>
                                <select id="orgCompDepartment" className="w-full rounded-full border-slate-300">
                                    <option value="Engineering">Engineering</option>
                                    <option value="Software">Software</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="orgCompType" className="font-medium mb-2 leading-none inline-block">Organization Type</label>
                                <select id="orgCompType" className="w-full rounded-full border-slate-300">
                                    <option value="Corporate">Corporate</option>
                                    <option value="Agency">Agency</option>
                                </select>
                            </div>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8 mb-6">
                            <div className="md:border border-slate-300 rounded-[30px] md:py-6 md:px-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h4>Social <span className="text-[#6D27F9]">Media</span></h4>
                                    <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => socialPopupOpen(true)}>Add</button>
                                </div>
                                <div className="flex flex-wrap justify-between">
                                    <div className="w-full lg:w-[47%] mb-6">
                                        <div className="iconGroup social">
                                            <input type="email" value="https://marketplace.somhako.com/dashboard" className="w-full rounded-full border-slate-300 focus:border-slate-300 focus:ring-0 focus:outline-0 focus:shadow-none" readOnly />
                                            <i className="fa-brands fa-behance iconGroup__icon"></i>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-[47%] mb-6">
                                        <div className="iconGroup social">
                                            <input type="email" value="https://marketplace.somhako.com/dashboard" className="w-full rounded-full border-slate-300 focus:border-slate-300 focus:ring-0 focus:outline-0 focus:shadow-none" readOnly />
                                            <i className="fa-brands fa-linkedin-in iconGroup__icon"></i>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-[47%] mb-6">
                                        <div className="iconGroup social">
                                            <input type="email" value="https://marketplace.somhako.com/dashboard" className="w-full rounded-full border-slate-300 focus:border-slate-300 focus:ring-0 focus:outline-0 focus:shadow-none" readOnly />
                                            <i className="fa-brands fa-stack-overflow iconGroup__icon"></i>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-[47%] mb-6">
                                        <div className="iconGroup social">
                                            <input type="email" value="https://marketplace.somhako.com/dashboard" className="w-full rounded-full border-slate-300 focus:border-slate-300 focus:ring-0 focus:outline-0 focus:shadow-none" readOnly />
                                            <i className="fa-brands fa-github iconGroup__icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8">
                            <div className="flex flex-wrap items-center justify-between mb-3">
                                <h5 className="font-medium leading-none">Gallery</h5>
                                <button type="button" className="my-2 border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => galleryImagesAdd(true)}>Add Images</button>
                            </div>
                            <div className="md:border border-slate-300 rounded-[30px] md:py-6 md:px-8 min-h-[250px] flex items-center justify-center cursor-pointer" onClick={() => galleryImagesAdd(true)}>
                                <Image
                                    src={uploadImages}
                                    alt="Upload"
                                    className="w-[100px] xl:w-[150px]"
                                />
                            </div>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                            >
                                <Masonry className="masonary_grid">
                                    <Image src={gallery_1} alt="Gallery" className="w-full" />
                                    <Image src={gallery_2} alt="Gallery" className="w-full" />
                                    <Image src={gallery_3} alt="Gallery" className="w-full" />
                                    <Image src={gallery_4} alt="Gallery" className="w-full" />
                                    <Image src={gallery_5} alt="Gallery" className="w-full" />
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    </div>
                </div>
            </main>
            <Transition.Root show={socialPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={socialPopupOpen}>
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
                                    <h4 className="leading-none font-semibold text-xl">Social Media</h4>
                                    <button type="button" className="leading-none" onClick={() => socialPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="pickSocial" className="font-medium mb-2 leading-none inline-block">Pick a social media platform</label>
                                        <select id="pickSocial" className="w-full rounded-full border-slate-300">
                                            <option value="Github">Github</option>
                                            <option value="Facebook">Facebook</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="chooseLangProfeciency" className="font-medium mb-2 leading-none inline-block">Enter social profile url</label>
                                        <input type="text" placeholder="https//www.xyzurl.com" className="w-full rounded-full border-slate-300" />
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]">
                                            Save
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
            <Transition.Root show={galleryImages} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={galleryImagesAdd}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Gallery</h4>
                                    <button type="button" className="leading-none" onClick={() => galleryImagesAdd(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center mb-6">
                                    <label htmlFor="uploadGallery" className="cursor-pointer w-[150px] h-[150px] rounded-lg bg-gray-200 p-2 flex items-center justify-center flex-col">
                                        <i className="fa-solid fa-upload mb-2 text-4xl"></i>
                                        <span className="text-sm">Upload Photos</span>
                                        <input type="file" id="uploadGallery" className="hidden" />
                                    </label>
                                </div>
                                <div className="w-full mb-6">
                                    <ResponsiveMasonry
                                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                                    >
                                        <Masonry className="masonary_grid">
                                            <Image src={gallery_1} alt="Gallery" className="w-full" />
                                            <Image src={gallery_2} alt="Gallery" className="w-full" />
                                            <Image src={gallery_3} alt="Gallery" className="w-full" />
                                            <Image src={gallery_4} alt="Gallery" className="w-full" />
                                            <Image src={gallery_5} alt="Gallery" className="w-full" />
                                        </Masonry>
                                    </ResponsiveMasonry>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Upload</button>
                                </div>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={changePassword} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={changePasswordOpen}>
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
                                    <h4 className="leading-none font-semibold text-xl">Change Password</h4>
                                    <button type="button" className="leading-none" onClick={() => changePasswordOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="orgOldPass" className="font-medium mb-2 leading-none inline-block">Old Password</label>
                                    <input type="password" id="orgOldPass" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="orgNewPass" className="font-medium mb-2 leading-none inline-block">New Password</label>
                                    <input type="password" id="orgNewPass" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="orgConfirmPass" className="font-medium mb-2 leading-none inline-block">Confirm Password</label>
                                    <input type="password" id="orgConfirmPass" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="text-center">
                                    <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Submit</button>
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