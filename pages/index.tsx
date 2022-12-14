import React, { useEffect } from "react";
import Slider from "react-slick";
import Image from 'next/image';
import { withAuth } from "../constants/HOCs";
import slide_1 from 'public/images/homebanner-card-1.png';

function Home(props) {
  const { session } = props;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true
};
  
  return (
    <>
      <main>
        <section className="py-14 bg-white">
          <div className="container flex flex-wrap items-center flex-col-reverse lg:flex-row">
            <div className="w-full lg:max-w-[50%]">
              <div className="w-full max-w-[500px] mx-auto lg:mx-0 text-center lg:text-left">
                <h1 className="text-[#646464] text-5xl font-semibold mb-12">Are You <span className="text-[#60C3E2]">Hiring</span> the Right Talent ?</h1>
                <h2 className="text-[#646464] text-2xl font-semibold relative inline-block mb-12">
                  <span className="relative z-10">
                    <span className="text-black">
                      Discover 
                    </span>
                    , &nbsp;
                    <span className="text-[#6D27F9]">
                      Connect 
                    </span>
                    &nbsp; & &nbsp;
                    <span className="text-[#60C3E2]">
                      Network 
                    </span>
                  </span>
                  <span className="h-30 rounded-[30px] w-full bg-[#D9D9D9] absolute bottom-[-10px] right-[-40px] opacity-20"> &nbsp; </span>
                </h2>
                <p className="font-light text-[#646464] text-lg">Make your job search easier with trackable resumes and enhanced applications.</p>
              </div>
            </div>
            <div className="w-full lg:max-w-[50%]">
              <div className="homebanner_slide sliderArrows">
                <Slider {...settings}>
                  <div>
                  <Image src={slide_1} alt="Slide" className="mx-auto" />
                  </div>
                  <div>
                  <Image src={slide_1} alt="Slide" className="mx-auto" />
                  </div>
                  <div>
                  <Image src={slide_1} alt="Slide" className="mx-auto" />
                  </div>
                  <div>
                  <Image src={slide_1} alt="Slide" className="mx-auto" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </main>
      {session?<>{session.user.email}</>:<></>}
    </>
  )
}

export default withAuth(3 * 60)(Home);