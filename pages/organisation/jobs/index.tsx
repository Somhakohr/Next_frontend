import Sidebar from "../../../components/org-sidebar";
import JobsMenu from "../../../components/org-jobs-menu";
import OrgJobsCard from "../../../components/org-jobs-card";

export default function OrganisationActiveJobs() {
    return (
        <>
            <main className="py-8">
                <div className="container flex flex-wrap items-start">
                    <div className="w-full lg:max-w-[250px] mb-6 lg:mb-0 lg:sticky lg:top-[30px]">
                        <Sidebar />
                    </div>
                    <div className="w-full lg:max-w-[calc(100%-250px)] lg:pl-6">
                        <div className="bg-white border border-teal-400 rounded-[30px] shadow-lg py-4 px-10 mb-6">
                            <JobsMenu />
                        </div>
                        <div className="bg-white shadow-normal rounded-[30px] overflow-hidden mb-6">
                            <div className="py-6 px-4 md:px-10">
                                <div className="flex flex-wrap mx-[-10px]">
                                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                        <OrgJobsCard />
                                    </div>
                                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                        <OrgJobsCard />
                                    </div>
                                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                        <OrgJobsCard />
                                    </div>
                                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                        <OrgJobsCard />
                                    </div>
                                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                        <OrgJobsCard />
                                    </div>
                                    <div className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4">
                                        <OrgJobsCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}