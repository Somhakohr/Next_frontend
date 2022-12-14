import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import googleIcon from "../public/images/google-icon.png";
import organisation from "../pages/organisation";
import moment from "moment";
import { useStore } from "../constants/code";
import shallow from "zustand/shallow";
import { useRouter } from "next/navigation";
import toastcomp from "./toast";



export default function OrganisationJobsCard(props) {
    const [shareJob, shareJobPopupOpen] = useState(false)
    const [draftedPopup, draftedPopupOpen] = useState(false)
    const [langPopup, langPopupOpen] = useState(false)
    const [appnum, setAppNum] = useState([])
    const cancelButtonRef = useRef(null)
    const {data} = props
    const router = useRouter();
    
    const [param1, updateParam1] = useStore(
        (state) => [state.param1, state.updateParam1],
        shallow
    )

    const {axiosInstanceAuth2,setJobReload,setEditJob} = props



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

    

    function viewJob(refid){
        refid = refid.toUpperCase()
        updateParam1(refid);
        router.push(`/organisation/job/preview/${refid}`)
    }

    function viewApplicant(refid){
        refid = refid.toUpperCase()
        updateParam1(refid);
        router.push(`/organisation/job/${refid}/applicants`)
    }

    async function getApplicant() {
        await axiosInstanceAuth2.get('/job/job/applicant/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            setAppNum(res.data)
        }).catch((err)=>{
        });
    }

    async function deleteJob() {
        await axiosInstanceAuth2.post('/job/closejob/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            toastcomp("Job CLosed Successfully","Success")
            setJobReload(true)
        }).catch((err)=>{
            toastcomp("Job Not CLosed","error")
        });
    }

    async function archievedJob() {
        await axiosInstanceAuth2.post('/job/archived/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            toastcomp("Job Archived Successfully","Success")
            setJobReload(true)
        }).catch((err)=>{
            toastcomp("Job Not CLosed","error")
        });
    }

    async function activateJob() {
        await axiosInstanceAuth2.post('/job/archivedtoactive/'+data.user.orefid+'/'+data.refid+'/').then(async (res)=>{
            toastcomp("Job In Review Mode","Success")
            setJobReload(true)
        }).catch((err)=>{
            toastcomp("Job Not In Review Mode","error")
        });
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

    useEffect(() => {
        if(data.jobStatus == "Active"){
            getApplicant()}

        if(draftedPopup){
            resetJOBFORM()
            if(data['title']){setTitle(data['title'])}
            if(data['dept']){setDept(data['dept'])}
            if(data['exp']){setExp(data['exp'])}
            if(data['type']){setType(data['type'])}
            if(data['level']){setLevel(data['level'])}
            if(data['deadline']){setDeadline(moment(data['deadline']).format('YYYY-MM-DD'))}
            if(data['industry']){setInd(data['industry'])}
            if(data['desc']){setDesc(data['desc'])}
            if(data['resp']){setRes(data['resp'])}
            if(data['salary']){setSalary(data['salary'])}
            if(data['relocation']){setReloc(data['relocation'])}
            if(data['bonus']){setBonus(data['bonus'])}
            if(data['stock']){setStock(data['stock'])}
            if(data['visa']){setVisa(data['visa'])}
            if(data['vacancy']){setVacancy(data['vacancy'])}
            if(data['worktype']){setWtype(data['worktype'])}
            if(data['location']){setLoc(data['location'])}
            if(data['recskill']){setrSkill(data['recskill'])}
            if(data['preskill']){setpSkill(data['preskill'])}
            if(data['qualification']){setQf(data['qualification'])}
            if(data['lng1']){
                let dic = {}
                dic['title']=data['lng1']
                dic['exp']=data['exp1']
                let abc = lang
                abc.push(dic)
                setLang(abc)
            }
            if(data['lng2']){
                let dic = {}
                dic['title']=data['lng2']
                dic['exp']=data['exp2']
                let abc = lang
                abc.push(dic)
                setLang(abc)
            }
            if(data['lng3']){
                let dic = {}
                dic['title']=data['lng3']
                dic['exp']=data['exp3']
                let abc = lang
                abc.push(dic)
                setLang(abc)
            }
            if(data['lng4']){
                let dic = {}
                dic['title']=data['lng4']
                dic['exp']=data['exp4']
                let abc = lang
                abc.push(dic)
                setLang(abc)
            }
        }
    }, [draftedPopup])
    
    
    async function updateJob(formdata) {
        await axiosInstanceAuth2.put('/job/update/'+data["refid"]+'/',formdata).then(async (res)=>{
            toastcomp("Job Updated",'success')
            resetJOBFORM()
            draftedPopupOpen(false)
            setEditJob(true)
        }).catch((err)=>{
            toastcomp("Job Not Updated",'error')
            console.log(err)
        })
    }
    
    function update() {
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
                updateJob(formData)
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
            <div className="bg-[#f4f4f4] border border-2 border-slate-300 rounded-[25px] overflow-hidden">
                <div className="p-5">
                    <div className="flex mb-8">
                        <div className="bg-white rounded-full p-2.5 flex items-center justify-center w-[50px] h-[50px]">
                            <Image src={data.org.profile} width={50} height={50} alt="Google" className="w-full" />
                        </div>
                        <div className="pl-3 w-[calc(100%-60px)]">
                            <h3 className="font-bold text-[15px] mb-1">{data.title}</h3>
                            <div className="flex items-center">
                                <h5 className="font-medium text-sm my-1 mr-6">{data.user.company_name}</h5>
                                <div className="flex items-center text-[12px] mt-[2px]">
                                    <p className="text-[#646464] mr-2">{data.refid ? data.refid : <>Not Specified</>}</p>
                                    <button type="button" onClick={() => shareJobPopupOpen(true)}>
                                        <i className="fa-solid fa-share text-[#6D27F9]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-[#787878] text-[12px] flex flex-wrap">
                        <p className="w-full sm:max-w-[50%] mb-3">
                            Place: {data.location ? data.location : <>Not Specified</>}
                        </p>
                        <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                            {data.level ? data.level : <>Not Specified</>}
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                        <p>
                            {data.publish_date ? moment(data.publish_date).fromNow(): <>Not Specified</>}
                        </p>
                        {data.jobStatus == "Active" && 
                        <button type="button" onClick={(e)=>viewJob(data.refid)} className="text-[#6D27F9] hover:underline hover:text-black">View Job</button>}
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white p-5 shadow-normal">
                    <div className="flex items-center">

                        {data.jobStatus == "Active" && 
                        <>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3" onClick={(e)=>archievedJob()}>
                            <i className="fa-regular fa-folder-open"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Archived</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3" onClick={(e)=>deleteJob()}>
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        </>
                        
                        }
                        {data.jobStatus == "Archived" && 
                        <>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3" onClick={(e)=>activateJob()}>
                            <i className="fa-regular fa-folder-open"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Activate</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3" >
                            <i className="fa-regular fa-edit"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child" onClick={() => draftedPopupOpen(true)}>Edit</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3" onClick={(e)=>deleteJob()}>
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        </>
                        }

                        {data.jobStatus == "Draft" && 
                        <>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3" onClick={(e)=>activateJob()}>
                            <i className="fa-regular fa-folder-open"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Activate</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3" onClick={() => draftedPopupOpen(true)}>
                            <i className="fa-regular fa-edit"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child" >Edit</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3" onClick={(e)=>deleteJob()}>
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        </>
                        }

                        {data.jobStatus == "Close" && 
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-solid fa-copy"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Clone</span>
                        </button>
                        }

                    </div>
                    <div className="text-right">
                        
                        {data.jobStatus == "Active" && 
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e)=>viewApplicant(data.refid)}>{appnum.length} Applicants</button>
                        }
                        
                        {data.jobStatus != "Active" && 
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e)=>viewJob(data.refid)}>View Job</button>
                        }
                    </div>
                </div>
            </div>
            <Transition.Root show={shareJob} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={shareJobPopupOpen}>
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
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
                                    <button type="button" className="leading-none" onClick={() => shareJobPopupOpen(false)}>
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
            <Transition.Root show={langPopup} as={Fragment}>
                <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={langPopupOpen}>
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
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
            <Transition.Root show={draftedPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={draftedPopupOpen}>
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-[1100px]">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Edit Drafted Job</h4>
                                    <button type="button" className="leading-none" onClick={() => draftedPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
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
                                                        <option value="Paid Relocation 2">Paid Relocation 2</option>
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
                                                        <option value="Visa Sponsorship 2">Visa Sponsorship 2</option>
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
                                                        <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={(e)=>langPopupOpen(true)}>Add</button>
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
                                                            <button type="button" className="absolute right-[0] top-[-5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded">
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
                                        <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 my-2 mr-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e)=>update()}>
                                        Update
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