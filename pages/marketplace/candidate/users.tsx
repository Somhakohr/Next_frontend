import Image from "next/image"
import userImg from '../../../public/images/user-image.png';

export default function CandidateUsers() {
    const users = [
        {
            img: userImg,
            jobTitle: "Web Developer",
            jobId: "JA-479845",
            name: "Joseph Roger",
            email: "xyz@gmail.com",
            exp: "5 years",
            notice: "1 month"
        },
        {
            img: userImg,
            jobTitle: "Software Developer",
            jobId: "JA-479845",
            name: "Joseph Roger",
            email: "xyz@gmail.com",
            exp: "5 years",
            notice: "1 month"
        },
        {
            img: userImg,
            jobTitle: "Android Engg",
            jobId: "JA-479845",
            name: "Joseph Roger",
            email: "xyz@gmail.com",
            exp: "5 years",
            notice: "1 month"
        },
        {
            img: userImg,
            jobTitle: "Java Developer",
            jobId: "JA-479845",
            name: "Joseph Roger",
            email: "xyz@gmail.com",
            exp: "5 years",
            notice: "1 month"
        }
    ]
    return (
        <>
            <main className="py-8">
                <div className="container">
                    <div className="bg-white shadow-normal rounded-[25px] p-8">
                        <h2 className="font-bold text-2xl mb-6">Candidates</h2>
                        <div className="flex flex-wrap mx-[-10px]">
                            {
                                users.map((users, i) => (
                                    <div key={i} className="w-full md:max-w-[50%] lg:max-w-[33.33%] px-[10px] mb-[20px]">
                                        <div className="shadow-lg bg-white rounded-[20px] border border-teal-400 overflow-hidden">
                                            <div className="shadow-lg relative flex flex-wrap items-center justify-between p-4 text-sm">
                                                <aside className="flex items-center mr-2">
                                                    <Image src={users.img} alt={users.name} className="mr-2 rounded-full w-[40px] h-[40px] object-cover" width={40} height={40} />
                                                    <p className="text-[#6D27F9] font-semibold">{users.jobTitle}</p>
                                                </aside>
                                                <p className="my-2"><b>ID:</b> {users.jobId}</p>
                                            </div>
                                            <div className="bg-[#FAF8FF] p-4 text-[#646464] text-sm">
                                                <h6 className="font-bold mb-2 text-black">{users.name}</h6>
                                                <p className="mb-2">{users.email}</p>
                                                <ul className="flex flex-wrap mx-[-10px] mb-2">
                                                    <li className="w-full xl:max-w-[50%] px-[10px] mb-2">
                                                        <p><b>Experience:</b> {users.exp}</p>
                                                    </li>
                                                    <li className="w-full xl:max-w-[50%] px-[10px] mb-2">
                                                        <p><b>Notice Period:</b> {users.notice}</p>
                                                    </li>
                                                </ul>
                                                <div className="text-center">
                                                <button type="button" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2 px-8 transition-all hover:from-[#391188] hover:to-[#391188]">View</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}