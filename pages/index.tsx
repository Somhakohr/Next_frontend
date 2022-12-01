import React, { useEffect } from "react";
import { signOut,signIn } from "next-auth/react";
import { withAuth } from "../constants/HOCs";
import { ToastContainer, toast } from 'react-toastify';
import toastcomp from "../components/toast";
// import useStore from "../hooks/useStore";
import { useStore } from "../constants/code";
// import { var1 } from "../constants/code";
import shallow from "zustand/shallow";
import axios from "axios";
import { axiosInstance } from "./api/axiosApi";

function Home(props) {
  const { session } = props;

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

  
  
  return (
    <>
    <section className="py-4">
        <div className="container">
          Homepage 
        </div>
        <br/>
      </section>
      {session?<>{session.user.email}</>:<></>}
    </>
  )
}

export default withAuth(3 * 60)(Home);