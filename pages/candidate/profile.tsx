import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import userImg from "../../public/images/user-image.png";
import token from "../../public/images/token.png";
import skillsGraphic from "../../public/images/skills-graphic.png";
import certificateGraphic from "../../public/images/certificate-graphic.png";
import educationGraphic from "../../public/images/education-graphic.png";
import expGraphic from "../../public/images/exp-graphic.png";
import achievementsGraphic from "../../public/images/achievements-graphic.png";
import { useStore } from "../../constants/code";
import shallow from "zustand/shallow";

export default function CandidateProfile(props) {

    const [userName, updateUserName] = useStore(
        (state) => [state.userName, state.updateUserName],
        shallow
    )

    const [userImg, updateUserImg] = useStore(
        (state) => [state.userImg, state.updateUserImg],
        shallow
    )

    const [userType, updateUserType] = useStore(
        (state) => [state.userType, state.updateUserType],
        shallow
    )

    const [userObj, updateUserObj] = useStore(
        (state) => [state.userObj, state.updateUserObj],
        shallow
    )

    const [userProfile, updateUserProfile] = useStore(
        (state) => [state.userProfile, state.updateUserProfile],
        shallow
    )
    
    const [accessToken, updateAccessToken] = useStore(
        (state) => [state.accessToken, state.updateAccessToken],
        shallow
    )
    
    const [country, updateCountry] = useStore(
        (state) => [state.country, state.updateCountry],
        shallow
    )
    
    const { router } = props; 

    const [langPopup, langPopupOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [socialPopup, socialPopupOpen] = useState(false)
    const [skillsPopup, skillsPopupOpen] = useState(false)
    const [certificationPopup, certificationPopupOpen] = useState(false)
    const [educationPopup, educationPopupOpen] = useState(false)
    const [expPopup, expPopupOpen] = useState(false)
    const [achievementsPopup, achievementsPopupOpen] = useState(false)

    //bio state
    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [preJobtype,setPreJobType] = useState('')
    const [preLocation,setPreLocation] = useState('')
    const [salary,setSalary] = useState('')
    const [yearsOfExp,setYearsOfExp] = useState('')

    useEffect(() => {
        console.log(title)
        console.log(summary)
        // userProfile["title"]=title
    }, [title,summary])
    

    return (
        <>
            <main className="py-8">
                <div className="container">
                    <div className="flex flex-wrap mb-8">
                        <div className="w-full lg:max-w-[75%] xl:max-w-[80%] lg:pr-6 mb-6 lg:mb-0">
                            <div className="bg-white shadow-normal rounded-[25px] flex flex-wrap">
                                <div className="w-[310px] mx-auto p-8">
                                    <div className="userBgImage min-h-[268px] flex items-center justify-center">
                                        <Image src={userImg} width={220} height={220} alt="User" className="w-[220px] h-[220px] rounded-full object-cover mx-auto " />
                                    </div>
                                </div>
                                <div className="w-full md:max-w-[calc(100%-310px)] p-6 xl:p-8 relative bg-gradient-to-r from-[#A382E5] to-[#60C3E2] rounded-[25px] flex items-center">
                                    <aside>
                                        <h2 className="font-semibold text-xl md:text-3xl mb-2 text-white">
                                            {userName}
                                        </h2>
                                        <p className="text-white font-light text-sm mb-6">
                                           {userProfile["title"]}
                                        </p>
                                        <ul className="flex flex-wrap">
                                            {userObj["email"] &&
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                                                <i className="fa-solid fa-envelope xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{userObj["email"]}</p>
                                            </li>
                                            }

                                            {userObj["mobile"] &&
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                                                <i className="fa-solid fa-phone xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{userObj["mobile"]}</p>
                                            </li>
                                            }

                                            {userProfile["salary"] &&
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                                                <i className="fa-solid fa-wallet xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{userProfile["salary"]}</p>
                                            </li>
                                            }

                                            {userProfile["prejobtype"] &&
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                                                <i className="fa-solid fa-briefcase xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{userProfile["prejobtype"]}</p>
                                            </li>
                                            }

                                            {userProfile["prelocation"] &&
                                            <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                                                <i className="fa-solid fa-location-dot xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{userProfile["prelocation"]}</p>
                                            </li>
                                            }

                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:max-w-[25%] xl:max-w-[20%]">
                            <div className="bg-white shadow-normal rounded-[25px]">
                                <div className="flex items-center justify-between p-4">
                                    <h4 className="font-semibold text-xl mb-8 lg:mb-6"><span className="text-[#6D27F9] font-bold text-2xl">Wallet</span> <br />Info</h4>
                                    <div>
                                        <Image src={token} alt="Token" className="w-[80px] lg:w-[100px] " />
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-[#7fc5f4] to-[#2568C9] rounded-[25px] pt-[6rem] pb-8 px-4 mt-[-40px]">
                                    <div className="bg-gradient-to-r from-[#a1c5fb] to-[#2568C9] rounded-lg shadow-lg p-5 text-white text-center font-semibold">
                                        {userObj["paddress"]?
                                        <>
                                        <p className="my-2">Available Coins : 70</p>
                                        <p className="my-2">Remaining Coins : 30</p>
                                        </>:
                                        <>
                                        <p className="my-2">Connect</p>
                                        <p className="my-2">Wallet</p>

                                        </>}
                                        
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
                                            <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Ex: Web Developer" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="summary" className="font-medium mb-2 leading-none inline-block">Summary</label>
                                            <textarea id="summary" placeholder="Something about yourself..." className="w-full rounded-[25px] h-[120px] border-slate-300 resize-none pb-6" value={summary} onChange={(e)=>setSummary(e.target.value)} ></textarea>
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
                                                    <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => langPopupOpen(true)}>Add</button>
                                                </div>
                                                {/* <input id="languages" type="text" placeholder="You can add multiple Languages" className="w-full rounded-full border-slate-300" /> */}
                                                <div className="w-full rounded-[25px] border border-slate-300 p-2 min-h-[42px] relative flex items-start overflow-x-auto">
                                                    <p className="relative bg-[#289BDC] text-white rounded-full py-2 px-3 flex items-center text-[14px] mr-2">
                                                        English
                                                        <span className="pl-1 text-[10px] flex text-yellow-300 mt-[2px]">
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
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8">
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
                                </TabPanel>
                                <TabPanel>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="mb-6">
                                            <label className="font-medium mb-4 leading-none inline-block">Resume</label>
                                            <div className="flex flex-col">
                                                <label htmlFor="uploadCV" className="mb-2 w-[150px] p-2.5 px-4 border border-dashed border-teal-500 rounded-md text-sm text-center font-semibold cursor-pointer">
                                                    <span>Upload <i className="fa-solid fa-cloud-arrow-up ml-1 text-[#6D27F9]"></i></span>
                                                    <input type="file" id="uploadCV" className="hidden" />
                                                </label>
                                                <span className="text-[#7e7e7e] text-[12px]">Supported Formats: doc, docx, rtf, pdf, upto 2 MB</span>
                                            </div>
                                            <div className="flex flex-wrap items-center justify-between">
                                                <aside className="mr-2">
                                                    <p className="text-sm relative pr-6 mb-1">
                                                        <b className="text-[#7E7E7E]">PDF : </b>
                                                        <span className="text-[#6D27F9]">web-developer-cv.pdf</span>
                                                        <button type="button" className="absolute right-0 top-0 text-red-500">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </p>
                                                    <p className="text-[#7e7e7e] text-[12px]">Uploaded on : 11 Nov 2022</p>
                                                </aside>
                                                <button type="button" className="my-2 text-[#7E7E7E] text-sm">
                                                    Download Resume
                                                    <i className="fa-solid fa-download text-xl ml-2 text-[#6D27F9]"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="cvHeadline" className="font-medium mb-2 leading-none inline-block">Resume Headline</label>
                                            <input type="text" id="cvHeadline" placeholder="Ex: Web Developer 5 years of experence" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="font-medium leading-none inline-block">Key Skills</label>
                                            <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => skillsPopupOpen(true)}>Add</button>
                                        </div>
                                        <p className="text-[#7E7E7E] text-sm font-light mb-4">Add skills with relevent expertise</p>
                                        <Image src={skillsGraphic} alt="Skills" className="w-full" />
                                        <p className="text-[#7E7E7E] mb-2">Skills</p>
                                        <div className="w-full rounded-[25px] border border-slate-300 p-6 min-h-[200px]">
                                            <div className="flex flex-wrap items-start">
                                                <p className="relative bg-[#289BDC] text-white rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3">
                                                    English
                                                    <span className="pl-1 text-[10px] flex text-yellow-300 mt-[2px]">
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
                                </TabPanel>
                                <TabPanel>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="font-medium leading-none inline-block">Certifications</label>
                                            <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => certificationPopupOpen(true)}>Add</button>
                                        </div>
                                        <p className="text-[#7E7E7E] text-sm font-light mb-4">Add certifications here</p>
                                        <Image src={certificateGraphic} alt="Certifications" className="w-full" />
                                        <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                            <article>
                                                <h4 className="font-semibold mb-1 text-lg">Advanced Python</h4>
                                                <p className="text-[#6D27F9] font-medium mb-2">Google</p>
                                                <button type="button" className="border border-[#6D27F9] rounded-full py-1.5 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">Show Certificate</button>
                                            </article>
                                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                                                <button type="button" className="text-[#6D27F9] mx-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button type="button" className="text-red-500 mx-2">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="font-medium leading-none inline-block">Education</label>
                                            <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => educationPopupOpen(true)}>Add</button>
                                        </div>
                                        <p className="text-[#7E7E7E] text-sm font-light mb-4">Add education background</p>
                                        <Image src={educationGraphic} alt="Education" className="w-full" />
                                        <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                            <article>
                                                <h4 className="font-semibold mb-1 text-lg">Btech</h4>
                                                <p className="text-[#6D27F9] font-medium mb-2">IT University, Bangalore</p>
                                                <p className="text-[#7e7e7e] font-light text-sm mb-2">Started Date:- Aug-2011 <br/> End Date:- July-2012</p>
                                                <h6 className="font-medium">About</h6>
                                                <p className="text-[#7e7e7e] font-light text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                            </article>
                                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                                                <button type="button" className="text-[#6D27F9] mx-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button type="button" className="text-red-500 mx-2">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="font-medium leading-none inline-block">Experience</label>
                                            <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => expPopupOpen(true)}>Add</button>
                                        </div>
                                        <p className="text-[#7E7E7E] text-sm font-light mb-4">Add experience here</p>
                                        <Image src={expGraphic} alt="Experience" className="w-full" />
                                        <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                            <article>
                                                <h4 className="font-semibold mb-1 text-lg">Web Developer</h4>
                                                <p className="text-[#6D27F9] font-medium mb-2">Fintech Info, Bangalore</p>
                                                <p className="text-[#7e7e7e] font-light text-sm mb-2">Started Date:- Aug-2011 <br/> End Date:- July-2012</p>
                                                <h6 className="font-medium">About</h6>
                                                <p className="text-[#7e7e7e] font-light text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                            </article>
                                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                                                <button type="button" className="text-[#6D27F9] mx-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button type="button" className="text-red-500 mx-2">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="font-medium leading-none inline-block">Achievements</label>
                                            <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => achievementsPopupOpen(true)}>Add</button>
                                        </div>
                                        <p className="text-[#7E7E7E] text-sm font-light mb-4">Add achievements here</p>
                                        <Image src={achievementsGraphic} alt="Achievements" className="w-full" />
                                        <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden">
                                            <article>
                                                <h4 className="font-semibold mb-1 text-lg">Web Developer</h4>
                                                <h6 className="font-medium">About</h6>
                                                <p className="text-[#7e7e7e] font-light text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                            </article>
                                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                                                <button type="button" className="text-[#6D27F9] mx-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button type="button" className="text-red-500 mx-2">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
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
            <Transition.Root show={skillsPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={skillsPopupOpen}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Skills</h4>
                                    <button type="button" className="leading-none" onClick={() => skillsPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="chooseSkills" className="font-medium mb-2 leading-none inline-block">Choose desired skills</label>
                                        <select id="chooseSkills" className="w-full rounded-full border-slate-300">
                                            <option value="PHP">PHP</option>
                                            <option value="HTML">HTML</option>
                                            <option value="CSS">CSS</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="choosesSkillsProfeciency" className="font-medium mb-2 leading-none inline-block">Choose profeciency</label>
                                        <select id="choosesSkillsProfeciency" className="w-full rounded-full border-slate-300">
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advance">Advance</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="choosesSkillsSet" className="font-medium mb-2 leading-none inline-block">Skill set</label>
                                        <select id="choosesSkillsSet" className="w-full rounded-full border-slate-300">
                                            <option value="Primary">Primary</option>
                                            <option value="Secondary">Secondary</option>
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
            <Transition.Root show={certificationPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={certificationPopupOpen}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Certificate</h4>
                                    <button type="button" className="leading-none" onClick={() => certificationPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="certificateName" className="font-medium mb-2 leading-none inline-block">Name</label>
                                            <input id="certificateName" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="certificateOrg" className="font-medium mb-2 leading-none inline-block">Issuing Organization</label>
                                            <input id="certificateOrg" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="credNotExp" className="text-sm">
                                            <input type="checkbox" id="credNotExp" className="mr-2 mb-1" />
                                            This credential does not expire.
                                        </label>
                                    </div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="certificateIssueDate" className="font-medium mb-2 leading-none inline-block">Issue Date</label>
                                            <input id="certificateIssueDate" type="date" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="certificateExpDate" className="font-medium mb-2 leading-none inline-block">Expiration Date</label>
                                            <input id="certificateExpDate" type="date" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="certificateCredID" className="font-medium mb-2 leading-none inline-block">Credential ID</label>
                                            <input id="certificateCredID" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="certificateCredURL" className="font-medium mb-2 leading-none inline-block">Credential URL</label>
                                            <input id="certificateCredURL" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
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
            <Transition.Root show={educationPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={educationPopupOpen}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Education</h4>
                                    <button type="button" className="leading-none" onClick={() => educationPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="eduCourseName" className="font-medium mb-2 leading-none inline-block">Course Name</label>
                                            <input id="eduCourseName" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="eduUnivName" className="font-medium mb-2 leading-none inline-block">University Name</label>
                                            <input id="eduUnivName" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="eduStartDate" className="font-medium mb-2 leading-none inline-block">Start Date</label>
                                            <input id="eduStartDate" type="date" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="eduEndDate" className="font-medium mb-2 leading-none inline-block">End Date</label>
                                            <input id="eduEndDate" type="date" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="eduAbout" className="font-medium mb-2 leading-none inline-block">About</label>
                                        <textarea id="eduAbout" className="w-full rounded-[20px] border-slate-300 resize-none min-h-[120px]"></textarea>
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
            <Transition.Root show={expPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={expPopupOpen}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Experience</h4>
                                    <button type="button" className="leading-none" onClick={() => expPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="expTitle" className="font-medium mb-2 leading-none inline-block">Title</label>
                                            <input id="expTitle" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="expCompName" className="font-medium mb-2 leading-none inline-block">Company Name</label>
                                            <input id="expCompName" type="text" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="credNotExp" className="text-sm">
                                            <input type="checkbox" id="credNotExp" className="mr-2 mb-1" />
                                            This credential does not expire.
                                        </label>
                                    </div>
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="expStartDate" className="font-medium mb-2 leading-none inline-block">Start Date</label>
                                            <input id="expStartDate" type="date" className="w-full rounded-full border-slate-300" />
                                        </div>
                                        <div className="w-full lg:w-[47%] mb-6">
                                            <label htmlFor="expEndDate" className="font-medium mb-2 leading-none inline-block">End Date</label>
                                            <input id="expEndDate" type="date" className="w-full rounded-full border-slate-300" />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="expAbout" className="font-medium mb-2 leading-none inline-block">About</label>
                                        <textarea id="expAbout" className="w-full rounded-[20px] border-slate-300 resize-none min-h-[120px]"></textarea>
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
            <Transition.Root show={achievementsPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={achievementsPopupOpen}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Achievements</h4>
                                    <button type="button" className="leading-none" onClick={() => achievementsPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="achieveTitle" className="font-medium mb-2 leading-none inline-block">Title</label>
                                        <input id="achieveTitle" type="text" className="w-full rounded-full border-slate-300" />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="achieveAbout" className="font-medium mb-2 leading-none inline-block">About</label>
                                        <textarea id="achieveAbout" className="w-full rounded-[20px] border-slate-300 resize-none min-h-[120px]"></textarea>
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