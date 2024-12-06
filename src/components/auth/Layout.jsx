import { Outlet } from "react-router-dom"
import logo from '../../assets/logo/urwegoLogo.jpeg'

function AuthLayout() {
    return (
        <div className=" flex min-h-screen w-full">

            <div className="hidden relative lg:flex items-center justify-center bg-blue-950 w-1/2 px-12">

            <div className=" w-60 h-60 bg-gradient-to-tr from-violet-500 to bg-orange-400 rounded-full animate-spin animate-bounce">

                <img src={logo} alt="" />
                
            </div>

            <div className=" w-full h-1/2 bg-blue-400 backdrop-blur-lg absolute bottom-0" />

                {/* <div className=" max-w-md space-y-6 text-center text-primary-foreground">

                    <h1 className=" text-4xl font-extrabold tracking-tight">Welcome to Perfomance track</h1>
                </div> */}
            </div>

            <div className=" flex flex-1 items-center justify-center bg-gray-400 px-4 py-12 sm:px-6 lg:px-8" >
                <Outlet />
            </div>

        </div>
    )
}

export default AuthLayout
