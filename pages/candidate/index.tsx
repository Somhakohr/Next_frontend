import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from "../../components/job-card";
import userImg from "../../public/images/user-image.png";
import medal from "../../public/images/medal.png";
import token from "../../public/images/token.png";
import walletCard from "../../public/images/wallet-card.png";
import LaunchingSoon from "../../public/images/Launching-Soon.png";
import LaunchingGraphic from "../../public/images/Launching-Graphic.png";
import mediaDashBg from "../../public/images/media-dash-bg.jpg";
import blogDashBg from "../../public/images/blog-dash-bg.jpg";
import learningSlide from "../../public/images/learning-slide.png";
import { useStore } from "../../constants/code";
import shallow from "zustand/shallow";

export default function Candidate(props) {
    // const {userimg,username,session,router} = useStore();

    const [userName, updateUserName] = useStore(
        (state) => [state.userName, state.updateUserName],
        shallow
    )

    const [userImg, updateUserImg] = useStore(
        (state) => [state.userImg, state.updateUserImg],
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

    const { router } = props; 

    const learningSlides = [
        {
            url: '#',
            title: 'Webinar',
            img: learningSlide
        },
        {
            url: '#',
            title: 'Podcast',
            img: learningSlide
        },
        {
            url: '#',
            title: 'Elearning',
            img: learningSlide
        },
        {
            url: '#',
            title: 'Webinar',
            img: learningSlide
        },
    ];
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    useEffect(() => {
      if(userType != "Candidate"){
        router.push("/");
      }
    }, [userType]);

    return (
        
        <>
        {userType == "Candidate" ? 
        <>
        <Head>
            <title>Candidate Dashboard</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="pt-8">
            <div className="container flex flex-wrap">
                <div className="w-full lg:w-[60%] lg:pr-8">
                    <div className="mb-8 py-4 px-8 bg-white shadow-normal rounded-[20px]">
                        <div className="flex flex-wrap md:items-center items-start justify-between mb-6">
                            <div className="w-[calc(100%-70px)] flex flex-wrap md:items-center items-start flex-col md:flex-row">
                                <Image
                                    src={userImg}
                                    alt="User"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover w-[100px] h-[100px] xl:w-[150px] xl:h-[150px] mb-3 md:mb-0"
                                />
                                <div className="w-full md:w-[calc(100%-150px)] md:pl-8">
                                    <h2 className="font-semibold text-xl md:text-3xl mb-1">
                                        {userName}
                                    </h2>
                                    <p className="text-[#7E7E7E] font-light text-sm">
                                        Web Development
                                    </p>
                                </div>
                            </div>
                            <div className="w-[50px] my-2">
                                <Image
                                    src={medal}
                                    alt="Medal"
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-between items-start mb-6">
                            <div className="w-full md:w-[65%] md:pr-10 mb-3 md:mb-0">
                                <div className="w-full max-w-[320px] mb-2">
                                    <p className="flex justify-between mb-2 md:text-lg">
                                        <span>
                                            Profile Completion{" "}
                                            <span className="font-medium">(GOOD)</span>
                                        </span>
                                        <span className="font-semibold">80%</span>
                                    </p>
                                    <div className="rounded-full bg-[#FFF0EE] p-1">
                                        <div className="bg-gradient-to-r from-[#F295EF] to-[#4D94E8] transition-all delay-150 rounded-full w-[80%] h-[25px]"></div>
                                    </div>
                                </div>
                                <p className="text-[#7E7E7E] font-light text-sm">
                                    Do the following to attract your profile to the Recruiters
                                </p>
                            </div>
                            <div className="w-full md:w-[35%] flex flex-wrap md:justify-end">
                                <div className="p-3 rounded-lg bg-[#FFE6A5] text-center mb-2">
                                    <span className="block mb-1">
                                        10{" "}
                                        <i className="fa-solid fa-briefcase text-[#274046] ml-2"></i>
                                    </span>
                                    <p className="font-medium text-[12px] text-black">
                                        Jobs Applied
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-[#D1FBD0] text-center mb-2 ml-4">
                                    <span className="block mb-1">
                                        10 <i className="fa-solid fa-eye text-[#274046] ml-2"></i>
                                    </span>
                                    <p className="font-medium text-[12px] text-black">
                                        Jobs Viewed
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button" onClick={()=>{router.push("/candidate/profile")}}
                            className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                        >
                            Update Profile{" "}
                            <i className="fa-solid fa-arrow-right-long ml-2"></i>
                        </button>
                    </div>
                    <div className="mb-8 py-4 px-8 bg-white shadow-normal rounded-[20px]">
                        <div className="flex flex-wrap items-center justify-between mb-10">
                            <h2 className="font-semibold text-xl text-3xl mb-4 md:mb-0">Wallet</h2>
                            <div className="w-full md:max-w-[70%] relative">
                                {userObj['paddress'] ? 
                                <>
                                <input
                                    readOnly
                                    type="text"
                                    value={userObj['paddress']}
                                    className="w-full rounded-full border-slate-300 focus:border-slate-300 focus:ring-0 focus:outline-0 focus:shadow-none pr-[100px] text-sm text-gray-500"
                                />
                                <button
                                    type="button"
                                    className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-[7px] px-5 transition-all hover:from-[#391188] hover:to-[#391188] absolute right-0"
                                >
                                    Copy
                                </button>
                                </>: 
                                <>
                                <button
                                    type="button"
                                    className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-[7px] px-5 transition-all hover:from-[#391188] hover:to-[#391188] absolute right-0"
                                >
                                    Connect Wallet
                                </button>
                                </>}
                                
                            </div>
                        </div>
                        <div className="bg-[#f5f5f5] rounded-[20px] p-6 flex flex-wrap justify-between">
                            <div className="w-full md:max-w-[40%] mb-4 md:mb-0">
                                <Image src={token} alt="Token" className="mb-4" />
                                <p>Earn 100 <span className="text-[#6D27F9]">Coin</span> to Complete the Profile</p>
                            </div>
                            <div className="w-full md:max-w-[60%] md:pl-8">
                                <Image src={walletCard} alt="Wallet Card" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-8 py-4 px-8 bg-white shadow-normal rounded-[20px]">
                        <h2 className="font-semibold text-xl text-3xl mb-10">Talent Center</h2>
                        <Tabs>
                            <TabList>
                                <Tab>Job Listing</Tab>
                                <Tab>Applied Jobs</Tab>
                                <Tab>Recommended Jobs</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Link href="#" className="inline-block bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">View More</Link>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="flex flex-wrap mx-[-15px]">
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                    <div className="px-[15px] w-full md:max-w-[50%] mb-6">
                                        <JobCard />
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                <div className="w-full lg:w-[40%]">
                    <div className="mb-8 py-4 px-8 bg-white shadow-normal rounded-[20px]">
                        <h2 className="font-semibold text-xl text-3xl mb-10">Community</h2>
                        <div className="flex flex-wrap justify-between items-center mb-10">
                            <Image src={LaunchingSoon} alt="Launching Soon" className="max-w-[220px] w-full" />
                            <Image src={LaunchingGraphic} alt="Somhako" className="max-w-[100px] w-full my-6" />
                        </div>
                        <p className="text-2xl font-medium mb-10">We'll let you know when we are <span className="text-[#6D27F9]">Launching</span></p>
                        <h5 className="text-3xl mb-8">
                            Untill Then <br />
                            <span className="text-[#5865F2] font-semibold text-4xl">Join Discord</span>
                        </h5>
                        <div className="rounded-xl relative bg-gradient-to-r from-[#F295EF] to-[#4D94E8] flex items-center">
                            <div className="w-[50%] p-4">
                                <h6 className="text-white">Be Part of <br />your Community</h6>  
                            </div>
                            <Link href="#" className="w-[50%] bg-black px-6 py-6 rounded-xl absolute right-0 top-0 hover:w-full transition-all text-center">
                                <p className="text-white flex items-center justify-center">Join Now <i className="fa-brands fa-discord text-2xl ml-2"></i></p>
                            </Link>
                        </div>
                    </div>
                    <div className="mb-8 py-4 px-8 bg-white shadow-normal rounded-[20px]">
                        <div className="mb-10 flex items-center justify-between">
                            <h2 className="font-semibold text-xl text-3xl">Learning Center</h2>
                            <Link href="#" className="text-[#6D27F9] font-medium hover:text-black">
                                More <i className="fa-sharp fa-solid fa-chevron-right"></i>
                            </Link>
                        </div>
                        <p className="mb-6">Explore the World of <span className="text-[#6D27F9]">Learning</span> <br />Center</p>
                        <Slider {...settings} className="sliderArrows">
                            {learningSlides.map((learningSlides, i) => (
                                <div key={i}>
                                    <Link href={learningSlides.url} className="relative rounded-lg p-2 flex items-end justify-center h-[120px] overflow-hidden mr-2 after:content-[''] after:w-full after:h-full after:bg-black after:opacity-30 after:absolute after:left-0 after:bottom-0">
                                        <Image src={learningSlides.img} alt="Slide" className="absolute left-0 top-0 w-full h-full object-cover" />
                                        <span className="relative z-[1] text-white text-sm font-semibold">{learningSlides.title}</span>
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="mb-8 py-4 px-8 bg-white shadow-normal rounded-[20px]">
                        <div className="mb-10 flex items-center justify-between">
                            <h2 className="font-semibold text-xl text-3xl">Media Center</h2>
                            <Link href="#" className="text-[#6D27F9] font-medium hover:text-black">
                                More <i className="fa-sharp fa-solid fa-chevron-right"></i>
                            </Link>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="p-6 relative w-full md:max-w-[50%]">
                                <Image src={mediaDashBg} alt="Media" className="absolute left-0 top-0 w-full h-full object-cover" />
                                <div className="relative">
                                    <button type="button" className="rounded-full my-2 bg-white w-full p-2 px-6 flex items-center justify-between hover:bg-black hover:text-white">
                                        <i className="fa-brands fa-twitter mr-4 text-2xl text-[#6D27F9]"></i>
                                        Twitter
                                    </button>
                                    <button type="button" className="rounded-full my-2 bg-white w-full p-2 px-6 flex items-center justify-between hover:bg-black hover:text-white">
                                        <i className="fa-brands fa-youtube mr-4 text-2xl text-[#6D27F9]"></i>
                                        Youtube
                                    </button>
                                    <button type="button" className="rounded-full my-2 bg-white w-full p-2 px-6 flex items-center justify-between hover:bg-black hover:text-white">
                                        <i className="fa-solid fa-handshake mr-4 text-2xl text-[#6D27F9]"></i>
                                        Meetup
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:max-w-[50%] h-[250px] md:h-auto">
                                <Link href="#" className="p-6 relative w-full h-full flex items-end justify-center overflow-hidden">
                                    <Image src={blogDashBg} alt="Blog" className="absolute left-0 top-0 w-full h-full object-cover transition-all hover:scale-105 ease-in-out" />
                                    <span className="relative text-white font-semibold text-xl">Blogs</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </> 
        : <></>}
        
        </>)
    
}
