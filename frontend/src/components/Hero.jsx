import React from "react";
import { gsap } from "gsap";
import Bloglist from "./BlogList";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import Fotter from "./Fotter";
gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  return (
    <div className="hello bg-[#0D0D0D] h-screen w-screen">
      <div className="h-screen hhh z-10 bg-[#0D0D0D] w-screen">
        <div className="fixed  w-full bg-[#0D0D0D] h-full flex justify-center items-center flex-row  text-white">
          <h1 className="absolute w-[59vw] leading-20 left-80 top-20 h-[30vh] overflow-hidden text-[83px] font-[font2] ">
            &nbsp; Stories, thoughts and reflection about design
          </h1>
          <div className="mt-9 overflow-hidden ">
           <form  >
        <input
  type="text"
  placeholder="Your email "
  className="px-4 z-10 w-70 font-[font3] text-[14px] h-12 py-2 bg-[#242424] rounded-md border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none hover:border-none"
/>
<button className="mr-10 z-10 -gap-2 bg-[#FFB88F] rounded-[10px] cursor-pointer pt-3 pb-3 text-black font-[font1] p-3 pl-4 text-[14px] pr-4 shadow-[-19px_-14.5px_0px_16px_rgb(36,36,36)]">
  Subscribe
</button>
        </form>
        <h1 className=" z-10 text-[#6F6F6F] text-center font-[font3] mt-4 text-[14px]">
          No spam, just certified good stuff
        </h1>
        </div>
        </div>
       
      </div>

      <div className=" absolute overflow-hidden bg-[#0D0D0D] z-30 reddd">
        <Bloglist />
          <Fotter/>

      </div>

    </div>
  );
};

export default Hero;
