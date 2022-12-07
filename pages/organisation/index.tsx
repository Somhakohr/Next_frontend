import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Image from 'next/image';
import Sidebar from "../../components/org-sidebar";
import JobCard from "../../components/job-card";
import Token from '../../public/images/token.png';
import { withAuth } from '../../constants/HOCs';
import axios from 'axios';
import { useStore } from '../../constants/code';
import shallow from 'zustand/shallow';
import { useEffect } from 'react';

function Organisation(props) {

    const { router,session } = props; 

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
     
    
    //axios auth var
    const axiosInstanceAuth2 = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer '+accessToken,
            "Content-Type": "multipart/form-data",
        }
    });

    useEffect(() => {
      if(!session){
        router.push("/");
      }
    }, [session]);

    return (
        <>
        { userType == "Organisation" &&
            <main className="py-8">
                <div className="container flex flex-wrap items-start">
                    <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
                        <Sidebar />
                    </div>
                    <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6">
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6 orgDashTabs">
                            <Tabs>
                                <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                    <TabList>
                                        <Tab><span className="md:text-lg font-semibold">Applicants Overview</span></Tab>
                                        <Tab><span className="md:text-lg font-semibold">Jobs Overview</span></Tab>
                                    </TabList>
                                </div>
                                <div className="py-6 px-4 md:px-10 orgDashCards">
                                    <TabPanel>
                                        <ul className="flex flex-wrap justify-between">
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FFCC40] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FFCC40] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-window-maximize"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">0</p>
                                                    <h5 className="font-light">Application</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#12E700] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#12E700] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-circle-check"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">35</p>
                                                    <h5 className="font-light">Shortlisted</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FE8F66] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FE8F66] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-eye"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">14</p>
                                                    <h5 className="font-light">In Review</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FE8F66] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FE8F66] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-calendar-days"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">27</p>
                                                    <h5 className="font-light">Interviews Scheduled</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#12E700] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#12E700] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-users-rays"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">48</p>
                                                    <h5 className="font-light">Hire</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FE8F66] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FE8F66] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-eject"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">25</p>
                                                    <h5 className="font-light">Rejected</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FFCC40] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FFCC40] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-circle-pause"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">8</p>
                                                    <h5 className="font-light">Hold</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <Image src={Token} alt="Token" className="w-[50px] mb-1" />
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">0</p>
                                                    <h5 className="font-light">Tokens</h5>
                                                </article>
                                            </li>
                                        </ul>
                                    </TabPanel>
                                    <TabPanel>
                                    <ul className="flex flex-wrap justify-between">
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FFCC40] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FFCC40] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-box-archive"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">0</p>
                                                    <h5 className="font-light">Archived Jobs</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#12E700] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#12E700] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-eye"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">35</p>
                                                    <h5 className="font-light">In Review</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FE8F66] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FE8F66] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-circle-xmark"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">14</p>
                                                    <h5 className="font-light">Closed</h5>
                                                </article>
                                            </li>
                                            <li className="w-full max-w-[48%] md:max-w-[31%] xl:max-w-[23%] mb-5 rounded-lg shadow-lg border-r-[9px] border-r-[#FE8F66] p-6 flex flex-col items-center justify-center overflow-hidden">
                                                <div className="bg-[#FE8F66] rounded-lg p-1 w-[40px] h-[40px] flex items-center justify-center mb-3 text-xl text-white">
                                                    <i className="fa-solid fa-circle-notch"></i>
                                                </div>
                                                <article className="text-center">
                                                    <p className="font-semibold text-xl mb-1">27</p>
                                                    <h5 className="font-light">Remaining</h5>
                                                </article>
                                            </li>
                                        </ul>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                            <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
                            </div>
                            <div className="py-6 px-4 md:px-10">
                                <div className="responsive-table">
                                    <table className="table-auto min-w-[800px] w-full text-left border-collapse text-[#7e7e7e] text-sm">
                                        <thead className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white">
                                            <tr>
                                                <th className="py-2 px-3 ">Candidate ID</th>
                                                <th className="py-2 px-3">Job ID</th>
                                                <th className="py-2 px-3">Job Title</th>
                                                <th className="py-2 px-3 ">Interview Date & Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-1 px-3">A15614</td>
                                                <td className="py-1 px-3">PM-8017</td>
                                                <td className="py-1 px-3">Product Designer</td>
                                                <td className="py-1 px-3">10-Dec-2022, 11:00 am</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 px-3">A15614</td>
                                                <td className="py-1 px-3">PM-8017</td>
                                                <td className="py-1 px-3">Product Designer</td>
                                                <td className="py-1 px-3">10-Dec-2022, 11:00 am</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 px-3">A15614</td>
                                                <td className="py-1 px-3">PM-8017</td>
                                                <td className="py-1 px-3">Product Designer</td>
                                                <td className="py-1 px-3">10-Dec-2022, 11:00 am</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 px-3">A15614</td>
                                                <td className="py-1 px-3">PM-8017</td>
                                                <td className="py-1 px-3">Product Designer</td>
                                                <td className="py-1 px-3">10-Dec-2022, 11:00 am</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1 px-3">A15614</td>
                                                <td className="py-1 px-3">PM-8017</td>
                                                <td className="py-1 px-3">Product Designer</td>
                                                <td className="py-1 px-3">10-Dec-2022, 11:00 am</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden">
                            <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                <h2 className="text-lg font-semibold">Recent Jobs</h2>
                            </div>
                            <div className="py-6 px-4 md:px-10">
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
                </div>
            </main>
        }
        </>
    )
}

export default withAuth(3*60)(Organisation)