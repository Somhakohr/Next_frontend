import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from 'next/image';
import slide_1 from 'public/images/homebanner-card-1.png';
import slide_2 from 'public/images/homebanner-card-2.png';
import token from 'public/images/token.png';
import shape_1 from 'public/images/shape-1.png';
import shape_2 from 'public/images/shape-2.png';
import shape_3 from 'public/images/shape-3.png';
import cand_dash_1 from 'public/images/talent-center.png';
import cand_dash_2 from 'public/images/user-profile.png';
import cand_dash_3 from 'public/images/org-dashboard.png';
import rocket from 'public/images/rocket.png';
import strok_01 from 'public/images/strok-01.png';
import strok_01_icon from 'public/images/icon-account.png';
import strok_02 from 'public/images/strok-02.png';
import strok_02_icon from 'public/images/icon-research.png';
import strok_03 from 'public/images/strok-03.png';
import strok_03_icon from 'public/images/icon-curated.png';
import strok_04 from 'public/images/strok-04.png';
import strok_04_icon from 'public/images/icon-applyJob.png';
import logo from 'public/images/logo.png';
import protocolListDesktop from 'public/images/protocol-list-desktop.png';
import protocolListMobile from 'public/images/protocol-list-mobile.png';

export default function Home() {

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 4000,
    vertical: true
  };

  const jobFunctions = [
    {
      title: "Engineering",
      icon: <i className="fa-solid fa-toolbox"></i>,
      iconBgColor: '#6D27F9'
    },
    {
      title: "Product Management",
      icon: <i className="fa-solid fa-toolbox"></i>,
      iconBgColor: '#FFB619'
    },
    {
      title: "Testing & QA",
      icon: <i className="fa-solid fa-toolbox"></i>,
      iconBgColor: '#FF1181'
    },
    {
      title: "Design",
      icon: <i className="fa-solid fa-toolbox"></i>,
      iconBgColor: '#FF6C41'
    },
    {
      title: "Banking & Financial Services",
      icon: <i className="fa-solid fa-toolbox"></i>,
      iconBgColor: '#58E780'
    },
    {
      title: "Human Resources",
      icon: <i className="fa-solid fa-toolbox"></i>,
      iconBgColor: '#A382E5'
    }
  ]

  const featuresList = [
    {
      title: "All The Features You Will Ever Need",
      desc: "Connect with an amazing tech community and build teams globally. Let candidates learn, refer, and get rewarded for every action they take."
    },
    {
      title: "Smart AI based Matchmaking",
      desc: "Get matched with the right candidates, without worrying about the authenticity of their details. Our AI analyzes the resumes and finds the ideal candidates for the role, saving you hours of time."
    },
    {
      title: "Trust the Blockchain Technology",
      desc: "Every candidate's data is stored on our blockchain network. Access verified details and incentivize candidates directly no intermediary, more control."
    },
    {
      title: "Share Data, On Demand",
      desc: "By revealing your profile identity, engaging, referring, and learning, users can earn reward."
    },
    {
      title: "Access Talents, Your Way",
      desc: "Integrate Somhako Protocol and import all our existing networks to your platform. Let us handle the growth hacking while you focus on the user experience."
    }
  ]
  
  return (
    <>
      <main>
        <section className="bg-white radiusCurve">
          <div className="max-w-[1200px] w-full px-4 mx-auto flex flex-wrap items-center">
            <div className="w-full lg:max-w-[50%] py-10">
              <div className="w-full max-w-[500px] mx-auto lg:mx-0 text-center lg:text-left">
                <h1 className="text-[#646464] text-4xl md:text-5xl font-semibold mb-12">Are You <span className="text-[#60C3E2]">Hiring</span> the Right Talent ?</h1>
                <h2 className="text-[#646464] text-2xl font-semibold relative inline-block mb-12">
                  <span className="relative z-10">
                    <span className="text-black">
                      Discover 
                    </span>
                    , &nbsp;
                    <span className="text-[#6D27F9]">
                      Connect 
                    </span>
                    &nbsp; & &nbsp;
                    <span className="text-[#60C3E2]">
                      Network 
                    </span>
                  </span>
                  <span className="h-30 rounded-[30px] w-full bg-[#D9D9D9] absolute bottom-[-10px] right-0 md:right-[-40px] opacity-20"> &nbsp; </span>
                </h2>
                <p className="font-light text-[#646464] text-lg">Make your job search easier with trackable resumes and enhanced applications.</p>
              </div>
            </div>
            <div className="w-full lg:max-w-[50%] py-10">
              <div className="homebanner_slide sliderArrows">
                <Slider {...settings}>
                  <div>
                  <Image src={slide_1} alt="Slide" className="mx-auto" />
                  </div>
                  <div>
                  <Image src={slide_2} alt="Slide" className="mx-auto" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
        <section className="py-10">
          <div className="max-w-[1200px] w-full px-4 mx-auto">
            <h3 className="text-[#60C3E2] text-sm text-center mb-4">Explore high Demand jobs in Corporates </h3>
            <h2 className="text-[#646464] text-xl md:text-3xl text-center font-medium mb-6">We Work On Different Job Functions</h2>
            <div className="flex flex-wrap mx-[-15px]">
              {jobFunctions.map((jobFunctions, i) => (
                <div className="w-full md:max-w-[calc(100%/3)] p-[15px]" key={i}>
                  <div className="min-h-[160px] border border-teal-400 shadow-lg bg-white p-6 pt-20 w-full max-w-[250px] mx-auto mt-10 mb-6 text-center relative rounded-[25px]">
                    <div className="w-[120px] h-[120px] mx-auto rounded-full border border-teal-400 bg-[#FAF8FF] p-3 absolute left-[50%] translate-x-[-50%] top-[-60px] after:content-[''] after:w-[calc(100%+20px)] after:h-[calc(50%+2px)] after:bg-[#faf8ff] after:absolute after:left-[-10px] after:top-[-3px]">
                      <div className="bg-[#6D27F9] w-full h-full shadow-normal rounded-full flex items-center justify-center text-white text-4xl relative z-10 bg-gradient-to-r from-[#A382E5] to-[#60C3E2]">
                        {jobFunctions.icon}
                      </div>
                    </div>
                    <p className="text-[#646464]">{jobFunctions.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-10 bg-white" id="protocol">
          <div className="container">
            <h2 className="text-xl md:text-3xl text-center font-medium mb-8">Somhako <span className="text-[#60C3E2]">Protocol</span></h2>
            <div className="w-full max-w-[900px] mx-auto">
                <Image src={protocolListDesktop} alt="Protocol" className="mx-auto hidden md:block" />
                <Image src={protocolListMobile} alt="Protocol" className="mx-auto md:hidden" />
            </div>
          </div>
        </section>
        <section className="py-10">
          <div className="container">
            <h2 className="text-[#646464] text-xl md:text-3xl text-center font-medium mb-6">How it works</h2>
          </div>
          <div className="my-6 bg-[#60c3e21a] p-8 w-[95%] max-w-[1300px] ml-auto rounded-tl-[100px] rounded-bl-[100px]">
              <div className="flex items-center justify-between flex-wrap max-w-[900px]">
                <div className="w-full md:max-w-[400px]">
                  <div className="flex items-center">
                    <div className="mr-5 w-[100px]">
                      <Image src={strok_01} alt="01" />
                    </div>
                    <aside className="w-[calc(100%-100px)]">
                      <h4 className="font-bold text-sm mb-2">Create an Account</h4>
                      <p className="text-[#646464] text-[12px]">Sign Up and fill out all your profile details , including your background and experience</p>
                    </aside>
                  </div>
                </div>
                <div className="py-4 hidden md:block">
                  <Image src={strok_01_icon} alt="Account" width={60} />
                </div>
              </div>
          </div>
          <div className="my-6 bg-[#60c3e21a] p-8 w-[95%] max-w-[1300px] ml-0 rounded-tr-[100px] rounded-br-[100px]">
              <div className="flex items-center justify-between flex-wrap max-w-[900px] ml-auto flex-row-reverse">
                <div className="w-full md:max-w-[400px]">
                  <div className="flex items-center flex-row-reverse">
                    <div className="ml-5 w-[100px]">
                      <Image src={strok_02} alt="02" />
                    </div>
                    <aside className="w-[calc(100%-100px)]">
                      <h4 className="font-bold text-sm mb-2">Research & Complaince</h4>
                      <p className="text-[#646464] text-[12px]">There are many variations of passages of availbookmark-label , but the majority alteration in some form</p>
                    </aside>
                  </div>
                </div>
                <div className="py-4 hidden md:block">
                  <Image src={strok_02_icon} alt="Research" width={60} />
                </div>
              </div>
          </div>
          <div className="my-6 bg-[#60c3e21a] p-8 w-[95%] max-w-[1300px] ml-auto rounded-tl-[100px] rounded-bl-[100px]">
              <div className="flex items-center justify-between flex-wrap max-w-[900px]">
                <div className="w-full md:max-w-[400px]">
                  <div className="flex items-center">
                    <div className="mr-5 w-[100px]">
                      <Image src={strok_03} alt="03" />
                    </div>
                    <aside className="w-[calc(100%-100px)]">
                      <h4 className="font-bold text-sm mb-2">Get access to curated jobs</h4>
                      <p className="text-[#646464] text-[12px]">Discover jobs in top global companies and get natched to the right roles</p>
                    </aside>
                  </div>
                </div>
                <div className="py-4 hidden md:block">
                  <Image src={strok_03_icon} alt="Curated Jobs" width={60} />
                </div>
              </div>
          </div>
          <div className="my-6 bg-[#60c3e21a] p-8 w-[95%] max-w-[1300px] ml-0 rounded-tr-[100px] rounded-br-[100px]">
              <div className="flex items-center justify-between flex-wrap max-w-[900px] ml-auto flex-row-reverse">
                <div className="w-full md:max-w-[400px]">
                  <div className="flex items-center flex-row-reverse">
                    <div className="ml-5 w-[100px]">
                      <Image src={strok_04} alt="04" />
                    </div>
                    <aside className="w-[calc(100%-100px)]">
                      <h4 className="font-bold text-sm mb-2">Apply for the Perfect Role</h4>
                      <p className="text-[#646464] text-[12px]">There are many variations of passages of availbookmark-label , but the majority alteration in some form</p>
                    </aside>
                  </div>
                </div>
                <div className="py-4 hidden md:block">
                  <Image src={strok_04_icon} alt="Apply Job" width={60} />
                </div>
              </div>
          </div>
        </section>
        <section className="py-10 bg-white">
          <div className="max-w-[1200px] w-full px-4 mx-auto">
            <h2 className="flex items-center justify-center font-bold text-[#646464] text-xl md:text-3xl mb-4">
              Som&nbsp;
              <span className="text-[#60C3E2]">Tokens</span>
              <Image src={token} alt="Token" width={35} className="ml-3" />
            </h2>
            <p className="text-[#646464] font-light text-center mb-4">
            $OM is a utility token that is going to be used in the Somhako protocol for various different purposes and currently will be on the polygon mainnet.
            </p>
            <div className="flex flex-wrap items-center justify-center w-full max-w-[950px] mx-auto">
                <Image src={shape_1} alt="Shape" className="m-3" />
                <ul className="m-3">
                  <li className="py-2 flex items-center text-[#646464]">
                    <Image src={shape_3} alt="Shape" className="m-3" />
                    Som Utility
                  </li>
                  <li className="py-2 flex items-center text-[#646464]">
                    <Image src={shape_3} alt="Shape" className="m-3" />
                    Somhako Protocol Rewards
                  </li>
                  <li className="py-2 flex items-center text-[#646464]">
                    <Image src={shape_3} alt="Shape" className="m-3" />
                    Governance Voting
                  </li>
                  <li className="py-2 flex items-center text-[#646464]">
                    <Image src={shape_3} alt="Shape" className="m-3" />
                    Transactions
                  </li>
                </ul>
                <Image src={shape_2} alt="Shape" className="m-3" />
            </div>
          </div>
        </section>
        <section className="py-10 radiusCurve radiusCurve__small">
          <div className="bg-[#F8FBFF] border-t border-b border-l-8 border-[#60C3E2] rounded-l-[40px] w-full max-w-[95%] ml-auto py-8 mb-8">
            <div className="max-w-[1200px] w-full px-4 mx-auto">
              <h2 className="font-bold text-[#646464] text-xl md:text-3xl mb-4">
                <span className="text-[#60C3E2]">Candidates </span>
                Dashbaord
              </h2>
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:max-w-[50%] md:pr-5 mb-6 md:mb-0">
                  <Image src={cand_dash_1} alt="Talent Center" />
                </div>
                <div className="w-full md:max-w-[50%] md:pl-5">
                  <Image src={cand_dash_2} alt="Talent Center" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F8FBFF] border-t border-b border-r-8 border-[#60C3E2] rounded-r-[40px] w-full max-w-[95%] md:max-w-[85%] py-8">
            <div className="max-w-[870px] w-full px-4 mx-auto">
              <h2 className="font-bold text-[#646464] text-xl md:text-3xl mb-4">
                <span className="text-[#60C3E2]">Organisation </span>
                Dashbaord
              </h2>
              <div className="flex flex-wrap justify-between">
                <Image src={cand_dash_3} alt="Organisation" className="mx-auto" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-10 bg-white" id="features">
          <div className="container">
            <h2 className="font-bold text-center text-[#646464] text-xl md:text-3xl mb-8">
              All the&nbsp;
              <span className="text-[#60C3E2]">Features </span>
              you will ever need
            </h2>
            <div className="flex flex-wrap mx-[-15px]">
              {featuresList.map((featuresList, i) => (
                <div className="w-full sm:max-w-[calc(100%/2)] md:max-w-[calc(100%/3)] lg:max-w-[calc(100%/5)] px-[15px] mb-[30px]" key={i}>
                  <div className="border border-[#A382E5] border-b-8 rounded-[25px] shadow-normal p-4 h-full text-center">
                    <h4 className="font-semibold mb-4">{featuresList.title}</h4>
                    <p className="text-[#646464] font-light text-[12px]">{featuresList.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="w-full px-4 max-w-[950px] mx-auto flex flex-wrap items-center">
            <div className="w-full md:max-w-[60%] shadow-normal bg-white rounded-[40px] rounded-br-[100px] md:rounded-br-[150px] overflow-hidden relative z-10">
                <div className="border border-teal-400 py-5 px-8 rounded-tl-[40px] rounded-tr-[40px]">
                  <h4 className="font-semibold text-2xl">Sign Up</h4>
                </div>
                <div className="p-8">
                  <h4 className="font-semibold text-2xl mb-6">Be a Part of <br /><span className="text-[#6D27F9]">Somhako</span></h4>
                  <p className="text-[#646464] font-light mb-8">Get started by signing up with and deep dive into the HR product in Web 3 Space </p>
                  <Link href="/marketplace/auth/signup" className="inline-block mb-6 text-center bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]">Sign Up</Link>
                </div>
            </div>
            <div className="w-full md:max-w-[40%]">
              <div className="relative top-[-15px] md:top-0 md:left-[-15px]">
                <div id="circle-orbit-container" className="mx-auto md:mx-0">
                  <div id="inner-orbit">
                    <div className="inner-orbit-cirlces"></div>
                  </div>
                  <div id="middle-orbit">
                    <div className="middle-orbit-cirlces"></div>
                  </div>
                  <div id="outer-orbit">
                    <div className="outer-orbit-cirlces"></div>
                  </div>
                  <Image src={logo} alt="Somhako" width={130} className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-[#6D27F9] launchSoon">
          <div className="max-w-[900px] w-full px-4 mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:max-w-[50%] text-white flex items-center justify-center py-8">
                <div>
                  <h2 className="mb-6 font-light text-2xl">Launching Soon</h2>
                  <h3 className="font-bold text-3xl">Community</h3>
                </div>
                <Image src={rocket} alt="Launch" width={140} />
              </div>
              <div className="w-full lg:max-w-[50%] text-white">
                <h2 className="mb-6 font-light text-2xl text-center">Untill then <span className="font-bold">Join Discord</span></h2>
                <Link href="https://discord.gg/934TJUe6BF" target="_blank" rel="noreferrer" className="block text-white border border-white rounded-[30px] min-w-[200px] text-center py-2 px-4 hover:bg-white hover:text-[#6D27F9]">Join Now <i className="fa-brands fa-discord ml-2"></i></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}