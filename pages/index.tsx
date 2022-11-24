import React from "react";
import { signOut,signIn } from "next-auth/react";
import { withAuth } from "../hooks/HOCs";
import { ToastContainer, toast } from 'react-toastify';
import toastcomp from "../components/toast";


function Home(props) {
  const { session } = props;
  
  const notify = () => toastcomp("abc","error");
  const notify2 = () => signIn('credentials', { redirect: false, password: 'Admin@001',email: 'npdoshi3@gmail.com', })
  const notify3 = () => signIn('google',{ redirect: false })
  return (
    <>
    <section className="py-4">
        <div className="container">
          
        <button onClick={notify3}>Notify !</button>
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
  )
}

export default withAuth(3 * 60)(Home);