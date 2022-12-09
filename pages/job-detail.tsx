import Image from "next/image";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import JobCard from "../components/job-card";
import Slider from "react-slick";
import googleImg from "../public/images/google-icon.png";

export default function JobDetail() {
    const [mainShareJob, mainShareJobOpen] = useState(false)
    const cancelButtonRef = useRef(null)

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
                  slidesToShow: 2.2
                }
            },
            {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1.2
                }
            },
        ]
    };
    const featuredInfo = [
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Experience',
            desc: '5+ years'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Job Type',
            desc: 'Full Time'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Experience Level',
            desc: 'Senior'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Location',
            desc: 'Gurgaon'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Work Type',
            desc: 'On Site'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Qualification',
            desc: 'BCA'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Offered Salary',
            desc: 'Rs 250000/year'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Industry',
            desc: 'Web and IT'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Department',
            desc: 'Design'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Application Deadline',
            desc: 'Nov 30, 2023'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Language',
            desc: 'English (Intermediate)'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Working Hours',
            desc: '9'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Vacancy',
            desc: 'None'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Bonus',
            desc: 'NA'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Stock Options',
            desc: 'NA'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Visa Sponsership',
            desc: 'None'
        },
        {
            icon: <i className="fa-solid fa-briefcase"></i>,
            title: 'Paid Relocation',
            desc: 'None'
        },
    ];
  return (
    <>
    <main className="py-8">
        <section className="container">
           <div className="flex flex-wrap mb-8">
                <div className="w-full lg:max-w-[30%] 2xl:max-w-[20%] mb-6 lg:mb-0 relative bg-white shadow-lg rounded-[25px] py-6 px-8 text-center min-h-[350px] flex flex-col justify-between items-center">
                    <aside>
                        <div className="w-[150px] h-[150px] mx-auto block mb-4 rounded-full p-4 shadow-insetview flex items-center justify-center">
                            <div className="w-full h-full rounded-full bg-white shadow-lg p-5">
                                <Image src={googleImg} alt="Company Name" />
                            </div>
                        </div>
                        <h2 className="font-semibold text-2xl">Google</h2>
                    </aside>
                    <button type="button" className="w-full font-semibold bg-white shadow-normal rounded-lg py-2 px-4 hover:bg-[#6D27F9] hover:text-white">
                        Comapny Details
                    </button>
                </div>
                <div className="w-full lg:max-w-[70%] 2xl:max-w-[80%] bg-white shadow-lg rounded-[25px] py-6 px-6 md:px-10">
                    <div className="flex flex-wrap md:items-center justify-between flex-col-reverse md:flex-row mb-4">
                        <aside>
                            <h3 className="font-bold text-xl mb-2">Web Developer</h3>
                            <p className="text-[#7e7e7e]">
                                <span>5 Days ago</span>
                                <span className="mx-3">|</span>
                                <span>Job ID:PD-8354</span>
                            </p>
                        </aside>
                        <aside className="flex items-center flex-wrap mb-4 md:mb-0">
                            <button type="button" className="flex items-center mr-8" onClick={() => mainShareJobOpen(true)}>
                                <span className="mr-2">Share Job</span>
                                <i className="fa-solid fa-share text-[#6D27F9]"></i>
                            </button>
                            <button type="button" className="bg-white py-1.5 px-4 text-sm rounded-full border border-[#6D27F9] hover:bg-[#6D27F9] hover:text-white">Save Job</button>
                        </aside>
                    </div>
                    <button type="button" className="mb-8 bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Apply Now</button>
                    <div>
                        <Slider {...settings} className="sliderArrows">
                            {featuredInfo.map((featuredInfo, i) => (
                                <div className="p-2" key={i}>
                                    <div className="shadow-normal rounded-[25px]">
                                        <div className="flex items-center">
                                            <div className="w-[70px] py-3 mr-4 bg-white shadow flex items-center justify-center rounded-tl-[25px] rounded-br-[10px] text-[20px] text-[#A382E5]">
                                                {featuredInfo.icon}
                                            </div>
                                            <p className="grow font-bold text-sm lg:text-md">{featuredInfo.title}</p>
                                        </div>
                                        <div className="py-6 px-8">
                                            <p className="text-[#7e7e7e] text-sm lg:text-md font-light">{featuredInfo.desc}</p>
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
                        <article className="text-[#7e7e7e] font-light">
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                            <br />
                            <ul>
                                <li>
                                What is Lorem Ipsum?
                                </li>
                                <li>
                                Why do we use it?
                                </li>
                                <li>
                                What is Lorem Ipsum?
                                </li>
                                <li>
                                Why do we use it?
                                </li>
                                <li>
                                What is Lorem Ipsum?
                                </li>
                                <li>
                                Why do we use it?
                                </li>
                            </ul>
                        </article>
                    </div>
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                        <h2 className="text-white">What’s the Job</h2>
                    </div>
                    <div className="py-4 px-6 md:px-10">
                        <article className="text-[#7e7e7e] font-light">
                            <ul>
                                <li>
                                What is Lorem Ipsum?
                                </li>
                                <li>
                                Why do we use it?
                                </li>
                                <li>
                                What is Lorem Ipsum?
                                </li>
                                <li>
                                Why do we use it?
                                </li>
                                <li>
                                What is Lorem Ipsum?
                                </li>
                                <li>
                                Why do we use it?
                                </li>
                            </ul>
                        </article>
                    </div>
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                        <h2 className="text-white">Skills</h2>
                    </div>
                    <div className="py-4 px-6 md:px-10">
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
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-6 md:px-10">
                        <h2 className="text-white">Similar to this Job</h2>
                    </div>
                    <div className="py-4 px-6 md:px-10">
                        <div className="flex flex-wrap mx-[-10px]">
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
                            </div>
                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                <JobCard />
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </section>
    </main>
    <Transition.Root show={mainShareJob} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={mainShareJobOpen}>
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
                            <button type="button" className="leading-none" onClick={() => mainShareJobOpen(false)}>
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