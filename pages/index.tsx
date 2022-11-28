import React, { useEffect } from "react";
import { signOut,signIn } from "next-auth/react";
import { withAuth } from "../hooks/HOCs";
import { ToastContainer, toast } from 'react-toastify';
import toastcomp from "../components/toast";
import useStore from "../hooks/useStore";


function Home(props) {
  const { session } = props;
  return (
    <>
    <section className="py-4">
        <div className="container">
          Homepage
        </div>
      </section>
      {session?<>{session.user.email}</>:<></>}
    </>
  )
}

export default withAuth(3 * 60)(Home);