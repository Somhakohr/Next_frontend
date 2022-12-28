import axios from "axios";
import { useState } from "react";
import toastcomp from "../components/toast";

export default function Contact() {
  const [fname,setfname] = useState('')
  const [lname,setlname] = useState('')
  const [email,setemail] = useState('')
  const [phone,setphone] = useState('')
  const [subject,setsubject] = useState('')
  const [msg,setmsg] = useState('')

  function validCon() {
    return fname.length > 0 && lname.length > 0 && email.length > 0 && phone.length > 0 && subject.length > 0 && msg.length > 0
  }

  async function sendCon() {
    const axiosInstance22 = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
        // timeout: 10000,
        headers: {
            // 'Authorization': "JWT " + access_token,
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    });  
    var formdata = new FormData();
    formdata.append("fname",fname);
    formdata.append("lname",lname);
    formdata.append("email",email);
    formdata.append("phone",phone);
    formdata.append("sub",subject);
    formdata.append("msg",msg);
    await axiosInstance22.post(`/job/contact/`,formdata).then(async (res)=>{
        toastcomp("Mail Send","Success")
    }).catch((err)=>{
      toastcomp("Mail Not Send","error")
        console.log(err)
    })
    setfname('')
    setlname('')
    setemail('')
    setphone('')
    setsubject('')
    setmsg('')
  }

  return (
    <main className="py-8">
      <div className="container">
        <div className="w-full max-w-[1000px] mx-auto bg-white shadow-normal border border-teal-400 rounded-[25px] p-8 md:py-14 md:px-20">
          <h1 className="font-bold text-2xl mb-4">Get in touch</h1>
          <p className="text-[#646464] mb-8">
            We are here to help you with all your recruitment needs!
          </p>
          <div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full lg:w-[47%] mb-6">
                <label
                  htmlFor="contactFName"
                  className="font-medium mb-2 leading-none inline-block"
                >
                  First Name
                </label>
                <input
                  id="contactFName"
                  type="text"
                  className="w-full rounded-full border-slate-300"
                  value={fname}
                  onChange={(e)=>setfname(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-[47%] mb-6">
                <label
                  htmlFor="contactLName"
                  className="font-medium mb-2 leading-none inline-block"
                >
                  Last Name
                </label>
                <input
                  id="contactLName"
                  type="text"
                  className="w-full rounded-full border-slate-300"
                  value={lname}
                  onChange={(e)=>setlname(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full lg:w-[47%] mb-6">
                <label
                  htmlFor="contactEmail"
                  className="font-medium mb-2 leading-none inline-block"
                >
                  Email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  className="w-full rounded-full border-slate-300"
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-[47%] mb-6">
                <label
                  htmlFor="contactPNumber"
                  className="font-medium mb-2 leading-none inline-block"
                >
                  Phone Number
                </label>
                <input
                  id="contactPNumber"
                  type="number"
                  className="w-full rounded-full border-slate-300"
                  value={phone}
                  onChange={(e)=>setphone(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="contactSubject"
                className="font-medium mb-2 leading-none inline-block"
              >
                Subject
              </label>
              <input
                id="contactSubject"
                type="text"
                className="w-full rounded-full border-slate-300"
                  value={subject}
                  onChange={(e)=>setsubject(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="contactMessage"
                className="font-medium mb-2 leading-none inline-block"
              >
                Message
              </label>
              <textarea
                id="contactMessage"
                className="w-full rounded-[25px] h-[150px] resize-none border-slate-300"
                  value={msg}
                  onChange={(e)=>setmsg(e.target.value)}
              ></textarea>
            </div>
            <div className="text-left">
              <button
                type="submit"
                className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]" disabled={!validCon()} onClick={(e)=>sendCon()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
