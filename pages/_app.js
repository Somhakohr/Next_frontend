import '../styles/globals.css'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>Somhako</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
