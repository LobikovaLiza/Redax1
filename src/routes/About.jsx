import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectUser } from "../redax/user/selectors"


export default function About() {
  const  user = useSelector(selectUser)
  const date = new Date(user.id)
  return (
    
    <div className="prose flex flex-col mx-auto">
        <h1 className="mx-auto text-2xl" >About me</h1>
        <div className="mx-auto">Email: {user.email}</div>
        <div className="mx-auto">Date sign up: {date.toLocaleDateString()}</div>
        
        <Link
          to="/notes"
          className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-xl mb-10"
        >
          Go Notes
        </Link>
    </div>
  )
}

