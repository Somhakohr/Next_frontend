import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Image from 'next/image';
import Link from 'next/link'
import JobCard from "../../components/job-card";
import googleIcon from '../../public/images/google-icon.png';
import gallery_1 from '../../public/images/gallery-1.png';
import gallery_2 from '../../public/images/gallery-2.png';
import gallery_3 from '../../public/images/gallery-3.png';
import gallery_4 from '../../public/images/gallery-4.png';
import gallery_5 from '../../public/images/gallery-5.png';

export default function OrganisationInformation() {
    return (
        <>
            <main className="py-8">
                <div className="container mb-12">
                    <button type="button" className="rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
                <div className="w-full max-w-[1200px] mx-auto mb-8 px-4">
                    <div className="bg-white shadow-normal rounded-[25px] flex flex-wrap">
                        <div className="w-full lg:max-w-[40%] companyMainImage flex flex-col justify-between rounded-[25px] p-6 relative after:content-[''] after:w-full after:h-full after:bg-white after:opacity-20 after:absolute after:left-0 after:top-0 after:rounded-[25px] min-h-[280px]">
                            <div className="flex relative z-[1] mb-8">
                                <div className="bg-white w-[100px] h-[100px] rounded-full flex items-center justify-center p-5 shadow-normal mt-[-66px]">
                                    <Image src={googleIcon} alt="Company" className="w-full h-full object-cover" />
                                </div>
                                <h1 className="font-semibold text-xl pl-2 flex-1">Google</h1>
                            </div>
                            <div className="relative z-[1]">
                                <div className="flex items-center flex-wrap justify-between">
                                    <div className="w-full sm:max-w-[48%] mt-3">
                                        <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                                            <i className="fa-solid fa-location-dot mr-2"></i>
                                            India
                                        </h4>
                                    </div>
                                    <div className="w-full sm:max-w-[48%] mt-3">
                                        <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                                            <i className="fa-solid fa-building mr-2"></i>
                                            Privately Held
                                        </h4>
                                    </div>
                                    <div className="w-full sm:max-w-[48%] mt-3">
                                        <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                                            <i className="fa-solid fa-users mr-2"></i>
                                            10,000 +
                                        </h4>
                                    </div>
                                    <div className="w-full sm:max-w-[48%] mt-3">
                                        <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                                            <i className="fa-solid fa-globe mr-2"></i>
                                            www.google.com
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:max-w-[60%] p-6">
                            <ul className="flex flex-wrap">
                                <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                                    <h4 className="font-semibold text-xl flex items-center mb-2">
                                        <i className="fa-solid fa-industry mr-2 text-[#60C3E2]"></i>
                                        Industry
                                    </h4>
                                    <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                                        <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                                        Recruitment / Staffing
                                    </p>
                                </li>
                                <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                                    <h4 className="font-semibold text-xl flex items-center mb-2">
                                        <i className="fa-solid fa-calendar-days mr-2 text-[#60C3E2]"></i>
                                        Founded Date
                                    </h4>
                                    <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                                        <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                                        2012
                                    </p>
                                </li>
                                <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                                    <h4 className="font-semibold text-xl flex items-center mb-2">
                                        <i className="fa-solid fa-address-card mr-2 text-[#60C3E2]"></i>
                                        Legal Name
                                    </h4>
                                    <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                                        <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                                        XYZ
                                    </p>
                                </li>
                                <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                                    <h4 className="font-semibold text-xl flex items-center mb-2">
                                        <i className="fa-solid fa-user mr-2 text-[#60C3E2]"></i>
                                        Founders
                                    </h4>
                                    <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                                        <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                                        Jhon, Catreina
                                    </p>
                                </li>
                                <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                                    <h4 className="font-semibold text-xl flex items-center mb-2">
                                        <i className="fa-solid fa-money-bill mr-2 text-[#60C3E2]"></i>
                                        Total Round of Funding
                                    </h4>
                                    <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                                        <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                                        4
                                    </p>
                                </li>
                                <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                                    <h4 className="font-semibold text-xl flex items-center mb-2">
                                        <i className="fa-solid fa-coins mr-2 text-[#60C3E2]"></i>
                                        Funding
                                    </h4>
                                    <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                                        <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                                        20,000,00
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[1100px] mx-auto px-4">
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                            <h2 className="text-white">Contacts</h2>
                        </div>
                        <div className="py-6 px-4">
                            <div className="flex flex-wrap items-center">
                                <div className="w-full md:max-w-[50%] py-8 md:px-8">
                                    <h3 className="text-xl mb-3">Contacts for google</h3>
                                    <div className="flex flex-wrap">
                                        <p className="text-[#646464] mr-4">Google.com</p>
                                        <Link href="#" target="_blank" className="mr-3 text-lg text-[#6D27F9] hover:text-black">
                                            <i className="fa-brands fa-linkedin"></i>
                                        </Link>
                                        <Link href="#" target="_blank" className="mr-3 text-lg text-[#6D27F9] hover:text-black">
                                            <i className="fa-brands fa-square-twitter"></i>
                                        </Link>
                                    </div>
                                </div>
                                <div className="w-full md:max-w-[50%] py-8 md:px-8 border-t md:border-t-0 md:border-l">
                                    <div className="bg-gray-100 rounded-[25px] py-6 px-[16%]">
                                        <h2 className="text-xl mb-3">Acquisition <br /><span className="text-[#5500FF] font-semibold">Team</span></h2>
                                        <button type="button" className="border border-[#6D27F9] rounded-full py-2 px-8 text-sm text-[#6D27F9] hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">Send Email <i className="fa-solid fa-envelope ml-1"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                            <h2 className="text-white">Company Description</h2>
                        </div>
                        <div className="py-6 px-4">
                            <article className="md:py-4 md:px-10">
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                </p>
                                <br/>
                                <p>
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </article>
                        </div>
                    </div>
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                            <h2 className="text-white">Gallery</h2>
                        </div>
                        <div className="py-6 px-4 md:px-10">
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
                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden">
                        <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                            <h2 className="text-white">All Jobs</h2>
                        </div>
                        <div className="py-6 px-4 md:px-10">
                            <div className="flex flex-wrap mx-[-10px]">
                                {/* <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <JobCard />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}