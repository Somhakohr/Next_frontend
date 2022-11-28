import React, { useEffect } from "react";
import { signOut,signIn } from "next-auth/react";
import { withAuth } from "../hooks/HOCs";
import { ToastContainer, toast } from 'react-toastify';
import toastcomp from "../components/toast";
import useStore from "../hooks/useStore";


function Home(props) {
  const { session } = props;
  // console.log(session);
  const {router,setUserObj,setUType,axiosInstance,utype} = useStore();
  // useEffect(function () {
  //   console.log("abc", session);
  //   if (session) {
  //     axiosInstance.post('/auth/getuser/', {
  //       email: session.user.email,
  //     }).then(async (response) => {
  //       console.log(response);
  //       if (response.data.user != "no data") {
  //         setUType(response.data.type);
  //         setUserObj(response.data.user);
  //         router.push("/" + utype);
  //       }
  //       else {
  //         setUType('');
  //         setUserObj({});
  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //       setUType('');
  //       setUserObj({});
  //     });
  //   }

  // }, [session]);
  
  return (
    <>
    <section className="py-4">
        <div className="container">
          Homepage
        </div>
      </section>
      {session?<>{session.user.email}</>:<></>}
    {/* {
      session?
      <>
       Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {session.accessToken && <pre>User has access token</pre>}
      </>:
      <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <pre>{"User is not logged in"}</pre>
      </>
    } */}
    </>
  )
}

export default withAuth(3 * 60)(Home);