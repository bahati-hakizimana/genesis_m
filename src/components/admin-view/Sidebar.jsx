import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { BookOpen, BookCheck, BookOpenText, BadgeDollarSign, Users, LayoutDashboard, Settings } from 'lucide-react';
import logo from '../../assets/logo/GenesisOfficialLogo.png';

const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    lable: 'Dashboard',
    path: '/admin',
    icon: <LayoutDashboard />,
  },
  {
    id: 'lessons',
    lable: 'Lessons',
    path: '/admin/lessons',
    icon: <BookOpen />,
  },
  {
    id: 'books',
    lable: 'Books',
    path: '/admin/books',
    icon: <BookOpen />,
  },
  {
    id: 'payments',
    lable: 'Payments',
    path: '/admin/payments',
    icon: <BadgeDollarSign />,
  },
  // {
  //   id: 'user',
  //   lable: 'UsersList',
  //   path: 'userlist',
  //   icon: <Users />,
  // },
  {
    id: 'notes',
    lable: 'LectureNotes',
    path: '/admin/notes',
    icon: <BookOpenText />,
  },
  {
    id: 'exams',
    lable: 'Exams',
    path: '/admin/exams',
    icon: <BookCheck />,
  },
  {
    id: 'setting',
    lable: 'Settings',
    path: '/admin/settings', // Make sure path is correct
    icon: <Settings />,
  }
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();  // To get current URL path

  const getActiveClass = (menuItemPath) => {
    // Compare current path with menu item path
    return location.pathname === menuItemPath ? 'bg-blue-300 text-white' : 'text-muted-foreground hover:bg-blue-300 hover:text-white';
  };

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map(menuItem => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen && setOpen(false);
          }}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xl cursor-pointer ${getActiveClass(menuItem.path)}`}
        >
          {menuItem.icon}
          <span>{menuItem.lable}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-4">
                <img src={logo} alt="" className="w-1/2" />
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r border-yellow-300 bg-background p-6 lg:flex">
        <div onClick={() => navigate("/admin")} className="flex items-center gap-2 cursor-pointer">
          <img src={logo} alt="" className="w-1/2" />
          <h1 className="font-extrabold text-2xl">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
