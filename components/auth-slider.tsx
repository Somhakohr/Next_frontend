import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import slide_1 from "../public/images/slide-1.png";
import slide_2 from "../public/images/slide-2.png";
import slide_3 from "../public/images/slide-3.png";
import slide_4 from "../public/images/slide-4.png";

export default function AuthSlider() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
      <div className="bg-white shadow-normal rounded-[30px] mx-auto max-w-[500px] lg:max-w-[100%] py-4 px-8 pb-14">
        <Slider {...settings}>
          <div>
            <Image src={slide_1} className="w-full" alt="Slide 1" />
          </div>
          <div>
            <Image src={slide_2} className="w-full" alt="Slide 2" />
          </div>
          <div>
            <Image src={slide_3} className="w-full" alt="Slide 3" />
          </div>
          <div>
            <Image src={slide_4} className="w-full" alt="Slide 4" />
          </div>
        </Slider>
      </div>
    </>
  );
}
