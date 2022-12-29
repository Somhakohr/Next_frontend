import axios from 'axios';
import {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import JobCard from "../../components/job-card";
import toastcomp from '../../components/toast';
import { axiosInstance } from '../api/axiosApi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Image from 'next/image';
import ChatBot from '../../components/chatbot';
import Multiselect from 'multiselect-react-dropdown';
import chatMini from '../../public/images/chat-mini.png'
import { useStore } from '../../constants/code';
import shallow from 'zustand/shallow';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function JobListing() {
    const [sidebarToggle, setsidebarToggle] = useState(false);
    const [joblist,setJobList] = useState([])
    const [joblist2,setJobList2] = useState([])
    const [hasMore,setHasMore] = useState(false)
    const [loader,setLoader] = useState(<div></div>)
    
    const [userType, updateUserType] = useStore(
        (state) => [state.userType, state.updateUserType],
        shallow
    )
    
    async function loadJobs() {
        await axiosInstance.get('/job/job/list/').then(async (res)=>{
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
    
    const [locf,setLocf] = useState([])
    const [ski,setski] = useState([])
    const [load,setload] = useState(false)


    async function searchLoc(value) { 
        const axiosInstance22 = axios.create({
            baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
            // timeout: 10000,
            headers: {
                // 'Authorization': "JWT " + access_token,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });  
        await axiosInstance22.get(`/job/load/location/?search=${value}`).then(async (res)=>{
            let obj = res.data
            let arr = []
            for (const [key, value] of Object.entries(obj)) {
                arr.push(value)
            }
            setLocf(arr)
            setload(false)
        }).catch((err)=>{
            console.log(err)
        })      
    }

    async function searchSkill(value) { 
        const axiosInstance22 = axios.create({
            baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
            // timeout: 10000,
            headers: {
                // 'Authorization': "JWT " + access_token,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        });  
        await axiosInstance22.get(`/job/load/skills/?search=${value}`).then(async (res)=>{
            let obj = res.data
            let arr = []
            for (const [key, value] of Object.entries(obj)) {
                arr.push(value)
            }
            setski(arr)
            setload(false)
        }).catch((err)=>{
            console.log(err)
        })      
    }

    return (
        <>
            <main className="py-8">
                <section className='container flex flex-wrap min-h-[500px]'>
                    <div className='w-full lg:max-w-[300px]'>
                        <div className="bg-white shadow-normal border rounded-[30px] p-6 h-full">
                            <Skeleton width={100} />
                            <Skeleton height={35} count={8} style={{margin: '10px 0'}} />
                        </div>
                    </div>
                    <div className='w-full lg:max-w-[calc(100%-300px)] lg:pl-4'>
                        <div className="bg-white shadow-normal border rounded-[30px] p-6 h-full">
                            <Skeleton width={300} height={25} />
                            <div className="flex flex-wrap pt-4 mx-[-10px]">
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <div className=''>
                                        <div className='flex flex-wrap items-center mb-4'>       
                                            <Skeleton width={40} height={40} style={{borderRadius: '100%', marginRight: '10px'}} />
                                            <Skeleton width={150} height={20} />
                                        </div>
                                        <Skeleton height={25} style={{margin: '0 0 10px 0'}} />
                                        <Skeleton width={180} height={20} style={{margin: '0 0 10px 0'}} />
                                        <Skeleton width={120} height={20} />
                                    </div>
                                </div>
                                <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                    <div className=''>
                                        <div className='flex flex-wrap items-center mb-4'>       
                                            <Skeleton width={40} height={40} style={{borderRadius: '100%', marginRight: '10px'}} />
                                            <Skeleton width={150} height={20} />
                                        </div>
                                        <Skeleton height={25} style={{margin: '0 0 10px 0'}} />
                                        <Skeleton width={180} height={20} style={{margin: '0 0 10px 0'}} />
                                        <Skeleton width={120} height={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container flex flex-wrap">
                    <div className={sidebarToggle ? 'fixed z-[9] left-0 top-0 w-full h-full bg-[#0000006b] block' : 'fixed z-[9] left-0 top-0 w-full bg-[#0000006b] hidden'} onClick={() => setsidebarToggle(false)}></div>
                    <div className={sidebarToggle ? 'w-full lg:max-w-[300px] p-4 lg:p-0 fixed z-10 lg:static right-0 bottom-0 text-right lg:text-left' : 'w-full lg:max-w-[300px] p-4 lg:p-0 fixed z-10 lg:static right-0 bottom-0 text-right lg:text-left'}>
                        <div className={sidebarToggle ? 'block overflow-hidden h-full bg-white shadow-normal border border-teal-400 rounded-[30px] mb-[15px] lg:mb-0' : 'hidden lg:block overflow-hidden h-full bg-white shadow-normal border border-teal-400 rounded-[30px] mb-[15px] lg:mb-0'}>
                            <Tabs>
                                <div className="p-3 shadow-lg text-left filters">
                                    <TabList>
                                        <Tab>Filters</Tab>
                                        {userType == "Candidate" &&
                                        <Tab>
                                            <div className='flex items-center'>
                                                 Chat Mini
                                            </div>
                                        </Tab>
                                        }
                                    </TabList>
                                    {userType == "Candidate" &&<Image src={chatMini} alt="Chat" width={35} className="ml-2" />}
                                </div>
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
                                                options={['Entry/Fresher','Senior','Manager','Director','VP','CXO','Founder/Owner/Co-founder','Partner','Training']}
                                                isObject={false}
                                                customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                showArrow={true}
                                                closeOnSelect={true}
                                                selectedValues = {level && level.split(',')}
                                                onSelect={(selectedList, selectedItem)=> {setLevel(selectedList.join(',')) }}
                                                onRemove={(selectedList, selectedItem)=> {setLevel(selectedList.join(',')) }}
                                                placeholder="Find Preferred Job Type"
                                                />
                                            </div>
                                            <div className="w-full mb-5">
                                                {/* <select id="jobtype" placeholder="Job Type" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0" value={type} onChange={(e)=>setType(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Full time">Full time</option>
                                                    <option value="Contract">Contract</option>
                                                </select> */}
                                                                                
                                                <Multiselect
                                                options={['Permanent/Full Time','Permanent/Contract','Contract','Part-Time','Freelance','Internship']}
                                                isObject={false}
                                                customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                showArrow={true}
                                                closeOnSelect={true}
                                                selectedValues = {type && type.split(',')}
                                                onSelect={(selectedList, selectedItem)=> {setType(selectedList.join(',')) }}
                                                onRemove={(selectedList, selectedItem)=> {setType(selectedList.join(',')) }}
                                                placeholder="Find Preferred Job Type"
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="joblocation" placeholder="Location" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={loc} onChange={(e)=>setLoc(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="India">India</option>
                                                    <option value="Japan">Japan</option>
                                                </select> */}
                                                <Multiselect
                                                    options={locf}
                                                    loading={load}
                                                    isObject={false}
                                                    customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                    showArrow={true}
                                                    closeOnSelect={true}
                                                    onSearch={(value)=>{setload(true);searchLoc(value)}}
                                                    selectedValues = {loc && loc.split('|')}
                                                    onSelect={(selectedList, selectedItem)=> {setLoc(selectedList.join('|')) }}
                                                    onRemove={(selectedList, selectedItem)=> {setLoc(selectedList.join('|')) }}
                                                    placeholder="Find Preferred Location"
                                                    />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="jobskills" placeholder="Skills" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={skill} onChange={(e)=>setSkill(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="PHP">PHP</option>
                                                    <option value="HTML">HTML</option>
                                                </select> */}
                                                <Multiselect
                                                    options={ski}
                                                    loading={load}
                                                    isObject={false}
                                                    customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                    showArrow={true}
                                                    closeOnSelect={true}
                                                    selectedValues = {skill && skill.split(',')}
                                                    onSearch={(value)=>{setload(true);searchSkill(value)}}
                                                    onSelect={(selectedList, selectedItem)=> {setSkill(selectedList.join(',')) }}
                                                    onRemove={(selectedList, selectedItem)=> {setSkill(selectedList.join(',')) }}
                                                    placeholder="Find Recommended Skills"
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="jobindustry" placeholder="Industry" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={ind} onChange={(e)=>setInd(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Staffing">Staffing</option>
                                                    <option value="Engg">Engg</option>
                                                </select> */}                                                                 
                                                <Multiselect
                                                options={['IT Services & Consulting','Recruitment','Software Product','Consulting','Financial Services','Hardware & Networking','Internet','Analytics & KPO','IT / ITES','Computer Software','Engineering & Construction','Manufacturing','Education & Training','Telecom','Marketing & Advertising','Management Consulting','Emerging Technologies','BPO/KPO','BPO','EdTech','Media & Entertainment / Publishing','Industrial Machinery','Retail','Power','Advertising / PR / Events','Recruitment consultant','Design','Gaming','Banking / Insurance / Accounting','Consumer Electronics & Appliances']}
                                                isObject={false}
                                                customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                showArrow={true}
                                                closeOnSelect={true}
                                                selectedValues = {ind && ind.split(',')}
                                                onSelect={(selectedList, selectedItem)=> {setInd(selectedList.join(',')) }}
                                                onRemove={(selectedList, selectedItem)=> {setInd(selectedList.join(',')) }}
                                                placeholder="Find Preferred Industry"
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="Jobfunctions" placeholder="Functions" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={dept} onChange={(e)=>setDept(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Engg">Engg</option>
                                                    <option value="Product">Product</option>
                                                </select> */}                                     
                                                <Multiselect
                                                options={['Software/Testing/Networking','IT Hardware & Telecom','Sales','Analytics & Business Intelligence','Design','HR & Admin','Customer Service & Operations','R&D','Marketing','Accounting/Finance','Planning & Consulting','Education','Content','Banking/Insurance','Self Employed / Consultants','Hospitality','Construction','Travel','Architecture & Interior Design','TV/Flims','Manufacturing','Top Management','Pharma/Healthcare']}
                                                isObject={false}
                                                customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                showArrow={true}
                                                closeOnSelect={true}
                                                selectedValues = {dept && dept.split(',')}
                                                onSelect={(selectedList, selectedItem)=> {setDept(selectedList.join(',')) }}
                                                onRemove={(selectedList, selectedItem)=> {setDept(selectedList.join(',')) }}
                                                placeholder="Find Department"
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="Jobworkplace" placeholder="Workplace" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={wtype} onChange={(e)=>setWType(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="Onsite">Onsite</option>
                                                    <option value="Remote">Remote</option>
                                                </select> */}
                                                <Multiselect
                                                options={['On-site','Remote','Hybrid']}
                                                isObject={false}
                                                customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                showArrow={true}
                                                closeOnSelect={true}
                                                selectedValues = {wtype && wtype.split(',')}
                                                onSelect={(selectedList, selectedItem)=> {setWType(selectedList.join(',')) }}
                                                onRemove={(selectedList, selectedItem)=> {setWType(selectedList.join(',')) }}
                                                placeholder="Find Preferred WORK TYPE"
                                                />
                                            </div>
                                            <div className="w-full mb-4">
                                                {/* <select id="Jobexperience" placeholder="Experience" className="text-sm bg-[#f4f4f4] w-full rounded-full border-0"  value={exp} onChange={(e)=>setExp(e.target.value)} >
                                                    <option value="">Select</option>
                                                    <option value="5-10 years">5-10 years</option>
                                                    <option value="10-15 years">10-15 years</option>
                                                </select> */}                                     
                                                <Multiselect
                                                options={['No Experience','1-2 years','2-5 years','5-10 years','10-15 years',,'15+ years']}
                                                isObject={false}
                                                customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                showArrow={true}
                                                closeOnSelect={true}
                                                selectedValues = {exp && exp.split(',')}
                                                onSelect={(selectedList, selectedItem)=> {setExp(selectedList.join(',')) }}
                                                onRemove={(selectedList, selectedItem)=> {setExp(selectedList.join(',')) }}
                                                placeholder="Find Preferred Experience In Years"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                {userType == "Candidate" &&
                                <TabPanel>
                                    <ChatBot setJobList={setJobList} setJobList2={setJobList2} />
                                </TabPanel>
                                }
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
                                    <select className="md:w-[150px] border-0 rounded-full text-[#6D27F9]">
                                        <option value="All Time">All Time</option>
                                        <option value="Last 1 Hour">Last 1 Hour</option>
                                    </select>
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