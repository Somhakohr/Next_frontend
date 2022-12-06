import Image from "next/image";
import Link from "next/link";
import googleIcon from "../public/images/google-icon.png";

export default function OrganisationJobsCard() {
    return (
        <>
            <div className="bg-[#f4f4f4] border border-2 border-slate-300 rounded-[25px] overflow-hidden">
                <div className="p-5">
                    <div className="flex mb-8">
                        <div className="bg-white rounded-full p-2.5 flex items-center justify-center w-[50px] h-[50px]">
                            <Image src={googleIcon} alt="Google" className="w-full" />
                        </div>
                        <div className="pl-3 w-[calc(100%-60px)]">
                            <h3 className="font-bold text-[15px] mb-1">User Experience Designer</h3>
                            <div className="flex items-center">
                                <h5 className="font-medium text-sm my-1 mr-6">Google</h5>
                                <div className="flex items-center text-[12px] mt-[2px]">
                                    <p className="text-[#7e7e7e] mr-2">JB-491170</p>
                                    <button type="button">
                                        <i className="fa-solid fa-share text-[#6D27F9]"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-[#787878] text-[12px] flex flex-wrap">
                        <p className="w-full sm:max-w-[50%] mb-3">
                            Place: Bangalore
                        </p>
                        <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                            Mid Career
                        </p>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                        <p>
                            5 days ago
                        </p>
                        <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View Job</Link>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white p-5 shadow-normal">
                    <div className="flex items-center">
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-regular fa-folder-open"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Archive</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-regular fa-edit"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Edit</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[red] hover:text-[red] relative parent mr-3">
                            <i className="fa-solid fa-trash"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Delete</span>
                        </button>
                        <button type="button" className="border-2 border-[#646464] rounded-full w-[35px] h-[35px] p-1 flex items-center justify-center text-[#646464] hover:border-[#6D27F9] hover:text-[#6D27F9] relative parent mr-3">
                            <i className="fa-solid fa-copy"></i>
                            <span className="absolute bottom-[-17px] left-[50%] translate-x-[-50%] text-[10px] hidden child">Clone</span>
                        </button>
                    </div>
                    <div className="text-right">
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]">10 Applicants</button>
                        <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-medium rounded-full text-[12px] py-2 px-4 transition-all hover:from-[#391188] hover:to-[#391188]">View Job</button>
                    </div>
                </div>
            </div>
        </>
    )
}