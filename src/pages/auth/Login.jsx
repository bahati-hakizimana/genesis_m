import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthLogin() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email_or_phone: emailOrPhone,
      password: password,
    };

    try {
      const response = await fetch("https://api.genesisonlineschool.rw/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.id); 

        
        if (data.user.is_admin) {
          navigate("/admin"); 
        } else {
          navigate("/admin"); 
        }
      } else {
        toast.error(data.message || "Invalid credentials!");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-orange-300">
      <ToastContainer />
      <h1 className="text-5xl font-semibold">Welcome Back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Please enter your details
      </p>
      <form onSubmit={handleLogin}>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">Email or Phone</label>
            <Input
              type="text"
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Remember for 30 days
              </label>
            </div>
            <Link
              to="/auth/forgetpassword"
              className="font-medium text-base text-cyan-400"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-cyan-400 text-white font-bold py-3 rounded-xl hover:scale-[1.01] hover:bg-blue-800 transition-all text-lg"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthLogin;
