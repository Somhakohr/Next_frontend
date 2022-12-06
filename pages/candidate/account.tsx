import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import toastcomp from "../../components/toast";
import { useStore } from "../../constants/code";
import { withAuth } from "../../constants/HOCs";
import userImg from "../../public/images/user-image.png";
import { axiosInstance } from "../api/axiosApi";


function CandidateAcc(props) {

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
    
    const { router,session } = props; 
    
    useEffect(() => {
        if(!session){
            router.push("/");
        }
        else{
            setEmail(userObj["email"])
            setFName(userName.split(" ")[0])
            setLName(userName.split(" ")[1])
            if(userObj["mobile"]){setMobile(userObj["mobile"])}
        }
    }, [session]);

    const [email,setEmail] = useState('');
    const [fname,setFName] = useState('');
    const [lname,setLName] = useState('');
    const [mobile,setMobile] = useState('');
    const [countryDrop,setCountryDrop] = useState('');
    const [file, setFile] = useState();
    const [pfile, setPFile] = useState();

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }   
                
    useEffect(() => {
        async function fetchData() {      
            const res = await axiosInstance.get('/job/load/country/',);
            updateCountry(res.data)       
        }
        if(isEmpty(country)){
            fetchData();
            console.log(country);
        }

    }, [])

    useEffect(() => {
        if(userProfile["country"]){
            setCountryDrop(userProfile["country"])
        }
    }, [userProfile])
    

    async function saveChange(event) {
        event.preventDefault();
        const axiosInstanceAuth = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer '+accessToken,
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }
        });
        const axiosInstanceAuth2 = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer '+accessToken,
            "Content-Type": "multipart/form-data",
        }
        });
        var formData2 = new FormData();
        if(mobile){
            formData2.append("mobile", mobile);
        }
        formData2.append("first_name",fname)
        formData2.append("last_name",lname)
        await axiosInstanceAuth2.put('/auth/candidateaccont/'+userObj['erefid']+'/',formData2).then(async (res)=>{
            if(mobile){userObj["mobile"]=mobile}
            userObj["first_name"]=res.data.first_name
            userObj["last_name"]=res.data.last_name
            updateUserName(fname+" "+ lname);

            if(file || countryDrop){

                var formData = new FormData();
                if(file){
                    formData.append("profile", file);
                }
                formData.append("country",countryDrop)
                await axiosInstanceAuth2.put('/candidate/candidateprofileaccont/'+userObj['erefid']+'/',formData).then(async(res2)=>{
                    updateUserImg("http://127.0.0.1:8000"+res2.data.profile)
                    userProfile["country"]=res2.data.country
                    userProfile["profile"]=res2.data.profile
                    console.log(userProfile)
                    toastcomp("Account Updated :)","success");
                }).catch((err)=>{
                    console.log(err);
                    toastcomp("Account Not Updated :)","error");
                });

            }
            else{
                toastcomp("Account Updated :)","success");
            }

        }).catch((err)=>{
            toastcomp("Account Not Updated :)","error");
        });
    }

    async function delacc() {
        const axiosInstanceAuth = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 5000,
        headers: {
            'Authorization': 'Bearer '+accessToken,
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        });
        await axiosInstanceAuth.get('/auth/deleteCandidateAccount/'+userObj['erefid']+'/').then((res)=>{
            toastcomp("Account Deleted :)","success");
            updateUserType('')
            updateUserName('')
            updateUserImg('')
            updateUserObj({})
            updateUserProfile({})
            updateAccessToken('')
            signOut()
        }).catch((err)=>{
            toastcomp("Account Not Deleted :)","error");
        });
        
    }

    
    function validateForm() {
        return fname.length > 0 && lname.length > 0;
    }

    return (
        
        <>
        {userType == "Candidate" ? 
        <>
        <main className="py-12">
            <div className="mx-auto max-w-[900px] w-full px-4">
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-24 min-h-[550px] flex flex-col justify-center">
                    <div className="flex items-center flex-wrap mb-12">
                        <button type="button" className="rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center">
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h1 className="font-medium text-xl md:text-3xl">
                            Account Settings
                        </h1>
                    </div>
                    <form className="mb-16">
                        <div className="mb-6">
                            <div className="relative inline-block">
                                <Image
                                    src={pfile?pfile:userImg}
                                    // src={userImg}
                                    alt="User"
                                    height={100}
                                    width={100}
                                    className="rounded-full object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"
                                />
                                <label htmlFor="uploadImage" className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white">
                                    <i className="fa-solid fa-plus text-xl"></i>
                                    <input type="file" id="uploadImage" className="absolute left-0 top-0 z-20" hidden accept="image/png, image/gif, image/jpeg" onChange={(e) => {  setPFile(URL.createObjectURL(e.target.files[0])); setFile(e.target.files[0]); }} />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                                <label htmlFor="fname" className="font-medium mb-2 leading-none inline-block">First Name</label>
                                <input id="fname" type="text" className="w-full rounded-full border-slate-300" value={fname} onChange={(e) => setFName(e.target.value)}/>
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                                <label htmlFor="lname" className="font-medium mb-2 leading-none inline-block">Last Name</label>
                                <input id="lname" type="text" className="w-full rounded-full border-slate-300" value={lname} onChange={(e) => setLName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="font-medium mb-2 leading-none inline-block">Email</label>
                            <input id="email" type="email" className="disabled:opacity-90 disabled:cursor-normal w-full rounded-full border-slate-300" value={email} disabled/>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                                <label htmlFor="phone" className="font-medium mb-2 leading-none inline-block">Phone Number</label>
                                <input id="phone" type="number" className="w-full rounded-full border-slate-300" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                                <label htmlFor="country" className="font-medium mb-2 leading-none inline-block">Country</label>
                                <select id="country" className="w-full rounded-full border-slate-300" value={countryDrop} onChange={(e)=>setCountryDrop(e.target.value)}>
                                    <option value=''>Select Country</option>
                                {Object.keys(country).map((key, index) => ( 
                                    <option key={key} value={country[key]}>{country[key]}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                            <button type="submit" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!validateForm()} onClick={(e)=>{saveChange(e)}}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                    <div className="relative mb-8">
                        <hr className="border-slate-600" />
                        <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">Delete your account</span>
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={delacc} className="bg-red-700 text-white font-bold rounded-full py-2.5 px-6 min-w-[200px] transition-all hover:bg-red-900">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </main>
        </> 
        : <></>}
        
        </>)
}

export default withAuth(3 * 60)(CandidateAcc)