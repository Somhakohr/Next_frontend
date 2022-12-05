import Link from 'next/link'

export default function OrganisationJobsMenu() {
    const menuLinks = [
        {
            url: '/organisation/jobs/post-new',
            text: 'Post New Job'
        },
        {
            url: '/organisation/jobs/',
            text: 'Active Job'
        },
        {
            url: '/organisation/jobs/archived',
            text: 'Archived Job'
        },
        {
            url: '/organisation/jobs/drafted',
            text: 'Drafted Job'
        },
        {
            url: '/organisation/jobs/inreview',
            text: 'In-Review Job'
        },
        {
            url: '/organisation/jobs/closed',
            text: 'Closed Job'
        }
    ];
    return (
        <>
            <ul className="flex flex-wrap justify-between mx-[-15px] text-[#7e7e7e]">
                {menuLinks.map((menuLinks, i) => (
                    <li className="px-[15px]" key={i}>
                        <Link href={menuLinks.url}>
                            {menuLinks.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}