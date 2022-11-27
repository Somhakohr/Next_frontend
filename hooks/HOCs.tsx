import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React,{useState} from "react";
import { useAuth } from "./Hooks";
import useStore, { abc, useAuth22 } from "./useStore";

type TSessionProps = {
  session: Session;
};

export function withAuth<P extends object>(refreshInterval?: number) {
  // const {axiosInstance,setUType,setUserObj,userObj,utype} = useStore();
  /*
    @param { number } refreshInterval: number of seconds before each refresh
  */
  return function (Component: React.ComponentType<P>) {
    return function (props: Exclude<P, TSessionProps>) {
      const { session, loading } = useAuth22(refreshInterval);

      // if (typeof window !== undefined && loading) {
      //   return null;
      // }

      // if (!loading && !session) {
      //   return (
      //     <>
      //       Not signed in <br />
      //       <button onClick={() => signIn()}>Sign in</button>
      //       <pre>{"User is not logged in"}</pre>
      //     </>
      //   );
      // }

      if (session) {
        // abc(session.user.email)
        // axiosInstance.post('/auth/login/', {
        //     email: session.user.email,
        // }).then(async (response)=>{
        //   if(response.data.user != "no data"){
        //     setUType(response.data.type)
        //     setUserObj(response.data.user)
        //   }
        //   else{
        //     setUType('');
        //     setUserObj({});
        //   }
        // }).catch((err)=>{
        //   setUType('');
        //   setUserObj({});
        // });
      }

      return <Component session={session} {...props} />;
    };
  };
}
