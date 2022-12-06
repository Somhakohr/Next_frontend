import Link from "next/link";
import Sidebar from "../../components/org-sidebar";

export default function OrganisationApplicants() {
    return (
        <>
            <main className="py-8">
                <div className="container flex flex-wrap items-start">
                    <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
                        <Sidebar />
                    </div>
                    <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6">
                        <div className="bg-white border border-teal-400 rounded-[30px] shadow-lg py-6 px-10 mb-6">
                            <div className="flex flex-wrap justify-between">
                                <div className="w-full lg:w-[47%] my-3">
                                    <div className="iconGroup">
                                        <input type="search" placeholder="JA no, Job Title, Location, Name" className="w-full rounded-full border-slate-300" />
                                        <i className="fa-solid fa-search iconGroup__icon"></i>
                                    </div>
                                </div>
                                <div className="w-full lg:w-[47%] my-3">
                                    <select className="w-full rounded-full border-slate-300">
                                        <option value="Department">Department</option>
                                        <option value="HR">HR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden py-6 px-10 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <article>
                                    <h2 className="font-bold text-lg mb-3">
                                        All Applicants
                                    </h2>
                                    <p className="flex flex-wrap items-center text-[#16C098] text-[12px]">
                                        <span className="mr-6">
                                            Web Developer
                                        </span>
                                        <span>
                                            JD-1141709
                                        </span>
                                    </p>
                                </article>
                                <button type="submit" className="border border-[#6D27F9] font-semibold rounded-full py-2.5 px-6 my-2 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white">Share Profiles</button>
                            </div>
                            <div className="responsive-table">
                                <table className="table-auto min-w-[800px] w-full text-left border-collapse text-[#7e7e7e] text-sm">
                                    <thead className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white">
                                        <tr>
                                            <th className="py-2 px-3 w-[15%]">Applicant Name</th>
                                            <th className="py-2 px-3 w-[12%]">Applicant ID</th>
                                            <th className="py-2 px-3 text-center">Experience</th>
                                            <th className="py-2 px-3 w-[15%]">Email</th>
                                            <th className="py-2 px-3 text-center w-[15%]">Notice Period</th>
                                            <th className="py-2 px-3 text-center">Status</th>
                                            <th className="py-2 px-3 text-center">Profile</th>
                                            <th className="py-2 px-3 text-center">Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 w-[15%]">Jane Cooper</td>
                                            <td className="p-3 w-[12%]">JA138488</td>
                                            <td className="p-3 text-center">5+</td>
                                            <td className="p-3 w-[15%]">jane@microsoft.com</td>
                                            <td className="p-3 text-center w-[15%]">30 Days</td>
                                            <td className="p-3 text-center">
                                                <span className="border border-[#008767] text-[#008767] rounded-full py-1 px-4 text-center text-[12px] min-w-[90px] inline-block">
                                                    Hired
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View</Link>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button type="button" className="text-[#6D27F9]">
                                                    <i className="fa-solid fa-share-nodes"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 w-[15%]">Jane Cooper</td>
                                            <td className="p-3 w-[12%]">JA138488</td>
                                            <td className="p-3 text-center">5+</td>
                                            <td className="p-3 w-[15%]">jane@microsoft.com</td>
                                            <td className="p-3 text-center w-[15%]">30 Days</td>
                                            <td className="p-3 text-center">
                                                <span className="border border-[#DF0404] text-[#DF0404] rounded-full py-1 px-4 text-center text-[12px] min-w-[90px] inline-block">
                                                    Rejected
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View</Link>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button type="button" className="text-[#6D27F9]">
                                                    <i className="fa-solid fa-share-nodes"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 w-[15%]">Jane Cooper</td>
                                            <td className="p-3 w-[12%]">JA138488</td>
                                            <td className="p-3 text-center">5+</td>
                                            <td className="p-3 w-[15%]">jane@microsoft.com</td>
                                            <td className="p-3 text-center w-[15%]">30 Days</td>
                                            <td className="p-3 text-center">
                                                <span className="border border-[#efb800] text-[#efb800] rounded-full py-1 px-4 text-center text-[12px] min-w-[90px] inline-block">
                                                    On Hold
                                                </span>
                                            </td>
                                            <td className="p-3 text-center">
                                                <Link href="#" className="text-[#6D27F9] hover:underline hover:text-black">View</Link>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button type="button" className="text-[#6D27F9]">
                                                    <i className="fa-solid fa-share-nodes"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}