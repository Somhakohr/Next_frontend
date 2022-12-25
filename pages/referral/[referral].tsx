import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import axios from 'axios';
import toastcomp from "../../components/toast";


export default function JobDetail() {
    
  const { asPath } = useRouter();
  const router = useRouter();
  const [code, setcode] = useState("");
  useEffect(() => {
    if(asPath.substring(1).split("/")[1]){setcode(asPath.substring(1).split("/")[1])}
    else{router.push("/")}
  });
  const axiosInstance2 = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BACKEND_BASE : process.env.NEXT_PUBLIC_DEV_BACKEND_BASE,
    timeout: 5000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  async function Refer() {
    await axiosInstance2
      .get("/auth/main_view/" + code + "/")
      .then(async (res) => {
        toastcomp("Refer Valid & Now Register Yourself AS Candidate", "success");
        router.push("/auth/signup/")
      })
      .catch((err) => {
        if (err.message != "Request failed with status code 401") {
          toastcomp("Refer Not Valid", "error");
          router.push("/")
        }
        console.log(err);
      });
  }

  useEffect(() => {
    if(code.length>0){
        console.log("code",code)
        Refer()
    }
  }, [code])
  

return (
    <>
    <main className="py-8">
            <section className="container">

            HELLO

            </section>
    </main>
    
    </>
  )
}
 