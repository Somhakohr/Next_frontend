import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import shallow from "zustand/shallow"
import { useStore } from "../constants/code"
import toastcomp from "./toast"
import { axiosInstance2 } from "../pages/api/axiosApi"
import ChatLogo from '../public/images/chat-mini.png'

export default function ChatBot(props) {
  const [input1, setInput1] = useState("")

  const {
    setJobList,
    setJobList2,
    setskeleton2,
    skeleton2,
    setskeleton1,
    skeleton1,
    data,
    setData,
    setTabIndex,
  } = props
  const [userImg, updateUserImg] = useStore(
    state => [state.userImg, state.updateUserImg],
    shallow
  )

  async function chatmini() {
    let arr = data
    arr.push(input1)
    // setData(arr)
    // setInpv(input1)

    var formData = new FormData()
    formData.append("promt", input1)
    await axiosInstance2
      .post("/job/chatmini/", formData)
      .then(async res => {
        console.log(res.data)
        if (res.data.jobs) {
          filter(res.data.jobs)
        } else if (input1.includes("Chatmini") || input1.includes("chatmini")) {
          filter("")
        }
        arr.push(res.data.res)
        setData(arr)
        setInput1("")
      })
      .catch(err => {
        console.log(err)
        if (err.message != "Request failed with status code 401") {
          toastcomp("Job Filter Error Dev", "error")
        }
        setInput1("")
      })
  }

  async function filter(param1) {
    setskeleton1(true)
    // setskeleton2(true)
    await axiosInstance2
      .get(`/job/chatmini/job/?refid=${param1}`)
      .then(async res => {
        setJobList(res.data)
        setJobList2(res.data.slice(0, 6))
        setskeleton1(false)
        // setskeleton2(false)
        setTabIndex(1)
      })
      .catch(err => {
        console.log(err)
        if (err.message != "Request failed with status code 401") {
          toastcomp("Job Filter Error Dev2", "error")
        }
        setInput1("")
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
              {data &&
                !skeleton2 &&
                data.map((item, key) =>
                  key % 2 ? (
                    <li key={key}>
                      <div className="flex items-center justify-end">
                        <span className="inline-block max-w-[75%] bg-[#6D27F9] text-white shadow rounded-[20px] py-2 px-3 relative after:content-[''] after:border-[4px] after:border-[#6D27F9] after:absolute after:top-[50%] after:right-[-4px] after:translate-y-[-50%] after:rotate-45">
                          {item}
                        </span>
                        <Image
                          src={userImg}
                          alt="User"
                          width={300}
                          height={300}
                          className="w-[35px] h-[35px] rounded-full object-cover w-[35px] h-[35px]"
                        />
                      </div>
                    </li>
                  ) : (
                    <li className="left my-2" key={key}>
                      <div className="flex items-center">
                        <Image
                          src={ChatLogo}
                          alt="User"
                          width={300}
                          height={300}
                          className="w-[35px] h-[35px] rounded-full object-cover w-[35px] h-[35px]"
                        />
                        <span className="inline-block max-w-[75%] border border-teal-400 bg-white z-[10] shadow rounded-[20px] py-2 px-3 relative after:content-[''] after:border-[4px] after:border-b-teal-400 after:border-l-teal-400 after:border-[transparent] after:absolute after:top-[50%] after:left-[-4px] after:translate-y-[-50%] after:rotate-45">
                          {item}
                        </span>
                      </div>
                    </li>
                  )
                )}

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
            <input
              type="text"
              placeholder="Type here..."
              className="w-full rounded-full border-slate-300"
              value={input1}
              onChange={e => {
                setInput1(e.target.value)
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && input1.length > 0) {
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
