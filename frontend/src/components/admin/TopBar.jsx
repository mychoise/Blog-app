import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="text-[#656565] flex overflow-hidden gap-0.5 font-[font4]">
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `pr-4 pl-4 pt-2 pb-2 overflow-hidden cursor-pointer ${
            isActive ? "bg-[#2E2E2E] rounded-[30px] text-white" : ""
          }`
        }
      >
        {({ isActive }) => (
          <motion.div
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 900 }}
          >
            Dashboard
          </motion.div>
        )}
      </NavLink>
      <NavLink
        to="/admin/addBlog"
        className={({ isActive }) =>
          `pr-4 pl-4 pt-2 pb-2 overflow-hidden cursor-pointer ${
            isActive ? "bg-[#2E2E2E] rounded-[30px] text-white" : ""
          }`
        }
      >
        {({ isActive }) => (
          <motion.div
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 900 }}
          >
            Add
          </motion.div>
        )}
      </NavLink>
      <NavLink
        end
        to="/admin/listBlog"
        className={({ isActive }) =>
          `pr-4 pl-4 pt-2 pb-2 overflow-hidden cursor-pointer ${
            isActive ? "bg-[#2E2E2E] rounded-[30px] text-white" : ""
          }`
        }
      >
        {({ isActive }) => (
          <motion.div
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 900 }}
          >
            List
          </motion.div>
        )}
      </NavLink>
      <NavLink
        end
        to="/admin/comment"
        className={({ isActive }) =>
          `pr-4 pl-4 pt-2 pb-2 overflow-hidden cursor-pointer ${
            isActive ? "bg-[#2E2E2E] rounded-[30px] text-white" : ""
          }`
        }
      >
        {({ isActive }) => (
          <motion.div
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 900 }}
          >
            Comment
          </motion.div>
        )}
      </NavLink>
    </div>
  );
};

export default TopBar;
