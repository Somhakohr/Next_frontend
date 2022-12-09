import Image from "next/image";
import Link from "next/link";
import googleIcon from "../public/images/google-icon.png";
import moment from "moment";

export default function JobCard(props) {
    const {data} = props
    return (
        <>
            <div className="bg-[#f4f4f4] p-5 border border-2 border-slate-300 rounded-[25px]">
                <div className="flex mb-8">
                    <div className="bg-white rounded-full p-2.5 flex items-center justify-center w-[50px] h-[50px]">
                        {data.profile &&
                        <Image src={`http://127.0.0.1:8000/${data.profile}`} width={50} height={50} alt="Google" className="w-full" />
                        }
                    </div>
                    <div className="pl-3 w-[calc(100%-60px)]">
                        <h3 className="font-bold text-md mb-1">{data.title}</h3>
                        <h5 className="font-medium text-sm">{data.cname}</h5>
                    </div>
                </div>
                <div className="text-[#787878] text-[12px] flex flex-wrap border-b border-slate-300">
                    <p className="w-full sm:max-w-[50%] mb-3">
                        Place: {data.location ? data.location : <>Not Specified</>}
                    </p>
                    <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                        {data.level ? data.level : <>Not Specified</>}
                    </p>
                    <p className="w-full sm:max-w-[50%] mb-3">
                        {data.jobType || data.worktype ? `${data.jobType} , ${data.workType}` : <>Not Specified</>}
                    </p>
                    <p className="w-full sm:max-w-[50%] mb-3 sm:text-right">
                        {data.salary ? data.salary : <>Not Specified</>}
                    </p>
                </div>
                <div className="flex items-center justify-between pt-4 text-[12px]">
                    <p>
                        {moment(data.timestamp).fromNow()}
                    </p>
                    <Link href={`/organisation?${data.refid}`} className="text-[#6D27F9] hover:underline hover:text-black">View Job</Link>
                </div>
            </div>
        </>
    )
}