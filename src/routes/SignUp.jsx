import { useState } from 'react'
import { User } from '../util/validation'
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redax/user/actions';

export default function SignUp() {  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [errors, setErrors] = useState(null)
  const [errorUser, setErrorUser] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleSignUp(){
    
    try {
      const user = User.parse({
        email,
        password,
        date: Date.now()
      })
      setErrors(null)
    } catch (error) {
      if(error instanceof z.ZodError){
        setErrors(error?.format())
      }
    }
    
   
    if(errors === null && password === repassword)
    {
      dispatch(setUser({email, password})).then(() => (err) => setErrorUser(err?.toString()), navigate('/') )
    }
  }

  function handleLogin(){
    navigate('/login')
  }

  return (
    
    <div className="prose flex flex-col mx-auto">
      
      <h1 className="mx-auto">Sign Up</h1>

      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} className='mt-4'/>
      {errors?.email && <div className="text-red-400">{errors?.email?._errors}</div>}
      
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='mt-4'/>
      {errors?.password && <div className="text-red-400">{errors?.password?._errors}</div>}
      
      <input placeholder="repeat password" type="password" value={repassword} onChange={(e) => setRePassword(e.target.value)} className='mt-4'/>
      {(password !== repassword) && <div className="text-red-400">Пороли не совпадают</div>}
      {errorUser && <div className="text-red-400">{errorUser}</div>}
      
      <button onClick={handleSignUp} className="bg-gray-400 mx-auto px-10 py-2 mt-4 text-2xl">Sign Up</button>
      <button onClick={handleLogin} className='mb-10'>Log In</button>
  
    </div>
   
  )
}

