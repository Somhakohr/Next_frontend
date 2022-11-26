import Image from "next/image";
import Link from "next/link";
import googleIcon from "../public/images/google-icon.png";

export default function JobCard() {
    return (
        <>
            <div className="bg-[#f4f4f4] p-5 border border-2 border-slate-300 rounded-[25px]">
                <div className="flex mb-8">
                    <div className="bg-white rounded-full p-2.5 flex items-center justify-center w-[50px] h-[50px]">
                        <Image src={googleIcon} alt="Google" className="w-full" />
                    </div>
                    <div className="pl-3 w-[calc(100%-60px)]">
                        <h3 className="font-bold text-md mb-1">Product Designer</h3>
                        <h5 className="font-medium text-sm">Google</h5>
                    </div>
                </div>
                <div className="text-[#787878] text-[12px] flex flex-wrap border-b border-slate-300">
                    <p className="w-full sm:max-w-[50%] mb-3">
                        Place: Bangalore
                    </p>
                    <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                        Mid Career
                    </p>
                    <p className="w-full sm:max-w-[50%] mb-3">
                        Fulltime , Hybrid
                    </p>
                    <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                        Rs 550000/Yearly
                    </p>
                </div>
                <div className="flex items-center justify-between pt-4 text-[12px]">
                    <p>
                        5 days ago
                    </p>
                    <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View Job</Link>
                </div>
            </div>
        </>
    )
}