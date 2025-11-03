import React from 'react'
import TopBar from "../../components/admin/TopBar"
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='bg-[#0D0D0D] p-20 pt-5 h-screen'>
      <TopBar/>
      <Outlet/>
    </div>
  )
}

export default Layout