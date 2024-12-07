import React from 'react'
import { Input } from "@/components/ui/input"

function AuthLogin() {
  return (
    <div className=' bg-white px-10 py-20 rounded-3xl border-2 border-orange-300'>
      <h1 className=' text-5xl font-semibold'>Welcome Back</h1>
      <p className=' font-medium text-lg text-gray-500 mt-4'>Please Enter your details</p>
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
            <label for="" className=' text-lg font-medium'>Password</label>
            {/* <input type="password"
              className=' w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder='Enter your Password'
             /> */}

            <Input type="password" placeholder="password" />
          </div>
          <div className=' mt-8 flex justify-between items-center'>
            <div>
              <input type="checkbox" name="" id="" />
              <label className=' ml-2 font-medium text-base' for="rember">Remember for 30 days</label>
            </div>

            <button className=' font-medium text-base text-blue-400'>Forgot password</button>
          </div>
        </div>

        <div className=' mt-8 flex flex-col gap-y-4'>
          <button type='submit' className=' active:scale-[.98] active:duration-75 transition-all bg-blue-400 text-white font-bold py-3 rounded-xl hover:scale-[1.01] hover:bg-blue-800 hover:text-white hover:animate-spin hover:animate-bounce  ease-in-out text-lg'>Sign in</button>
          <button>Sign with Google</button>
        </div>

      </form>
    </div>
  )
}

export default AuthLogin
