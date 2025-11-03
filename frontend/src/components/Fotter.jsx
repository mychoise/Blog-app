import React from 'react'

const Fotter = () => {
  return (
    <div className=' bg-[#0D0D0D] '>
      <div className='bg-[]'>
 <div className='m-5 flex flex-col items-center justify-center rounded-[50px] h-[50vh]  w-[98vw] bg-[url(./assets/bg.png)]'>
        <h1 className='text-8xl mt-2 overflow-hidden h-[20vh] font-[font2] text-white'>
          Stay in the loop
        </h1>

           <div className="mt-2 overflow-hidden ">
           <form  >
        <input
  type="text"
  placeholder="Your email "
  className="px-4 text-white z-10 w-70 font-[font3] text-[14px] h-12 py-2 bg-[#242424] rounded-md border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none hover:border-none"
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
     
    </div>
  )
}

export default Fotter