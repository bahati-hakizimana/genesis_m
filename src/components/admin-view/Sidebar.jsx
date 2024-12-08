import { ChartLine, ChartNoAxesCombined, LayoutDashboard, Settings, Users } from 'lucide-react'
import React, { Fragment } from 'react'
import logo from '../../assets/logo/urwegoLogo.jpeg'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
// import { adminSidebarMenuItems } from '@/config'


 const adminSidebarMenuItems = [
  {
     id: 'dashboard',
     lable: 'Dashboard',
     path: '/admin',
     icon: <LayoutDashboard />,
  },
  {
     id: 'user',
     lable: 'UsersList',
     path: 'userlist' ,
     icon: <Users />,
  },
  {
     id: 'evaluation',
     lable: 'Evaluation',
     path: '/admin/evaluation',
     icon: <ChartNoAxesCombined />,
  },
  {
     id: 'setting',
     lable: 'Settings',
    //  path: '/admin/evaluation',
     icon: <Settings />,
  }
]


function MenuItems({ setOpen }){
  const navigate = useNavigate();
    return <nav className=' mt-8 flex-col flex gap-2  '>

      {
        adminSidebarMenuItems.map(menuItem=> <div key={menuItem.id} onClick={() => 
        {
          navigate(menuItem.path)
          setOpen ?  setOpen(false) : null;
        }
        } className=' flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-blue-400 text-xl hover:text-foreground hover:cursor-pointer'>

          {menuItem.icon}
          <span>{menuItem.lable}</span>

        </div>)
      }

    </nav>
}

function AdminSidebar({open, setOpen}) {

  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className=" w-64">

          <div className=' flex flex-col h-full'>

            <SheetHeader className=" border-b">

              <SheetTitle className=" flex gap-2 mt-4">
              <img src={logo} alt="" className=' w-1/2' />
                <span>Admin Panal</span>
                </SheetTitle>



            </SheetHeader>

            <MenuItems setOpen={setOpen} />

          </div>
        </SheetContent>

      </Sheet>
      <aside className=' hidden w-64 flex-col border-r border-yellow-300 bg-background p-6 lg:flex'>

        <div onClick={() =>navigate("/admin")} className=' flex items-center gap-2 cursor-pointer'>
          {/* <ChartLine /> */}

          <img src={logo} alt="" className=' w-1/2' />
          <h1 className=' font-extrabold text-2xl'>Admin Pernal</h1>
        </div>

        <MenuItems />

      </aside>
    </Fragment>
  )
}

export default AdminSidebar
