import Image from 'next/image';
import chatMini from '../public/images/chat-mini.png'
import userIcon from '../public/images/user-image.png'

export default function ChatBot() {
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
                        <ul className="flex flex-wrap text-[12px]">
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
                        </ul>
                        <ol className="py-2 text-[11px]">
                            <li className="left my-2">
                                <span className="inline-block max-w-[85%] border border-teal-400 bg-white shadow rounded-[20px] py-2 px-3">Hi Roger</span>
                            </li>
                            <li className="left my-2">
                                <span className="inline-block max-w-[85%] border border-teal-400 bg-white shadow rounded-[20px] py-2 px-3">How can I assist you?</span>
                            </li>
                            <li className="right my-4">
                                <div className="flex items-center justify-end">
                                    <span className="inline-block max-w-[75%] bg-[#6D27F9] text-white shadow rounded-[20px] py-2 px-3 relative after:content-[''] after:border-[5px] after:border-[#6D27F9] after:absolute after:top-[50%] after:right-[-4px] after:translate-y-[-50%] after:rotate-45">Looking for Web Development role</span>
                                    <Image src={userIcon} alt="User" width={35} height={35} className="rounded-full object-cover w-[35px] h-[35px]" />
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="border-t border-slate-300 p-3">
                    <div className="iconGroup right">
                        <input type="text" placeholder="Type here..." className="w-full rounded-full border-slate-300" />
                        <label htmlFor="attachFile" className="iconGroup__icon-right">
                            <input type="file" id="attachFile" className="hidden" />
                            <i className="fa-solid fa-paperclip"></i>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}