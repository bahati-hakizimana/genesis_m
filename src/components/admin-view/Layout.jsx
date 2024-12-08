import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'

function AdminLayout() {

  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className=' min-h-screen flex w-full'>
     {/* Admin Sidebar */}

     <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />

     <div className="fle flex-1 flex-col">
        {/* Admin Header */}

        <AdminHeader open={openSidebar} setOpen={setOpenSidebar} />

        <main className=' flex-1 flex bg-muted/40 p-4 md:p-6'>
            <Outlet />
        </main>
     </div>
    </div>
  )
}

export default AdminLayout
