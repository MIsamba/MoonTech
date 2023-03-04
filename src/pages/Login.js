import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { login } from '../feature/userSlice'
//import { user } from '../user'
import { Link,Navigate,useLocation,useNavigate } from 'react-router-dom'
//import { SpinnerCircular } from 'spinners-react';
import {  setSessionCookie } from "../session";


// function validateLogin(username, password) {
//   for (let i = 0; i < user.length; i++) {
//     if (user[i].username === username && user[i].password === password) {
//       return true
//     }
//   }
//   return false
// }

export default function Login() {
  const [loader, setLoader] = useState(false)
  //let navigate = useNavigate()
  // const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const location =useLocation();
  const from = location.state?.pathname || "/";

//   const dispatch = useDispatch()

  const handleLogin = async (e) => {
    setLoader(true)
    e.preventDefault()


    
    try {
      const res = await fetch(`https://kampusplusdev.xyz/path/tech/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
          //'Content-Type': 'application/json',
          
        }
      })
      

      const data = await res.json()
      console.log("return",data)

      if (res.status === 200) {
         var obj = data.filter(o => o.email === email && o.password === password) ;
        if(obj.length < 1){
          setLoader(false)
         alert('Wrong email and password')
        }
        else{
             setLoader(false)
            setSessionCookie({ email });
            console.log("success")
            //window.location.reload()
            
              navigate(from,{replace:true});
            
            
            // window.location.replace('/')
        }
      } else {
         setLoader(false)
         alert('something went wrong')
      }
    } catch (err) {
        setLoader(false)
        alert('Check your internet connection')
    }
//     const res = await dispatch(login({ email, password }))
//     if (res.type === 'account/login/fulfilled') {
//       navigate('/register')
//       setLoader(false)
//     } else {
//             navigate('/')
      
      //alert('Wrong email and password')

//       setLoader(true)
//     }
  }
  return (
    <section className={'relative bg-white h-screen'}>
      <div className={'h-full  flex  justify-center items-center'}>
        <div className={'w-full max-w-lg  flex  justify-center'}>
          <div className={'leading-loose'}>
            {/* <form
              onSubmit={(e) => handleLogin(e)}
              className={
                'max-w-sm m-4 p-10 bg-white rounded-2xl my-10 border shadow-2xl'
              }
            > */}
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center mb-4 text-[#21CAFF] font-bold text-3xl py-5">
                kampus+
              </div>
            </div>

            <div className="mt-2">
              <input
                className="w-full px-5 py-1  focus:outline-none bg-transparent border rounded shadow-sm text-black"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                // value={email}
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="mt-2">
              <input
                className="w-full px-5 py-1  focus:outline-none bg-transparent border rounded shadow-sm text-black"
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                // value={password}
                autoComplete="off"
                required
              />
            </div>

            <div className={'mt-4 flex justify-center'}>
              {loader ? (
                <button
                  className={
                    'px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl'
                  }
                  type="submit"
                >
                  Processing
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className={
                    'px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl'
                  }
                  type="submit"
                >
                  Login
                </button>
              )}
            </div>
            <p className="flex justify-center text-gray-400">Or</p>
            <div className="text-center">
              <Link to="/register">


                Create Account

              </Link>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </section>
  )
}
