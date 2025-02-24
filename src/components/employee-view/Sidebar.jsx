import { ChartLine, ChartNoAxesCombined, ClipboardPlus, LayoutDashboard, Settings, Users } from 'lucide-react'
import React, { Fragment } from 'react'
import logo from '../../assets/logo/logo1.png'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
// import { employeeSidebarMenuItems } from '@/config'


 const employeeSidebarMenuItems = [
  {
     id: 'dashboard',
     lable: 'Dashboard',
     path: '/employee',
     icon: <LayoutDashboard />,
  },
  {
     id: 'evaluate',
     lable: 'Evaluate',
     path: 'evaluat' ,
     icon: <Users />,
  },
  {
     id: 'report',
     lable: 'Reporting',
     path: '/employee/report',
     icon: <ClipboardPlus />,
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
        employeeSidebarMenuItems.map(menuItem=> <div key={menuItem.id} onClick={() => 
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

function EmployeeSidebar({open, setOpen}) {

  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className=" w-64">

          <div className=' flex flex-col h-full'>

            <SheetHeader className=" border-b">

              <SheetTitle className=" flex gap-2 mt-4">
              <img src={logo} alt="" className=' w-1/2' />
                <span>Employee Panal</span>
                </SheetTitle>



            </SheetHeader>

            <MenuItems setOpen={setOpen} />

          </div>
        </SheetContent>

      </Sheet>
      <aside className=' hidden w-64 flex-col border-r border-yellow-300 bg-background p-6 lg:flex'>

        <div onClick={() =>navigate("/employee")} className=' flex items-center gap-2 cursor-pointer'>
          {/* <ChartLine /> */}

          <img src={logo} alt="" className=' w-1/2' />
          <h1 className=' font-extrabold text-2xl'>Employee Panal</h1>
        </div>

        <MenuItems />

      </aside>
    </Fragment>
  )
}

export default EmployeeSidebar

