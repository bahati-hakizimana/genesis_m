import React, { useState } from 'react'
import { Input } from "@/components/ui/input"

function AuthRegister() {


  const [formData, setFormData] = useState('');


  const handleSubmitt = async(e) =>{
    e.prevent
  }
  return (
    <div className=' bg-white px-10 py-20 rounded-3xl border-2 border-orange-300'>
      <h1 className=' text-5xl font-semibold'>Welcome !!</h1>
      <p className=' font-medium text-lg text-gray-500 mt-4'>Please Create an account</p>
      <form action="">
        <div className=' mt-8'>
          <div>
            <label for="" className=' text-lg font-medium'>Email</label>
            <Input type="email" placeholder="Email" />
            {/* <input type="email"
              className=' w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Enter your Email'
             /> */}
          </div>
          <div>
            <label for="" className=' text-lg font-medium'>First Name</label>
            <Input type="text" placeholder="First Name" />
            {/* <input type="text"
              className=' w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Enter your First Name'
             /> */}
          </div>
          <div>
            <label for="" className=' text-lg font-medium'>LastName</label>
            <Input type="text" placeholder="Last Name" />
            {/* <input type="text"
              className=' w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Enter your Last Name'
             /> */}
          </div>
          <div>
            <label for="" className=' text-lg font-medium'>Password</label>
            <Input type="password" placeholder="Password" />
            {/* <input type="password"
              className=' w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Enter your Password'
             /> */}
          </div>
          <div>
            <label for="" className=' text-lg font-medium'>ConfirmPassword</label>
            {/* <input type="password"
              className=' w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Re-enter your Password'
             /> */}

            <Input type="password" placeholder="Confirm Password" />
          </div>
        </div>

        <div className=' mt-8 flex flex-col gap-y-4'>
          <button type='submit' className=' active:scale-[.98] active:duration-75 transition-all bg-blue-300 text-white font-bold py-3 rounded-xl hover:scale-[1.01] hover:bg-blue-800 hover:text-white hover:animate-spin hover:animate-bounce  ease-in-out text-lg'>Sign up</button>
        </div>

      </form>
    </div>
  )
}

export default AuthRegister
