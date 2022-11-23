import React from "react";
import { signOut,signIn } from "next-auth/react";
import { withAuth } from "../hooks/HOCs";


function Home(props) {
  const { session } = props;
  return (
    <>
    <section className="py-4">
        <div className="container">
          Homepage
        </div>
      </section>
    {
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
    }
    </>
    // session && (
    // <>
    //   <section className="py-4">
    //     <div className="container">
    //       Homepage
    //     </div>
    //   </section>
    //   Signed in as {session.user.email} <br />
    //     <button onClick={() => signOut()}>Sign out</button>
    //     {session.accessToken && <pre>User has access token</pre>}
    // </>
    // )
  )
}

export default withAuth(3 * 60)(Home);