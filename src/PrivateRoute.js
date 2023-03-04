import { Navigate,Outlet, useLocation } from 'react-router-dom'
import React from 'react'
//import { useSelector } from 'react-redux'
import {  getSessionCookie } from "./session"

const PrivateRoutes = () => {//getSessionCookie().email
  console.log("datasession", getSessionCookie().email);
  const location =useLocation();
  //const auth = useSelector((state) => state.user.isLoggedIn)
  return getSessionCookie().email ? <Outlet/> :  <Navigate to="/login" state={{from: location}} replace />
//   return !auth ? <Navigate to="/login" /> : <Outlet/>
}
export default PrivateRoutes
