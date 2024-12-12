import { AlignJustify, LogOut } from 'lucide-react'
import { Button } from '../ui/button'

function AdminHeader({ setOpen }) {
  return (
    <header className=' flex items-center justify-between px-4 py-3 bg-background border-b '>

      <Button onClick={() =>setOpen(true)} className=' bg-blue-300 hover:bg-blue-300 hover:border hover:border-yellow-300 lg:hidden sm:block'>
         <AlignJustify />
         <span className=' sr-only'>Toggle menu</span>
      </Button>

      <div className=' flex flex-1 justify-end'>
        <Button className="bg-blue-300 inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow hover:border-2 hover:border-yellow-300 hover:bg-blue-300">
          <LogOut />
          Logout
          </Button>
      </div>

    </header>
  )
}

export default AdminHeader
