import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/header';
import Footer from '../components/footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
// import AuthProvider from '../context/AuthContext/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
          <title>Somhako</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer />
      <Header {...pageProps} router={router}/>
      <Component {...pageProps} router={router} />
      <Footer />
    </>
  )
}

export default MyApp