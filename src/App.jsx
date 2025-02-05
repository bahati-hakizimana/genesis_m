import AdminLayout from "./components/admin-view/Layout"
import AuthLayout from "./components/auth/Layout"
import EmployeeLayout from "./components/employee-view/Layout"
import AdminDashboard from "./pages/admin-view/Dashboard"
import AdminEmployees from "./pages/admin-view/Books"
import AdminEvaluation from "./pages/admin-view/LectureNotes"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"
import { Routes, Route } from "react-router-dom"
import EmployeeDashboard from "./pages/employee-view/Dashboard"
import EmployeeEvaluation from "./pages/employee-view/Evaluation"
import EmployeeReport from "./pages/employee-view/Report"
import CheckAuth from "./components/common/check-auth"
import UnAuthPage from "./pages/unauth-page"
import ForgetPassword from "./pages/auth/ForgetPassword"
import Books from "./pages/admin-view/Books"
import LectureNotes from "./pages/admin-view/LectureNotes"
import Exams from "./pages/admin-view/Exams"
import Payments from "./pages/admin-view/Payments"
import UsersList from "./pages/admin-view/UsersList"
import CreateBooks from "./pages/admin-view/CreateBooks"
import ViewBooksDetails from "./pages/admin-view/ViewBooksDetails"
import Lessons from "./pages/admin-view/Lessons"
import CreateLesson from "./pages/admin-view/CreateLesson"
import AddNotes from "./pages/admin-view/AddNotes"
import CreateExams from "./pages/admin-view/CreateExams"
import ViewExamDetails from "./pages/admin-view/ViewExamDetails"
import AddTeachersNotes from "./pages/admin-view/AddTeachersNotes"


function App() {

//  const isAuthanticated = true;
//  const user ={

//   name:"bahati",
//   role:"admin"

//  }
  return (
    <div className=" flex flex-col overflow-hidden bg-white">

      {/* Common components */}

      <Routes>
        <Route path="/" element={
            <AuthLayout />
          
        }>
          <Route index element={<AuthLogin />} />
          <Route path="signup" element={<AuthRegister />} />
          <Route path="forgetpassword" element={<ForgetPassword />} />
        </Route>

        {/* Admin Routes */}

        <Route path="/admin" element={
          
            <AdminLayout />
          
        }>

          <Route index element={<AdminDashboard />} />
          <Route path="userlist" element={<UsersList />} />
          <Route path="evaluation" element={<AdminEvaluation />} />
          <Route path="books" element={<Books />} />
          <Route path="notes" element={<LectureNotes />} />
          <Route path="exams" element={<Exams />} />
          <Route path="payments" element={<Payments />} />
          <Route path="createbook" element={<CreateBooks />} />
          <Route path="createlesson" element={<CreateLesson />} />
          <Route path="addnotes" element={<AddNotes />} />
          <Route path="createexam" element={<CreateExams />} />
          <Route path="createnotes" element={<AddTeachersNotes />} />

          <Route path="books/:id" element={<ViewBooksDetails />} />
          <Route path="exams/:id" element={<ViewExamDetails />} />
          <Route path="lessons" element={<Lessons />} />
        </Route>
        {/* Employee Routes */}
        <Route path="/employee" element={
         
            <EmployeeLayout />
      
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
