import Link from 'next/link';
import shallow from 'zustand/shallow';
import Logo from "../components/logo";
import { useStore } from '../constants/code';

export default function Footer() {

    const [userType, updateUserType] = useStore(
        (state) => [state.userType, state.updateUserType],
        shallow
    )

    const quicklinks = [
        {
            url: '/contact',
            text: 'Contact Us'
        },
        {
            url: '/blog',
            text: 'Blog'
        }
    ];
    const followUs = [
        {
            url: '#',
            text: 'LinkedIn',
            icon: <i className="fa-brands fa-linkedin-in"></i>
        },
        {
            url: '#',
            text: 'Discord',
            icon: <i className="fa-brands fa-discord"></i>
        },
        {
            url: '#',
            text: 'Twitter',
            icon: <i className="fa-brands fa-twitter"></i>
        }
    ];
    return (
    <>
    <div className="bg-[#f1f1f1] relative">
        <div className="py-8">
            <div className="container flex flex-wrap">
                <div className="w-full lg:w-3/12 mb-4">
                    <Logo userType={userType} />
                    <p className="pt-4">SOMHAKO is the first protocol-based, composable, and decentralized social graph uniting the entire HR industry. By indexing and syncing candidate data on the blockchain network.</p>
                </div>
                <div className="w-full md:w-4/12 lg:w-3/12 lg:pl-20 mb-4">
                    <h4 className="font-bold text-xl mt-2 mb-4">Company</h4>
                    <ul>
                        {quicklinks.map((quicklinks, i) => (
                            <li className="mb-3" key={i}>
                                <Link href={quicklinks.url} className="hover:text-[#6D27F9] font-medium">
                                    {quicklinks.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-4/12 lg:w-3/12 mb-4">
                    <h4 className="font-bold text-xl mt-2 mb-4">Follow Us</h4>
                    <ul>
                        {followUs.map((followUs, i) => (
                            <li className="mb-3" key={i}>
                                <Link href={followUs.url} className="hover:text-[#6D27F9] inline-flex items-center font-medium">
                                    <span className="inline-block w-[30px] mr-2 text-center text-2xl">
                                    {followUs.icon}
                                    </span> 
                                    {followUs.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-4/12 lg:w-3/12 mb-4">
                    <h4 className="font-bold text-xl mt-2 mb-4">Newsletter</h4>
                    <form>
                        <div className="iconGroup mb-4">
                            <input type="email" placeholder="Email Address" className="w-full rounded-full border-slate-300" />
                            <i className="fa-solid fa-envelope iconGroup__icon"></i>
                        </div>
                        <button type="submit" className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        <div className="py-3 bg-gradient-to-r from-[#A382E5] to-[#60C3E2]">
            <div className="container flex flex-wrap items-center flex-col justify-center md:flex-row md:justify-between">
                <p className="text-white text-sm text-center md:text-left">© 2022, All Rights Reserved, Somhako</p>
                <ul className="flex items-center">
                    <li>
                        <Link href="/privacy-policy" className="text-white text-sm hover:underline">
                            Privacy Policy
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </>
    )
}