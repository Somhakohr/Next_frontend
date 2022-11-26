import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import canProfile from "../../public/images/can-profile.png";
import token from "../../public/images/token.png";

export default function CandidateProfile() {
    return (
        <>
            <main className="py-8">
                <div className="container">
                    <div className="flex flex-wrap mb-8">
                        <div className="w-full lg:max-w-[75%] lg:pr-6 mb-6 lg:mb-0">
                            <div className="bg-white shadow-normal rounded-[25px] flex flex-wrap">
                                <div className="w-full md:max-w-[30%] p-8">
                                    <Image src={canProfile} alt="User" className="w-full max-w-[250px] mx-auto" />
                                </div>
                                <div className="w-full md:max-w-[70%] p-8 relative bg-gradient-to-r from-[#A382E5] to-[#60C3E2] rounded-[25px] flex items-center">
                                    <aside>
                                        <h2 className="font-semibold text-xl md:text-3xl mb-2 text-white">
                                            Joseph Roger
                                        </h2>
                                        <p className="text-white font-light text-sm mb-6">
                                            Web Development
                                        </p>
                                        <ul className="flex flex-wrap">
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light lg:text-lg mb-3">
                                                <i className="fa-solid fa-envelope text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>xyz@email.com</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light lg:text-lg mb-3">
                                                <i className="fa-solid fa-phone text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>+91-9856985698</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light lg:text-lg mb-3">
                                                <i className="fa-solid fa-wallet text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>360000-4500008</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light lg:text-lg mb-3">
                                                <i className="fa-solid fa-briefcase text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>Fresher</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light lg:text-lg mb-3">
                                                <i className="fa-solid fa-location-dot text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>Remote</p>
                                            </li>
                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:max-w-[25%]">
                            <div className="bg-white shadow-normal rounded-[25px]">
                                <div className="flex items-center justify-between p-4">
                                    <h4 className="font-semibold text-xl mb-8 lg:mb-6"><span className="text-[#6D27F9] font-bold text-2xl">Wallet</span> <br />Info</h4>
                                    <div>
                                        <Image src={token} alt="Token" className="w-[80px] lg:w-[100px] " />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-[#7fc5f4] to-[#2568C9] rounded-[25px] pt-[4.7rem] pb-8 px-4 mt-[-40px]">
                                    <div className="bg-gradient-to-r from-[#a1c5fb] to-[#2568C9] rounded-lg shadow-lg p-5 text-white text-center font-semibold">
                                        <p className="my-2">Available Coins : 70</p>
                                        <p className="my-2">Remaining Coins : 30</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative pt-12 xl:pt-0 xl:px-20">
                        <div className="absolute left-0 top-[7px]">
                            <button type="button" className="rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center">
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        </div>
                        <div className="candidate_profile">
                            <Tabs>
                                <div className="candidate_profile__tabs">
                                    <TabList>
                                        <Tab>Bio</Tab>
                                        <Tab>Resume</Tab>
                                        <Tab>Skills</Tab>
                                        <Tab>Certifications</Tab>
                                        <Tab>Education</Tab>
                                        <Tab>Experience</Tab>
                                        <Tab>Achievements</Tab>
                                    </TabList>
                                </div>
                                <TabPanel>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="mb-6">
                                            <label htmlFor="title" className="font-medium mb-2 leading-none inline-block">Title</label>
                                            <input type="text" id="title" placeholder="Ex: Web Developer" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="summary" className="font-medium mb-2 leading-none inline-block">Summary</label>
                                            <textarea id="summary" placeholder="Something about yourself..." className="w-full rounded-[25px] h-[120px] border-slate-300 resize-none pb-6"></textarea>
                                            <span className="absolute right-3 bottom-3 text-gray-500">20/300</span>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full lg:w-[47%] mb-6">
                                                <label htmlFor="preferJobType" className="font-medium mb-4 leading-none inline-block">Preferred Job Type</label>
                                                <input id="preferJobType" type="text" placeholder="Ex: Fulltime" className="w-full rounded-full border-slate-300" />
                                            </div>
                                            <div className="w-full lg:w-[47%] mb-6">
                                                <div className="flex flex-wrap items-center justify-between mb-2">
                                                    <label htmlFor="noticePeriod" className="font-medium mb-2 leading-none inline-block">Notice Period <span className="text-gray-500">(Optional)</span></label>
                                                    <label htmlFor="noticeServe" className="flex items-center text-[#7E7E7E] text-sm">
                                                        <input type="checkbox" id="noticeServe" className="mr-2" />
                                                        Serving or Not?
                                                    </label>
                                                </div>
                                                <select id="noticePeriod" className="w-full rounded-full border-slate-300">
                                                    <option value="Immediate Joiner">Immediate Joiner</option>
                                                    <option value="15 days">15 days</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full lg:w-[47%] mb-6">
                                                <label htmlFor="preferLocation" className="font-medium mb-4 leading-none inline-block">Preferred Location</label>
                                                <select id="preferLocation" className="w-full rounded-full border-slate-300">
                                                    <option value="India">India</option>
                                                    <option value="Japan">Japan</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[47%] mb-6">
                                                <label htmlFor="salary" className="font-medium mb-4 leading-none inline-block">Salary</label>
                                                <input id="salary" type="text" placeholder="Ex: 2 Lpa" className="w-full rounded-full border-slate-300" />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap justify-between">
                                            <div className="w-full lg:w-[47%] mb-6">
                                                <label htmlFor="yearsOfExp" className="font-medium mb-4 leading-none inline-block">Years of Experience</label>
                                                <select id="yearsOfExp" className="w-full rounded-full border-slate-300">
                                                    <option value="5-10 years">5-10 years</option>
                                                    <option value="10-15 years">10-15 years</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[47%] mb-6">
                                                <div className="flex flex-wrap items-center justify-between mb-2">
                                                    <label htmlFor="languages" className="font-medium mb-2 leading-none inline-block">Language</label>
                                                    <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">Add</button>
                                                </div>
                                                <input id="languages" type="text" placeholder="You can add multiple Languages" className="w-full rounded-full border-slate-300" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8">
                                        <div className="border border-slate-300 rounded-[30px] py-6 px-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4>Social <span className="text-[#6D27F9]">Media</span></h4>
                                                <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">Add</button>
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
                                </TabPanel>
                                <TabPanel>
                                    Resume
                                </TabPanel>
                                <TabPanel>
                                    Skills
                                </TabPanel>
                                <TabPanel>
                                    Certifications
                                </TabPanel>
                                <TabPanel>
                                    Education
                                </TabPanel>
                                <TabPanel>
                                    Experience
                                </TabPanel>
                                <TabPanel>
                                    Achivements
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}