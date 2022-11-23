import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React from "react";
import { useAuth22 } from "./useStore";

type TSessionProps = {
  session: Session;
};

export function withAuth<P extends object>(refreshInterval?: number) {
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

      return <Component session={session} {...props} />;
    };
  };
}
