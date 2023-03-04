import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PUBLIC_API_URL } from '../config/index'
import { Link } from 'react-router-dom'
import { logout } from '../feature/userSlice'
import * as Cookies from "js-cookie";

export default function Sidebar({ children }) {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user.isLoggedIn)
  const logoutHandler = () => {
    dispatch(logout())
    Cookies.remove("session");
    window.location.reload()
  }

  // const PUBLIC_API_URL = "https://nextdjango.herokuapp.com"
  const default_profile_pic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector((state) => state.user)
  const sideLink = [
    { link: '/', label: 'Calendar' },
    { link: '/classes', label: 'Classes' },
    { link: '/appointments', label: 'Appointments' },
    { link: '/assignments', label: 'Assignments' },
    { link: '/announcements', label: 'Announcements' },
    { link: '/settings', label: 'Settings' },
    { link: '/linkbox', label: 'Linkbox' },
  ]

  return (
    <div
      className={`min-h-screen  flex flex-col flex-auto flex-shrink-0 antialiased bg-white`}
    >
      <div className="bg-[#040404E0] md:hidden flex items-center justify-end  py-6 px-8 space-x-6">
        <div className="text-[#21CAFF] font-bold mr-auto text-xl">kampus+</div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="md:hidden inline-flex items-center justify-center text-white"
          aria-expanded="false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="">
        <div className="bg-[#040404E0] hidden md:fixed md:flex md:flex-col w-64 md:h-full">
          <div className="flex items-center justify-center mb-4 text-[#21CAFF] font-bold text-xl py-5">
            kampus+
          </div>
          <div className="flex items-center justify-center mb-4">
            {user != null ? (
              <>
                {(() => {
                  if (user.user.role === 'admin') {
                    ;<>
                      <img
                        src="/avator.png"
                        alt="avator"
                        className="rounded-full h-36 w-36"
                      />
                    </>
                  } else if (user.user.role === 'teacher') {
                    return (
                      <>

                      {
                        user.data.profile == null ?
                        <img src={default_profile_pic} alt='image' className="rounded-full h-36 w-36"/>:
                          <img src={PUBLIC_API_URL +'/'+ user.data.profile} alt={user.data.surname} className="rounded-full h-36 w-36"
                          />
                      }
                        
                      </>
                    )
                  }
                })()}
              </>
            ) : (
              <>
                <img
                  src="/avator.png"
                  alt="avator"
                  className="rounded-full h-36 w-36"
                />
              </>
            )}
          </div>
          <div className="flex items-center justify-center mb-4 text-[#ffffff] font-bold text-xl py-5">
            {user != null ? (
              <>
                {(() => {
                  if (user.user.role === 'admin') {
                    return <div className="capitalize">{user.user.role}</div>
                  } else if (user.user.role === 'teacher') {
                    return <div className="capitalize">{user.data.surname}</div>
                  }
                })()}
              </>
            ) : (
              ''
            )}
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col  space-y-1">
              {sideLink.map((e) => (
                <li key={e}>
                  <div className="px-0">
                    <span className="text-md tracking-wide text-left">
                      <Link to={e.link}>
                        <a
                          className={
                            window.location.pathname == `${e.link}`
                              ? 'transition duration-400 ease-in bg-[#4e96ffa6] text-[#ffffff]  relative flex flex-row items-center px-5 h-11 focus:outline-none font-bold'
                              : 'transition duration-400 ease-in text-white hover:bg-[#4e96ffa6] hover:text-[#ffffff]  relative flex flex-row items-center px-5 h-11 focus:outline-none font-bold'
                          }
                        >
                          {e.label}
                        </a>
                      </Link>
                    </span>
                  </div>
                </li>
              ))}
              <li>
                <div className="px-0">
                  <span className="text-md tracking-wide text-left">
                    <button
                      onClick={logoutHandler}
                      className={
                        'transition duration-400 ease-in  text-[#FC0000]  relative flex flex-row items-center px-5 h-11 focus:outline-none font-bold'
                      }
                    >
                      Logout
                    </button>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        </div>

        {/* mobile menu */}
        <div className="md:hidden">
          {isOpen ? (
            <>
              <div>
                <ul className="flex flex-col  space-y-1 bg-[#040404E0]">
                  {sideLink.map((e) => (
                    <li key={e}>
                      <div className="px-2 pb-1">
                        <span className="text-md tracking-wide text-center">
                          <Link to={e.link}>
                            <a
                              className={
                                window.location.pathname == `${e.link}`
                                  ? 'transition duration-400 ease-in bg-white text-[#040404E0] rounded-md relative flex flex-row items-center justify-center h-11 focus:outline-none font-bold'
                                  : 'transition duration-400 ease-in text-white hover:bg-white hover:text-[#040404E0] rounded-md relative flex flex-row items-center justify-center h-11 focus:outline-none font-bold'
                              }
                            >
                              {e.label}
                            </a>
                          </Link>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* mobile menu */}
        <div className="mt-1">
          <div className="m-1 md:pl-64 ">{children}</div>
        </div>
      </div>
      )
}
