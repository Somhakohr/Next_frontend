import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { signOut } from "next-auth/react";
import shallow from 'zustand/shallow';
import { useStore } from '../constants/code';
import { withAuth } from '../constants/HOCs';
import axios from "axios";
import { axiosInstance } from '../pages/api/axiosApi';
import Logo from "../components/logo";

function Header(props) {

    const [smallMenu, toggleSmallMenu] = useState(false);

    const { session, router } = props;  

    const [userName, updateUserName] = useStore(
        (state) => [state.userName, state.updateUserName],
        shallow
    )

    const [userImg, updateUserImg] = useStore(
        (state) => [state.userImg, state.updateUserImg],
        shallow
    )

    const [userCImg, updateUserCImg] = useStore(
        (state) => [state.userCImg, state.updateUserCImg],
        shallow
    )

    const [userType, updateUserType] = useStore(
        (state) => [state.userType, state.updateUserType],
        shallow
    )

    const [userObj, updateUserObj] = useStore(
        (state) => [state.userObj, state.updateUserObj],
        shallow
    )

    const [userProfile, updateUserProfile] = useStore(
        (state) => [state.userProfile, state.updateUserProfile],
        shallow
    )

    const [accessToken, updateAccessToken] = useStore(
        (state) => [state.accessToken, state.updateAccessToken],
        shallow
    )
      
    const [open, setOpen] = useState(false)   

    function signout() {
        signOut()
        updateUserType('')
        updateUserName('')
        updateUserImg('')
        updateUserObj({})
        updateUserProfile({})
        updateAccessToken('')
    }
            
    useEffect(() => {
        async function fetchData() {      
            const res = await axiosInstance.post('/auth/getusers/', {
            email: session.user.email,
            });
            updateUserType(res.data.type)
            updateUserObj(res.data.userObj[0])

            if(res.data.type == "Candidate"){
                const axiosInstanceAuth = axios.create({
                baseURL: 'http://127.0.0.1:8000/api/',
                timeout: 5000,
                headers: {
                    'Authorization': 'Bearer '+session.accessToken,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
                });
                const res2 = await axiosInstanceAuth.get('/candidate/candidateprofile/'+res.data.userObj[0].erefid+'/');
                updateUserProfile(res2.data)
            }
            else if(res.data.type == "Organisation"){
                const axiosInstanceAuth = axios.create({
                baseURL: 'http://127.0.0.1:8000/api/',
                timeout: 5000,
                headers: {
                    'Authorization': 'Bearer '+session.accessToken,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
                });
                const res2 = await axiosInstanceAuth.get('/organisation/organisationprofile/'+res.data.userObj[0].orefid+'/');
                console.log(res2);
                updateUserProfile(res2.data)
            }
                        
        }

        if(session && userType.length <= 0){fetchData();}
        if(session){updateAccessToken(session.accessToken)}

    }, [session])
  
    useEffect(() => {
        if(userType.length > 0){
            if(userType == "Candidate"){
                if(userObj["first_name"]){
                    updateUserName(userObj['first_name']+" "+userObj['last_name']);
                }
                else{
                    updateUserName(session.user.name);
                }
                if(userProfile['profile']){
                    if(userProfile['profile'] == '/media/default_image.jpeg' && session.user.image){
                        updateUserImg(session.user.image);
                    }
                    else{
                        updateUserImg('http://127.0.0.1:8000'+userProfile["profile"]);
                    }
                }
            }
            else if(userType == "Organisation"){
                if(userObj["name"]){
                    updateUserName(userObj['name']);
                }
                if(userProfile['profile']){
                    updateUserImg('http://127.0.0.1:8000'+userProfile["profile"]);
                    updateUserCImg('http://127.0.0.1:8000'+userProfile["cover"]);
                }
            }
    
            
            console.log("-------------------");
            console.log("userName",userName)
            console.log("userImg",userImg)
            console.log("userType",userType)
            console.log("userObj",userObj)
            console.log("userProfle",userProfile)
            console.log("accessToken",accessToken)
        }
    }, [userProfile,userType,userObj])
    
      
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
    const menuNav = [
        {
            url: '#',
            text: 'Features'
        },
        {
            url: '#',
            text: 'Protocol'
        },
        {
            url: '#',
            text: 'Blog'
        },
        {
            url: 'https://advantf.com/recruitment/',
            text: 'Career'
        },
        {
            url: '/whitepaper',
            text: 'Whitepaper'
        },
        {
            url: '/contact',
            text: 'Contact Us'
        }
    ];

    
    return (
        <>
            { session && userType.length > 0 ? 
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
                    <Logo userType={userType} />
                    { session && userType.length > 0 ? 
                    <> 
                        { userType == 'Candidate' &&
                        <div className="flex border border-slate-300 bg-white rounded items-center">
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
                                    <Image src={userImg} alt={userName} width={50} height={50}  className="w-[50px] h-[50px] rounded-full object-cover" />
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
                                                <b>Hello,</b> {userName}
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => router.push('/candidate')} className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">My Dashboard</button>
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => router.push('/candidate/account')} className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">Account Settings</button>
                                            </li>
                                            <li>
                                                <button type="button" className="py-2 px-6 rounded text-sm text-center mx-auto block mb-2 transition-all text-red-600 hover:bg-red-600 hover:text-white" onClick={() => signout()} >Log out</button>
                                            </li>
                                        </ul>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        } 
                        { userType == 'Organisation' &&
                        <div className="flex border border-slate-300 bg-white rounded items-center">
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
                                    <Image src={userImg} alt={userName} width={50} height={50}  className="w-[50px] h-[50px] rounded-full object-cover" />
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
                                                <b>Hello,</b> {userName}
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => router.push('/organisation')} className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">My Dashboard</button>
                                            </li>
                                            <li>
                                                <button type="button" onClick={() => router.push('/organisation/account')} className="py-2 px-4 text-center w-full transition-all hover:bg-slate-100">Account Settings</button>
                                            </li>
                                            <li>
                                                <button type="button" className="py-2 px-6 rounded text-sm text-center mx-auto block mb-2 transition-all text-red-600 hover:bg-red-600 hover:text-white" onClick={() => signout()} >Log out</button>
                                            </li>
                                        </ul>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        }
                    </>
                    :
                    <>
                        <div className="grow flex items-center justify-end">
                            <div className="grow hidden xl:block">
                                <ul className="w-full flex items-center justify-center">
                                    {menuNav.map((menuNav, i) => (
                                        <li key={i}>
                                            <Link href={menuNav.url} className="px-5 py-[10px] rounded leading-none inline-block transition-all hover:bg-gradient-to-r hover:from-[#6D27F9] hover:to-[#9F09FB] hover:text-white">
                                                {menuNav.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="w-full max-w-[205px] mr-4 relative">
                                <button type="button" onClick={() => toggleSmallMenu(!smallMenu)} className="md:hidden ml-auto text-lg bg-[#6D27F9] text-white w-[25px] h-[25px] flex items-center justify-center rounded">
                                    <i className="fa-solid fa-user text-sm"></i>
                                </button>
                                <div className={`md:block absolute md:static top-[100%] right-0 bg-white p-2 md:p-0 shadow-normal md:shadow-none rounded-lg md:rounded-[0px] w-[219px] md:w-auto ${smallMenu ? "block" : "hidden"}`}>
                                    <ul className="flex justify-center border rounded overflow-hidden font-medium bg-white">
                                        {authAction.map((authAction, i) => (
                                            <li key={i} className="last:border-l">
                                                <Link href={authAction.url} className="px-5 py-[13px] leading-none inline-block transition-all hover:bg-gradient-to-r hover:from-[#6D27F9] hover:to-[#9F09FB] hover:text-white">
                                                    {authAction.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <button type="button" onClick={() => setOpen(true)} className="xl:hidden text-2xl flex">
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        </div>
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
                                    <div className="px-4 sm:px-6">
                                        <Logo userType={userType} />
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        <ul className="w-full">
                                            {menuNav.map((menuNav, i) => (
                                                <li key={i}>
                                                    <Link href={menuNav.url} className="px-5 py-[10px] rounded leading-none inline-block transition-all hover:bg-gradient-to-r hover:from-[#6D27F9] hover:to-[#9F09FB] hover:text-white">
                                                        {menuNav.text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
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

export default withAuth(3 * 60)(Header);