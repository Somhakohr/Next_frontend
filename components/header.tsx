import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { signOut } from "next-auth/react";
import useStore, { useAuth22 } from '../hooks/useStore';
import UserImg from '../public/images/user-image.png';
import { Router } from 'next/router';

export default function Header() {
    const [open, setOpen] = useState(false)
    const {session,username,setUserName,userimg,setUserImg,router} = useStore();
    // console.log(session);    
       
    const authAction = [
        {
            url: '/auth/signin',
            text: 'Sign In'
        },
        {
            url: '/auth/signup',
            text: 'Sign Up'
        }
    ];
    return (
        <>
            { session ? 
                <>
                    <div className="h-[65px] lg:h-[91px]"></div>
                </> 
                : 
                <>
                    <div className="h-[68px]"></div>
                </> 
            }
            <div className="bg-[#FAF8FF] shadow-md py-3 absolute w-full top-0 left-0">
                <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-10 flex flex-wrap items-center justify-between">
                    <Link href="/" className="max-w-[200px] md:max-w-[260px] w-full inline-block">
                        <img src="/images/logo.png" alt="Somhako" />
                    </Link>
                    <button type="button" onClick={() => setOpen(true)} className="lg:hidden text-2xl">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    { session ? 
                    <> 
                        { session.type == 'Candidate' ? 
                        <>
                        <div className="hidden lg:flex border border-slate-300 bg-white rounded items-center">
                            <Menu as="div" className="relative last:border-l w-[60px] text-center py-3">
                                <Menu.Button className="align-middle">
                                    <span className="relative">
                                        <i className="fa-solid fa-bell text-2xl"></i>
                                        <span className="absolute right-[-10px] top-[-10px] bg-[#6D27F9] text-white w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px]">10</span>
                                    </span>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="p-3">
                                            <h3 className="text-center">Notifications</h3>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <Menu as="div" className="relative last:border-l p-2">
                                <Menu.Button className="align-middle">
                                    <Image src={userimg} alt={username} width={50} height={50}  className="w-[50px] h-[50px] rounded-full object-cover" />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <ul className="overflow-hidden rounded-lg">
                                            <li className="py-2 px-4 capitalize bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white text-center">
                                                <b>Hello,</b> {username}
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => router.push('/candidate')} className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">My Dashboard</button>
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => router.push('/candidate/account')} className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">Account Settings</button>
                                            </li>
                                            <li>
                                                <button type="button" className="py-2 px-6 rounded text-sm text-center mx-auto block mb-2 transition-all text-red-600 hover:bg-red-600 hover:text-white" onClick={() => signOut()} >Log out</button>
                                            </li>
                                        </ul>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        </> 
                        : 
                        <></> }
                    </>
                    :
                    <>
                        <ul className="hidden lg:flex border rounded overflow-hidden font-medium bg-white">
                            {authAction.map((authAction, i) => (
                                <li key={i} className="last:border-l">
                                    <Link href={authAction.url} className="px-5 py-[13px] leading-none inline-block transition-all hover:bg-gradient-to-r hover:from-[#6D27F9] hover:to-[#9F09FB] hover:text-white">
                                        {authAction.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                    }
                </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                            >
                            <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                >
                                <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                                    <button
                                    type="button"
                                    className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={() => setOpen(false)}
                                    >
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                </Transition.Child>
                                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div className="px-4 sm:px-6 text-center">
                                        <Link href="/" className="max-w-[200px] md:max-w-[260px] w-full inline-block">
                                            <img src="/images/logo.png" alt="Somhako" />
                                        </Link>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                    { session ? 
                                        <>
                                            <div className="flex justify-center border border-slate-300 bg-white rounded items-center">
                                                <Menu as="div" className="relative last:border-l w-[60px] text-center py-3">
                                                    <Menu.Button className="align-middle">
                                                        <span className="relative">
                                                            <i className="fa-solid fa-bell text-2xl"></i>
                                                            <span className="absolute right-[-10px] top-[-10px] bg-[#6D27F9] text-white w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px]">10</span>
                                                        </span>
                                                    </Menu.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="p-3">
                                                                <h3 className="text-center">Notifications</h3>
                                                            </div>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                                <Menu as="div" className="relative last:border-l p-2">
                                                    <Menu.Button className="align-middle">
                                                        <Image src={UserImg} alt={session.user.name} className="w-[50px] h-[50px] rounded-full object-cover" />
                                                    </Menu.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <ul className="overflow-hidden rounded-lg">
                                                                <li className="py-2 px-4 capitalize bg-gradient-to-r from-[#A382E5] to-[#60C3E2] text-white text-center">
                                                                    {session.user.name}
                                                                </li>
                                                                <li>
                                                                    <button type="button" className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">My Dashboard</button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">Account Settings</button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" className="py-2 px-6 rounded text-sm text-center mx-auto block mb-2 transition-all text-red-600 hover:bg-red-600 hover:text-white" onClick={() => signOut()} >Log out</button>
                                                                </li>
                                                            </ul>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <ul className="flex justify-center border rounded overflow-hidden font-medium bg-white">
                                                {authAction.map((authAction, i) => (
                                                    <li key={i} className="last:border-l">
                                                        <Link href={authAction.url} className="px-5 py-[13px] leading-none inline-block transition-all hover:bg-gradient-to-r hover:from-[#6D27F9] hover:to-[#9F09FB] hover:text-white">
                                                            {authAction.text}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                        }
                                    </div>
                                </div>
                            </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}    