//@ts-nocheck
import Image from "next/image";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import JobCard from "../../../components/job-card";
import Slider from "react-slick";
import googleImg from "../../public/images/google-icon.png";
import { useRouter } from "next/navigation";
import { axiosInstance } from "../../api/axiosApi";
import { useStore } from "../../../constants/code";
import { useEffect, useState } from "react";
import shallow from "zustand/shallow";
// import moment from "moment";
import { withAuth } from "../../../constants/HOCs";
import toastcomp from "../../../components/toast";
import axios from "axios";
import Link from "next/link";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import googleIcon from "../../public/images/google-icon.png";
import gallery_1 from "../../public/images/gallery-1.png";
import gallery_2 from "../../public/images/gallery-2.png";
import gallery_3 from "../../public/images/gallery-3.png";
import gallery_4 from "../../public/images/gallery-4.png";
import gallery_5 from "../../public/images/gallery-5.png";
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

function OrgDetail() {
  const [orgDetail, setOrgDetail] = useState([]);
  const [orgDetailJob, setOrgDetailJob] = useState([]);
  const [orgDetailGallery, setOrgDetailGallery] = useState([]);
  const [orgDetailLink, setOrgDetailLink] = useState([]);
  // const [pskill, setPSkill] = useState([])
  // const [rskill, setRSkill] = useState([])
  // const [finfo, setFInfo] = useState([])
  // const [refid, setRefid] = useState('')
  // const cancelButtonRef = useRef(null)
  const [param1, updateParam1] = useStore(
    (state) => [state.param1, state.updateParam1],
    shallow
  );
  const [userType, updateUserType] = useStore(
    (state) => [state.userType, state.updateUserType],
    shallow
  );
  const [userObj, updateUserObj] = useStore(
    (state) => [state.userObj, state.updateUserObj],
    shallow
  );
  // const [accessToken, updateAccessToken] = useStore(
  //     (state) => [state.accessToken, state.updateAccessToken],
  //     shallow
  // )
  const router = useRouter();

  async function loadOrgDetail(id) {
    await axiosInstance
      .get("/job/company/jobdetail/" + id + "/")
      .then(async (res) => {
        setOrgDetailJob(res.data);
      })
      .catch((err) => {
        router.push("/marketplace/jobs");
      });

    await axiosInstance
      .get("/job/company/detail/" + id + "/")
      .then(async (res) => {
        setOrgDetail(res.data);
      })
      .catch((err) => {
        router.push("/marketplace/jobs");
      });

    await axiosInstance
      .get("/job/company/gallery/" + id + "/")
      .then(async (res) => {
        setOrgDetailGallery(res.data);
      })
      .catch((err) => {
        router.push("/marketplace/jobs");
      });

    await axiosInstance
      .get("/job/company/link/" + id + "/")
      .then(async (res) => {
        setOrgDetailLink(res.data);
      })
      .catch((err) => {
        router.push("/marketplace/jobs");
      });
  }

  useEffect(() => {
    if (!param1) {
      if (window.location.href.split("/").length > 0) {
        updateParam1(window.location.href.toString().split("/").pop());
      } else {
        router.push("/marketplace/jobs");
      }
    } else {
      loadOrgDetail(param1);
    }
  }, [param1]);

  function goback() {
    updateParam1("");
    router.push("/marketplace/jobs");
  }

  return (
    <>
      {orgDetail.length > 0 && (
        <>
          {orgDetail.map((data, i) => (
            <>
            <main className="py-8">
              <div className="w-full max-w-[1200px] mx-auto mb-8 px-4">
                <div className="bg-white shadow-normal rounded-[25px] flex flex-wrap overflow-hidden">
                  <div className="w-full lg:max-w-[40%]">
                    <Skeleton height={300} />
                  </div>
                  <div className="w-full lg:max-w-[60%] p-6">
                    <ul className="flex flex-wrap">
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <Skeleton height={15} />
                        <Skeleton width={120} height={15} />
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <Skeleton height={15} />
                        <Skeleton width={120} height={15} />
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <Skeleton height={15} />
                        <Skeleton width={120} height={15} />
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <Skeleton height={15} />
                        <Skeleton width={120} height={15} />
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <Skeleton height={15} />
                        <Skeleton width={120} height={15} />
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <Skeleton height={15} />
                        <Skeleton width={120} height={15} />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[1100px] mx-auto px-4">
                <div className="bg-white rounded-[30px] overflow-hidden">
                  <ul className="flex flex-wrap">
                    <li className="w-full md:max-w-[50%] md:pr-4">
                      <Skeleton height={300} />
                    </li>
                    <li className="w-full md:max-w-[50%] md:pl-4">
                      <Skeleton height={300} />
                    </li>
                  </ul>
                </div>
              </div>
            </main>
            <main className="py-8" key={i}>
              <div className="container mb-12">
                <button
                  type="button"
                  className="rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center"
                  onClick={(e) => goback()}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              </div>
              <div className="w-full max-w-[1200px] mx-auto mb-8 px-4">
                <div className="bg-white shadow-normal rounded-[25px] flex flex-wrap">
                  <div
                    className={`w-full lg:max-w-[40%] companyMainImage flex flex-col justify-between rounded-[25px] p-6 relative after:content-[''] after:w-full after:h-full after:bg-black after:opacity-20 after:absolute after:left-0 after:top-0 after:rounded-[25px] min-h-[280px]`}
                    style={{ backgroundImage: "url(" + `${data.cover}` + ")" }}
                  >
                    <div className="flex relative z-[1] mb-8">
                      <div className="s bg-white w-[100px] h-[100px] rounded-full flex items-center justify-center p-5 shadow-normal mt-[-66px]">
                        <Image
                          src={data.profile}
                          width={300}
                          height={300}
                          alt="Company"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <h1 className="font-semibold text-xl pl-2 flex-1">
                        {data.title}
                      </h1>
                    </div>
                    <div className="relative z-[1]">
                      <div className="flex items-center flex-wrap justify-between">
                        <div className="w-full sm:max-w-[48%] mt-3">
                          <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                            <i className="fa-solid fa-location-dot mr-2"></i>
                            {data.address ? data.address : <>N/A</>}
                          </h4>
                        </div>
                        <div className="w-full sm:max-w-[48%] mt-3">
                          <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                            <i className="fa-solid fa-building mr-2"></i>
                            {data.organisation_status ? (
                              data.organisation_status
                            ) : (
                              <>N/A</>
                            )}
                          </h4>
                        </div>
                        <div className="w-full sm:max-w-[48%] mt-3">
                          <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                            <i className="fa-solid fa-users mr-2"></i>
                            {data.company_strength ? (
                              data.company_strength
                            ) : (
                              <>N/A</>
                            )}
                          </h4>
                        </div>
                        <div className="w-full sm:max-w-[48%] mt-3">
                          <h4 className="bg-white shadow-normal shadow-white rounded-[12px] py-2 px-4 text-sm flex items-center justify-center">
                            <i className="fa-solid fa-globe mr-2"></i>
                            {data.url ? data.url : <>N/A</>}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:max-w-[60%] p-6">
                    <ul className="flex flex-wrap">
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <h4 className="font-semibold text-xl flex items-center mb-2">
                          <i className="fa-solid fa-industry mr-2 text-[#60C3E2]"></i>
                          Industry
                        </h4>
                        <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                          <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                          {data.industry ? data.industry : <>N/A</>}
                        </p>
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <h4 className="font-semibold text-xl flex items-center mb-2">
                          <i className="fa-solid fa-calendar-days mr-2 text-[#60C3E2]"></i>
                          Founded Date
                        </h4>
                        <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                          <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                          {data.founded_date ? data.founded_date : <>N/A</>}
                        </p>
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <h4 className="font-semibold text-xl flex items-center mb-2">
                          <i className="fa-solid fa-address-card mr-2 text-[#60C3E2]"></i>
                          Legal Name
                        </h4>
                        <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                          <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                          {data.legal_name ? data.legal_name : <>N/A</>}
                        </p>
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <h4 className="font-semibold text-xl flex items-center mb-2">
                          <i className="fa-solid fa-user mr-2 text-[#60C3E2]"></i>
                          Founders
                        </h4>
                        <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                          <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                          {data.founders ? data.founders : <>N/A</>}
                        </p>
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <h4 className="font-semibold text-xl flex items-center mb-2">
                          <i className="fa-solid fa-money-bill mr-2 text-[#60C3E2]"></i>
                          Total Round of Funding
                        </h4>
                        <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                          <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                          {data.roundoffund ? data.roundoffund : <>N/A</>}
                        </p>
                      </li>
                      <li className="w-full sm:max-w-[50%] pr-2 mb-5">
                        <h4 className="font-semibold text-xl flex items-center mb-2">
                          <i className="fa-solid fa-coins mr-2 text-[#60C3E2]"></i>
                          Funding
                        </h4>
                        <p className="font-medium flex items-center text-[#646464] font-light text-sm">
                          <span className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] w-[16px] h-[16px] rounded-full ml-0.5 mr-2"></span>
                          {data.fund_amount ? data.fund_amount : <>N/A</>}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-[1100px] mx-auto px-4">
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                    <h2 className="text-white">Contacts</h2>
                  </div>
                  <div className="py-6 px-4">
                    <div className="flex flex-wrap items-center">
                      <div className="w-full md:max-w-[50%] py-8 md:px-8">
                        <h3 className="text-xl mb-3">
                          Contacts for {data.user.company_name}
                        </h3>
                        <div className="flex flex-wrap">
                          {/* <p className="text-[#646464] mr-4">{data.url}</p> */}
                          {orgDetailLink.map((data, i) => (
                            <Link
                              href={`${data.title}`}
                              key={i}
                              target="_blank"
                              rel="noreferrer"
                              className="mr-3 text-lg text-[#6D27F9] hover:text-black"
                            >
                              <i className="fa-solid fa-link"></i>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="w-full md:max-w-[50%] py-8 md:px-8 border-t md:border-t-0 md:border-l">
                        <div className="bg-gray-100 rounded-[25px] py-6 px-[16%]">
                          <h2 className="text-xl mb-3">
                            Acquisition <br />
                            <span className="text-[#5500FF] font-semibold">
                              Team
                            </span>
                          </h2>
                          <button
                            type="button"
                            onClick={() => {
                              window.location.href = `mailto:${data.company_email}`;
                            }}
                            className="border border-[#6D27F9] rounded-full py-2 px-8 text-sm text-[#6D27F9] hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                          >
                            Send Email{" "}
                            <i className="fa-solid fa-envelope ml-1"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                    <h2 className="text-white">Company Description</h2>
                  </div>
                  <div className="py-6 px-4">
                    <article className="md:py-4 md:px-10">
                      {data.description}
                    </article>
                  </div>
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                    <h2 className="text-white">Gallery</h2>
                  </div>
                  <div className="py-6 px-4 md:px-10">
                    <ResponsiveMasonry
                      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    >
                      <Masonry className="masonary_grid">
                        {orgDetailGallery.map((data, i) => (
                          <img
                            src={data.image}
                            alt="Gallery"
                            className="w-full"
                            key={i}
                          />
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  </div>
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] overflow-hidden">
                  <div className="bg-gradient-to-r from-[#A382E5] to-[#60C3E2] py-4 px-10">
                    <h2 className="text-white">All Jobs</h2>
                  </div>
                  <div className="py-6 px-4 md:px-10">
                    <div className="flex flex-wrap mx-[-10px]">
                      {orgDetailJob.map((data, i) => (
                        <div
                          className="px-[10px] w-full md:max-w-[50%] xl:max-w-[33.3333%] mb-4"
                          key={i}
                        >
                          <JobCard data={data} org={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </main>
            </>
          ))}
        </>
      )}
    </>
  );
}

export default OrgDetail;
