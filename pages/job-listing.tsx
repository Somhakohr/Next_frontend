import axios from 'axios';
import {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import JobCard from "../components/job-card";
import toastcomp from '../components/toast';
import { axiosInstance } from './api/axiosApi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Image from 'next/image';
import ChatBot from '../components/chatbot';
import Multiselect from 'multiselect-react-dropdown';

export default function JobListing() {
    const [sidebarToggle, setsidebarToggle] = useState(false);
    const [joblist,setJobList] = useState([])
    const [joblist2,setJobList2] = useState([])
    const [hasMore,setHasMore] = useState(false)
    const [loader,setLoader] = useState(<div></div>)

    // const axiosInstance = axios.create({
    //     baseURL: 'https://marketplace.somhako.com/api/',
    //     timeout: 5000,
    //     headers: {
    //         // 'Authorization': 'Bearer '+accessToken,
    //         "Content-Type": "multipart/form-data",
    //     }
    // });

    // const [accessToken, updateAccessToken] = useStore(
    //     (state) => [state.accessToken, state.updateAccessToken],
    //     shallow
    // )
    
    async function loadJobs() {
        await axiosInstance.get('/job/job/list/').then(async (res)=>{
            console.log(res)
            setJobList(res.data)
            setJobList2(res.data.slice(0, 6))
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Job Not Loaded","error");
            }
        })
    }

    function fetchMoreData() {
        if(joblist2.length == joblist.length){
            setHasMore(false)
            setLoader(<div className="text-center text-[#6D27F9] text-3xl"><i className="fa-solid fa-circle-notch fa-spin"></i></div>);
        }
        else{
            setJobList2(joblist.slice(0,joblist2.length+6))
        }
    };

    useEffect(() => {
      loadJobs()
    }, [])

    useEffect(() => {
      if(joblist && joblist2 && joblist.length === joblist2.length){setHasMore(false);setLoader(<div></div>)}
      else{ setHasMore(true); setLoader(<div className="text-center text-[#6D27F9] text-3xl"><i className="fa-solid fa-circle-notch fa-spin"></i></div>) }
    }, [joblist,joblist2])



    //var filter
    const [search,setSearch] = useState('')
    const [fsearch,setFSearch] = useState('')
    const [level,setLevel] = useState('')
    const [type,setType] = useState('')
    const [loc,setLoc] = useState('')
    const [skill,setSkill] = useState('')
    const [ind,setInd] = useState('')
    const [dept,setDept] = useState('')
    const [wtype,setWType] = useState('')
    const [exp,setExp] = useState('')

    async function filters(query) {
        // await axiosInstance.get(`/job/job/list/?sJob=${search}&levelFilter=${level}&jtFilter=${type}&locFilter=${loc}&skillFilter=${skill}&indFilter=${ind}&catFilter=${dept}&wpFilter=${wtype}&expFilter=${exp}`).then(async (res)=>{
        await axiosInstance.get(`/job/job/list/?${query}`).then(async (res)=>{
            console.log("filter",res)
            setJobList(res.data)
            setJobList2(res.data.slice(0, 6))
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Job Not Loaded","error");
            }
        })
    }

    useEffect(() => {
        // var formData = new FormData();
        let query = ''
        if(search){if(query==''){
            query=query+"sJob="+search}
            else{
                query=query+"&sJob="+search}}
        if(level){if(query==''){
            query=query+"levelFilter="+level}
            else{
                query=query+"&levelFilter="+level}}
        if(type){if(query==''){
            query=query+"jtFilter="+type}
            else{
                query=query+"&jtFilter="+type}}
        if(loc){if(query==''){
            query=query+"locFilter="+loc}
            else{
                query=query+"&locFilter="+loc}}
        if(skill){if(query==''){
            query=query+"skillFilter="+skill}
            else{
                query=query+"&skillFilter="+skill}}
        if(ind){if(query==''){
            query=query+"indFilter="+ind}
            else{
                query=query+"&indFilter="+ind}}
        if(dept){if(query==''){
            query=query+"catFilter="+dept}
            else{
                query=query+"&catFilter="+dept}}
        if(wtype){if(query==''){
            query=query+"wpFilter="+wtype}
            else{
                query=query+"&wpFilter="+wtype}}
        if(exp){if(query==''){
            query=query+"expFilter="+exp}
            else{
                query=query+"&expFilter="+exp}}

        // if(Array.from(formData.keys()).length > 0){
        //     console.log("abc")
        //     filters(formData)
        // }
        filters(query)
    }, [fsearch,level,type,loc,skill,ind,dept,wtype,exp])
    
    

    return (
        <>
            <main className="py-8">
                <section className="container flex flex-wrap">
                    <div className={sidebarToggle ? 'fixed z-[9] left-0 top-0 w-full h-full bg-[#0000006b] block' : 'fixed z-[9] left-0 top-0 w-full bg-[#0000006b] hidden'} onClick={() => setsidebarToggle(false)}></div>
                    <div className={sidebarToggle ? 'w-full lg:max-w-[300px] p-4 lg:p-0 fixed z-10 lg:static right-0 bottom-0 text-right lg:text-left' : 'w-full lg:max-w-[300px] p-4 lg:p-0 fixed z-10 lg:static right-0 bottom-0 text-right lg:text-left'}>
                        <div className={sidebarToggle ? 'block overflow-hidden h-full bg-white shadow-normal border border-teal-400 rounded-[30px] mb-[15px] lg:mb-0' : 'hidden lg:block overflow-hidden h-full bg-white shadow-normal border border-teal-400 rounded-[30px] mb-[15px] lg:mb-0'}>
                            <Tabs>
                                <div className="p-3 shadow-lg text-left filters">
                                    <TabList>
                                        <Tab>Chat Mini</Tab>
                                        <Tab>Filters</Tab>
                                    </TabList>
                                </div>
                                <TabPanel>
                                    <ChatBot />
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <div className="pt-6 px-6">
                                            <div className="iconGroup">
                                                <input type="search" placeholder="Job title or keyword" className="w-full rounded-full border-[#6D27F9]" value={search} onChange={(e)=>setSearch(e.target.value)} onBlur={(e)=>setFSearch(e.target.value)} />
                                                <i className="fa-solid fa-search iconGroup__icon"></i>
                                            </div>
                                        </div>
                                        <div className="p-6 max-h-[calc(100vh-270px)] lg:max-h-[560px] overflow-y-auto">
                                            <div className="w-full mb-5">
                                                {/* <select id="joblevel" placeholder="Level" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0" value={level} onChange={(e)=>setLevel(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Junior">Junior</option>
                                                    <option value="Senior">Senior</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                                {/* <ul className="pt-4">
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
                                                </ul> */}
                                            </div>
                                            <div className="w-full mb-5">
                                                {/* <select id="jobtype" placeholder="Job Type" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0" value={type} onChange={(e)=>setType(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Full time">Full time</option>
                                                    <option value="Contract">Contract</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="joblocation" placeholder="Location" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={loc} onChange={(e)=>setLoc(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="India">India</option>
                                                    <option value="Japan">Japan</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="jobskills" placeholder="Skills" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={skill} onChange={(e)=>setSkill(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="PHP">PHP</option>
                                                    <option value="HTML">HTML</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="jobindustry" placeholder="Industry" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={ind} onChange={(e)=>setInd(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Staffing">Staffing</option>
                                                    <option value="Engg">Engg</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="Jobfunctions" placeholder="Functions" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={dept} onChange={(e)=>setDept(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Engg">Engg</option>
                                                    <option value="Product">Product</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="Jobworkplace" placeholder="Workplace" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={wtype} onChange={(e)=>setWType(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Onsite">Onsite</option>
                                                    <option value="Remote">Remote</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="Jobexperience" placeholder="Experience" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={exp} onChange={(e)=>setExp(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="5-10 years">5-10 years</option>
                                                    <option value="10-15 years">10-15 years</option>
                                                </select> */}
                                                <Multiselect
                                                isObject={false}
                                                showArrow={true}
                                                options={[
                                                    'Option 1',
                                                    'Option 2',
                                                    'Option 3',
                                                    'Option 4',
                                                    'Option 5'
                                                ]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
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
                                    Showing {joblist2.length} results
                                </p>
                                <div className="w-full md:max-w-[60%] flex items-center justify-center text-right mb-4">
                                    <span className="md:w-[calc(100%-150px)] mr-2">
                                    Date Posted: 
                                    </span>
                                    {/* <select className="md:w-[150px] border-0 rounded-full text-[#6D27F9]">
                                        <option value="All Time">All Time</option>
                                        <option value="Last 1 Hour">Last 1 Hour</option>
                                    </select> */}
                                    <Multiselect
                                    isObject={false}
                                    showArrow={true}
                                    options={[
                                        'Option 1',
                                        'Option 2',
                                        'Option 3',
                                        'Option 4',
                                        'Option 5'
                                    ]}
                                    />
                                </div>
                                <div className="w-full" id="scrollableDiv">
                                <InfiniteScroll
                                    dataLength={joblist2.length}
                                    next={fetchMoreData}
                                    hasMore={hasMore}
                                    height={485}
                                    loader={loader}
                                    scrollableTarget="scrollableDiv"
                                    >
                                <div className="flex flex-wrap">
                                    {joblist2.map((job, i) => (
                                        <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4" key={i}>
                                        <JobCard data={job} />
                                        </div>
                                    ))}
                                </div>
                                </InfiniteScroll>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}