import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import useStore from "../../hooks/useStore";
import userImg from "../../public/images/user-image.png";


export default function Candidate() {
    const {userimg,username,session,router} = useStore();
    const [email,setEmail] = useState('');
    const [fname,setFName] = useState('');
    const [lname,setLName] = useState('');
    const [mobile,setMobile] = useState('');
    const [country,setCountry] = useState('');

    
    useEffect(() => {
        if(!session || session.type != "Candidate"){
          router.push("/");
        }
        else{
            setEmail(session.userObj.email);
            let arr = username.split(" ");
            setFName(arr[0])
            setLName(arr[1])
            setMobile(session.userObj.mobile);
        }
      }, [session]);
      
      async function saveChange(event) {
        event.preventDefault();
        const axiosInstanceAuth = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 5000,
            headers: {
                'Authorization': 'Bearer '+session.accessToken,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
          });
          const res = await axiosInstanceAuth.put('/auth/candidateaccont/'+session.userObj.erefid+'/',
          {
            first_name:fname,
            last_name:lname,
            mobile:mobile
          });
          console.log(res);
      }
    
    // return (
    //     <>
    //         <main className="py-12">
    //             <div className="mx-auto max-w-[900px] w-full px-4">
    //                 <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-10 lg:px-24 min-h-[550px] flex flex-col justify-center">
    //                     <div className="flex items-center flex-wrap mb-12">
    //                         <button type="button" className="rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center">
    //                             <i className="fa-solid fa-arrow-left"></i>
    //                         </button>
    //                         <h1 className="font-medium text-xl md:text-3xl">
    //                             Account Settings
    //                         </h1>
    //                     </div>
    //                     <form className="mb-16">
    //                         <div className="mb-6">
    //                             <div className="relative inline-block">
    //                                 <Image
    //                                     src={userimg}
    //                                     alt="User"
    //                                     height={100}
    //                                     width={100}
    //                                     className="rounded-full object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"
    //                                 />
    //                                 <label htmlFor="uploadImage" className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white">
    //                                     <i className="fa-solid fa-plus text-xl"></i>
    //                                     <input type="file" id="uploadImage" className="absolute left-0 top-0 z-20" hidden />
    //                                 </label>
    //                             </div>
    //                         </div>
    //                         <div className="flex flex-wrap justify-between">
    //                             <div className="w-full lg:w-[47%] mb-6">
    //                                 <label htmlFor="fname" className="font-medium mb-2 leading-none inline-block">First Name</label>
    //                                 <input id="fname" type="text" className="w-full rounded-full border-slate-300" />
    //                             </div>
    //                             <div className="w-full lg:w-[47%] mb-6">
    //                                 <label htmlFor="lname" className="font-medium mb-2 leading-none inline-block">Last Name</label>
    //                                 <input id="lname" type="text" className="w-full rounded-full border-slate-300" />
    //                             </div>
    //                         </div>
    //                         <div className="mb-6">
    //                             <label htmlFor="email" className="font-medium mb-2 leading-none inline-block">Email</label>
    //                             <input id="email" type="email" className="w-full rounded-full border-slate-300" disabled/>
    //                         </div>
    //                         <div className="flex flex-wrap justify-between">
    //                             <div className="w-full lg:w-[47%] mb-6">
    //                                 <label htmlFor="phone" className="font-medium mb-2 leading-none inline-block">Phone Number</label>
    //                                 <input id="phone" type="number" className="w-full rounded-full border-slate-300" />
    //                             </div>
    //                             <div className="w-full lg:w-[47%] mb-6">
    //                                 <label htmlFor="country" className="font-medium mb-2 leading-none inline-block">Country</label>
    //                                 <select id="country" className="w-full rounded-full border-slate-300">
    //                                     <option value="India">India</option>
    //                                     <option value="Japan">Japan</option>
    //                                 </select>
    //                             </div>
    //                         </div>
    //                         <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
    //                             <button type="submit" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]">
    //                                 Save Changes
    //                             </button>
    //                         </div>
    //                     </form>
    //                     <div className="relative mb-8">
    //                         <hr className="border-slate-600" />
    //                         <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">Delete your account</span>
    //                     </div>
    //                     <div className="text-center">
    //                         <button type="button" className="bg-red-700 text-white font-bold rounded-full py-2.5 px-6 min-w-[200px] transition-all hover:bg-red-900">
    //                             Delete Account
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </main>
    //     </>
    // )

    return (
        
        <>
        {session && session.type == "Candidate" ? 
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
                                    src={userimg}
                                    alt="User"
                                    height={100}
                                    width={100}
                                    className="rounded-full object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px]"
                                />
                                <label htmlFor="uploadImage" className="overflow-hidden cursor-pointer z-10 absolute bottom-0 right-0 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-normal hover:bg-gray-600 hover:text-white">
                                    <i className="fa-solid fa-plus text-xl"></i>
                                    <input type="file" id="uploadImage" className="absolute left-0 top-0 z-20" hidden />
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
                            <input id="email" type="email" className="w-full rounded-full border-slate-300" value={email} disabled/>
                        </div>
                        <div className="flex flex-wrap justify-between">
                            <div className="w-full lg:w-[47%] mb-6">
                                <label htmlFor="phone" className="font-medium mb-2 leading-none inline-block">Phone Number</label>
                                <input id="phone" type="number" className="w-full rounded-full border-slate-300" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
                            </div>
                            <div className="w-full lg:w-[47%] mb-6">
                                <label htmlFor="country" className="font-medium mb-2 leading-none inline-block">Country</label>
                                <select id="country" className="w-full rounded-full border-slate-300">
                                    <option value="India">India</option>
                                    <option value="Japan">Japan</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between md:flex-row flex-col">
                            <button type="submit" className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]" onClick={(e)=>{saveChange(e)}}>
                                Save Changes
                            </button>
                        </div>
                    </form>
                    <div className="relative mb-8">
                        <hr className="border-slate-600" />
                        <span className="text-center absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-white px-2 md:px-5">Delete your account</span>
                    </div>
                    <div className="text-center">
                        <button type="button" className="bg-red-700 text-white font-bold rounded-full py-2.5 px-6 min-w-[200px] transition-all hover:bg-red-900">
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