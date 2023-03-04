import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PUBLIC_API_URL } from '../config/index'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

export default function Classes() {
  const history = useNavigate()
  const [data, setData] = useState([])

  // Simple Loading indicator
  const [loader, setLoader] = useState(true)

  const fetchClasses = () => {
    axios
      .get(`${PUBLIC_API_URL}/path/sessions/`)
      .then((res) => {
        setData(res.data)
        setLoader(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchClasses()
  }, [])
  const [formData, setFormData] = useState({})
  const [showModal, setShowModal] = useState(false)

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const loading = false

  const onSubmitDelete = async (e) => {
    e.preventDefault()
    var id = e.target.id.value
    axios
      .post(`${PUBLIC_API_URL}/path/sessionview/${id}/`)
      .then((res) => {
        fetchClasses()
        history('/classes')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    axios
      .post(`${PUBLIC_API_URL}/path/sessionview/`, formData)
      .then((res) => {
        fetchClasses()
        alert('Class Added')
        setShowModal(false)
        history('/classes')

      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div>
      <Sidebar>
        {showModal ? (
          <>
            <div className="bg-black bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5  rounded-t ">

                    <h1 className='text-2xl'>Add a class</h1>
                    {/* <button
                      className="bg-transparent border-0 text-grey-400 float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-gray-500 opacity-7 h-8 w-8 text-xl block bg-gray-200 py-0 rounded-full">
                        x
                      </span>
                    </button> */}
                    <button onClick={() => setShowModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span class="sr-only">Close modal</span>
                    </button>


                  </div>
                  <div className="relative flex-auto">
                    <form
                      className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full"
                      onSubmit={onSubmit}
                    >
                      <input
                        placeholder="Tutor"
                        className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                        name="tutor"
                        onChange={onChange}
                      />
                      <div className=" flex flex-wrap mt-3">
                        <div className="w-1/3 pr-2 py-1">
                          <input
                            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-black"
                            placeholder="Course Name"
                            name="course_name"
                            onChange={onChange}
                          />
                        </div>
                        <div className="w-1/3 py-1 pr-2">
                          <input
                            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-black"
                            placeholder="Course Code"
                            name="course_code"
                            onChange={onChange}
                            type="number"
                          />
                        </div>
                        <div className="w-1/3 py-1">
                          <input
                            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-black"
                            placeholder="Venue"
                            name="venue"
                            onChange={onChange}
                          />
                        </div>
                        <div className="w-1/3 pr-2 py-1">
                          <input
                            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-black"
                            placeholder="Phone Number"
                            name="phone_no"
                            onChange={onChange}
                            type="number"
                          />
                        </div>
                        <div className="w-1/3 pr-2 py-1">
                          <input
                            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-black"
                            placeholder="Assistance Tutor"
                            name="assistance_tutor"
                            onChange={onChange}
                          />
                        </div>
                        <div className="w-1/3 py-1">
                          <input
                            className="bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-black"
                            placeholder="Total Students"
                            name="total_students"
                            onChange={onChange}
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6 rounded-b">
                        <button
                          className="px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl"
                          type="submit"
                        // onClick={() => setShowModal(false)}
                        >
                          Upload
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className="container p-2 md:p-6 ">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-4">
            {
              loader == true ?
                <div style={{ paddingLeft: "40vw", paddingTop: "40vh" }}>
                  <div className="flex justify-center items-center">
                  <Loader />
                  </div>
                </div> :
                data.map((e) => (
                  <>

                    <a href={`classes/${e.course_name}`} className="tooltip">
                      <div className="tooltiptext">
                        {e.course_name}
                        {/* <div className="tooltip-arrow" data-popper-arrow></div> */}
                      </div>
                      <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" /> */}
                        <div className="px-6 py-4">
                          {/* <div className="font-bold text-xl mb-2 rounded-full">{e.course_name}</div> */}
                          <div class="flex justify-between">
                            <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-xl font-semibold text-gray-700 mr-2 mb-2">
                              {
                                (e.course_name).length > 20 ? `${e.course_name.substring(0, 16)}...` : e.course_name
                              }
                              {/* {e.course_name} */}

                            </span>



                            {/* <span className="w inline-block bg-gray-50 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.getdate}</span> */}


                          </div>

                          <p className="text-gray-700 text-base">
                            {e.total_students} Students
                          </p>
                          <span className="w inline-block bg-gray-50 rounded-full px-3 py-1 my-3 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.getdate}</span>

                        </div>
                        <div className="px-6 pt-4 pb-2">
                          {/* <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{e.getdate}</span>
                          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span> */}
                          <div className='flex justify-between'>
                            <span className="inline-block  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Copy link</span>
                            <form onSubmit={onSubmitDelete}>
                              <input type="text" value={e.id} hidden name="id" />
                              <input
                                className="text-sm px-3 py-1 bg-red-400 rounded-full text-white hover:bg-red-600"
                                type="submit"
                                value="Delete Class"
                              />
                            </form>
                          </div>
                        </div>
                      </div>
                    </a>
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

          <button type='button' onClick={() => setShowModal(true)} title="Add a class"
            class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl">+</button>
        </div>
      </Sidebar>
    </div>
  )
}
