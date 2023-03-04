import './App.css'
import { Routes, BrowserRouter as Router, Route, Navigate, BrowserRouter as Switch } from 'react-router-dom'
import React from 'react'
import PrivateRoutes from './PrivateRoute'
import Linkbox from './pages/Linkbox'
import Register from './pages/Register'
import Assignments from './pages/Assignments'
import Appointments from './pages/Appointments'
import Announcements from './pages/Announcements'
import Settings from './pages/Settings'
import Classes from './pages/Classes'
import ClassSlug from './pages/classes/Slug'
import ClassDetailSlug from './pages/classes/DetailSlug'
import Login from './pages/Login'
import Home from './pages/Home'
// import { Navigate,Outlet } from 'react-router-dom'
import {  getSessionCookie } from "./session"

const App = () => {
  return (
    <Router>
      <Routes>
       {/* { getSessionCookie().email? */}
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home/>} exact />
          <Route path="/assignments" element={<Assignments />}  />
          <Route path="/appointments" element={<Appointments />}  />
          <Route path="/announcements" element={<Announcements />}  />
          <Route path="/settings" element={<Settings />}  />
          <Route path="/linkbox" element={<Linkbox />}  />
          <Route path="/classes" element={<Classes />}  />
          <Route path="/classes/:slug" element={<ClassSlug />}  />
          <Route
            path="/classes/:slug/:detailslug"
            element={<ClassDetailSlug />}
            
          />
          {/* <Redirect from="/login" to="/" /> */}
        </Route>
        <Route>
          <Route path="/login" element={<Login/>}  />
          {/* <Navigate to="/login"/> */}
        <Route path="/register" element={<Register />}  />
        </Route>
          
        
      </Routes>
    </Router>
  )
}
export default App
