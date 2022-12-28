import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../constants/code';
import { axiosInstance } from '../pages/api/axiosApi';
import chatMini from '../public/images/chat-mini.png'
import userIcon from '../public/images/user-image.png'
import toastcomp from './toast';

export default function ChatBot(props) {
    const [input1,setInput1] = useState('')
    const [input2,setInput2] = useState('')
    const [inpv,setInpv] = useState('')
    const [resv,setResv] = useState('')
    const [data,setData] = useState([])
    const {setJobList,setJobList2} = props
    const [userImg, updateUserImg] = useStore(
        (state) => [state.userImg, state.updateUserImg],
        shallow
    )
    
    const axiosInstanceAuth2 = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
        timeout: 5000,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });

    async function chatmini() {
        let arr = data
        arr.push(input1)
        // setData(arr)
        // setInpv(input1)
        
        var formData = new FormData()
        formData.append('promt',input1)
        await axiosInstanceAuth2.post('/job/chatmini/',formData).then(async (res)=>{
            // console.log(res.data)
            // setResv(res.data.res)
            if(res.data.Jobs){
                console.log(1)
                filter(res.data.Jobs)
            }
            else{
                console.log(2)
                filter('')
            }
            // let arr = []
            arr.push(res.data.res)
            // setData(arr)
            setData(arr)
            setInput1('')
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Job Filter Error Dev","error");
            }
            setInput1('')
        })

    }

    async function filter(param1) {
        await axiosInstanceAuth2.get(`/job/chatmini/job/?refid=${param1}`).then(async (res)=>{
            console.log("test1",res)
            setJobList(res.data)
            setJobList2(res.data.slice(0, 6))
        }).catch((err)=>{
            console.log(err)
            if(err.message != "Request failed with status code 401"){
                toastcomp("Job Filter Error Dev2","error");
            }
            setInput1('')
        })
    }

    

    return (
        <>
            <div>
                {/* <div className="p-3">
                    <div className="flex items-center justify-between border-b border-slate-300">
                        <h5 className="text-[#6D27F9] font-medium text-lg flex items-center pb-2">
                            <span className="mr-2">Mini</span>
                            <Image src={chatMini} alt="Chat" width={40} />
                        </h5>
                    </div>
                </div> */}
                <div className="h-[calc(100vh-241px)] p-3">
                    <div className="overflow-auto h-full">
                        {/* <ul className="flex flex-wrap text-[12px]">
                            <button type="button" className="my-1 mr-2 bg-[#E5DDFA] rounded-[30px] py-1 px-3">
                                Web Services?
                            </button>
                            <button type="button" className="my-1 mr-2 bg-[#E5DDFA] rounded-[30px] py-1 px-3">
                                Jobs?
                            </button>
                            <button type="button" className="my-1 mr-2 bg-[#E5DDFA] rounded-[30px] py-1 px-3">
                                HTML
                            </button>
                            <button type="button" className="my-1 mr-2 bg-[#E5DDFA] rounded-[30px] py-1 px-3">
                                Angular
                            </button>
                        </ul> */}
                        <ol className="py-2 text-[11px]">
                            {/* <li className="left my-2">
                                <span className="inline-block max-w-[85%] border border-teal-400 bg-white shadow rounded-[20px] py-2 px-3">Hi Roger</span>
                            </li>
                            <li className="left my-2">
                                <span className="inline-block max-w-[85%] border border-teal-400 bg-white shadow rounded-[20px] py-2 px-3">How can I assist you?</span>
                            </li> */}
                            {data && data.map((item, key) => (
                                key % 2 ? 
                                <li className="left my-2" key={key}>
                                    <span className="inline-block max-w-[85%] border border-teal-400 bg-white shadow rounded-[20px] py-2 px-3">{item}</span>
                                </li>
                                :
                                <li key={key}>
                                    <div className="flex items-center justify-end">
                                        <span className="inline-block max-w-[75%] bg-[#6D27F9] text-white shadow rounded-[20px] py-2 px-3 relative after:content-[''] after:border-[5px] after:border-[#6D27F9] after:absolute after:top-[50%] after:right-[-4px] after:translate-y-[-50%] after:rotate-45">{item}</span>
                                        <Image src={userImg} alt="User" width={300} height={300} className="w-[35px] h-[35px] rounded-full object-cover w-[35px] h-[35px]" />
                                    </div>
                                </li>
                            ))}
                                
                            
                            {/* {inpv && inpv.length > 0 && <li className="right my-4">
                                <div className="flex items-center justify-end">
                                    <span className="inline-block max-w-[75%] bg-[#6D27F9] text-white shadow rounded-[20px] py-2 px-3 relative after:content-[''] after:border-[5px] after:border-[#6D27F9] after:absolute after:top-[50%] after:right-[-4px] after:translate-y-[-50%] after:rotate-45">{inpv}</span>
                                    <Image src={userIcon} alt="User" width={35} height={35} className="rounded-full object-cover w-[35px] h-[35px]" />
                                </div>
                            </li>
                            }
                            {resv && resv.length > 0 &&
                            <li className="left my-2">
                                <span className="inline-block max-w-[85%] border border-teal-400 bg-white shadow rounded-[20px] py-2 px-3">{resv}</span>
                            </li>
                            } */}
                        </ol>
                    </div>
                </div>
                <div className="border-t border-slate-300 p-3">
                    <div className="iconGroup right">
                        <input type="text" placeholder="Type here..." className="w-full rounded-full border-slate-300" value={input1} onChange={(e)=>{
                            setInput1(e.target.value)
                        }}
                        onKeyDown={(e)=>{
                            if (e.key === 'Enter') {
                                // setInpv('')
                                // setResv('')
                                chatmini()
                            }
                        }}
                        />
                        {/* <label htmlFor="attachFile" className="iconGroup__icon-right">
                            <input type="file" id="attachFile" className="hidden" />
                            <i className="fa-solid fa-paperclip"></i>
                        </label> */}
                    </div>
                </div>
            </div>
        </>
    )
}