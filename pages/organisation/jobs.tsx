import React from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from "next/image";
import Sidebar from "../../components/org-sidebar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrgJobsCard from "../../components/org-jobs-card";
import noGraphic from '../../public/images/no-found-graphic.png';

export default function OrganisationAllJobs() {
    const [langPopup, langPopupOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    return (
        <>
            <main className="py-8">
                <div className="container flex flex-wrap items-start">
                    <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
                        <Sidebar />
                    </div>
                    <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6 orgJobsTabs">
                        <Tabs>
                            <div className="bg-white border border-teal-400 rounded-[30px] shadow-lg py-4 px-10 mb-6">
                                <TabList>
                                    <Tab>Post New Job</Tab>
                                    <Tab>Active Job</Tab>
                                    <Tab>Archived Job</Tab>
                                    <Tab>Drafted Job</Tab>
                                    <Tab>In-Review Job</Tab>
                                    <Tab>Closed Job</Tab>
                                </TabList>
                            </div>
                            <TabPanel>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">Basic Details</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap w-full lg:mx-[-15px]">
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobTitle" className="font-medium mb-2 leading-none inline-block">Job Title</label>
                                                <input id="addJobTitle" type="password" className="w-full rounded-full border-slate-300" />
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobDep" className="font-medium mb-2 leading-none inline-block">Department</label>
                                                <select id="addJobDep" className="w-full rounded-full border-slate-300">
                                                    <option value="Department 1">Department 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobRole" className="font-medium mb-2 leading-none inline-block">Role</label>
                                                <input id="addJobRole" type="password" className="w-full rounded-full border-slate-300" />
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobExp" className="font-medium mb-2 leading-none inline-block">Experience</label>
                                                <select id="addJobExp" className="w-full rounded-full border-slate-300">
                                                    <option value="Experience 1">Experience 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobType" className="font-medium mb-2 leading-none inline-block">Job Type</label>
                                                <select id="addJobType" className="w-full rounded-full border-slate-300">
                                                    <option value="JobType 1">JobType 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobExpLevel" className="font-medium mb-2 leading-none inline-block">Experience Level</label>
                                                <select id="addJobExpLevel" className="w-full rounded-full border-slate-300">
                                                    <option value="Experience Level 1">Experience Level 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobDeadLine" className="font-medium mb-2 leading-none inline-block">Application Deadline</label>
                                                <input type="date" id="addJobDeadLine" className="w-full rounded-full border-slate-300" />
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobIndustry" className="font-medium mb-2 leading-none inline-block">Industry</label>
                                                <select id="addJobIndustry" className="w-full rounded-full border-slate-300">
                                                    <option value="Industry 1">Industry 1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">Description</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <textarea className="w-full rounded-[25px] min-h-[250px] border-slate-300"></textarea>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">What are we looking for</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <textarea className="w-full rounded-[25px] min-h-[250px] border-slate-300"></textarea>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">Benefits</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap w-full lg:mx-[-15px]">
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobOfferedSalary" className="font-medium mb-2 leading-none inline-block">Offered Salary</label>
                                                <div className="w-full flex flex-wrap">
                                                    <input id="addJobOfferedSalary" type="password" className="w-[55%] mr-3 rounded-full border-slate-300" />
                                                    <select className="w-[40%] rounded-full border-slate-300">
                                                        <option value="Monthly">Monthly</option>
                                                        <option value="Yearly">Yearly</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobCurrency" className="font-medium mb-2 leading-none inline-block">Currency</label>
                                                <select id="addJobCurrency" className="w-full rounded-full border-slate-300">
                                                    <option value="Currency 1">Currency 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobPaidRelocation" className="font-medium mb-2 leading-none inline-block">Paid Relocation</label>
                                                <select id="addJobPaidRelocation" className="w-full rounded-full border-slate-300">
                                                    <option value="Paid Relocation 1">Paid Relocation 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobBonus" className="font-medium mb-2 leading-none inline-block">Bonus</label>
                                                <select id="addJobBonus" className="w-full rounded-full border-slate-300">
                                                    <option value="Bonus">Bonus 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobStockOptions" className="font-medium mb-2 leading-none inline-block">Stock Options</label>
                                                <select id="addJobStockOptions" className="w-full rounded-full border-slate-300">
                                                    <option value="Stock Options 1">Stock Options 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobVisaSponsorship" className="font-medium mb-2 leading-none inline-block">Visa Sponsorship</label>
                                                <select id="addJobVisaSponsorship" className="w-full rounded-full border-slate-300">
                                                    <option value="Visa Sponsorship 1">Visa Sponsorship 1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">Additional Information</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap w-full lg:mx-[-15px]">
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobVacancy" className="font-medium mb-2 leading-none inline-block">Vacancy</label>
                                                <select id="addJobVacancy" className="w-full rounded-full border-slate-300">
                                                    <option value="Vacancy 1">Vacancy 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobWorktype" className="font-medium mb-2 leading-none inline-block">Worktype</label>
                                                <select id="addJobWorktype" className="w-full rounded-full border-slate-300">
                                                    <option value="Worktype 1">Worktype 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobLocation" className="font-medium mb-2 leading-none inline-block">Location</label>
                                                <select id="addJobLocation" className="w-full rounded-full border-slate-300">
                                                    <option value="Location 1">Location 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:px-[15px] mb-6">
                                                <div className="flex flex-wrap items-center justify-between mb-2">
                                                    <label htmlFor="addJobLanguages" className="font-medium mb-2 leading-none inline-block">Language</label>
                                                    <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => langPopupOpen(true)}>Add</button>
                                                </div>
                                                <div className="w-full rounded-[25px] border border-slate-300 p-2 min-h-[42px] relative flex items-start overflow-x-auto">
                                                    <p className="relative bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2">
                                                        English
                                                        <span className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]">
                                                            <i className="fa-solid fa-star ml-1"></i>
                                                            <i className="fa-solid fa-star ml-1"></i>
                                                            <i className="fa-solid fa-star ml-1"></i>
                                                            <i className="fa-solid fa-star ml-1"></i>
                                                        </span>
                                                        <button type="button" className="absolute right-[0] top-[-5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded">
                                                            <i className="fa-solid fa-xmark"></i>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">Skills and Qualification</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap w-full lg:mx-[-15px]">
                                            <div className="w-full lg:w-[50%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobReccomSkills" className="font-medium mb-2 leading-none inline-block">Recommended Skills</label>
                                                <select id="addJobReccomSkills" className="w-full rounded-full border-slate-300">
                                                    <option value="Skills 1">Skills 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[50%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobpreffSkills" className="font-medium mb-2 leading-none inline-block">Preffered Skills</label>
                                                <select id="addJobpreffSkills" className="w-full rounded-full border-slate-300">
                                                    <option value="Skills 1">SKills 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[50%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobQualification" className="font-medium mb-2 leading-none inline-block">Qualification</label>
                                                <select id="addJobQualification" className="w-full rounded-full border-slate-300">
                                                    <option value="Qualification 1">Qualification 1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center">
                                    <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 my-2 mr-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">
                                    Post
                                    </button>
                                    <button type="submit" className="border border-[#6D27F9] font-bold rounded-full py-2.5 px-6 my-2 mr-6 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">Save as Draft</button>
                                    <button type="button" className="text-[#6D27F9] my-2 font-bold">Preview</button>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap mx-[-10px]">
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-20 px-4 md:px-10">
                                        <aside className="flex flex-wrap items-center justify-center w-full max-w-[500px] mx-auto">
                                            <article className="w-full md:max-w-[60%] my-6">
                                                <h4 className="font-bold text-xl md:text-2xl mb-6">
                                                    No Jobs!
                                                </h4>
                                                <p className="text-lg font-medium">There are no <span className="text-[#6D27F9]">Active</span> Jobs</p>
                                            </article>
                                            <div className="w-full md:max-w-[40%]">
                                                <Image src={noGraphic} alt="No Data" width={150} />
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap mx-[-10px]">
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-20 px-4 md:px-10">
                                        <aside className="flex flex-wrap items-center justify-center w-full max-w-[500px] mx-auto">
                                            <article className="w-full md:max-w-[60%] my-6">
                                                <h4 className="font-bold text-xl md:text-2xl mb-6">
                                                    No Jobs!
                                                </h4>
                                                <p className="text-lg font-medium">There are no <span className="text-[#6D27F9]">Archived</span> Jobs</p>
                                            </article>
                                            <div className="w-full md:max-w-[40%]">
                                                <Image src={noGraphic} alt="No Data" width={150} />
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap mx-[-10px]">
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-20 px-4 md:px-10">
                                        <aside className="flex flex-wrap items-center justify-center w-full max-w-[500px] mx-auto">
                                            <article className="w-full md:max-w-[60%] my-6">
                                                <h4 className="font-bold text-xl md:text-2xl mb-6">
                                                    No Jobs!
                                                </h4>
                                                <p className="text-lg font-medium">There are no <span className="text-[#6D27F9]">Drafted</span> Jobs</p>
                                            </article>
                                            <div className="w-full md:max-w-[40%]">
                                                <Image src={noGraphic} alt="No Data" width={150} />
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap mx-[-10px]">
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-20 px-4 md:px-10">
                                        <aside className="flex flex-wrap items-center justify-center w-full max-w-[500px] mx-auto">
                                            <article className="w-full md:max-w-[60%] my-6">
                                                <h4 className="font-bold text-xl md:text-2xl mb-6">
                                                    No Jobs!
                                                </h4>
                                                <p className="text-lg font-medium">There are no <span className="text-[#6D27F9]">In-review</span> Jobs</p>
                                            </article>
                                            <div className="w-full md:max-w-[40%]">
                                                <Image src={noGraphic} alt="No Data" width={150} />
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap mx-[-10px]">
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                            <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                                <OrgJobsCard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="py-20 px-4 md:px-10">
                                        <aside className="flex flex-wrap items-center justify-center w-full max-w-[500px] mx-auto">
                                            <article className="w-full md:max-w-[60%] my-6">
                                                <h4 className="font-bold text-xl md:text-2xl mb-6">
                                                    No Jobs!
                                                </h4>
                                                <p className="text-lg font-medium">There are no <span className="text-[#6D27F9]">Closed</span> Jobs</p>
                                            </article>
                                            <div className="w-full md:max-w-[40%]">
                                                <Image src={noGraphic} alt="No Data" width={150} />
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Transition.Root show={langPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={langPopupOpen}>
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
                                    <h4 className="leading-none font-semibold text-xl">Language</h4>
                                    <button type="button" className="leading-none" onClick={() => langPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="enterLang" className="font-medium mb-2 leading-none inline-block">Enter Language</label>
                                        <input id="enterLang" type="text" placeholder="Ex: English" className="w-full rounded-full border-slate-300" />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="chooseLangProfeciency" className="font-medium mb-2 leading-none inline-block">Choose Language Profeciency</label>
                                        <select id="chooseLangProfeciency" className="w-full rounded-full border-slate-300">
                                            <option value="Elementary profeciency">Elementary profeciency</option>
                                            <option value="Limited profeciency">Limited profeciency</option>
                                            <option value="Professional profeciency">Professional profeciency</option>
                                            <option value="Native or bilingual profeciency">Native or bilingual profeciency</option>
                                        </select>
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
        </>
    )
}