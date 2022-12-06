import Link from 'next/link'

export default function OrganisationSidebar() {
    return (
        <>
            <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] py-8 px-4">
                <ul className="flex flex-wrap justify-between">
                    <li className="w-[49%] lg:w-full">
                        <Link href="#" className="flex items-center py-2 px-3 lg:px-8 bg-[#6D27F9] text-white hover:bg-[#6D27F9] hover:text-white rounded-lg my-1">
                            <i className="fa-solid fa-chart-simple mr-2"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li className="w-[49%] lg:w-full">
                        <Link href="#" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                            <i className="fa-solid fa-briefcase mr-1"></i>
                            Jobs
                        </Link>
                    </li>
                    <li className="w-[49%] lg:w-full">
                        <Link href="#" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                            <i className="fa-solid fa-users mr-1"></i>
                            Applicant
                        </Link>
                    </li>
                    <li className="w-[49%] lg:w-full">
                        <Link href="#" className="flex items-center py-2 px-3 lg:px-8 hover:bg-[#6D27F9] hover:text-white rounded-lg my-2">
                            <i className="fa-solid fa-circle-radiation mr-1"></i>
                            Scout
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}