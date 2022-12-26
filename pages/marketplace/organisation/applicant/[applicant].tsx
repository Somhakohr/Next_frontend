import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import userImg from "../../../public/images/user-image.png";
import { withAuth } from "../../../../constants/HOCs";
import axios from "axios";
import shallow from "zustand/shallow";
import { useStore } from "../../../../constants/code";
import toastcomp from "../../../../components/toast";

function OrganisationCandidateProfileView(props) {
  const [addRoundPopup, addRoundPopupOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [crefid, setCrefid] = useState("");
  const [refid, setRefid] = useState("");
  const [pk, setpk] = useState("");
  const [applicantData, setApplicantData] = useState([]);
  const [lang, setLang] = useState([]);
  const [link, setLink] = useState([]);
  const [resume, setResume] = useState([]);
  const [skill, setSkill] = useState([]);
  const [cert, setCert] = useState([]);
  const [edu, setEdu] = useState([]);
  const [exp, setExp] = useState([]);
  const [achieve, setAchieve] = useState([]);
  const [interview, setInterview] = useState([]);

  const [title, settitle] = useState("");
  const [round, setround] = useState("");
  const [date, setdate] = useState("");
  const [stime, setstime] = useState("");
  const [etime, setetime] = useState("");

  function verifyIntPopup() {
    return (
      title.length > 0 &&
      round.length > 0 &&
      date.length > 0 &&
      stime.length > 0 &&
      etime.length > 0
    );
  }

  const { router, session } = props;

  const [userName, updateUserName] = useStore(
    (state) => [state.userName, state.updateUserName],
    shallow
  );

  const [userImg, updateUserImg] = useStore(
    (state) => [state.userImg, state.updateUserImg],
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

  const [userProfile, updateUserProfile] = useStore(
    (state) => [state.userProfile, state.updateUserProfile],
    shallow
  );

  const [accessToken, updateAccessToken] = useStore(
    (state) => [state.accessToken, state.updateAccessToken],
    shallow
  );

  const [param1, updateParam1] = useStore(
    (state) => [state.param1, state.updateParam1],
    shallow
  );

  //axios auth var
  const axiosInstanceAuth2 = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
  });

  async function loadApplicantData(id) {
    await axiosInstanceAuth2
      .get("/job/single/applicant/" + id + "/")
      .then(async (res) => {
        setApplicantData(res.data);
        console.log(res.data);
        let abc = res.data;
        for (let i = 0; i < abc.length; i++) {
          setCrefid(abc[i].user.erefid);
          setRefid(abc[i].job.refid);
        }
      })
      .catch((err) => {
        // router.push("/marketplace/organisation");
      });
  }

  async function loadInterview(id, erfid) {
    await axiosInstanceAuth2
      .get("/job/interviews/" + id + "/" + erfid + "/")
      .then(async (res) => {
        setInterview(res.data);
      })
      .catch((err) => {
        // router.push("/marketplace/organisation");
        toastcomp("Interview Not Loaded", "error");
      });
  }

  function goback() {
    updateParam1("");
    router.push("/marketplace/organisation/applicants");
  }

  useEffect(() => {
    if (!session) {
      router.push("/marketplace/");
    } else if (!param1) {
      router.push("/marketplace/organisation");
    } else {
      loadApplicantData(param1);
    }
  }, [session, param1]);

  useEffect(() => {
    if (crefid != "") {
      loadLang();
      loadLink();
      loadReume();
      loadSkill();
      loadAchieve();
      loadEducation();
      loadExperience();
      loadCertification();
      loadInterview(refid, crefid);
    }
  }, [crefid, refid]);

  async function loadLang() {
    await axiosInstanceAuth2
      .get("/candidate/listlang/" + crefid + "/")
      .then(async (res) => {
        setLang(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Lang Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function loadLink() {
    await axiosInstanceAuth2
      .get("/candidate/listlink/" + crefid + "/")
      .then(async (res) => {
        setLink(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Link Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function loadReume() {
    await axiosInstanceAuth2
      .get("/candidate/listresume/" + crefid + "/")
      .then(async (res) => {
        setResume(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Resume Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function loadSkill() {
    await axiosInstanceAuth2
      .get("/candidate/listskill/" + crefid + "/")
      .then(async (res) => {
        setSkill(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Skills Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function loadCertification() {
    await axiosInstanceAuth2
      .get("/candidate/listcertificate/" + crefid + "/")
      .then(async (res) => {
        setCert(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Certification Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function loadEducation() {
    await axiosInstanceAuth2
      .get("/candidate/listeducation/" + crefid + "/")
      .then(async (res) => {
        setEdu(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Education Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function loadExperience() {
    await axiosInstanceAuth2
      .get("/candidate/listexperience/" + crefid + "/")
      .then(async (res) => {
        setExp(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Exp Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function loadAchieve() {
    await axiosInstanceAuth2
      .get("/candidate/listachievement/" + crefid + "/")
      .then(async (res) => {
        setAchieve(res.data);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Achieve Not Loaded", "error");
        }
        console.log(err);
      });
  }

  async function updateStatus(status, arefid, refid) {
    await axiosInstanceAuth2
      .post("/job/" + status + "/applicant/" + arefid + "/" + refid + "/")
      .then(async (res) => {
        loadApplicantData(param1);
        toastcomp("Status Updated", "success");
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Status Not Updated", "error");
        }
        console.log(err);
      });
  }

  async function addInterview() {
    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("round_no", round);
    formdata.append("interview_date", date);
    formdata.append("interview_start_time", stime);
    formdata.append("interview_end_time", etime);
    await axiosInstanceAuth2
      .post("/job/create/interview/" + refid + "/" + crefid + "/", formdata)
      .then(async (res) => {
        loadInterview(refid, crefid);
        toastcomp("Interview Added", "success");
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Interview Not Added", "error");
        }
        console.log(err);
      });
  }

  async function updateIStatus(status, pk, refid, arefid) {
    await axiosInstanceAuth2
      .post("/job/" + status + "/interview/" + pk + "/" + refid + "/")
      .then(async (res) => {
        loadInterview(refid, crefid);
        toastcomp("Interview Status Updated", "success");
        if (status == "passed") {
          updateStatus("hire", arefid, refid);
        }
        if (status == "reject") {
          updateStatus("reject", arefid, refid);
        }
        if (status == "hold") {
          updateStatus("hold", arefid, refid);
        }
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Intrview Status Not Updated", "error");
        }
        console.log(err);
      });
  }

  return (
    <>
      <main className="py-8">
        {applicantData.map((data, i) => (
          <div className="container" key={i}>
            <button
              type="button"
              onClick={(e) => goback()}
              className="mb-2 rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="flex flex-wrap mb-6">
              <div className="w-full lg:max-w-[75%] xl:max-w-[80%] lg:pr-6 mb-6 lg:mb-0">
                <div className="bg-white shadow-normal border rounded-[25px] flex flex-wrap h-full">
                  <div className="w-[310px] mx-auto p-8">
                    <div className="userBgImage min-h-[268px] flex items-center justify-center">
                      <img
                        src={data.cand.profile}
                        width={220}
                        height={220}
                        alt="User"
                        className="w-[220px] h-[220px] rounded-full object-cover mx-auto "
                      />
                    </div>
                  </div>
                  <div className="w-full md:max-w-[calc(100%-310px)] p-6 xl:p-8 relative bg-white border rounded-[25px] flex items-center">
                    <aside className="w-full text-[#646464]">
                      <h2 className="font-semibold text-xl md:text-3xl mb-2">
                        {data.user.first_name || data.user.last_name ? (
                          <>
                            {data.user.first_name} {data.user.last_name}
                          </>
                        ) : (
                          <>N/A</>
                        )}
                      </h2>
                      <p className="font-light text-[12px] mb-2">
                        {data.erefid}
                      </p>
                      <p className="text-sm mb-6">
                        {data.cand.title ? data.cand.title : <>N/A</>}
                      </p>
                      <ul className="flex flex-wrap mx-[-10px]">
                        <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px] break-all">
                          <i className="fa-solid fa-envelope xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>{data.user.email ? data.user.email : <>N/A</>}</p>
                        </li>
                        <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                          <i className="fa-solid fa-phone xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>
                            {data.user.mobile ? data.user.mobile : <>N/A</>}
                          </p>
                        </li>
                        <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                          <i className="fa-solid fa-wallet xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>
                            {data.cand.salary ? data.cand.salary : <>N/A</>}{" "}
                          </p>
                        </li>
                        <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                          <i className="fa-solid fa-briefcase xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>
                            {data.cand.prejobtype ? (
                              data.cand.prejobtype
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                        </li>
                        <li className="flex items-center w-full sm:max-w-[50%] font-light xl:text-lg mb-3 px-[10px]">
                          <i className="fa-solid fa-location-dot xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>
                            {data.cand.prelocation ? (
                              data.cand.prelocation
                            ) : (
                              <>N/A</>
                            )}
                          </p>
                        </li>
                      </ul>
                    </aside>
                  </div>
                </div>
              </div>
              <div className="w-full lg:max-w-[25%] xl:max-w-[20%] bg-white shadow-normal rounded-[25px] overflow-hidden">
                <div className="p-6 pb-0 shadow-md border-b">
                  <h4 className="font-semibold text-lg text-center">
                    Social Links
                  </h4>
                  <ul className="flex flex-wrap text-center">
                    {link.map((link, i) => (
                      <li className="w-[calc(100%/3)] p-4" key={i}>
                        <Link
                          href="link.title"
                          target="_blank"
                          rel="noreferrer"
                          className="text-2xl hover:text-[#6D27F9]"
                        >
                          <i className="fa-solid fa-link "></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 text-center">
                  <h6 className="text-[#646464] mb-4">{data.job.refid}</h6>
                  {resume.map((resume, i) => (
                    <a
                      href={resume.file}
                      target="_blank"
                      className="bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-sm text-white font-semibold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                      key={i}
                      rel="noreferrer"
                    >
                      Download Resume
                      <i className="fa-solid fa-download ml-2"></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-[30%] mb-6">
                <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6">
                  <h3 className="text-lg font-semibold mb-2">Update Status</h3>
                  <ul className="flex flex-wrap mx-[-10px] text-[#646464]">
                    {interview.length <= 0 ? (
                      <>
                        {data.status == "Shortlisted" ? (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#6D27F9] text-white"
                              disabled
                            >
                              <i className="fa-solid fa-thumbs-up mr-2"></i>
                              Shortlisted
                            </button>
                          </li>
                        ) : (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#6D27F9] hover:text-white"
                              onClick={(e) =>
                                updateStatus(
                                  "shortlist",
                                  data.arefid,
                                  data.job.refid
                                )
                              }
                            >
                              <i className="fa-solid fa-thumbs-up mr-2"></i>
                              Shortlist
                            </button>
                          </li>
                        )}
                        {data.status == "Hold" ? (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#FEF401] text-black"
                              disabled
                            >
                              <i className="fa-solid fa-circle-pause mr-2"></i>
                              On Hold
                            </button>
                          </li>
                        ) : (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#FEF401] hover:text-black"
                              onClick={(e) =>
                                updateStatus(
                                  "hold",
                                  data.arefid,
                                  data.job.refid
                                )
                              }
                            >
                              <i className="fa-solid fa-circle-pause mr-2"></i>
                              On Hold
                            </button>
                          </li>
                        )}
                        {data.status == "Hired" ? (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#58E780] text-white"
                              disabled
                            >
                              <i className="fa-solid fa-user mr-2"></i>
                              Hired
                            </button>
                          </li>
                        ) : (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#58E780] hover:text-white"
                              onClick={(e) =>
                                updateStatus(
                                  "hire",
                                  data.arefid,
                                  data.job.refid
                                )
                              }
                            >
                              <i className="fa-solid fa-user mr-2"></i>
                              Hire
                            </button>
                          </li>
                        )}
                        {data.status == "Rejected" ? (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#FF5E5E] text-white"
                              disabled
                            >
                              <i className="fa-solid fa-thumbs-down mr-2"></i>
                              Rejected
                            </button>
                          </li>
                        ) : (
                          <li className="w-[50%] px-[10px]">
                            <button
                              type="button"
                              className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#FF5E5E] hover:text-white"
                              onClick={(e) =>
                                updateStatus(
                                  "reject",
                                  data.arefid,
                                  data.job.refid
                                )
                              }
                            >
                              <i className="fa-solid fa-thumbs-down mr-2"></i>
                              Reject
                            </button>
                          </li>
                        )}
                      </>
                    ) : (
                      <>
                        <li className="w-[50%] px-[10px]">
                          <button
                            type="button"
                            className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#6D27F9] text-white"
                            disabled
                          >
                            <i className="fa-solid fa-thumbs-up mr-2"></i>
                            Shortlisted
                          </button>
                        </li>
                        {interview.map(
                          (data2, i) =>
                            i + 1 === interview.length && (
                              <>
                                {data2.status == "Hold" ? (
                                  <li className="w-[50%] px-[10px]">
                                    <button
                                      type="button"
                                      className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#FEF401] text-black"
                                      disabled
                                    >
                                      <i className="fa-solid fa-circle-pause mr-2"></i>
                                      On Hold
                                    </button>
                                  </li>
                                ) : (
                                  <li className="w-[50%] px-[10px]">
                                    <button
                                      type="button"
                                      className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#FEF401] hover:text-black"
                                      onClick={(e) =>
                                        updateIStatus(
                                          "hold",
                                          data2.id,
                                          data.job.refid,
                                          data.arefid
                                        )
                                      }
                                    >
                                      <i className="fa-solid fa-circle-pause mr-2"></i>
                                      On Hold
                                    </button>
                                  </li>
                                )}
                                {data2.status == "Passed" ? (
                                  <li className="w-[50%] px-[10px]">
                                    <button
                                      type="button"
                                      className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#58E780] text-white"
                                      disabled
                                    >
                                      <i className="fa-solid fa-user mr-2"></i>
                                      Hired
                                    </button>
                                  </li>
                                ) : (
                                  <li className="w-[50%] px-[10px]">
                                    <button
                                      type="button"
                                      className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#58E780] hover:text-white"
                                      onClick={(e) =>
                                        updateIStatus(
                                          "passed",
                                          data2.id,
                                          data.job.refid,
                                          data.arefid
                                        )
                                      }
                                    >
                                      <i className="fa-solid fa-user mr-2"></i>
                                      Hire
                                    </button>
                                  </li>
                                )}
                                {data2.status == "Reject" ? (
                                  <li className="w-[50%] px-[10px]">
                                    <button
                                      type="button"
                                      className="w-full rounded-full py-1.5 px-6 mt-3 text-left bg-[#FF5E5E] text-white"
                                      disabled
                                    >
                                      <i className="fa-solid fa-thumbs-down mr-2"></i>
                                      Rejected
                                    </button>
                                  </li>
                                ) : (
                                  <li className="w-[50%] px-[10px]">
                                    <button
                                      type="button"
                                      className="w-full rounded-full py-1.5 px-6 mt-3 text-left hover:bg-[#FF5E5E] hover:text-white"
                                      onClick={(e) =>
                                        updateIStatus(
                                          "reject",
                                          data2.id,
                                          data.job.refid,
                                          data.arefid
                                        )
                                      }
                                    >
                                      <i className="fa-solid fa-thumbs-down mr-2"></i>
                                      Reject
                                    </button>
                                  </li>
                                )}
                              </>
                            )
                        )}
                      </>
                    )}
                  </ul>
                  {data.status == "Hired" ||
                  data.status == "Rejected" ||
                  data.status == "Hold" ||
                  data.status == "Shortlisted" ? (
                    <>
                      {interview.length <= 0 ? (
                        <>
                          {data.status == "Shortlisted" ? (
                            <>
                              <div className="text-right border-t border-slate-300 pt-3 mt-3 mb-6">
                                <button
                                  type="button"
                                  className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-semibold text-sm rounded-full py-1.5 px-4 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                                  onClick={() => addRoundPopupOpen(true)}
                                >
                                  + Add Interview
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-right border-t border-slate-300 pt-3 mt-3 mb-6">
                                <button
                                  type="button"
                                  className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-semibold text-sm rounded-full py-1.5 px-4 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                                  disabled
                                >
                                  + Add Interview
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {interview.map(
                            (data2, i) =>
                              i + 1 === interview.length && (
                                <>
                                  {data2.status == "Passed" ? (
                                    <>
                                      <div className="text-right border-t border-slate-300 pt-3 mt-3 mb-6">
                                        <button
                                          type="button"
                                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-semibold text-sm rounded-full py-1.5 px-4 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                                          onClick={() =>
                                            addRoundPopupOpen(true)
                                          }
                                        >
                                          + Add Interview
                                        </button>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-right border-t border-slate-300 pt-3 mt-3 mb-6">
                                      <button
                                        type="button"
                                        className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-semibold text-sm rounded-full py-1.5 px-4 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                                        disabled
                                      >
                                        + Add Interview
                                      </button>
                                    </div>
                                  )}
                                </>
                              )
                          )}
                        </>
                      )}
                      <div className="max-w-[350px] ml-auto">
                        {interview.length <= 0 ? (
                          <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1]">
                            <div className="relative z-[2]">
                              {data.status == "Hired" && (
                                <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#58E780]  text-center rounded-full min-w-[115px]">
                                  Hired
                                </span>
                              )}
                              {data.status == "Rejected" && (
                                <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#FF5E5E]  text-center rounded-full min-w-[115px]">
                                  Rejected
                                </span>
                              )}
                              {data.status == "Hold" && (
                                <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#FEF401]  text-center rounded-full min-w-[115px]">
                                  On Hold
                                </span>
                              )}
                              {data.status == "Shortlisted" && (
                                <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#6D27F9]  text-center rounded-full min-w-[115px]">
                                  Shortlisted
                                </span>
                              )}
                            </div>
                            {/* <p className="text-[#646464] text-[12px]">Nov 29, 2022 - 12:00pm</p> */}
                          </div>
                        ) : (
                          <>
                            <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1] min-h-[56px]">
                              <div className="relative z-[2]">
                                <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#6D27F9]  text-center rounded-full min-w-[115px]">
                                  Shortlisted
                                </span>
                              </div>
                              {/* <p className="text-[#646464] text-[12px]">Nov 29, 2022 - 12:00pm</p> */}
                            </div>

                            {interview.map((data2, i) => (
                              // eslint-disable-next-line react/jsx-key
                              <div className="text-center mb-4 relative after:content-[''] after:w-[150px] after:h-[2px] after:bg-slate-300 after:absolute after:right-0 after:top-[18px] after:z-[1] before:content-[''] before:w-[2px] before:h-[72px] before:bg-slate-300 before:absolute before:right-0 before:bottom-[38px] before:z-[1]">
                                <div className="relative z-[2]">
                                  {data2.status == "Passed" && (
                                    <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#58E780] text-center rounded-full min-w-[115px]">
                                      {data2.title}
                                    </span>
                                  )}
                                  {data2.status == "Reject" && (
                                    <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#FF5E5E] text-center rounded-full min-w-[115px]">
                                      {data2.title}
                                    </span>
                                  )}
                                  {data2.status == "Hold" && (
                                    <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border border-[#Hold] text-center rounded-full min-w-[115px]">
                                      {data2.title}
                                    </span>
                                  )}
                                  {data2.status == null && (
                                    <span className="bg-white mb-1 inline-block py-1.5 px-4 text-sm border text-center rounded-full min-w-[115px]">
                                      {data2.title}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[#646464] text-[12px]">
                                  {data2.interview_date}{" "}
                                  {data2.interview_start_time}
                                </p>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-[70%] lg:pl-6">
                <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Summary</h3>
                  <article>{data.cand.summary}</article>
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Skills</h3>
                  <div className="flex flex-wrap items-start">
                    {skill.map((skill, i) => (
                      <p
                        className="bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3"
                        key={i}
                      >
                        {skill.title}
                        <span
                          className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]"
                          id={skill.title + "Skill"}
                        >
                          <i className="fa-solid fa-star ml-1"></i>
                          {skill.experties == "Intermediate" && (
                            <i className="fa-solid fa-star ml-1"></i>
                          )}
                          {skill.experties == "Advance" && (
                            <>
                              <i className="fa-solid fa-star ml-1"></i>
                              <i className="fa-solid fa-star ml-1"></i>
                            </>
                          )}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Certification</h3>
                  {cert.map((cert, i) => (
                    <div
                      className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden"
                      key={i}
                    >
                      <article>
                        <h4 className="font-semibold mb-1 text-lg">
                          {cert.title}
                        </h4>
                        <p className="text-[#6D27F9] font-medium mb-2">
                          {cert.company}
                        </p>
                        <p className="text-[#646464] font-light text-sm mb-2">
                          Issued Date:- {cert.yearofissue} <br /> Expiry Date:-{" "}
                          {cert.yearofexp ? cert.yearofexp : <>No Expiry</>}
                        </p>
                        <p className="text-[#646464] font-light text-sm mb-2">
                          credentials:- {cert.creid}
                        </p>
                        <a
                          type="button"
                          href={cert.creurl}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-[#6D27F9] rounded-full py-1.5 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                        >
                          Show Certificate
                        </a>
                      </article>
                    </div>
                  ))}
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Education</h3>
                  {edu.map((edu, i) => (
                    <div
                      className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden"
                      key={i}
                    >
                      <article>
                        <h4 className="font-semibold mb-1 text-lg">
                          {edu.title}
                        </h4>
                        <p className="text-[#6D27F9] font-medium mb-2">
                          {edu.college}
                        </p>
                        <p className="text-[#646464] font-light text-sm mb-2">
                          Started Date:- {edu.yearofjoin} <br /> End Date:-{" "}
                          {edu.yearofend}
                        </p>
                        <h6 className="font-medium">About</h6>
                        <p className="text-[#646464] font-light text-sm">
                          {edu.edubody}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Experience</h3>
                  {exp.map((exp, i) => (
                    <div
                      className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden"
                      key={i}
                    >
                      <article>
                        <h4 className="font-semibold mb-1 text-lg">
                          {exp.title}
                        </h4>
                        <p className="text-[#6D27F9] font-medium mb-2">
                          {exp.company}
                        </p>
                        <p className="text-[#646464] font-light text-sm mb-2">
                          Started Date:- {exp.year_of_join} <br /> End Date:-{" "}
                          {exp.year_of_end ? exp.year_of_end : <>PRESENT</>}
                        </p>
                        <p className="text-[#646464] font-light text-sm mb-2">
                          Type:- {exp.type}
                        </p>
                        <h6 className="font-medium">About</h6>
                        <p className="text-[#646464] font-light text-sm">
                          {exp.expbody}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
                <div className="bg-white shadow-normal border border-teal-400 rounded-[25px] p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Achievements</h3>
                  {achieve.map((achieve, i) => (
                    <div
                      className="w-full rounded-[20px] bg-[#FAF8FF] border border-slate-200 p-4 md:p-6 md:pr-[110px] pt-[35px] md:pt-6 mb-4 relative overflow-hidden"
                      key={i}
                    >
                      <article>
                        <h4 className="font-semibold mb-1 text-lg">
                          {achieve.title}
                        </h4>
                        <h6 className="font-medium">About</h6>
                        <p className="text-[#646464] font-light text-sm">
                          {achieve.desc}
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <Transition.Root show={addRoundPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={addRoundPopupOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Add Interview
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => addRoundPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <aside>
                      <div className="mb-6">
                        <label
                          htmlFor="interViewTitle"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          id="interViewTitle"
                          className="w-full rounded-full border-slate-300"
                          value={title}
                          onChange={(e) => settitle(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="interViewRound"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Round No.
                          </label>
                          <input
                            id="interViewRound"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={round}
                            onChange={(e) => setround(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="interViewDate"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Interview Date
                          </label>
                          <input
                            id="interViewDate"
                            type="date"
                            className="w-full rounded-full border-slate-300"
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="interViewStartTime"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Interview Start Time
                          </label>
                          <input
                            id="interViewStartTime"
                            type="time"
                            className="w-full rounded-full border-slate-300"
                            value={stime}
                            onChange={(e) => setstime(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="interViewEndTime"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Interview End Time
                          </label>
                          <input
                            id="interViewEndTime"
                            type="time"
                            className="w-full rounded-full border-slate-300"
                            value={etime}
                            onChange={(e) => setetime(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          onClick={(e) => addInterview()}
                          disabled={!verifyIntPopup()}
                        >
                          Submit
                        </button>
                      </div>
                    </aside>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default withAuth(3 * 60)(OrganisationCandidateProfileView);
