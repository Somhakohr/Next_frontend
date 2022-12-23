import Link from 'next/link'
import Image from "next/image";
import React, { useEffect } from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import userImg from "../../public/images/user-image.png";
import uploadImages from "../../public/images/upload_images.png";
import gallery_1 from '../../public/images/gallery-1.png';
import gallery_2 from '../../public/images/gallery-2.png';
import gallery_3 from '../../public/images/gallery-3.png';
import gallery_4 from '../../public/images/gallery-4.png';
import gallery_5 from '../../public/images/gallery-5.png';
import { withAuth } from '../../constants/HOCs';
import shallow from 'zustand/shallow';
import { useStore } from '../../constants/code';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import toastcomp from '../../components/toast';

function OrganisationAccount(props) {
    const cancelButtonRef = useRef(null)
    const [deletePopup, deletePopupOpen] = useState(false)
    const [socialPopup, socialPopupOpen] = useState(false)
    const [galleryImages, galleryImagesAdd] = useState(false)
    const [changePassword, changePasswordOpen] = useState(false)

    const { router,session } = props; 

    const [userName, updateUserName] = useStore(
        (state) => [state.userName, state.updateUserName],
        shallow
    )

    const [userImg, updateUserImg] = useStore(
        (state) => [state.userImg, state.updateUserImg],
        shallow
    )

    const [userCImg, updateUserCImg] = useStore(
        (state) => [state.userCImg, state.updateUserCImg],
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

    const [profileimg,setProfileImg] = useState()
    const [coverimg,setCoverImg] = useState()
    const [cname,setCName] = useState('')
    const [ind,setInd] = useState('')
    const [curl,setCUrl] = useState('')
    const [fdate,setFDate] = useState('')
    const [founder,setFounder] = useState('')
    const [cemail,setCEmail] = useState('')
    const [lname,setLName] = useState('')
    const [rname,setRName] = useState('')
    const [rdes,setRDes] = useState('')
    const [cstrength,setCStrength] = useState('')
    const [orgstatus,setOrgStatus] = useState('')
    const [opestatus,setOpeStatus] = useState('')
    const [fundround,setFundRound] = useState('')
    const [fund,setFund] = useState('')
    const [desc,setDesc] = useState('')
    const [add,setAdd] = useState('')
    const [otype,setOType] = useState('')

    const [fcname,setFCName] = useState('')
    const [fcurl,setFCUrl] = useState('')
    const [ffounder,setFFounder] = useState('')
    const [fcemail,setFCEmail] = useState('')
    const [flname,setFLName] = useState('')
    const [frname,setFRName] = useState('')
    const [frdes,setFRDes] = useState('')
    const [ffundround,setFFundRound] = useState('')
    const [ffund,setFFund] = useState('')
    const [fdesc,setFDesc] = useState('')
    const [fadd,setFAdd] = useState('')

    //local social state
    const [link,setLink] = useState([])
    const [atitle,setATitle] = useState('')    

    //local social state
    const [gallery,setGallery] = useState([])
    const [file,setFile] = useState([] as any)    


    //axios auth var
    const axiosInstanceAuth2 = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer '+accessToken,
            "Content-Type": "multipart/form-data",
        }
    });

    function verifyLinkPopup() {
        return atitle.length > 0
    }

    function verifyGalPopup() {
        return file.length > 0
    }    


    async function loadLink() {
        await axiosInstanceAuth2.get('/organisation/organisationlinklist/'+userObj['orefid']+'/').then(async (res)=>{
            setLink(res.data)
            socialPopupOpen(false)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Link Not Loaded",'error')
            }
            console.log(err)
            socialPopupOpen(false)
        })
    }

    async function addLink(formdata) {
        await axiosInstanceAuth2.post('/organisation/organisationlink/'+userObj['orefid']+'/',formdata).then(async (res)=>{
            toastcomp("Social Link Added",'success')
            loadLink()
        }).catch((err)=>{
            toastcomp("Link Not Added",'error')
            console.log(err)
        })
    }
    
    async function deleteLink(val) {
        await axiosInstanceAuth2.delete('/organisation/organisationlink/'+userObj['orefid']+'/'+val+'/delete/').then(async (res)=>{
            toastcomp("Link Deleted",'success')
            loadLink()
        }).catch((err)=>{
            toastcomp("Link Not Deleted",'error')
            console.log(err)
        })
    }

    async function loadGalllery() {
        await axiosInstanceAuth2.get('/organisation/organisationgallerylist/'+userObj['orefid']+'/').then(async (res)=>{
            setGallery(res.data)
        }).catch((err)=>{
            if(err.message != "Request failed with status code 401"){
                toastcomp("Gallery Not Loaded",'error')
            }
            console.log(err)
            galleryImagesAdd(false)
        })
    }

    async function deleteGallery(val) {
        await axiosInstanceAuth2.delete('/organisation/organisationgallery/'+userObj['orefid']+'/'+val+'/delete/').then(async (res)=>{
            toastcomp("Gallery Deleted",'success')
            loadGalllery()
        }).catch((err)=>{
            toastcomp("Gallery Not Deleted",'error')
            console.log(err)
        })
    }

    async function addGallery(formdata) {
        await axiosInstanceAuth2.post('/organisation/organisationgallery/'+userObj['orefid']+'/',formdata).then(async (res)=>{
            toastcomp("Gallery Added",'success')
            loadGalllery()
            setFile([])
            galleryImagesAdd(false)
        }).catch((err)=>{
            toastcomp("Gallery Not Added",'error')
            console.log(err)
        })
    }

    //save social media link
    function saveLink(e){
        const formData = new FormData();
        formData.append('title',atitle)
        addLink(formData);
        setATitle('')
    }

    //save social media link
    function saveGallery(){
        if(file.length > 0){
            for(let i=0;i<file.length;i++){
                const formData = new FormData();
                formData.append('image',file[i])
                addGallery(formData);
            }
        }
    }
    
    function onImageChange(e: any) {
        setFile([...file,...e.target.files]);
    }

    function deleteUImage(num) {
        if(file.length == 1) { setFile([]) }
        else{file.splice(num,1)}
        var myElement = document.getElementById(`gallerypopup${num}`);
        myElement.remove();
    }

    useEffect(() => {
      if(!session){
        router.push("/");
      }
    }, [session]);

    useEffect(() => {

      if(userObj && userProfile){
        if(userProfile["company_email"]){setCEmail(userObj["email"]),setFCEmail(userObj["email"])}
        else{setCEmail(userObj["email"]),setFCEmail(userObj["email"])}
        setCName(userObj["company_name"])
        setFCName(userObj["company_name"])
        setOType(userObj["company_type"])

        if(userProfile["industry"]){setInd(userProfile["industry"])}
        if(userProfile["url"]){setCUrl(userProfile["url"]),setFCUrl(userProfile["url"])}
        if(userProfile["founded_date"]){setFDate(userProfile["founded_date"])}
        if(userProfile["founders"]){setFounder(userProfile["founders"]),setFFounder(userProfile["founders"])}
        if(userProfile["legal_name"]){setLName(userProfile["legal_name"]),setFLName(userProfile["legal_name"])}
        if(userProfile["recuriter_name"]){setRName(userProfile["recuriter_name"]),setFRName(userProfile["recuriter_name"])}
        if(userProfile["recuriter_designation"]){setRDes(userProfile["recuriter_designation"]),setFRDes(userProfile["recuriter_designation"])}
        if(userProfile["company_strength"]){setCStrength(userProfile["company_strength"])}
        if(userProfile["organisation_status"]){setOrgStatus(userProfile["organisation_status"])}
        if(userProfile["operation_status"]){setOpeStatus(userProfile["operation_status"])}
        if(userProfile["roundoffund"]){setFundRound(userProfile["roundoffund"]),setFFundRound(userProfile["roundoffund"])}
        if(userProfile["fund_amount"]){setFund(userProfile["fund_amount"]),setFFund(userProfile["fund_amount"])}
        if(userProfile["address"]){setAdd(userProfile["address"]),setFAdd(userProfile["address"])}
        if(userProfile["description"]){setDesc(userProfile["description"]),setFDesc(userProfile["description"])}

        loadLink()
        loadGalllery()
      }
    }, [userObj,userProfile])
    
    async function saveProfile(formData) {
        await axiosInstanceAuth2.put('/organisation/organisationprofile/'+userObj['orefid']+'/',formData).then(async (res)=>{
            updateUserProfile(res.data)
            toastcomp("Profile Updated","success");
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Profile Not Updated","error");
            }
        })
    }
    
    async function saveAccount(formData) {
        await axiosInstanceAuth2.put('/auth/organizationaccont/'+userObj['orefid']+'/',formData).then(async (res)=>{
            userObj['company_name']=res.data.company_name
            userObj["company_type"]=res.data.company_type
            toastcomp("Profile Updated","success");
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Profile Not Updated","error");
            }
        })
    }

    useEffect(() => {
        
        if(userProfile){
            var formData = new FormData();
            var formData2 = new FormData();
            if(ind && userProfile["industry"]!=ind){
                formData.append("industry", ind);
            }
            if(curl && userProfile["url"]!=curl){
                formData.append("url",curl);
            }
            if(fdate && userProfile["founded_date"]!=fdate){
                formData.append("founded_date",fdate);
            }
            if(founder && userProfile["founders"]!=founder){
                formData.append("founders",founder);
            }
            if(lname && userProfile["legal_name"]!=lname){
                formData.append("legal_name",lname);
            }
            if(rname && userProfile["recuriter_name"]!=rname){
                formData.append("recuriter_name",rname);
            }
            if(rdes && userProfile["recuriter_designation"]!=rdes){
                formData.append("recuriter_designation",rdes);
            }
            if(cstrength && userProfile["company_strength"]!=cstrength){
                formData.append("company_strength",cstrength);
            }
            if(orgstatus && userProfile["organisation_status"]!=orgstatus){
                formData.append("organisation_status",orgstatus);
            }
            if(opestatus && userProfile["operation_status"]!=opestatus){
                formData.append("operation_status",opestatus);
            }
            if(fundround && userProfile["roundoffund"]!=fundround){
                formData.append("roundoffund",fundround);
            }
            if(fund && userProfile["fund_amount"]!=fund){
                formData.append("fund_amount",fund);
            }
            if(add && userProfile["address"]!=add){
                formData.append("address",add);
            }
            if(desc && userProfile["description"]!=desc){
                formData.append("description",desc);
            }
            if(cemail && userProfile["company_email"]!=cemail){
                formData.append("company_email",cemail);
            }
            if(coverimg){
                formData.append("cover",coverimg);
            }
            if(profileimg){
                formData.append("profile",profileimg);
            }
            if(cname && userObj["company_name"]!=cname){
                formData2.append("company_name", cname);
            }
            if(otype && userObj["company_type"]!=otype){
                formData2.append("company_type", otype);
            }

            if(Array.from(formData.keys()).length > 0){
                saveProfile(formData)
            }
            if(Array.from(formData2.keys()).length > 0){
                saveAccount(formData2)
            }
        }


    }, [fcname,otype,ind,fcurl,fdate,ffounder,fcemail,flname,frname,frdes,cstrength,orgstatus,opestatus,ffundround,ffund,fdesc,fadd,coverimg,profileimg])
    

    return (
        <>
        { userType == "Organisation" &&
            <>
            <main className="py-8">
                <div className="container flex flex-wrap items-start">
                    <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
                        <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] py-8 px-4">
                            <ul className="flex flex-wrap items-center justify-between text-sm">
                                <li className="w-[49%] lg:w-full">
                                    <Link href="#about" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                                        About Company
                                    </Link>
                                </li>
                                <li className="w-[49%] lg:w-full">
                                    <Link href="#social" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                                        Social Media
                                    </Link>
                                </li>
                                <li className="w-[49%] lg:w-full">
                                    <Link href="#gallery" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                                        Gallery
                                    </Link>
                                </li>
                                <li className="w-[49%] lg:w-full">
                                    <button type="button" onClick={() => changePasswordOpen(true)} className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2 w-full">
                                        Change Password
                                    </button>
                                </li>
                                <li className="w-[49%] lg:w-full">
                                    <button type="button" onClick={() => deletePopupOpen(true)} className="flex items-center py-2 px-3 lg:px-8 bg-red-400 text-white hover:bg-red-700 hover:text-white rounded-lg my-2 w-full">
                                        Delete Account
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6">
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8 mb-6">
                            <aside className="w-full mb-20" id="about">
                                <span className="text-[#646464] text-[12px] block mb-2">Supported Formats: png, jpg upto 2 MB</span>
                                <div className="relative border border-slate-300 rounded-[16px]">
                                    <Image
                                        src={userCImg}
                                        alt="User"
                                        height={100}
                                        width={100}
                                        className="object-cover rounded-[16px] w-full h-[250px]"
                                    />
                                    <label htmlFor="uploadCImage" className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white">
                                        <i className="fa-solid fa-plus text-xl"></i>
                                        <input type="file" id="uploadCImage" className="absolute left-0 top-0 z-20" hidden accept="image/png, image/jpeg" onChange={(e) => {setCoverImg(e.target.files[0]) }} 
                                        />
                                    </label>
                                    <div className="absolute left-[50%] bottom-[-50px] translate-x-[-50%] inline-block">
                                        <Image
                                            src={userImg}
                                            alt="User"
                                            height={100}
                                            width={100}
                                            className="rounded-full shadow-normal bg-white object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"
                                        />
                                        <label htmlFor="uploadImage" className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white">
                                            <i className="fa-solid fa-plus text-xl"></i>
                                            <input type="file" id="uploadImage" className="absolute left-0 top-0 z-20" hidden accept="image/png, image/jpeg" onChange={(e) => { setProfileImg(e.target.files[0]) }}  />
                                        </label>
                                    </div>
                                </div>
                            </aside>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompName" className="font-medium mb-2 leading-none inline-block">Company Name</label>
                                    <input type="text" id="orgCompName" className="w-full rounded-full border-slate-300" value={cname} onChange={(e)=>setCName(e.target.value)} onBlur={(e)=>setFCName(e.target.value)} />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompIndustry" className="font-medium mb-2 leading-none inline-block">Industry</label>
                                    {/* <select id="orgCompIndustry" className="w-full rounded-full border-slate-300" value={ind} onChange={(e)=>setInd(e.target.value)}>
                                        <option value="">Select Industry</option>
                                        <option value="Industry 1">Industry 1</option>
                                        <option value="Industry 2">Industry 2</option>
                                    </select> */}
                                    <Multiselect
                                    isObject={false}
                                    customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
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
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompURL" className="font-medium mb-2 leading-none inline-block">Company URL</label>
                                    <input type="text" id="orgCompURL" className="w-full rounded-full border-slate-300" value={curl} onChange={(e)=>setCUrl(e.target.value)} onBlur={(e)=>setFCUrl(e.target.value)} />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFoundedDate" className="font-medium mb-2 leading-none inline-block">Founded Date</label>
                                    <input type="date" id="orgCompFoundedDate" className="w-full rounded-full border-slate-300" value={fdate} onChange={(e)=>setFDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFounders" className="font-medium mb-2 leading-none inline-block">Founders</label>
                                    <input type="text" id="orgCompFounders" className="w-full rounded-full border-slate-300" value={founder} onChange={(e)=>setFounder(e.target.value)} onBlur={(e)=>setFFounder(e.target.value)} />
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompEmail" className="font-medium mb-2 leading-none inline-block">Company Email</label>
                                    <input type="text" id="orgCompEmail" className="w-full rounded-full border-slate-300" value={cemail} onChange={(e)=>setCEmail(e.target.value)}  onBlur={(e)=>setFCEmail(e.target.value)}/>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompLegalName" className="font-medium mb-2 leading-none inline-block">Legal Name</label>
                                    <input type="text" id="orgCompLegalName" className="w-full rounded-full border-slate-300" value={lname} onChange={(e)=>setLName(e.target.value)} onBlur={(e)=>setFLName(e.target.value)}/>
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompRecruiterName" className="font-medium mb-2 leading-none inline-block">Recruiter Name</label>
                                    <input type="text" id="orgCompRecruiterName" className="w-full rounded-full border-slate-300" value={rname} onChange={(e)=>setRName(e.target.value)}  onBlur={(e)=>setFRName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompRecruiterDesg" className="font-medium mb-2 leading-none inline-block">Recruiter Designation</label>
                                    <input type="text" id="orgCompRecruiterDesg" className="w-full rounded-full border-slate-300" value={rdes} onChange={(e)=>setRDes(e.target.value)} onBlur={(e)=>setFRDes(e.target.value)}/>
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompStrength" className="font-medium mb-2 leading-none inline-block">Company Strength</label>
                                    {/* <select id="orgCompStrength" className="w-full rounded-full border-slate-300" value={cstrength} onChange={(e)=>setCStrength(e.target.value)}>
                                        <option value="">Select Strength</option>
                                        <option value="0-10">0-10</option>
                                        <option value="10-20">10-20</option>
                                    </select> */}
                                    <Multiselect
                                    isObject={false}
                                    customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
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
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompStatus" className="font-medium mb-2 leading-none inline-block">Organisation Status</label>
                                    {/* <select id="orgCompStatus" className="w-full rounded-full border-slate-300" value={orgstatus} onChange={(e)=>setOrgStatus(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </select> */}
                                    <Multiselect
                                    isObject={false}
                                    customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
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
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompOperation" className="font-medium mb-2 leading-none inline-block">Operation Status</label>
                                    <select id="orgCompOperation" className="w-full rounded-full border-slate-300" value={opestatus} onChange={(e)=>setOpeStatus(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFundingRound" className="font-medium mb-2 leading-none inline-block">Total Round of Funding</label>
                                    <input type="text" id="orgCompFundingRound" className="w-full rounded-full border-slate-300" value={fundround} onChange={(e)=>setFundRound(e.target.value)} onBlur={(e)=>setFFundRound(e.target.value)}/>
                                </div>
                                <div className="w-full lg:w-[47%] mb-6">
                                    <label htmlFor="orgCompFundingAmount" className="font-medium mb-2 leading-none inline-block">Funding Amount</label>
                                    <input type="text" id="orgCompFundingAmount" className="w-full rounded-full border-slate-300" value={fund} onChange={(e)=>setFund(e.target.value)} onBlur={(e)=>setFFund(e.target.value)}/>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="orgCompHeadAddress" className="font-medium mb-2 leading-none inline-block">Headquarters Location Address</label>
                                <textarea id="orgCompHeadAddress" className="w-full rounded-[25px] resize-none border-slate-300 h-[150px]" value={add} onChange={(e)=>setAdd(e.target.value)}  onBlur={(e)=>setFAdd(e.target.value)}></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="orgCompDesc" className="font-medium mb-2 leading-none inline-block">Company Description</label>
                                <textarea id="orgCompDesc" className="w-full rounded-[25px] resize-none border-slate-300 h-[150px]" value={desc} onChange={(e)=>setDesc(e.target.value)}  onBlur={(e)=>setFDesc(e.target.value)}></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="orgCompType" className="font-medium mb-2 leading-none inline-block">Company Type</label>
                                <select id="orgCompType" className="w-full rounded-full border-slate-300" value={otype} onChange={(e)=>setOType(e.target.value)}>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Agency">Agency</option>
                                </select>
                            </div>
                        </div>
                        {/* <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8 mb-6">
                            <div className="mb-6">
                                <label htmlFor="orgCompDepartment" className="font-medium mb-2 leading-none inline-block">Organization Department</label>
                                <select id="orgCompDepartment" className="w-full rounded-full border-slate-300">
                                    <option value="Engineering">Engineering</option>
                                    <option value="Software">Software</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="orgCompType" className="font-medium mb-2 leading-none inline-block">Organization Type</label>
                                <select id="orgCompType" className="w-full rounded-full border-slate-300" value={otype} onChange={(e)=>setOType(e.target.value)}>
                                    <option value="Corporate">Corporate</option>
                                    <option value="Agency">Agency</option>
                                </select>
                            </div>
                        </div> */}
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8 mb-6" id="social">
                            <div className="md:border border-slate-300 rounded-[30px] md:py-6 md:px-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h4>Social <span className="text-[#6D27F9]">Media</span></h4>
                                    <button type="button" className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => socialPopupOpen(true)}>Add</button>
                                </div>
                                <div className="flex flex-wrap justify-between">
                                    {link.map((link, i) => (
                                        <div className="w-full lg:w-[47%] mb-6" key={i}>
                                            <div className="iconGroup social delete">
                                                <input type="text" value={link.title} className="w-full rounded-full border-slate-300 focus:border-slate-300 focus:ring-0 focus:outline-0 focus:shadow-none" readOnly />
                                                <i className="fa-solid fa-link iconGroup__icon"></i>
                                                <i className="fa-solid fa-trash iconGroup__icon-delete" onClick={(e)=>deleteLink(link.id)}></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden p-8" id="gallery">
                            <div className="flex flex-wrap items-center justify-between mb-3">
                                <h5 className="font-medium leading-none">Gallery</h5>
                                <button type="button" className="my-2 border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white" onClick={() => galleryImagesAdd(true)}>Add Images</button>
                            </div>
                                {gallery.length > 0 ?
                                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                                    <Masonry className="masonary_grid">
                                    {gallery.map((gallery, i) => (
                                        <div className="relative" key={i}>
                                            <Image src={gallery.image} alt="Gallery" className="w-full" />
                                            <button type="button" className="absolute right-[5px] top-[5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded" onClick={(e)=>deleteGallery(gallery.id)}>
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    ))}
                                    </Masonry>
                                    </ResponsiveMasonry>
                                    :
                                    <div className="md:border border-slate-300 rounded-[30px] md:py-6 md:px-8 min-h-[250px] flex items-center justify-center cursor-pointer" onClick={() => galleryImagesAdd(true)}>
                                        <Image
                                            src={uploadImages}
                                            alt="Upload"
                                            className="w-[100px] xl:w-[150px]"
                                        />
                                    </div>
                                }
                        </div>
                    </div>
                </div>
            </main>
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
                                    <h4 className="leading-none font-semibold text-xl">Social Media</h4>
                                    <button type="button" className="leading-none" onClick={() => socialPopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="chooseLangProfeciency" className="font-medium mb-2 leading-none inline-block">Enter social profile url</label>
                                        <input type="text" placeholder="https//www.xyzurl.com" className="w-full rounded-full border-slate-300"  value={atitle} onChange={(e)=>setATitle(e.target.value)}/>
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e) => saveLink(e)} disabled={!verifyLinkPopup()}> 
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
            <Transition.Root show={galleryImages} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={galleryImagesAdd}>
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="leading-none font-semibold text-xl">Add Gallery</h4>
                                    <button type="button" className="leading-none" onClick={() => galleryImagesAdd(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="flex items-center justify-center mb-6">
                                    <label htmlFor="uploadGallery" className="cursor-pointer w-[150px] h-[150px] rounded-lg bg-gray-200 p-2 flex items-center justify-center flex-col">
                                        <i className="fa-solid fa-upload mb-2 text-4xl"></i>
                                        <span className="text-sm">Upload Photos</span>
                                        <input type="file" id="uploadGallery" className="hidden" accept="image/*" onChange={onImageChange} multiple />
                                    </label>
                                </div>
                                <div className="w-full mb-6">
                                {file.length > 0 &&
                                    <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                                        <Masonry className="masonary_grid">
                                        
                                            {file.map((imageSrc,i) => (
                                                <div className="relative" id={`gallerypopup${i}`} key={i}>
                                                    <Image src={URL.createObjectURL(imageSrc)} alt="Gallery" className="w-full" />
                                                    <button type="button" className="absolute right-[5px] top-[5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded" onClick={()=>deleteUImage(i)}>
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </Masonry>
                                    </ResponsiveMasonry>
                                    
                                }
                                    {/* <ResponsiveMasonry
                                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                                    >
                                        <Masonry className="masonary_grid">
                                            <div className="relative">
                                                <Image src={gallery_1} alt="Gallery" className="w-full" />
                                                <button type="button" className="absolute right-[5px] top-[5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <Image src={gallery_2} alt="Gallery" className="w-full" />
                                                <button type="button" className="absolute right-[5px] top-[5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <Image src={gallery_3} alt="Gallery" className="w-full" />
                                                <button type="button" className="absolute right-[5px] top-[5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <Image src={gallery_4} alt="Gallery" className="w-full" />
                                                <button type="button" className="absolute right-[5px] top-[5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <Image src={gallery_5} alt="Gallery" className="w-full" />
                                                <button type="button" className="absolute right-[5px] top-[5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </Masonry>
                                    </ResponsiveMasonry> */}
                                </div>
                                <div className="text-center">
                                    <button type="button" id='disgallery' className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!verifyGalPopup()} onClick={(e)=>saveGallery()} >SAVE</button>
                                </div>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={changePassword} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={changePasswordOpen}>
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
                                    <h4 className="leading-none font-semibold text-xl">Change Password</h4>
                                    <button type="button" className="leading-none" onClick={() => changePasswordOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="orgOldPass" className="font-medium mb-2 leading-none inline-block">Old Password</label>
                                    <input type="password" id="orgOldPass" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="orgNewPass" className="font-medium mb-2 leading-none inline-block">New Password</label>
                                    <input type="password" id="orgNewPass" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="orgConfirmPass" className="font-medium mb-2 leading-none inline-block">Confirm Password</label>
                                    <input type="password" id="orgConfirmPass" className="w-full rounded-full border-slate-300" />
                                </div>
                                <div className="text-center">
                                    <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Submit</button>
                                </div>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={deletePopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={deletePopupOpen}>
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
                                    <h4 className="leading-none font-semibold text-xl">Delete Account</h4>
                                    <button type="button" className="leading-none" onClick={() => deletePopupOpen(false)}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-semidbold text-lg mb-6">Are you sure want to delete your account?</h3>
                                    <div className="flex flex-wrap items-center justify-center">
                                        <button type="submit" onClick={() => deletePopupOpen(false)} className="border border-[#6D27F9] font-bold rounded-full py-2.5 px-6 my-2 mx-3 md:min-w-[90px] text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">No</button>
                                        <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 my-2 mx-3 md:min-w-[90px] transition-all hover:from-[#391188] hover:to-[#391188]">
                                        Yes
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


export default withAuth(3*60)(OrganisationAccount)