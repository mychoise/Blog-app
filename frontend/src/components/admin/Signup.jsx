import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='w-full h-[70vh] flex items-center justify-center'>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Signup</legend>

 <label className="label">Name</label>
  <input type="text" className="input" placeholder="Name" />


  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" />

  <button className="btn btn-neutral mt-4">Signup</button>
  <p>Already have account?<Link to={'/login'}><span className='text-blue-500 cursor-pointer  underline'>Login=</span></Link></p>
</fieldset>
    </div>
  )
}

export default Signup