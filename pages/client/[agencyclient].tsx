import Image from "next/image"
import userImg from '../../public/images/user-image.png';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axiosApi";
import axios from "axios";
import toastcomp from "../../components/toast";
import Link from "next/link";

export default function CandidateUsers() {

    const { asPath } = useRouter()
    const router = useRouter()
    const [code,setcode] = useState('')
    const [crefid,setcrefid] = useState('')
    const [auth,setauth] = useState(false)
    const [view,setview] = useState(false)
    const [clientApp,setClientApp] = useState([])
    const [applicantData,setApplicantData] = useState([])
    const [lang,setLang] = useState([])
    const [link,setLink] = useState([])
    const [resume,setResume] = useState([])
    const [skill,setSkill] = useState([])
    const [cert,setCert] = useState([])
    const [edu,setEdu] = useState([])
    const [exp,setExp] = useState([])
    const [achieve,setAchieve] = useState([])
    const [interview,setInterview] = useState([])
    const [app,setApp] = useState([])

    useEffect(() => {
      setcode(asPath.substring(1).split("/")[1])
    })

    const axiosInstance2 = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
        timeout: 5000,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    async function verifyAgency(formData,code) {
        await axiosInstance2.post('/job/agency/client/verify/',formData).then(async (res)=>{
            console.log(res)
            if(res.data.Message){
                setauth(true)
                loadApplicant(code)
            }
            else{
                setauth(false)
                alert("Password & Code Does Not Match")
                router.push("/")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function loadApplicant(code) {
        await axiosInstance2.get('/job/agency/jobs/'+code+'/').then(async (res)=>{
            console.log(res)
            setClientApp(res.data)
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Applicant Not Loaded","error");
            }
        })
    }

    async function loadLang() {
        await axiosInstance2.get('/candidate/listlang/'+crefid+'/').then(async (res)=>{
            setLang(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Lang Not Loaded",'error')
            }
            console.log(err)
        })
    }
    
    async function loadLink() {
        await axiosInstance2.get('/candidate/listlink/'+crefid+'/').then(async (res)=>{
            setLink(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Link Not Loaded",'error')
            }
            console.log(err)
        })
    }

    async function loadReume() {
        await axiosInstance2.get('/candidate/listresume/'+crefid+'/').then(async (res)=>{
            setResume(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Resume Not Loaded",'error')
            }
            console.log(err)
        })
    }

    async function loadSkill() {
        await axiosInstance2.get('/candidate/listskill/'+crefid+'/').then(async (res)=>{
            setSkill(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Skills Not Loaded",'error')
            }
            console.log(err)
        })
    }

    async function loadCertification() {
        await axiosInstance2.get('/candidate/listcertificate/'+crefid+'/').then(async (res)=>{
            setCert(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Certification Not Loaded",'error')
            }
            console.log(err)
        })
    }

    async function loadEducation() {
        await axiosInstance2.get('/candidate/listeducation/'+crefid+'/').then(async (res)=>{
            setEdu(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Education Not Loaded",'error')
            }
            console.log(err)
        })
    }

    async function loadExperience() {
        await axiosInstance2.get('/candidate/listexperience/'+crefid+'/').then(async (res)=>{
            setExp(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Exp Not Loaded",'error')
            }
            console.log(err)
        })
    }
    
    async function loadAchieve() {
        await axiosInstance2.get('/candidate/listachievement/'+crefid+'/').then(async (res)=>{
            setAchieve(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Achieve Not Loaded",'error')
            }
            console.log(err)
        })
    }
    

    useEffect(() => {
      if(code.length == 6){
        const pw = prompt("Please Enter Password");
        if(pw != null && pw.length >= 6){
            var f = new FormData()
            f.append('code',code)
            f.append('password',pw)
            verifyAgency(f,code)
        }
        else{
            router.push("/")
        }
      }
    }, [code])

    async function viewApp(crefid,arefid) {
        await axiosInstance2.get('/job/agency/single/job/'+arefid+'/').then(async (res)=>{
            setApplicantData(res.data)
            setview(true)
            setcrefid(crefid)
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Applicant View Not Loaded","error");
            }
        })
    }

    useEffect(() => {
      if(crefid){
        loadAchieve()
        loadCertification()
        loadEducation()
        loadExperience()
        loadLang()
        loadLink()
        loadReume()
        loadSkill()
      }
    }, [crefid])
    
    
    return (
        <>
        {auth &&
            view?
            <>
            <main className="py-8">
            {applicantData.map((data, i) => (
                <div className="container" key={i}>
                    <button type="button" onClick={(e)=>setview(false)} className="mb-2 rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div className="flex flex-wrap mb-6">
                        <div className="w-full lg:max-w-[75%] xl:max-w-[80%] lg:pr-6 mb-6 lg:mb-0">
                            <div className="bg-white shadow-normal border rounded-[25px] flex flex-wrap h-full">
                                <div className="w-[310px] mx-auto p-8">
                                    <div className="userBgImage min-h-[268px] flex items-center justify-center">
                                        <Image src={data.cand.profile} width={220} height={220} alt="User" className="w-[220px] h-[220px] rounded-full object-cover mx-auto " />
                                    </div>
                                </div>
                                <div className="w-full md:max-w-[calc(100%-310px)] p-6 xl:p-8 relative bg-white border rounded-[25px] flex items-center">
                                    <aside className="w-full text-[#646464]">
                                        <h2 className="font-semibold text-xl md:text-3xl mb-2">
                                        {data.user.first_name || data.user.last_name? <>{data.user.first_name}  {data.user.last_name}</> : <>N/A</> }
                                        </h2>
                                        <p className="font-light text-[12px] mb-2">{data.erefid}</p>
                                        <p className="text-sm mb-6">
                                        {data.cand.title ? data.cand.title : <>N/A</>}
                                        </p>
                                        <ul className="flex flex-wrap mx-[-10px]">
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px] break-all">
                                                <i className="fa-solid fa-envelope xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{data.user.email ? data.user.email : <>N/A</>}</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-phone xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{data.user.mobile ? data.user.mobile : <>N/A</>}</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-wallet xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{data.cand.salary ? data.cand.salary : <>N/A</>} </p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-briefcase xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{data.cand.prejobtype ? data.cand.prejobtype : <>N/A</>}</p>
                                            </li>
                                            <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                                                <i className="fa-solid fa-location-dot xl:text-xl mr-3"></i>
                                                <span className="mr-2">:</span>
                                                <p>{data.cand.prelocation ? data.cand.prelocation : <>N/A</>}</p>
                                            </li>
                                        </ul>
                                    </aside>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:max-w-[25%] xl:max-w-[20%] bg-white shadow-normal rounded-[25px] overflow-hidden">
                            <div className="p-6 pb-0 shadow-md border-b">
                                <h4 className="font-semibold text-lg text-center">Social Links</h4>
                                <ul className="flex flex-wrap text-center">
                                {link.map((link, i) => (
                                    <li className="w-[calc(100%/3)] p-4" key={i}>
                                        <Link href="link.title" target="_blank" rel="noreferrer" className="text-2xl hover:text-[#6D27F9]">
                                            <i className="fa-solid fa-link "></i>
                                        </Link>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            <div className="p-6 text-center">
                                <h6 className="text-[#646464] mb-4">{data.job.refid}</h6>
                                {resume.map((resume, i) => (
                                <a href={resume.file} target='_blank' rel="noreferrer" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-sm text-white font-semibold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]" key={i}>
                                    Download Resume
                                    <i className="fa-solid fa-download ml-2"></i>
                                </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-[70%] lg:pl-6">
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                                <article>
                                    {data.cand.summary}
                                </article>
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                                <div className="flex flex-wrap items-start">
                                {skill.map((skill, i) => (
                                <p className="bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3" key={i}>
                                    {skill.title}
                                    <span className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]" id={skill.title+"Skill"}>
                                        <i className="fa-solid fa-star ml-1"></i>
                                        {skill.experties == 'Intermediate' && <i className="fa-solid fa-star ml-1"></i>}
                                        {skill.experties == 'Advance' && <><i className="fa-solid fa-star ml-1"></i><i className="fa-solid fa-star ml-1"></i></>}
                                    </span>
                                </p>
                                ))}
                                </div>
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Certification</h3>
                                {cert.map((cert, i) => (
                                    <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden" key={i}>
                                        <article>
                                            <h4 className="font-semibold mb-1 text-lg">{cert.title}</h4>
                                            <p className="text-[#6D27F9] font-medium mb-2">{cert.company}</p>
                                            <p className="text-[#646464] font-light text-sm mb-2">Issued Date:- {cert.yearofissue} <br/> Expiry Date:- {cert.yearofexp ? cert.yearofexp : <>No Expiry</>}</p>
                                            <p className="text-[#646464] font-light text-sm mb-2">credentials:- {cert.creid}</p>
                                            <a type="button" href={cert.creurl} target="_blank" rel="noreferrer" className="border border-[#6D27F9] rounded-full py-1.5 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" >Show Certificate</a>
                                        </article>
                                    </div>      
                                ))}
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Education</h3>
                                {edu.map((edu, i) => (
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden" key={i}>
                                    <article>
                                        <h4 className="font-semibold mb-1 text-lg">{edu.title}</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2">{edu.college}</p>
                                        <p className="text-[#646464] font-light text-sm mb-2">Started Date:- {edu.yearofjoin} <br/> End Date:- {edu.yearofend}</p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#646464] font-light text-sm">{edu.edubody}</p>
                                    </article>
                                </div>
                                ))}
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Experience</h3>
                                {exp.map((exp, i) => (
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden" key={i}>
                                    <article>
                                        <h4 className="font-semibold mb-1 text-lg">{exp.title}</h4>
                                        <p className="text-[#6D27F9] font-medium mb-2">{exp.company}</p>
                                        <p className="text-[#646464] font-light text-sm mb-2">Started Date:- {exp.year_of_join} <br/> End Date:- {exp.year_of_end ? exp.year_of_end : <>PRESENT</>}</p>
                                        <p className="text-[#646464] font-light text-sm mb-2">Type:- {exp.type}</p>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#646464] font-light text-sm">{exp.expbody}</p>
                                    </article>
                                </div>       
                                ))}
                            </div>
                            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                                <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                                {achieve.map((achieve, i) => (
                                <div className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden" key={i}>
                                    <article>
                                        <h4 className="font-semibold mb-1 text-lg">{achieve.title}</h4>
                                        <h6 className="font-medium">About</h6>
                                        <p className="text-[#646464] font-light text-sm">{achieve.desc}</p>
                                    </article>
                                </div>       
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </main>
            </>
            :
            <main className="py-8">
                <div className="container">
                    <div className="bg-white shadow-normal rounded-[25px] p-8">
                        <h2 className="font-bold text-2xl mb-6">Candidates</h2>
                        <div className="flex flex-wrap mx-[-10px]">
                            {
                                clientApp.map((users, i) => (
                                    <div key={i} className="w-full md:max-w-[50%] lg:max-w-[33.33%] px-[10px] mb-[20px]">
                                        <div className="shadow-lg bg-white rounded-[20px] border border-teal-400 overflow-hidden">
                                            <div className="shadow-lg relative flex flex-wrap items-center justify-between p-4 text-sm">
                                                <aside className="flex items-center mr-2">
                                                    <Image src={users.cand.profile} alt="noimg" className="mr-2 rounded-full w-[40px] h-[40px] object-cover" width={40} height={40} />
                                                    <p className="text-[#6D27F9] font-semibold">{users.job.title}</p>
                                                </aside>
                                                <p className="my-2"><b>ID:</b> {users.job.refid}</p>
                                            </div>
                                            <div className="bg-[#FAF8FF] p-4 text-[#646464] text-sm">
                                                <h6 className="font-bold mb-2 text-black">{users.user.first_name}</h6>
                                                <p className="mb-2">{users.user.email}</p>
                                                <ul className="flex flex-wrap mx-[-10px] mb-2">
                                                    <li className="w-full xl:max-w-[50%] px-[10px] mb-2">
                                                        <p><b>Experience:</b> {users.cand.yearofexp}</p>
                                                    </li>
                                                    <li className="w-full xl:max-w-[50%] px-[10px] mb-2">
                                                        <p><b>Notice Period:</b> {users.cand.noticeperiod}</p>
                                                    </li>
                                                </ul>
                                                <div className="text-center">
                                                <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2 px-8 transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e)=>viewApp(users.user.erefid,users.arefid)}>View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
            
        }
        </>
    )
}