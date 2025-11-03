import React from "react";
import { MoveRight } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import {Plus} from "lucide-react"
import { motion } from 'framer-motion';
import { useAuthStote } from "../store/useAuth";


const Navbar = () => {
  const {authUser} = useAuthStote()
  const navigate  = useNavigate()
  return (
    <div className=" bg-[#0D0D0D]  w-10vw h-[20vh]">
      <div className=" fixed flex z-40 items-center justify-between w-[95.3vw] text-white   h-[10vh] m-5 rounded-2xl bg-[#242424]">
        <Link to="/">
                <h1 className="text-[18px] pl-10 font-[font3] text-white">Threaded</h1>

</Link>

 <motion.div 
 whileHover={{
    rotate:180,
    transition: { type: 'spring', stiffness: 400, damping: 80 },
  }}
 onClick={()=>navigate("/admin")} className=" cursor-pointer">
          <Plus />
        </motion.div>

        <div className="mr-10  -gap-2 bg-[#FFB88F] rounded-[10px] flex items-center cursor-pointer  justify-start ">
          <button onClick={()=>navigate("/login")}  className=" cursor-pointer pt-3 pb-3 text-black font-[font3] p-2 pl-6  pr-6  ">
          {authUser?"Dashboard":"Login"}
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default Navbar;
