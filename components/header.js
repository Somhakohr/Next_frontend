import Link from 'next/link'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
    const [open, setOpen] = useState(false)
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
            <div className="h-[68px]"></div>
            <div className="bg-[#FAF8FF] shadow-md py-3 absolute w-full top-0 left-0">
                <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-10 flex flex-wrap items-center justify-between">
                    <Link href="/" className="max-w-[260px] w-full inline-block">
                        <img src="/images/logo.png" alt="Somhako" />
                    </Link>
                    <button type="button" onClick={() => setOpen(true)} className="lg:hidden text-2xl">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <ul className="hidden lg:flex border rounded overflow-hidden font-medium bg-white">
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
                                        <Link href="/" className="max-w-[260px] w-full inline-block">
                                            <img src="/images/logo.png" alt="Somhako" />
                                        </Link>
                                    </div>
                                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                        <ul className="border rounded overflow-hidden font-medium bg-white flex justify-center">
                                            {authAction.map((authAction, i) => (
                                                <li key={i} className="last:border-l w-[50%]">
                                                    <Link href={authAction.url} className="w-full text-center px-5 py-[13px] leading-none inline-block transition-all hover:bg-gradient-to-r hover:from-[#6D27F9] hover:to-[#9F09FB] hover:text-white">
                                                        {authAction.text}
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