import Link from 'next/link'

export default function Header() {
    const authAction = [
        {
            url: '/signin',
            text: 'Sign In'
        },
        {
            url: '/signup',
            text: 'Sign Up'
        }
    ];
    return (
        <>
            <div className="bg-[#FAF8FF] shadow-md py-3">
                <div className="w-full max-w-[1600px] mx-auto px-10 flex flex-wrap items-center justify-between">
                    <Link href="/" className="max-w-[260px] w-full inline-block">
                        <img src="/images/logo.png" alt="Somhako" />
                    </Link>
                    <div className="border rounded overflow-hidden font-medium bg-white">
                        {authAction.map((authAction) => (
                            <>
                            <Link href={authAction.url} className="px-5 py-[13px] leading-none inline-block transition-all hover:bg-gradient-to-r hover:from-[#6D27F9] hover:to-[#9F09FB] hover:text-white">
                                {authAction.text}
                            </Link>
                            <span className="leading-none last:hidden">|</span>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}    