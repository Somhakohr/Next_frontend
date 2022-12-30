//@ts-nocheck
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import token from "../../../public/images/token.png";
import skillsGraphic from "../../../public/images/skills-graphic.png";
import certificateGraphic from "../../../public/images/certificate-graphic.png";
import educationGraphic from "../../../public/images/education-graphic.png";
import expGraphic from "../../../public/images/exp-graphic.png";
import achievementsGraphic from "../../../public/images/achievements-graphic.png";
import { useStore } from "../../../constants/code";
import shallow from "zustand/shallow";
import { withAuth } from "../../../constants/HOCs";
import axios from "axios";
import toastcomp from "../../../components/toast";
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import Multiselect from "multiselect-react-dropdown";
import { Editor } from "@tinymce/tinymce-react";

function CandidateProfile(props) {
  //global var
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

  const [country, updateCountry] = useStore(
    (state) => [state.country, state.updateCountry],
    shallow
  );

  const [cities, updateCities] = useStore(
    (state) => [state.cities, state.updateCities],
    shallow
  );

  //props
  const { router, session } = props;

  //session check useeffect
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  //loader
  const [loader, setloader] = useState(false);

  //local var
  const [langPopup, langPopupOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [socialPopup, socialPopupOpen] = useState(false);
  const [skillsPopup, skillsPopupOpen] = useState(false);
  const [certificationPopup, certificationPopupOpen] = useState(false);
  const [educationPopup, educationPopupOpen] = useState(false);
  const [expPopup, expPopupOpen] = useState(false);
  const [achievementsPopup, achievementsPopupOpen] = useState(false);
  //local bio state
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [preJobtype, setPreJobType] = useState("");
  const [preLocation, setPreLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [yearsOfExp, setYearsOfExp] = useState("");
  const [serveNP, setServeNP] = useState(false);
  const [noticeP, setNoticeP] = useState("");
  const [lang, setLang] = useState([]);
  const [alang, setALang] = useState("");
  const [aprof, setAProf] = useState("");
  const [ftitle, setFTitle] = useState("");
  const [fsummary, setFSummary] = useState("");
  const [fpreJobtype, setFPreJobType] = useState("");
  const [fsalary, setFSalary] = useState("");
  //local social state
  const [link, setLink] = useState([]);
  const [atitle, setATitle] = useState("");
  //local resume state
  const [resume, setResume] = useState([]);
  const [uresume, setUResume] = useState();
  const [utitle, setUTitle] = useState("");
  const [urtitle, setURTitle] = useState("");
  const [furtitle, setFURTitle] = useState("");
  const [rid, setRId] = useState(0);
  //local skill state
  const [skill, setSkill] = useState([]);
  const [stitle, setSTitle] = useState("");
  const [sprf, setSProf] = useState("");
  const [sset, setSSet] = useState("");
  //local certification state
  const [cert, setCert] = useState([]);
  const [cname, setCName] = useState("");
  const [corg, setCOrg] = useState("");
  const [cexp, setCExp] = useState(false);
  const [cidate, setCIDate] = useState("");
  const [cedate, setCEDate] = useState("");
  const [cid, setCId] = useState("");
  const [curl, setCUrl] = useState("");
  //local education state
  const [edu, setEdu] = useState([]);
  const [ename, setEName] = useState("");
  const [eorg, setEOrg] = useState("");
  const [esdate, setESDate] = useState("");
  const [eedate, setEEDate] = useState("");
  const [eabout, setEAbout] = useState("");
  //local exp state
  const [exp, setExp] = useState([]);
  const [exname, setEXName] = useState("");
  const [exorg, setEXOrg] = useState("");
  const [exexp, setEXExp] = useState(false);
  const [exsdate, setEXSDate] = useState("");
  const [exedate, setEXEDate] = useState("");
  const [exabout, setEXAbout] = useState("");
  const [extype, setEXType] = useState("");
  //local achievment state
  const [achieve, setAchieve] = useState([]);
  const [amtitle, setAMTitle] = useState("");
  const [amdesc, setAMDesc] = useState("");

  //local fun
  function verifyLangPopup() {
    return alang && alang.length > 0 && aprof && aprof.length > 0 && !loader;
  }
  function verifyLinkPopup() {
    return atitle.length > 0 && !loader;
  }
  function verifySkillPopup() {
    return (
      stitle &&
      stitle.length > 0 &&
      sprf &&
      sprf.length > 0 &&
      sset &&
      sset.length > 0 &&
      !loader
    );
  }
  function verifyCertPopup() {
    return (
      cname.length > 0 &&
      corg.length > 0 &&
      cidate.length > 0 &&
      cid.length > 0 &&
      curl.length > 0 &&
      (cexp || cedate.length > 0) &&
      !loader
    );
  }
  function verifyEduPopup() {
    return (
      ename.length > 0 &&
      eorg.length > 0 &&
      esdate.length > 0 &&
      eedate.length > 0 &&
      eabout.length > 0 &&
      !loader
    );
  }
  function verifyExpPopup() {
    return (
      exname.length > 0 &&
      exorg.length > 0 &&
      exsdate.length > 0 &&
      exabout.length > 0 &&
      extype &&
      extype.length > 0 &&
      (exexp || exedate.length > 0) &&
      !loader
    );
  }
  function verifyAchievePopup() {
    return amtitle.length > 0 && amdesc.length > 0 && !loader;
  }

  //axios auth var
  const axiosInstanceAuth2 = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE
        : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
    timeout: 10000,
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "multipart/form-data",
    },
  });

  async function loadLang() {
    await axiosInstanceAuth2
      .get("/candidate/listlang/" + userObj["erefid"] + "/")
      .then(async (res) => {
        setLang(res.data);
        langPopupOpen(false);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Lang Not Loaded", "error");
        }
        console.log(err);
        langPopupOpen(false);
      });
  }

  async function deleteLang(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidatelanguage/" +
          userObj["erefid"] +
          "/" +
          val +
          "/delete/"
      )
      .then(async (res) => {
        toastcomp("Spoken Lang Deleted", "success");
        loadLang();
      })
      .catch((err) => {
        toastcomp("Spoken Lang Not Deleted", "error");
        console.log(err);
      });
  }

  async function addLang(formdata) {
    setloader(true);
    await axiosInstanceAuth2
      .post("/candidate/candidatelanguage/" + userObj["erefid"] + "/", formdata)
      .then(async (res) => {
        toastcomp("Spoken Lang Added", "success");
        loadLang();
        setloader(false);
      })
      .catch((err) => {
        toastcomp("Spoken Lang Not Added", "error");
        console.log(err);
      });
  }

  async function loadLink() {
    await axiosInstanceAuth2
      .get("/candidate/listlink/" + userObj["erefid"] + "/")
      .then(async (res) => {
        setLink(res.data);
        socialPopupOpen(false);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Link Not Loaded", "error");
        }
        console.log(err);
        socialPopupOpen(false);
      });
  }

  async function addLink(formdata) {
    setloader(true);
    await axiosInstanceAuth2
      .post("/candidate/candidatelink/" + userObj["erefid"] + "/", formdata)
      .then(async (res) => {
        toastcomp("Social Link Added", "success");
        loadLink();
        setloader(false);
      })
      .catch((err) => {
        toastcomp("Link Not Added", "error");
        console.log(err);
      });
  }

  async function deleteLink(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidatelink/" + userObj["erefid"] + "/" + val + "/delete/"
      )
      .then(async (res) => {
        toastcomp("Link Deleted", "success");
        loadLink();
      })
      .catch((err) => {
        toastcomp("Link Not Deleted", "error");
        console.log(err);
      });
  }

  async function loadReume() {
    await axiosInstanceAuth2
      .get("/candidate/listresume/" + userObj["erefid"] + "/")
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

  async function addResume(formdata) {
    await axiosInstanceAuth2
      .post("/candidate/candidateresume/" + userObj["erefid"] + "/", formdata)
      .then(async (res) => {
        toastcomp("Resume Added", "success");
        loadReume();
      })
      .catch((err) => {
        toastcomp("Resume Not Added", "error");
        console.log(err);
      });
  }

  async function addResumeHeadline(formdata, val) {
    await axiosInstanceAuth2
      .put(
        "/candidate/candidateresume/" +
          userObj["erefid"] +
          "/" +
          val +
          "/update/",
        formdata
      )
      .then(async (res) => {
        toastcomp("Resume Headline Updated", "success");
        loadReume();
      })
      .catch((err) => {
        toastcomp("Resume Headline Not Added", "error");
        console.log(err);
      });
  }

  async function deleteResume(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidateresume/" +
          userObj["erefid"] +
          "/" +
          val +
          "/delete/"
      )
      .then(async (res) => {
        toastcomp("Resume Deleted", "success");
        loadReume();
      })
      .catch((err) => {
        toastcomp("Resume Not Deleted", "error");
        console.log(err);
      });
  }

  async function loadSkill() {
    await axiosInstanceAuth2
      .get("/candidate/listskill/" + userObj["erefid"] + "/")
      .then(async (res) => {
        setSkill(res.data);
        skillsPopupOpen(false);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Skills Not Loaded", "error");
        }
        console.log(err);
        skillsPopupOpen(false);
      });
  }

  async function addSkill(formdata) {
    setloader(true);
    await axiosInstanceAuth2
      .post("/candidate/candidateskill/" + userObj["erefid"] + "/", formdata)
      .then(async (res) => {
        toastcomp("Skill Added", "success");
        loadSkill();
        setloader(false);
      })
      .catch((err) => {
        toastcomp("Skill Not Added", "error");
        console.log(err);
      });
  }

  async function deleteSkill(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidateskill/" +
          userObj["erefid"] +
          "/" +
          val +
          "/delete/"
      )
      .then(async (res) => {
        toastcomp("Skill Deleted", "success");
        loadSkill();
      })
      .catch((err) => {
        toastcomp("Skill Not Deleted", "error");
        console.log(err);
      });
  }

  async function loadCertification() {
    await axiosInstanceAuth2
      .get("/candidate/listcertificate/" + userObj["erefid"] + "/")
      .then(async (res) => {
        setCert(res.data);
        certificationPopupOpen(false);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Certification Not Loaded", "error");
        }
        console.log(err);
        certificationPopupOpen(false);
      });
  }

  async function addCertification(formdata) {
    setloader(true);
    await axiosInstanceAuth2
      .post(
        "/candidate/candidatecertificate/" + userObj["erefid"] + "/",
        formdata
      )
      .then(async (res) => {
        toastcomp("Certificate Added", "success");
        loadCertification();
        setloader(false);
      })
      .catch((err) => {
        toastcomp("Certificate Not Added", "error");
        console.log(err);
      });
  }

  async function deleteCertification(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidatecertificate/" +
          userObj["erefid"] +
          "/" +
          val +
          "/delete/"
      )
      .then(async (res) => {
        toastcomp("Certificate Deleted", "success");
        loadCertification();
      })
      .catch((err) => {
        toastcomp("Certificate Not Deleted", "error");
        console.log(err);
      });
  }

  async function loadEducation() {
    await axiosInstanceAuth2
      .get("/candidate/listeducation/" + userObj["erefid"] + "/")
      .then(async (res) => {
        setEdu(res.data);
        educationPopupOpen(false);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Education Not Loaded", "error");
        }
        console.log(err);
        educationPopupOpen(false);
      });
  }

  async function addEducation(formdata) {
    setloader(true);
    await axiosInstanceAuth2
      .post(
        "/candidate/candidateeducation/" + userObj["erefid"] + "/",
        formdata
      )
      .then(async (res) => {
        toastcomp("Education Added", "success");
        loadEducation();
        setloader(false);
      })
      .catch((err) => {
        toastcomp("Education Not Added", "error");
        console.log(err);
      });
  }

  async function deleteEducation(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidateeducation/" +
          userObj["erefid"] +
          "/" +
          val +
          "/delete/"
      )
      .then(async (res) => {
        toastcomp("Education Deleted", "success");
        loadEducation();
      })
      .catch((err) => {
        toastcomp("Education Not Deleted", "error");
        console.log(err);
      });
  }

  async function loadExperience() {
    await axiosInstanceAuth2
      .get("/candidate/listexperience/" + userObj["erefid"] + "/")
      .then(async (res) => {
        setExp(res.data);
        expPopupOpen(false);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Exp Not Loaded", "error");
        }
        console.log(err);
        expPopupOpen(false);
      });
  }

  async function addExperience(formdata) {
    setloader(true);
    await axiosInstanceAuth2
      .post(
        "/candidate/candidateexperience/" + userObj["erefid"] + "/",
        formdata
      )
      .then(async (res) => {
        toastcomp("Experience Added", "success");
        loadExperience();
        setloader(false);
      })
      .catch((err) => {
        toastcomp("Experience Not Added", "error");
        console.log(err);
      });
  }

  async function deleteExperience(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidateexperience/" +
          userObj["erefid"] +
          "/" +
          val +
          "/delete/"
      )
      .then(async (res) => {
        toastcomp("Experience Deleted", "success");
        loadExperience();
      })
      .catch((err) => {
        toastcomp("Experience Not Deleted", "error");
        console.log(err);
      });
  }

  async function loadAchieve() {
    await axiosInstanceAuth2
      .get("/candidate/listachievement/" + userObj["erefid"] + "/")
      .then(async (res) => {
        setAchieve(res.data);
        achievementsPopupOpen(false);
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Achieve Not Loaded", "error");
        }
        console.log(err);
        achievementsPopupOpen(false);
      });
  }

  async function addAchieve(formdata) {
    setloader(true);
    await axiosInstanceAuth2
      .post(
        "/candidate/candidateachievement/" + userObj["erefid"] + "/",
        formdata
      )
      .then(async (res) => {
        toastcomp("Achievement Added", "success");
        loadAchieve();
        setloader(false);
      })
      .catch((err) => {
        toastcomp("Achievement Not Added", "error");
        console.log(err);
      });
  }

  async function deleteAchieve(val) {
    await axiosInstanceAuth2
      .delete(
        "/candidate/candidateachievement/" +
          userObj["erefid"] +
          "/" +
          val +
          "/delete/"
      )
      .then(async (res) => {
        toastcomp("Achievement Deleted", "success");
        loadAchieve();
      })
      .catch((err) => {
        toastcomp("Achievement Not Deleted", "error");
        console.log(err);
      });
  }

  //userprofile useeffect to load values
  useEffect(() => {
    if (userProfile) {
      if (userProfile["title"]) {
        setTitle(userProfile["title"]);
        setFTitle(userProfile["title"]);
      }
      if (userProfile["summary"]) {
        setFSummary(userProfile["summary"]);
        setSummary(userProfile["summary"]);
      }
      if (userProfile["prejobtype"]) {
        setPreJobType(userProfile["prejobtype"]);
        setFPreJobType(userProfile["prejobtype"]);
      }
      if (userProfile["prelocation"]) {
        setPreLocation(userProfile["prelocation"]);
      }
      if (userProfile["salary"]) {
        setSalary(userProfile["salary"]);
        setFSalary(userProfile["salary"]);
      }
      if (userProfile["yearofexp"]) {
        setYearsOfExp(userProfile["yearofexp"]);
      }
      if (userProfile["snoticeperiod"]) {
        setServeNP(userProfile["snoticeperiod"]);
      }
      if (userProfile["noticeperiod"]) {
        setNoticeP(userProfile["noticeperiod"]);
      }

      loadLang();
      loadLink();
      loadReume();
      loadSkill();
      loadCertification();
      loadEducation();
      loadExperience();
      loadAchieve();
    }
  }, [userProfile]);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  //handle update user profile on BIO
  useEffect(() => {
    async function saveProfile(formData) {
      await axiosInstanceAuth2
        .put("/candidate/candidatebio/" + userObj["erefid"] + "/", formData)
        .then(async (res) => {
          updateUserProfile(res.data);
          toastcomp("Profile Updated", "success");
        })
        .catch((err) => {
          console.log(err);
          if (err.message != "Request failed with status code 401") {
            toastcomp("Profile Not Updated", "error");
          }
        });
    }
    if (userProfile) {
      var formData = new FormData();
      if (title && userProfile["title"] != title) {
        formData.append("title", title);
      }
      if (summary && userProfile["summary"] != summary) {
        formData.append("summary", summary);
      }
      if (preLocation && userProfile["prelocation"] != preLocation) {
        formData.append("prelocation", preLocation);
      }
      if (salary && userProfile["salary"] != salary) {
        formData.append("salary", salary);
      }
      if (preJobtype && userProfile["prejobtype"] != preJobtype) {
        formData.append("prejobtype", preJobtype);
      }
      if (yearsOfExp && userProfile["yearofexp"] != yearsOfExp) {
        formData.append("yearofexp", yearsOfExp);
      }
      if (userProfile["snoticeperiod"] != serveNP) {
        formData.append("snoticeperiod", JSON.stringify(serveNP));
      }
      if (userProfile["noticeperiod"] != noticeP) {
        formData.append("noticeperiod", noticeP);
      }

      if (Array.from(formData.keys()).length > 0) {
        saveProfile(formData);
      }
    }
  }, [
    ftitle,
    fsummary,
    preLocation,
    preJobtype,
    fsalary,
    yearsOfExp,
    serveNP,
    noticeP,
  ]);

  //save spoken lang
  function saveLang(e) {
    const formData = new FormData();
    formData.append("title", alang);
    formData.append("experties", aprof);
    addLang(formData);
    setALang("");
    setAProf("");
  }

  //save social media link
  function saveLink(e) {
    const formData = new FormData();
    formData.append("title", atitle);
    addLink(formData);
    setATitle("");
  }

  //save resume
  useEffect(() => {
    if (uresume) {
      const formData = new FormData();
      formData.append("file", uresume);
      addResume(formData);
    }
  }, [uresume]);

  //save resume headline
  useEffect(() => {
    if (urtitle != furtitle) {
      const formData = new FormData();
      formData.append("title", urtitle);
      addResumeHeadline(formData, rid);
    }
  }, [urtitle]);

  useEffect(() => {
    if (resume) {
      resume.map(
        (resume) => (
          setRId(resume.id),
          setUTitle(resume.title),
          setURTitle(resume.title),
          setFURTitle(resume.title)
        )
      );
    }
  }, [resume]);

  //save skill
  function saveSkill(e) {
    if (document.getElementById(stitle + "Skill")) {
      loadSkill();
      toastcomp("Skill already exist", "error");
    } else {
      const formData = new FormData();
      formData.append("title", stitle);
      formData.append("experties", sprf);
      formData.append("skill_set", sset);
      addSkill(formData);
      // setSTitle('')
    }
  }

  //save certificate
  function saveCert(e) {
    const formData = new FormData();
    formData.append("title", cname);
    formData.append("company", corg);
    formData.append("yearofissue", cidate);
    if (!cexp) {
      formData.append("yearofexp", cedate);
    } else {
      formData.append("yearofexp", "");
    }
    formData.append("creid", cid);
    formData.append("creurl", curl);
    addCertification(formData);
    setCName("");
    setCOrg("");
    setCIDate("");
    setCEDate("");
    setCId("");
    setCUrl("");
    setCExp(false);
  }

  //save education
  function saveEdu(e) {
    const formData = new FormData();
    formData.append("title", ename);
    formData.append("college", eorg);
    formData.append("yearofjoin", esdate);
    formData.append("yearofend", eedate);
    formData.append("edubody", eabout);
    addEducation(formData);
    setEName("");
    setEOrg("");
    setESDate("");
    setEEDate("");
    setEAbout("");
  }

  //save exp
  function saveExp(e) {
    const formData = new FormData();
    formData.append("title", exname);
    formData.append("company", exorg);
    formData.append("year_of_join", exsdate);
    if (exexp) {
      formData.append("year_of_end", "");
    } else {
      formData.append("year_of_end", exedate);
    }
    formData.append("expbody", exabout);
    formData.append("type", extype);
    addExperience(formData);
    setEXName("");
    setEXOrg("");
    setEXExp(false);
    setEXSDate("");
    setEXEDate("");
    setEXAbout("");
    setEXType("");
  }

  //save achieve
  function saveAchieve(e) {
    const formData = new FormData();
    formData.append("title", amtitle);
    formData.append("desc", amdesc);
    addAchieve(formData);
    setAMTitle("");
    setAMDesc("");
  }

  const [loc, setLoc] = useState([]);
  const [ski, setski] = useState([]);
  const [load, setload] = useState(false);

  async function searchLoc(value) {
    const axiosInstance22 = axios.create({
      baseURL:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE
          : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
      // timeout: 10000,
      headers: {
        // 'Authorization': "JWT " + access_token,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    await axiosInstance22
      .get(`/job/load/location/?search=${value}`)
      .then(async (res) => {
        let obj = res.data;
        let arr = [];
        for (const [key, value] of Object.entries(obj)) {
          arr.push(value);
        }
        setLoc(arr);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function searchSkill(value) {
    const axiosInstance22 = axios.create({
      baseURL:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE
          : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
      // timeout: 10000,
      headers: {
        // 'Authorization': "JWT " + access_token,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    await axiosInstance22
      .get(`/job/load/skills/?search=${value}`)
      .then(async (res) => {
        let obj = res.data;
        let arr = [];
        for (const [key, value] of Object.entries(obj)) {
          arr.push(value);
        }
        setski(arr);
        setload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <main className="py-8">
        <div className="container">
          <div className="flex flex-wrap mb-8">
            <div className="w-full lg:max-w-[75%] xl:max-w-[80%] lg:pr-6 mb-6 lg:mb-0">
              <div className="bg-white shadow-normal rounded-[25px] h-full flex flex-wrap">
                <div className="w-[310px] mx-auto p-8">
                  <div className="userBgImage min-h-[268px] flex items-center justify-center">
                    <Image
                      src={userImg}
                      width={300}
                      height={300}
                      alt="User"
                      className="w-[220px] h-[220px] rounded-full object-cover mx-auto "
                    />
                  </div>
                </div>
                <div className="w-full md:max-w-[calc(100%-310px)] p-6 xl:p-8 relative bg-gradient-to-r from-[#A382E5] to-[#60C3E2] rounded-[25px] flex items-center">
                  <aside className="w-full">
                    <h2 className="font-semibold text-xl md:text-3xl mb-2 text-white">
                      {userName}
                    </h2>
                    <p className="text-white font-light text-sm mb-6">
                      {userProfile["title"]}
                    </p>
                    <ul className="flex flex-wrap">
                      {userObj["email"] && (
                        <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1 break-all">
                          <i className="fa-solid fa-envelope xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>{userObj["email"]}</p>
                        </li>
                      )}

                      {userObj["mobile"] && (
                        <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                          <i className="fa-solid fa-phone xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>{userObj["mobile"]}</p>
                        </li>
                      )}

                      {userProfile["salary"] && (
                        <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                          <i className="fa-solid fa-wallet xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>{userProfile["salary"]}</p>
                        </li>
                      )}

                      {userProfile["prejobtype"] && (
                        <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                          <i className="fa-solid fa-briefcase xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>{userProfile["prejobtype"]}</p>
                        </li>
                      )}

                      {userProfile["prelocation"] && (
                        <li className="flex items-center w-full sm:max-w-[50%] text-white font-light xl:text-lg mb-3 pr-1">
                          <i className="fa-solid fa-location-dot xl:text-xl mr-3"></i>
                          <span className="mr-2">:</span>
                          <p>{userProfile["prelocation"]}</p>
                        </li>
                      )}
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
            <div className="w-full lg:max-w-[25%] xl:max-w-[20%]">
              <div className="bg-white shadow-normal rounded-[25px] h-full">
                <div className="flex items-center justify-between p-4">
                  <h4 className="font-semibold text-xl mb-8 lg:mb-6">
                    <span className="text-[#6D27F9] font-bold text-2xl">
                      Wallet
                    </span>{" "}
                    <br />
                    Info
                  </h4>
                  <div>
                    <Image
                      src={token}
                      alt="Token"
                      className="w-[80px] lg:w-[100px] "
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[#7fc5f4] to-[#2568C9] rounded-[25px] pt-[6rem] pb-8 px-4 mt-[-40px]">
                  <div className="bg-gradient-to-r from-[#a1c5fb] to-[#2568C9] rounded-lg shadow-lg p-5 text-white text-center font-semibold">
                    <div className="flex justify-center connectionBtnSidebar">
                      <ConnectButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative pt-12 xl:pt-0 xl:px-20">
            <div className="absolute left-0 top-[7px]">
              <button
                type="button"
                onClick={(e) => {
                  router.push("/marketplace/candidate");
                }}
                className="rounded-full bg-black text-white p-4 mr-4 w-[25px] h-[25px] flex items-center justify-center"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
            <div className="candidate_profile">
              <Tabs>
                <div className="candidate_profile__tabs">
                  <TabList>
                    <Tab>Bio</Tab>
                    <Tab>Resume</Tab>
                    <Tab>Skills</Tab>
                    <Tab>Certifications</Tab>
                    <Tab>Education</Tab>
                    <Tab>Experience</Tab>
                    <Tab>Achievements</Tab>
                  </TabList>
                </div>
                <TabPanel>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="mb-6">
                      <label
                        htmlFor="title"
                        className="font-medium mb-2 leading-none inline-block"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={(e) => setFTitle(e.target.value)}
                        placeholder="Ex: Web Developer"
                        className="w-full rounded-full border-slate-300"
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="summary"
                        className="font-medium mb-2 leading-none inline-block"
                      >
                        Summary
                      </label>
                      {/* <textarea id="summary" placeholder="Something about yourself..." className="w-full rounded-[25px] h-[120px] border-slate-300 resize-none pb-6" value={summary} onChange={(e)=>setSummary(e.target.value)} onBlur={(e)=>setFSummary(e.target.value)} ></textarea> */}
                      <Editor
                        apiKey="veckejpcr82yx9s84tl0ifqqrg7h6zgfdkkmjc69kifrx9rc"
                        onChange={(evt, editor) =>
                          setSummary(editor.getContent())
                        }
                        onBlur={(evt, editor) =>
                          setFSummary(editor.getContent())
                        }
                        initialValue={summary}
                        init={{
                          height: 300,
                          menubar: false,
                          plugins:
                            "autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                      <span className="absolute right-3 bottom-3 text-gray-500">
                        20/300
                      </span>
                    </div>
                  </div>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="flex flex-wrap justify-between">
                      <div className="w-full lg:w-[47%] mb-6">
                        <label
                          htmlFor="preferJobType"
                          className="font-medium mb-4 leading-none inline-block"
                        >
                          Preferred Job Type
                        </label>
                        {/* <input id="preferJobType" type="text" placeholder="Ex: Fulltime" className="w-full rounded-full border-slate-300" value={preJobtype} onChange={(e)=>setPreJobType(e.target.value)} onBlur={(e)=>setFPreJobType(e.target.value)}/> */}
                        <Multiselect
                          options={[
                            "Permanent/Full Time",
                            "Permanent/Contract",
                            "Contract",
                            "Part-Time",
                            "Freelance",
                            ,
                            "Internship",
                          ]}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          selectedValues={preJobtype && preJobtype.split(",")}
                          onSelect={(selectedList, selectedItem) => {
                            setPreJobType(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setPreJobType(null);
                          }}
                          placeholder="Find Preferred Job Type"
                        />
                      </div>
                      <div className="w-full lg:w-[47%] mb-6">
                        <div className="flex flex-wrap items-center justify-between mb-2">
                          <label
                            htmlFor="noticePeriod"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Notice Period{" "}
                            <span className="text-gray-500">(Optional)</span>
                          </label>
                          <label
                            htmlFor="noticeServe"
                            className="flex items-center text-[#646464] text-sm"
                          >
                            <input
                              type="checkbox"
                              id="noticeServe"
                              className="mr-2"
                              checked={serveNP}
                              onChange={(e) => setServeNP(e.target.checked)}
                            />
                            Serving or Not?
                          </label>
                        </div>
                        {/* <select id="noticePeriod" className="w-full rounded-full border-slate-300" disabled={!serveNP} value={noticeP} onChange={(e)=>setNoticeP(e.target.value)}>
                                                    <option value="">Select Notice Period</option>
                                                    <option value="Immediate Joiner">Immediate Joiner</option>
                                                    <option value="15 days">15 days</option>
                                                </select> */}
                        <Multiselect
                          options={[
                            "Immediate Joiner",
                            "15 days",
                            "30 days",
                            "60 days",
                            "90 days",
                            ,
                            "150+ days",
                          ]}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          selectedValues={noticeP && noticeP.split(",")}
                          onSelect={(selectedList, selectedItem) => {
                            setNoticeP(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setNoticeP("");
                          }}
                          placeholder="Find Notice Period In Days"
                          disable={!serveNP}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <div className="w-full lg:w-[47%] mb-6">
                        <label
                          htmlFor="preferLocation"
                          className="font-medium mb-4 leading-none inline-block"
                        >
                          Preferred Location
                        </label>
                        {/* <select id="preferLocation" className="w-full rounded-full border-slate-300" value={preLocation} onChange={(e)=>setPreLocation(e.target.value)}>
                                                    <option value="">Select Location</option>
                                                    <option value="India">India</option>
                                                    <option value="Japan">Japan</option>
                                                </select> */}
                        <Multiselect
                          options={loc}
                          loading={load}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          onSearch={(value) => {
                            setload(true);
                            searchLoc(value);
                          }}
                          selectedValues={preLocation && preLocation.split("|")}
                          onSelect={(selectedList, selectedItem) => {
                            setPreLocation(selectedList.join("|"));
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setPreLocation(selectedList.join("|"));
                          }}
                          placeholder="Find Preferred Location"
                        />

                        {/* <Multiselect
                                                options={['No Experience','1-2 years','2-5 years','5-10 years','10-15 years',,'15+ years']}
                                                isObject={false}
                                                customCloseIcon={<><i className="fa-solid fa-xmark"></i></>}
                                                showArrow={true}
                                                closeOnSelect={true}
                                                selectionLimit={1}
                                                selectedValues = {yearsOfExp && yearsOfExp.split(',')}
                                                onSelect={(selectedList, selectedItem)=> {setYearsOfExp(selectedItem) }}
                                                onRemove={(selectedList, selectedItem)=> {setYearsOfExp(null) }}
                                                /> */}
                      </div>

                      <div className="w-full lg:w-[47%] mb-6">
                        <label
                          htmlFor="salary"
                          className="font-medium mb-4 leading-none inline-block"
                        >
                          Salary
                        </label>
                        <input
                          id="salary"
                          type="text"
                          placeholder="Ex: 2 Lpa"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          onBlur={(e) => setFSalary(e.target.value)}
                          className="w-full rounded-full border-slate-300"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <div className="w-full lg:w-[47%] mb-6">
                        <label
                          htmlFor="yearsOfExp"
                          className="font-medium mb-4 leading-none inline-block"
                        >
                          Years of Experience
                        </label>
                        {/* <select id="yearsOfExp" className="w-full rounded-full border-slate-300" value={yearsOfExp} onChange={(e)=>setYearsOfExp(e.target.value)}>
                                                    <option value="">Select Year Of Exp</option>
                                                    <option value="No Experience">No Experience</option>
                                                    <option value="1-5 years">1-5 years</option>
                                                    <option value="5-10 years">5-10 years</option>
                                                    <option value="10-15 years">10-15 years</option>
                                                </select> */}
                        <Multiselect
                          options={[
                            "No Experience",
                            "1-2 years",
                            "2-5 years",
                            "5-10 years",
                            "10-15 years",
                            ,
                            "15+ years",
                          ]}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          selectedValues={yearsOfExp && yearsOfExp.split(",")}
                          onSelect={(selectedList, selectedItem) => {
                            setYearsOfExp(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setYearsOfExp(null);
                          }}
                          placeholder="Find Preferred Experience In Years"
                        />
                      </div>
                      <div className="w-full lg:w-[47%] mb-6">
                        <div className="flex flex-wrap items-center justify-between mb-2">
                          <label
                            htmlFor="languages"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Language
                          </label>
                          <button
                            type="button"
                            className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                            onClick={() => langPopupOpen(true)}
                          >
                            Add
                          </button>
                        </div>
                        {/* <input id="languages" type="text" placeholder="You can add multiple Languages" className="w-full rounded-full border-slate-300" /> */}
                        <div className="w-full rounded-[25px] border border-slate-300 p-2 min-h-[42px] relative flex items-start overflow-x-auto">
                          {lang.map((lang, i) => (
                            <p
                              className="relative bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2"
                              key={i}
                            >
                              {lang.title}
                              <span className="pl-1 text-[10px] flex text-[#FEF401] mt-[2px]">
                                <i className="fa-solid fa-star ml-1"></i>
                                {lang.experties == "Limited Profeciency" && (
                                  <i className="fa-solid fa-star ml-1"></i>
                                )}
                                {lang.experties ==
                                  "Professional Profeciency" && (
                                  <>
                                    <i className="fa-solid fa-star ml-1"></i>
                                    <i className="fa-solid fa-star ml-1"></i>
                                  </>
                                )}
                                {lang.experties ==
                                  "Native/Bilingual Profeciency" && (
                                  <>
                                    <i className="fa-solid fa-star ml-1"></i>
                                    <i className="fa-solid fa-star ml-1"></i>
                                    <i className="fa-solid fa-star ml-1"></i>
                                  </>
                                )}
                              </span>
                              <button
                                type="button"
                                className="absolute right-[0] top-[-5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded"
                                onClick={(e) => deleteLang(lang.id)}
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8">
                    <div className="md:border border-slate-300 rounded-[30px] md:py-6 md:px-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4>
                          Social <span className="text-[#6D27F9]">Media</span>
                        </h4>
                        <button
                          type="button"
                          className="border border-[#6D27F9] rounded-full py-1 px-4 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                          onClick={() => socialPopupOpen(true)}
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        {link.map((link, i) => (
                          <div className="w-full lg:w-[47%] mb-6" key={i}>
                            <div className="iconGroup social delete">
                              <input
                                type="text"
                                value={link.title}
                                className="w-full rounded-full border-slate-300 focus:border-slate-300 focus:ring-0 focus:outline-0 focus:shadow-none"
                                readOnly
                              />
                              <i className="fa-solid fa-link iconGroup__icon"></i>
                              <i
                                className="fa-solid fa-trash iconGroup__icon-delete"
                                onClick={(e) => deleteLink(link.id)}
                              ></i>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="mb-6">
                      <label className="font-medium mb-4 leading-none inline-block">
                        Resume
                      </label>
                      {resume.length <= 0 ? (
                        <div className="flex flex-col">
                          <label
                            htmlFor="uploadCV"
                            className="mb-2 w-[150px] p-2.5 px-4 border border-dashed border-teal-500 rounded-md text-sm text-center font-semibold cursor-pointer"
                          >
                            <span>
                              Upload{" "}
                              <i className="fa-solid fa-cloud-arrow-up ml-1 text-[#6D27F9]"></i>
                            </span>
                            <input
                              type="file"
                              id="uploadCV"
                              accept="application/pdf,application/msword,.rtf"
                              className="hidden"
                              onChange={(e) => setUResume(e.target.files[0])}
                            />
                          </label>
                          <span className="text-[#646464] text-[12px]">
                            Supported Formats: doc, docx, rtf, pdf, upto 2 MB
                          </span>
                        </div>
                      ) : (
                        <>
                          {resume.map((resume, i) => (
                            <div
                              className="flex flex-wrap items-center justify-between"
                              key={i}
                            >
                              <aside className="mr-2">
                                <p className="text-sm relative pr-6 mb-1">
                                  {/* <b className="text-[#646464]">{(resume.file.split('/')[6])} : </b> */}
                                  <span className="text-[#6D27F9]">
                                    {resume.file.split("/")[6]}
                                  </span>
                                  <button
                                    type="button"
                                    className="absolute right-0 top-0 text-red-500"
                                    onClick={(e) => deleteResume(resume.id)}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </p>
                                <p className="text-[#646464] text-[12px]">
                                  Uploaded on :{" "}
                                  {new Date(resume.date).toDateString()}
                                </p>
                              </aside>
                              <a
                                href={resume.file}
                                target="_blank"
                                rel="noreferrer"
                                className="my-2 text-[#646464] text-sm"
                                download
                              >
                                Download Resume
                                <i className="fa-solid fa-download text-xl ml-2 text-[#6D27F9]"></i>
                              </a>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                    {resume.length > 0 && (
                      <div className="relative">
                        <label
                          htmlFor="cvHeadline"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Resume Headline
                        </label>
                        <input
                          type="text"
                          id="cvHeadline"
                          placeholder="Ex: Web Developer 5 years of experence"
                          className="w-full rounded-full border-slate-300"
                          value={utitle}
                          onChange={(e) => setUTitle(e.target.value)}
                          onBlur={(e) => setURTitle(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-medium leading-none inline-block">
                        Key Skills
                      </label>
                      <button
                        type="button"
                        className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                        onClick={() => skillsPopupOpen(true)}
                      >
                        Add
                      </button>
                    </div>
                    {skill.length > 0 ? (
                      <>
                        {/* <p className="text-[#646464] mb-2">Skills</p> */}
                        <div className="w-full rounded-[25px] border border-slate-300 p-6 min-h-[200px]">
                          <div className="flex flex-wrap items-start">
                            {skill.map((skill, i) => (
                              <p
                                className="relative bg-[#C9B3FF] rounded-full py-2 px-3 flex items-center text-[14px] mr-2 mb-3"
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
                                <button
                                  type="button"
                                  className="absolute right-[0] top-[-5px] leading-none shadow-normal bg-white text-red-500 text-[10px] w-[15px] h-[15px] rounded"
                                  onClick={(e) => deleteSkill(skill.id)}
                                >
                                  <i className="fa-solid fa-xmark"></i>
                                </button>
                              </p>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* <p className="text-[#646464] text-sm font-light mb-4">Add skills with relevent expertise</p> */}
                        <Image
                          src={skillsGraphic}
                          alt="Skills"
                          className="w-full"
                        />
                      </>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-medium leading-none inline-block">
                        Certifications
                      </label>
                      <button
                        type="button"
                        className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                        onClick={() => certificationPopupOpen(true)}
                      >
                        Add
                      </button>
                    </div>
                    {cert.length > 0 ? (
                      <>
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
                                Issued Date:- {cert.yearofissue} <br /> Expiry
                                Date:-{" "}
                                {cert.yearofexp ? (
                                  cert.yearofexp
                                ) : (
                                  <>No Expiry</>
                                )}
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
                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                              {/* <button type="button" className="text-[#6D27F9] mx-2" value={cert.id}>
                                                       <i className="fa-solid fa-pen-to-square"></i>
                                                   </button> */}
                              <button
                                type="button"
                                className="text-red-500 mx-2"
                                onClick={(e) => deleteCertification(cert.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* <p className="text-[#646464] text-sm font-light mb-4">Add certifications here</p> */}
                        <Image
                          src={certificateGraphic}
                          alt="Certifications"
                          className="w-full"
                        />
                      </>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-medium leading-none inline-block">
                        Education
                      </label>
                      <button
                        type="button"
                        className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                        onClick={() => educationPopupOpen(true)}
                      >
                        Add
                      </button>
                    </div>
                    {edu.length > 0 ? (
                      <>
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
                                Started Date:- {edu.yearofjoin} <br /> End
                                Date:- {edu.yearofend}
                              </p>
                              <h6 className="font-medium">About</h6>
                              <p className="text-[#646464] font-light text-sm">
                                {edu.edubody}
                              </p>
                            </article>
                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                              {/* <button type="button" className="text-[#6D27F9] mx-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button> */}
                              <button
                                type="button"
                                className="text-red-500 mx-2"
                                onClick={(e) => deleteEducation(edu.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* <p className="text-[#646464] text-sm font-light mb-4">Add education background</p> */}
                        <Image
                          src={educationGraphic}
                          alt="Education"
                          className="w-full"
                        />
                      </>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-medium leading-none inline-block">
                        Experience
                      </label>
                      <button
                        type="button"
                        className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                        onClick={() => expPopupOpen(true)}
                      >
                        Add
                      </button>
                    </div>
                    {exp.length > 0 ? (
                      <>
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
                                Started Date:- {exp.year_of_join} <br /> End
                                Date:-{" "}
                                {exp.year_of_end ? (
                                  exp.year_of_end
                                ) : (
                                  <>PRESENT</>
                                )}
                              </p>
                              <p className="text-[#646464] font-light text-sm mb-2">
                                Type:- {exp.type}
                              </p>
                              <h6 className="font-medium">About</h6>
                              <p className="text-[#646464] font-light text-sm">
                                {exp.expbody}
                              </p>
                            </article>
                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                              {/* <button type="button" className="text-[#6D27F9] mx-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button> */}
                              <button
                                type="button"
                                className="text-red-500 mx-2"
                                onClick={(e) => deleteExperience(exp.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* <p className="text-[#646464] text-sm font-light mb-4">Add experience here</p> */}
                        <Image
                          src={expGraphic}
                          alt="Experience"
                          className="w-full"
                        />
                      </>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="bg-white shadow-normal border border-teal-400 rounded-[30px] p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-medium leading-none inline-block">
                        Achievements
                      </label>
                      <button
                        type="button"
                        className="border border-[#6D27F9] rounded-full py-1 px-8 text-sm hover:bg-gradient-to-r hover:from-[#A382E5] hover:to-[#60C3E2] hover:text-white"
                        onClick={() => achievementsPopupOpen(true)}
                      >
                        Add
                      </button>
                    </div>
                    {achieve.length > 0 ? (
                      <>
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
                            <div className="bg-white shadow-md rounded-tl-[20px] rounded-bl-[20px] absolute right-0 top-[0px] md:top-[15px] p-1.5 md:py-2.5 md:px-4 text-[12px] md:text-sm">
                              {/* <button type="button" className="text-[#6D27F9] mx-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button> */}
                              <button
                                type="button"
                                className="text-red-500 mx-2"
                                onClick={(e) => deleteAchieve(achieve.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* <p className="text-[#646464] text-sm font-light mb-4">Add achievements here</p> */}
                        <Image
                          src={achievementsGraphic}
                          alt="Achievements"
                          className="w-full"
                        />
                      </>
                    )}
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Transition.Root show={langPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={langPopupOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Language
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => langPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="enterLang"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Enter Language
                        </label>
                        {/* <input id="enterLang" type="text" placeholder="Ex: English" className="w-full rounded-full border-slate-300" value={alang} onChange={(e)=>setALang(e.target.value)} /> */}
                        <Multiselect
                          options={[
                            "Abkhaz",
                            "Afar",
                            "Afrikaans",
                            "Akan",
                            "Albanian",
                            "Amharic",
                            "Arabic",
                            "Aragonese",
                            "Armenian",
                            "Assamese",
                            "Avaric",
                            "Avestan",
                            "Aymara",
                            "Azerbaijani",
                            "Bambara",
                            "Bashkir",
                            "Basque",
                            "Belarusian",
                            "Bengali; Bangla",
                            "Bihari",
                            "Bislama",
                            "Bosnian",
                            "Breton",
                            "Bulgarian",
                            "Burmese",
                            "Catalan; Valencian",
                            "Chamorro",
                            "Chechen",
                            "Chichewa; Chewa; Nyanja",
                            "Chinese",
                            "Chuvash",
                            "Cornish",
                            "Corsican",
                            "Cree",
                            "Croatian",
                            "Czech",
                            "Danish",
                            "Divehi; Dhivehi; Maldivian;",
                            "Dutch",
                            "Dzongkha",
                            "English",
                            "Esperanto",
                            "Estonian",
                            "Ewe",
                            "Faroese",
                            "Fijian",
                            "Finnish",
                            "French",
                            "Fula; Fulah; Pulaar; Pular",
                            "Galician",
                            "Georgian",
                            "German",
                            "Greek, Modern",
                            "GuaranÃ­",
                            "Gujarati",
                            "Haitian; Haitian Creole",
                            "Hausa",
                            "Hebrew (modern)",
                            "Herero",
                            "Hindi",
                            "Hiri Motu",
                            "Hungarian",
                            "Interlingua",
                            "Indonesian",
                            "Interlingue",
                            "Irish",
                            "Igbo",
                            "Inupiaq",
                            "Ido",
                            "Icelandic",
                            "Italian",
                            "Inuktitut",
                            "Japanese",
                            "Javanese",
                            "Kalaallisut, Greenlandic",
                            "Kannada",
                            "Kanuri",
                            "Kashmiri",
                            "Kazakh",
                            "Khmer",
                            "Kikuyu, Gikuyu",
                            "Kinyarwanda",
                            "Kyrgyz",
                            "Komi",
                            "Kongo",
                            "Korean",
                            "Kurdish",
                            "Kwanyama, Kuanyama",
                            "Latin",
                            "Luxembourgish, Letzeburgesch",
                            "Ganda",
                            "Limburgish, Limburgan, Limburger",
                            "Lingala",
                            "Lao",
                            "Lithuanian",
                            "Luba-Katanga",
                            "Latvian",
                            "Manx",
                            "Macedonian",
                            "Malagasy",
                            "Malay",
                            "Malayalam",
                            "Maltese",
                            "MÄori",
                            "Marathi (MarÄá¹­hÄ«)",
                            "Marshallese",
                            "Mongolian",
                            "Nauru",
                            "Navajo, Navaho",
                            "Norwegian BokmÃ¥l",
                            "North Ndebele",
                            "Nepali",
                            "Ndonga",
                            "Norwegian Nynorsk",
                            "Norwegian",
                            "Nuosu",
                            "South Ndebele",
                            "Occitan",
                            "Ojibwe, Ojibwa",
                            "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
                            "Oromo",
                            "Oriya",
                            "Ossetian, Ossetic",
                            "Panjabi, Punjabi",
                            "PÄli",
                            "Persian (Farsi)",
                            "Polish",
                            "Pashto, Pushto",
                            "Portuguese",
                            "Quechua",
                            "Romansh",
                            "Kirundi",
                            "Romanian, [])",
                            "Russian",
                            "Sanskrit (Saá¹ská¹›ta)",
                            "Sardinian",
                            "Sindhi",
                            "Northern Sami",
                            "Samoan",
                            "Sango",
                            "Serbian",
                            "Scottish Gaelic; Gaelic",
                            "Shona",
                            "Sinhala, Sinhalese",
                            "Slovak",
                            "Slovene",
                            "Somali",
                            "Southern Sotho",
                            "Spanish; Castilian",
                            "Sundanese",
                            "Swahili",
                            "Swati",
                            "Swedish",
                            "Tamil",
                            "Telugu",
                            "Tajik",
                            "Thai",
                            "Tigrinya",
                            "Tibetan Standard, Tibetan, Central",
                            "Turkmen",
                            "Tagalog",
                            "Tswana",
                            "Tonga (Tonga Islands)",
                            "Turkish",
                            "Tsonga",
                            "Tatar",
                            "Twi",
                            "Tahitian",
                            "Uyghur, Uighur",
                            "Ukrainian",
                            "Urdu",
                            "Uzbek",
                            "Venda",
                            "Vietnamese",
                            "VolapÃ¼k",
                            "Walloon",
                            "Welsh",
                            "Wolof",
                            "Western Frisian",
                            "Xhosa",
                            "Yiddish",
                            "Yoruba",
                            "Zhuang, Chuang",
                            "Zulu",
                          ]}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          selectedValues={alang && alang.split(",")}
                          onSelect={(selectedList, selectedItem) => {
                            setALang(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setALang(null);
                          }}
                          placeholder="Find Language"
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="chooseLangProfeciency"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Choose Language Profeciency
                        </label>
                        {/* <select id="chooseLangProfeciency" className="w-full rounded-full border-slate-300"
                                        value={aprof} onChange={(e)=>setAProf(e.target.value)}>
                                            <option value="Elementary profeciency">Elementary profeciency</option>
                                            <option value="Limited profeciency">Limited profeciency</option>
                                            <option value="Professional profeciency">Professional profeciency</option>
                                            <option value="Native or bilingual profeciency">Native or bilingual profeciency</option>
                                        </select> */}
                        <Multiselect
                          options={[
                            "Elementary Profeciency",
                            "Limited Profeciency",
                            "Professional Profeciency",
                            "Native/Bilingual Profeciency",
                          ]}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          // selectedValues = {yearsOfExp && yearsOfExp.split(',')}
                          onSelect={(selectedList, selectedItem) => {
                            setAProf(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setAProf(null);
                          }}
                          placeholder="Find Preferred Profeciency"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          disabled={!verifyLangPopup()}
                          onClick={(e) => saveLang(e)}
                        >
                          {loader && (
                            <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          )}
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={socialPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={socialPopupOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Social Media
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => socialPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="chooseLangProfeciency"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Enter social profile url
                        </label>
                        <input
                          type="text"
                          placeholder="https//www.xyzurl.com"
                          className="w-full rounded-full border-slate-300"
                          value={atitle}
                          onChange={(e) => setATitle(e.target.value)}
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          onClick={(e) => saveLink(e)}
                          disabled={!verifyLinkPopup()}
                        >
                          {loader && (
                            <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          )}
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={skillsPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={skillsPopupOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Add Skills
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => skillsPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="chooseSkills"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Choose desired skills
                        </label>
                        {/* <select id="chooseSkills" className="w-full rounded-full border-slate-300" value={stitle} onChange={(e)=>setSTitle(e.target.value)}>
                                            <option value="PHP">PHP</option>
                                            <option value="HTML">HTML</option>
                                            <option value="CSS">CSS</option>
                                        </select> */}
                        <Multiselect
                          options={ski}
                          loading={load}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          onSearch={(value) => {
                            setload(true);
                            searchSkill(value);
                          }}
                          onSelect={(selectedList, selectedItem) => {
                            setSTitle(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setSTitle(null);
                          }}
                          placeholder="Find Desired Skills"
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="choosesSkillsProfeciency"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Choose profeciency
                        </label>
                        {/* <select id="choosesSkillsProfeciency" className="w-full rounded-full border-slate-300" value={sprf} onChange={(e)=>setSProf(e.target.value)}>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advance">Advance</option>
                                        </select> */}
                        <Multiselect
                          options={["Beginner", "Intermediate", "Advance"]}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          // selectedValues = {sprf && sprf.split(',')}
                          onSelect={(selectedList, selectedItem) => {
                            setSProf(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setSProf(null);
                          }}
                          placeholder="Find Preferred Profeciency"
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="choosesSkillsSet"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Skill set
                        </label>
                        {/* <select id="choosesSkillsSet" className="w-full rounded-full border-slate-300" value={sset} onChange={(e)=>setSSet(e.target.value)}>
                                            <option value="Primary">Primary</option>
                                            <option value="Secondary">Secondary</option>
                                        </select> */}
                        <Multiselect
                          options={["Primary", "Secondary"]}
                          isObject={false}
                          customCloseIcon={
                            <>
                              <i className="fa-solid fa-xmark"></i>
                            </>
                          }
                          showArrow={true}
                          closeOnSelect={true}
                          selectionLimit={1}
                          // selectedValues = {sprf && sprf.split(',')}
                          onSelect={(selectedList, selectedItem) => {
                            setSSet(selectedItem);
                          }}
                          onRemove={(selectedList, selectedItem) => {
                            setSSet(null);
                          }}
                          placeholder="Find Preferred Set"
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          onClick={(e) => saveSkill(e)}
                          disabled={!verifySkillPopup()}
                        >
                          {loader && (
                            <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          )}
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={certificationPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={certificationPopupOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Add Certificate
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => certificationPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="certificateName"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Name
                          </label>
                          <input
                            id="certificateName"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={cname}
                            onChange={(e) => setCName(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="certificateOrg"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Issuing Organization
                          </label>
                          <input
                            id="certificateOrg"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={corg}
                            onChange={(e) => setCOrg(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="credNotExp" className="text-sm">
                          <input
                            type="checkbox"
                            id="credNotExp"
                            className="mr-2 mb-1"
                            checked={cexp}
                            onChange={(e) => setCExp(e.target.checked)}
                          />
                          This credential does not expire.
                        </label>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="certificateIssueDate"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Issue Date
                          </label>
                          <input
                            id="certificateIssueDate"
                            type="date"
                            className="w-full rounded-full border-slate-300"
                            value={cidate}
                            onChange={(e) => setCIDate(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="certificateExpDate"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Expiration Date
                          </label>
                          <input
                            id="certificateExpDate"
                            type="date"
                            className="w-full rounded-full border-slate-300"
                            value={cedate}
                            onChange={(e) => setCEDate(e.target.value)}
                            disabled={cexp}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="certificateCredID"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Credential ID
                          </label>
                          <input
                            id="certificateCredID"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={cid}
                            onChange={(e) => setCId(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="certificateCredURL"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Credential URL
                          </label>
                          <input
                            id="certificateCredURL"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={curl}
                            onChange={(e) => setCUrl(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          onClick={(e) => saveCert(e)}
                          disabled={!verifyCertPopup()}
                        >
                          {loader && (
                            <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          )}
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={educationPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={educationPopupOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Add Education
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => educationPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="eduCourseName"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Course Name
                          </label>
                          <input
                            id="eduCourseName"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={ename}
                            onChange={(e) => setEName(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="eduUnivName"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            University Name
                          </label>
                          <input
                            id="eduUnivName"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={eorg}
                            onChange={(e) => setEOrg(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="eduStartDate"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Start Date
                          </label>
                          <input
                            id="eduStartDate"
                            type="date"
                            className="w-full rounded-full border-slate-300"
                            value={esdate}
                            onChange={(e) => setESDate(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="eduEndDate"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            End Date
                          </label>
                          <input
                            id="eduEndDate"
                            type="date"
                            className="w-full rounded-full border-slate-300"
                            value={eedate}
                            onChange={(e) => setEEDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="eduAbout"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          About
                        </label>
                        <textarea
                          id="eduAbout"
                          className="w-full rounded-[20px] border-slate-300 resize-none min-h-[120px]"
                          value={eabout}
                          onChange={(e) => setEAbout(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          onClick={(e) => saveEdu(e)}
                          disabled={!verifyEduPopup()}
                        >
                          {loader && (
                            <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          )}
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={expPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={expPopupOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Add Experience
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => expPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="expTitle"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Title
                          </label>
                          <input
                            id="expTitle"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={exname}
                            onChange={(e) => setEXName(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="expCompName"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Company Name
                          </label>
                          <input
                            id="expCompName"
                            type="text"
                            className="w-full rounded-full border-slate-300"
                            value={exorg}
                            onChange={(e) => setEXOrg(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <label htmlFor="credNotExp" className="text-sm">
                          <input
                            type="checkbox"
                            id="credNotExp"
                            className="mr-2 mb-1"
                            checked={exexp}
                            onChange={(e) => setEXExp(e.target.checked)}
                          />
                          Currently Working ?
                        </label>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="expType"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Type
                          </label>
                          {/* <input id="expType" type="text" className="w-full rounded-full border-slate-300" value={extype} onChange={(e)=>setEXType(e.target.value)} /> */}
                          <Multiselect
                            options={[
                              "Permanent/Full Time",
                              "Permanent/Contract",
                              "Contract",
                              "Part-Time",
                              "Freelance",
                              ,
                              "Internship",
                            ]}
                            isObject={false}
                            customCloseIcon={
                              <>
                                <i className="fa-solid fa-xmark"></i>
                              </>
                            }
                            showArrow={true}
                            closeOnSelect={true}
                            selectionLimit={1}
                            // selectedValues = {preJobtype && preJobtype.split(',')}
                            onSelect={(selectedList, selectedItem) => {
                              setEXType(selectedItem);
                            }}
                            onRemove={(selectedList, selectedItem) => {
                              setEXType(null);
                            }}
                            placeholder="Find Preferred Job Type"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="expStartDate"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            Start Date
                          </label>
                          <input
                            id="expStartDate"
                            type="date"
                            className="w-full rounded-full border-slate-300"
                            value={exsdate}
                            onChange={(e) => setEXSDate(e.target.value)}
                          />
                        </div>
                        <div className="w-full lg:w-[47%] mb-6">
                          <label
                            htmlFor="expEndDate"
                            className="font-medium mb-2 leading-none inline-block"
                          >
                            End Date
                          </label>
                          <input
                            id="expEndDate"
                            type="date"
                            className="w-full rounded-full border-slate-300"
                            value={exedate}
                            onChange={(e) => setEXEDate(e.target.value)}
                            disabled={exexp}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="expAbout"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          About
                        </label>
                        <textarea
                          id="expAbout"
                          className="w-full rounded-[20px] border-slate-300 resize-none min-h-[120px]"
                          value={exabout}
                          onChange={(e) => setEXAbout(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          onClick={(e) => saveExp(e)}
                          disabled={!verifyExpPopup()}
                        >
                          {loader && (
                            <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          )}
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={achievementsPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={achievementsPopupOpen}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-[30px] bg-[#FBF9FF] text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="leading-none font-semibold text-xl">
                        Add Achievements
                      </h4>
                      <button
                        type="button"
                        className="leading-none"
                        onClick={() => achievementsPopupOpen(false)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                    <div>
                      <div className="mb-6">
                        <label
                          htmlFor="achieveTitle"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          Title
                        </label>
                        <input
                          id="achieveTitle"
                          type="text"
                          className="w-full rounded-full border-slate-300"
                          value={amtitle}
                          onChange={(e) => setAMTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="achieveAbout"
                          className="font-medium mb-2 leading-none inline-block"
                        >
                          About
                        </label>
                        <textarea
                          id="achieveAbout"
                          className="w-full rounded-[20px] border-slate-300 resize-none min-h-[120px]"
                          value={amdesc}
                          onChange={(e) => setAMDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="disabled:opacity-30 disabled:cursor-normal bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] text-white font-bold rounded-full py-2.5 px-6 md:min-w-[200px] transition-all hover:from-[#391188] hover:to-[#391188]"
                          onClick={(e) => saveAchieve(e)}
                          disabled={!verifyAchievePopup()}
                        >
                          {loader && (
                            <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>
                          )}
                          Save
                        </button>
                      </div>
                    </div>
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

export default withAuth(3 * 60)(CandidateProfile);
