import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'

function AdminLayout() {
  return (
    <div className=' min-h-screen flex w-full'>
     {/* Admin Sidebar */}

     <AdminSidebar />

     <div className="fle flex-1 flex-col">
        {/* Admin Header */}

        <AdminHeader />

        <main className=' flex-1 flex bg-muted/40 p-4 md:p-6'>
            <Outlet />
        </main>
     </div>
    </div>
  )
}

export default AdminLayout
