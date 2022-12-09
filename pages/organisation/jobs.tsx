import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from "next/image";
import Sidebar from "../../components/org-sidebar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrgJobsCard from "../../components/org-jobs-card";
import noGraphic from '../../public/images/no-found-graphic.png';
import { withAuth } from '../../constants/HOCs';
import axios from 'axios';
import { useStore } from '../../constants/code';
import shallow from 'zustand/shallow';
import toastcomp from '../../components/toast';

function OrganisationAllJobs(props) {
    
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

    const [langPopup, langPopupOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    //local jobpost state
    
    const [title, setTitle] = useState('')
    const [dept, setDept] = useState('')
    const [exp, setExp] = useState('')
    const [type, setType] = useState('')
    const [level, setLevel] = useState('')
    const [deadline, setDeadline] = useState('')
    const [ind, setInd] = useState('')
    const [desc, setDesc] = useState('')
    const [res, setRes] = useState('')
    const [salary, setSalary] = useState('')
    const [stype, setStype] = useState('')
    const [scurr, setScurr] = useState('')
    const [reloc, setReloc] = useState('')
    const [bonus, setBonus] = useState('')
    const [stock, setStock] = useState('')
    const [visa, setVisa] = useState('')
    const [vacancy, setVacancy] = useState('')
    const [wtype, setWtype] = useState('')
    const [loc, setLoc] = useState('')
    const [rskill, setrSkill] = useState('')
    const [pskill, setpSkill] = useState('')
    const [qf, setQf] = useState('')
    const [lang, setLang] = useState([]) 
    const [alang,setALang] = useState('')
    const [aprof,setAProf] = useState('Elementary profeciency')

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

    async function addJob(formdata) {
        await axiosInstanceAuth2.post('/job/create/',formdata).then(async (res)=>{
            toastcomp("Job Added",'success')
            resetJOBFORM()
        }).catch((err)=>{
            toastcomp("Job Not Added",'error')
            console.log(err)
        })
    }

    function resetJOBFORM(){
        setTitle('')
        setDept('')
        setExp('')
        setType('')
        setLevel('')
        setDeadline('')
        setInd('')
        setDesc('')
        setRes('')
        setSalary('')
        setStype('')
        setScurr('')
        setReloc('')
        setBonus('')
        setStock('')
        setVisa('')
        setVacancy('')
        setWtype('')
        setLoc('')
        setrSkill('')
        setpSkill('')
        setQf('')
        setLang([])
    }


    function apply(status) {
        var check = true;
        if(title.length <= 0 || dept.length <= 0 || exp.length <= 0 || type.length <= 0 || level.length <= 0 || deadline.length <= 0 || ind.length <= 0){
            check = false;
            toastcomp("Fill Up Basic Details Section","error")
        }
        if(desc.length <= 0){
            check = false;
            toastcomp("Fill Up Description Section","error")
        }
        if(rskill.length <= 0 || pskill.length <= 0 || qf.length <= 0){
            check = false;
            toastcomp("Fill Up Skills & Qualification Section","error")
        }

        if(check){
            var formData = new FormData();
            if(title){formData.append("title", title)}
            if(dept){formData.append("dept", dept)}
            if(exp){formData.append("exp", exp)}
            if(type){formData.append("type", type)}
            if(level){formData.append("level", level)}
            if(deadline){formData.append("deadline", deadline)}
            if(ind){formData.append("industry", ind)}
            if(desc){formData.append("desc", desc)}
            if(res){formData.append("resp", res)}
            if(salary){formData.append("salary", scurr+''+salary+' '+stype)}
            if(reloc){formData.append("relocation", reloc)}
            if(bonus){formData.append("bonus", bonus)}
            if(stock){formData.append("stock", stock)}
            if(visa){formData.append("visa", visa)}
            if(vacancy){formData.append("vacancy", vacancy)}
            if(wtype){formData.append("worktype", wtype)}
            if(loc){formData.append("location", loc)}
            if(rskill){formData.append("recskill", rskill)}
            if(pskill){formData.append("preskill", pskill)}
            if(qf){formData.append("qualification", qf)}
            if(lang.length>0){
                console.log(lang);
                for(let i=0;i<lang.length;i++){
                    formData.append('lng'+(i+1), lang[i]['title'])
                    formData.append('exp'+(i+1), lang[i]['exp'])
                }
            }

            if(Array.from(formData.keys()).length > 0){
                if(status){formData.append("jobStatus", status)}
                addJob(formData)
            }
        }
    }
    function verifyLangPopup() {
        return alang.length > 0
    }
    //save spoken lang
    function saveLang(e){
        if(lang.length > 3){
            toastcomp("4 Spoken Lang Only ALlowed","error")
        }
        else{
            var dic = {}
            dic['title']=alang
            dic['exp']=aprof
            let abc = lang
            abc.push(dic)
            setLang(abc)
        }
        setALang('')
        setAProf('Elementary profeciency')
        langPopupOpen(false)
        
    }

    //delete Lang
    function delLang(num){
        lang.splice(num,1)
        document.getElementById('lang'+num).remove()
    }

    return (
        <>
        { userType == "Organisation" &&
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
                                        <h2 className="text-lg font-semibold">Basic Details *</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap w-full lg:mx-[-15px]">
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobTitle" className="font-medium mb-2 leading-none inline-block">Job Title</label>
                                                <input id="addJobTitle" type="text" className="w-full rounded-full border-slate-300" value={title} onChange={(e)=>setTitle(e.target.value)} />
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobDep" className="font-medium mb-2 leading-none inline-block">Department</label>
                                                <select id="addJobDep" className="w-full rounded-full border-slate-300" value={dept} onChange={(e)=>setDept(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Department 1">Department 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobExp" className="font-medium mb-2 leading-none inline-block">Experience</label>
                                                <select id="addJobExp" className="w-full rounded-full border-slate-300" value={exp} onChange={(e)=>setExp(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Experience 1">Experience 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobType" className="font-medium mb-2 leading-none inline-block">Job Type</label>
                                                <select id="addJobType" className="w-full rounded-full border-slate-300" value={type} onChange={(e)=>setType(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="JobType 1">JobType 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobExpLevel" className="font-medium mb-2 leading-none inline-block">Experience Level</label>
                                                <select id="addJobExpLevel" className="w-full rounded-full border-slate-300" value={level} onChange={(e)=>setLevel(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Experience Level 1">Experience Level 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobDeadLine" className="font-medium mb-2 leading-none inline-block">Application Deadline</label>
                                                <input type="date" id="addJobDeadLine" className="w-full rounded-full border-slate-300" value={deadline} onChange={(e)=>setDeadline(e.target.value)} />
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobIndustry" className="font-medium mb-2 leading-none inline-block">Industry</label>
                                                <select id="addJobIndustry" className="w-full rounded-full border-slate-300" value={ind} onChange={(e)=>setInd(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Industry 1">Industry 1</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">Description *</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <textarea className="w-full rounded-[25px] min-h-[250px] border-slate-300" value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">What are we looking for</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <textarea className="w-full rounded-[25px] min-h-[250px] border-slate-300" value={res} onChange={(e)=>setRes(e.target.value)}></textarea>
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
                                                    <input id="addJobOfferedSalary" type="number" className="w-[55%] mr-3 rounded-full border-slate-300" value={salary} onChange={(e)=>setSalary(e.target.value)}/>
                                                    <select className="w-[40%] rounded-full border-slate-300" value={stype} onChange={(e)=>setStype(e.target.value)} >
                                                        <option value="Monthly">Monthly</option>
                                                        <option value="Yearly">Yearly</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobCurrency" className="font-medium mb-2 leading-none inline-block">Currency</label>
                                                <select id="addJobCurrency" className="w-full rounded-full border-slate-300" value={scurr} onChange={(e)=>setScurr(e.target.value)}>
                                                    <option value="Currency 1">Currency 1</option>
                                                    <option value="Currency 1">Currency 2</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobPaidRelocation" className="font-medium mb-2 leading-none inline-block">Paid Relocation</label>
                                                <select id="addJobPaidRelocation" className="w-full rounded-full border-slate-300" value={reloc} onChange={(e)=>setReloc(e.target.value)}>
                                                    <option value="Paid Relocation 1">Paid Relocation 1</option>
                                                    <option value="Paid Relocation 1">Paid Relocation 2</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobBonus" className="font-medium mb-2 leading-none inline-block">Bonus</label>
                                                <input id="addJobBonus" type="text" className="w-full rounded-full border-slate-300" value={bonus} onChange={(e)=>setBonus(e.target.value)} />
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobStockOptions" className="font-medium mb-2 leading-none inline-block">Stock Options</label>
                                                <input id="addJobStockOptions" type="text" className="w-full rounded-full border-slate-300" value={stock} onChange={(e)=>setStock(e.target.value)} />
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobVisaSponsorship" className="font-medium mb-2 leading-none inline-block">Visa Sponsorship</label>
                                                <select id="addJobVisaSponsorship" className="w-full rounded-full border-slate-300" value={visa} onChange={(e)=>setVisa(e.target.value)}>
                                                    <option value="Visa Sponsorship 1">Visa Sponsorship 1</option>
                                                    <option value="Visa Sponsorship 1">Visa Sponsorship 2</option>
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
                                                <input id="addJobVacancy" type="text" className="w-full rounded-full border-slate-300" value={vacancy} onChange={(e)=>setVacancy(e.target.value)}/>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobWorktype" className="font-medium mb-2 leading-none inline-block">Worktype</label>
                                                <select id="addJobWorktype" className="w-full rounded-full border-slate-300" value={wtype} onChange={(e)=>setWtype(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Worktype 1">Worktype 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[33.33%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobLocation" className="font-medium mb-2 leading-none inline-block">Location</label>
                                                <select id="addJobLocation" className="w-full rounded-full border-slate-300" value={loc} onChange={(e)=>setLoc(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Location 1">Location 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:px-[15px] mb-6">
                                                <div className="flex flex-wrap items-center justify-between mb-2">
                                                    <label htmlFor="addJobLanguages" className="font-medium mb-2 leading-none inline-block">Language</label>
                                                    <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => langPopupOpen(true)}>Add</button>
                                                </div>
                                                
                                                <div className="w-full rounded-[25px] border border-slate-300 p-2 min-h-[42px] relative flex items-start overflow-x-auto">
                                                {lang.map((lang, i) => (
                                                    <p className="relative bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2" id={`lang${i}`}  key={i}>
                                                        {lang.title}
                                                        <span className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]">
                                                            <i className="fa-solid fa-star ml-1"></i>
                                                            {lang.exp == "Limited profeciency" && <i className="fa-solid fa-star ml-1"></i>}
                                                            {lang.exp == "Professional profeciency" && <><i className="fa-solid fa-star ml-1"></i><i className="fa-solid fa-star ml-1"></i></>}
                                                            {lang.exp == "Native or bilingual profeciency" && <><i className="fa-solid fa-star ml-1"></i><i className="fa-solid fa-star ml-1"></i><i className="fa-solid fa-star ml-1"></i></>}
                                                        </span>
                                                        <button type="button" className="absolute right-[0] top-[-5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded" onClick={(e)=>delLang(i)}>
                                                            <i className="fa-solid fa-xmark"></i>
                                                        </button>
                                                    </p>
                                                ))}
                                                    {/* <p className="relative bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2">
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
                                                    </p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                                    <div className="bg-white border border-teal-400 rounded-tl-[30px] rounded-tr-[30px] shadow-lg py-4 px-10">
                                        <h2 className="text-lg font-semibold">Skills and Qualification *</h2>
                                    </div>
                                    <div className="py-6 px-4 md:px-10">
                                        <div className="flex flex-wrap w-full lg:mx-[-15px]">
                                            <div className="w-full lg:w-[50%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobReccomSkills" className="font-medium mb-2 leading-none inline-block">Recommended Skills</label>
                                                <select id="addJobReccomSkills" className="w-full rounded-full border-slate-300" value={rskill} onChange={(e)=>setrSkill(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Skills 1">Skills 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[50%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobpreffSkills" className="font-medium mb-2 leading-none inline-block">Preffered Skills</label>
                                                <select id="addJobpreffSkills" className="w-full rounded-full border-slate-300" value={pskill} onChange={(e)=>setpSkill(e.target.value)}>
                                                    <option value="">Select</option>
                                                    <option value="Skills 1">SKills 1</option>
                                                </select>
                                            </div>
                                            <div className="w-full lg:w-[50%] mb-6 lg:px-[15px]">
                                                <label htmlFor="addJobQualification" className="font-medium mb-2 leading-none inline-block">Qualification</label>
                                                <input id="addJobQualification" type="text" className="w-full rounded-full border-slate-300" value={qf} onChange={(e)=>setQf(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center">
                                    <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 my-2 mr-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e)=>apply('Review')}>
                                    Post
                                    </button>
                                    <button type="submit" className="border border-[#6D27F9] font-bold rounded-full py-2.5 px-6 my-2 mr-6 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={(e)=>apply('Draft')}>Save as Draft</button>
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
                                        <input id="enterLang" type="text" placeholder="Ex: English" className="w-full rounded-full border-slate-300" value={alang} onChange={(e)=>setALang(e.target.value)}/>
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="chooseLangProfeciency" className="font-medium mb-2 leading-none inline-block">Choose Language Profeciency</label>
                                        <select id="chooseLangProfeciency" className="w-full rounded-full border-slate-300" value={aprof} onChange={(e)=>setAProf(e.target.value)}>
                                            <option value="Elementary profeciency">Elementary profeciency</option>
                                            <option value="Limited profeciency">Limited profeciency</option>
                                            <option value="Professional profeciency">Professional profeciency</option>
                                            <option value="Native or bilingual profeciency">Native or bilingual profeciency</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!verifyLangPopup()} onClick={(e)=>saveLang(e)}>
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
        }
        </>
    )
}

export default withAuth(3*60)(OrganisationAllJobs)