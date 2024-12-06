import AuthLayout from "./components/auth/Layout"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"
import { Routes, Route } from "react-router-dom"

 
function App() {
  

  return (
  <div className=" flex flex-col overflow-hidden bg-white">

    {/* Common components */}

    <Routes>
      <Route path="/auth" element={ <AuthLayout />}>
      <Route path="login" element={<AuthLogin />} />
      <Route path="signup" element={<AuthRegister />} />
      </Route>
    </Routes>

  </div>
  )
}

export default App
