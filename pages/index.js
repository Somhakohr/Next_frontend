import React from "react";
import { signOut } from "next-auth/react";
import { withAuth } from "../hooks/HOCs";

function Home(props) {
  const { session } = props;
  return (
    session && (
    <>
      <section className="py-4">
        <div className="container">
          Homepage
        </div>
      </section>
      Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {session.accessToken && <pre>User has access token</pre>}
    </>
    )
  )
}

export default withAuth(3 * 60)(Home);