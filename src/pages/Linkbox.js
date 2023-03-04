import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PUBLIC_API_URL } from '../config/index'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

export default function Linkbox() {
  const links = [
    { name: 'ARIS', url: 'https://aris2.udsm.ac.tz/' },
    { name: 'UDSM TIMETABLE', url: 'https://timetable.udsm.ac.tz/' },
    { name: 'UDSM LMS', url: 'https://lms.udsm.ac.tz/course/index.php?categoryid=2' },
    { name: 'UDSM WEBSITE', url: 'https://www.udsm.ac.tz/' },
    { name: 'DARUSO', url: 'https://udsm.ac.tz/web/index.php/offices/daruso/cabinet' },
    { name: 'SCHOLARSHIP SITE', url: '' },
    { name: 'KAMPUS+ EXPERIENCE', url: 'https://airtable.com/shrWhdOUCyGkN3KrF/embed' },
  ]

  function copyText(url) {
    console.log(url)
    // Copy the text inside the text field
    // navigator.clipboard.writeText(url.value);

    // Alert the copied text
    // alert("Copied the text: " + url.value);
  }

  return (
    <div>
      <Sidebar>
        <div className="container p-2 md:p-6 ">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-4">
            {links.map((link) => (

              <>
                {/* <a href={link.url} className="tooltip" target='blank'> */}
                {/* <div className="tooltiptext">
    ''
    <div className="tooltip-arrow" data-popper-arrow></div>
  </div> */}
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 rounded-full"> {link.name}</div>
                    <div class="flex justify-between">
                      {/* <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2">
       

        </span> */}



                      {/* <span className="w inline-block bg-gray-50 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.getdate}</span> */}


                    </div>

                    <p className="text-gray-700 text-base">
                      {/* {link.name} */}
                    </p>
                    {/* <span className="w inline-block bg-gray-50 rounded-full px-3 py-1 my-3 text-sm font-semibold text-gray-700 mr-2 mb-2">date</span> */}

                  </div>
                  <div className="px-6 pt-4 pb-2">
                    {/* <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.getdate}</span>
      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
                    <div className='flex justify-between'>
                      <span type='button' className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={copyText(link.url)}>Copy link</span>
                      <a href={link.url} className="tooltip" target='blank'>
                        <h5 className='text-sm px-3 py-1 bg-blue-400 rounded-full text-white hover:bg-blue-600'>Visit link</h5>
                      </a>
                    </div>
                  </div>
                </div>
                {/* </a> */}
              </>
            ))
            }

          </div>
          {/* <div className="flex justify-center">
            <button
              onClick={() => setShowModal(true)}
              type="button"
              className="px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl"
            >
              Add Class
            </button>
          </div> */}

          {/* <button type='button' onClick={() => setShowModal(true)} title="Add a class"
            class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl">+</button> */}
        </div>
      </Sidebar>
    </div>
  );
}
