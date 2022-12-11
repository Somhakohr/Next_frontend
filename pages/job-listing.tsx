import {useState} from 'react';
import JobCard from "../components/job-card";

export default function JobListing() {
    const [sidebarToggle, setsidebarToggle] = useState(false);
    return (
        <>
            <main className="py-8">
                <section className="container flex flex-wrap">
                    <div className={sidebarToggle ? 'fixed z-[9] left-0 top-0 w-full h-full bg-[#0000006b] block' : 'fixed z-[9] left-0 top-0 w-full h-full bg-[#0000006b] hidden'}></div>
                    <div className={sidebarToggle ? 'w-full lg:max-w-[300px] p-4 lg:p-0 fixed z-10 lg:static right-0 bottom-0 text-right lg:text-left' : 'w-auto lg:max-w-[300px] p-4 lg:p-0 fixed z-10 lg:static right-0 bottom-0 text-right lg:text-left'}>
                        <div className={sidebarToggle ? 'block overflow-hidden h-full bg-white shadow-normal border border-teal-400 rounded-[30px] mb-[15px] lg:mb-0' : 'hidden lg:block overflow-hidden h-full bg-white shadow-normal border border-teal-400 rounded-[30px] mb-[15px] lg:mb-0'}>
                            <form>
                                <div className="pt-6 px-6">
                                    <div className="iconGroup">
                                        <input type="search" placeholder="Job title or keyword" className="w-full rounded-full border-[#6D27F9]" />
                                        <i className="fa-solid fa-search iconGroup__icon"></i>
                                    </div>
                                </div>
                                <div className="p-6 max-h-[62vh] lg:max-h-[560px] overflow-y-auto">
                                    <div className="w-full mb-5">
                                        <select id="joblevel" placeholder="Level" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="Junior">Junior</option>
                                            <option value="Senior">Senior</option>
                                        </select>
                                        <ul className="pt-4">
                                            <li className="py-2 px-4 flex items-center justify-between text-sm">
                                                <p>
                                                    Full time <span className="text-[#6D27F9]"> (20) </span>
                                                </p>
                                                <span className="cursor-pointer">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </span>
                                            </li>
                                            <li className="py-2 px-4 flex items-center justify-between text-sm">
                                                <p>
                                                    Contract <span className="text-[#6D27F9]"> (10) </span>
                                                </p>
                                                <span className="cursor-pointer">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-full mb-5">
                                        <select id="jobtype" placeholder="Job Type" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="Full time">Full time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                    <div className="w-full mb-4">
                                        <select id="joblocation" placeholder="Location" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="India">India</option>
                                            <option value="Japan">Japan</option>
                                        </select>
                                    </div>
                                    <div className="w-full mb-4">
                                        <select id="jobskills" placeholder="Skills" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="PHP">PHP</option>
                                            <option value="HTML">HTML</option>
                                        </select>
                                    </div>
                                    <div className="w-full mb-4">
                                        <select id="jobindustry" placeholder="Industry" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="Staffing">Staffing</option>
                                            <option value="Engg">Engg</option>
                                        </select>
                                    </div>
                                    <div className="w-full mb-4">
                                        <select id="Jobfunctions" placeholder="Functions" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="Engg">Engg</option>
                                            <option value="Product">Product</option>
                                        </select>
                                    </div>
                                    <div className="w-full mb-4">
                                        <select id="Jobworkplace" placeholder="Workplace" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="Onsite">Onsite</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                    </div>
                                    <div className="w-full mb-4">
                                        <select id="Jobexperience" placeholder="Experience" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0">
                                            <option value="5-10 years">5-10 years</option>
                                            <option value="10-15 years">10-15 years</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button type="button" onClick={() => setsidebarToggle(!sidebarToggle)} className="lg:hidden shadow-normal bg-[#6D27F9] text-white rounded-full w-[60px] h-[60px] text-2xl">
                            <i className="fa-solid fa-filter"></i>
                        </button>
                    </div>
                    <div className="w-full lg:max-w-[calc(100%-300px)] lg:pl-4">
                        <div className="bg-white shadow-normal border rounded-[30px] p-6">
                            <h2 className="font-semibold text-xl md:text-3xl mb-4 text-center md:text-left">Based on your Recent Searches</h2>
                            <div className="flex flex-wrap items-center justify-between">
                                <p className="w-full md:max-w-[40%] my-2 text-center md:text-left">
                                    Showing 50 results
                                </p>
                                <div className="w-full md:max-w-[60%] flex items-center justify-center text-right mb-4">
                                    <span className="md:w-[calc(100%-150px)] mr-2">
                                    Date Posted: 
                                    </span>
                                    <select className="md:w-[150px] border-0 rounded-full text-[#6D27F9]">
                                        <option value="All Time">All Time</option>
                                        <option value="Last 1 Hour">Last 1 Hour</option>
                                    </select>
                                </div>
                                <div className="overflow-auto lg:max-h-[485px] px-[10px]">
                                    {/* <div className="flex flex-wrap mx-[-10px]">
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
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}