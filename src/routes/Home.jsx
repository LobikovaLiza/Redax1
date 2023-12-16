import { NavLink, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserEmail } from "../redax/user/selectors"


export default function Home() {
  const  email = useSelector(selectUserEmail)
  return (
    
    <div>
      <header className='flex justify-between'>
        <div className='text-xl'>Hello, {email}</div>
        <div className='flex justify-between gap-4 text-xl'>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "black" : "text-gray-400"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            isActive ? "black" : "text-gray-400"
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="/login"
          className="text-gray-400"
        >
          Log out
        </NavLink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
      
    </div>
  )
}

