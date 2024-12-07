import React from 'react'
import { Outlet } from 'react-router-dom'
import EmployeeSidebar from './Sidebar'
import EmployeeHeader from './Header'

function EmployeeLayout() {
  return (
    <div className=' min-h-screen flex w-full'>
     {/* Admin Sidebar */}

     <EmployeeSidebar />

     <div className="fle flex-1 flex-col">
        {/* Admin Header */}

        <EmployeeHeader />

        <main className=' flex-1 flex bg-muted/40 p-4 md:p-6'>
            <Outlet />
        </main>
     </div>
    </div>
  )
}

export default EmployeeLayout
