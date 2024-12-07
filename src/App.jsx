import AdminLayout from "./components/admin-view/Layout"
import AuthLayout from "./components/auth/Layout"
import EmployeeLayout from "./components/employee-view/Layout"
import AdminDashboard from "./pages/admin-view/Dashboard"
import AdminEmployees from "./pages/admin-view/Employees"
import AdminEvaluation from "./pages/admin-view/Evaluation"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"
import { Routes, Route } from "react-router-dom"
import EmployeeDashboard from "./pages/employee-view/Dashboard"
import EmployeeEvaluation from "./pages/employee-view/Evaluation"
import EmployeeReport from "./pages/employee-view/Report"
import CheckAuth from "./components/common/check-auth"
import UnAuthPage from "./pages/unauth-page"


function App() {

  const isAuthanticated = false;
  const user = null;


  return (
    <div className=" flex flex-col overflow-hidden bg-white">

      {/* Common components */}

      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthanticated={isAuthanticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="signup" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}

        <Route path="/admin" element={
          <CheckAuth isAuthanticated={isAuthanticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>

          <Route index element={<AdminDashboard />} />
          <Route path="userlist" element={<AdminEmployees />} />
          <Route path="evaluation" element={<AdminEvaluation />} />
        </Route>
        {/* Employee Routes */}
        <Route path="/employee" element={
          <CheckAuth isAuthanticated={isAuthanticated} user={user}>
            <EmployeeLayout />
          </CheckAuth>
        }>

          <Route index element={<EmployeeDashboard />} />
          <Route path="evaluat" element={<EmployeeEvaluation />} />

          <Route path="report" element={<EmployeeReport />} />

        </Route>

        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>



    </div>
  )
}

export default App
