import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { Tab } from '@headlessui/react'
import Filter from '../../components/Filter'
import { PUBLIC_API_URL, PUBLIC_API_URL_2 } from '../../config/index'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'

export default function ClassSlug() {
  const [loader, setLoader] = useState(true)
  const { slug } = useParams()
  const history = useNavigate()
  const [students_data, setStudentsData] = useState([])
  const [document_data, setDocumentData] = useState([])
  const [assignment_data, setAssignmentData] = useState([])

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  const fetchAssignment = () => {
    axios
      // .get(`${PUBLIC_API_URL}/path/assignment/${slug}/`)
      .get(`${PUBLIC_API_URL_2}/path/assignments`, headers)
      .then((res) => {
        // console.log('-=-=-=-=-=-=-=-')

        setAssignmentData(res.data)
        setLoader(false)

      })
      .catch((err) => console.log(err))
  }


  const fetchStudent = () => {
    axios
      // .get(`${PUBLIC_API_URL}/path/session/${slug}/`)
      // .get(`${PUBLIC_API_URL_2}/path/students`)
      .get("https://kampusplusdev.xyz/path/heroes/")

      .then((res) => {
        setStudentsData(res.data)
        setLoader(false)

      })
      .catch((err) => console.log(err))
  }


  const fetchDocument = () => {
    axios
      // .get(`${PUBLIC_API_URL}/path/document/${slug}/`)
      .get(`${PUBLIC_API_URL_2}/path/documents`)

      .then((res) => {
        setDocumentData(res.data)
        setLoader(false)

      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchAssignment()
    fetchStudent()
    fetchDocument()
  }, [])

  const [formData, setFormData] = useState({})
  const [showModal, setShowModal] = useState(false)

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    axios
      .post(`${PUBLIC_API_URL}/path/documents/`, formData)
      .then((res) => {
        fetchDocument()
        setShowModal(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <Sidebar>
        <h1 className="font-semibold text-3xl text-center mt-2 uppercase">
          {slug}
        </h1>
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-evenly mt-10">
              <Tab>
                <div className="text-2xl uppercase text-gray-400 font-bold hover:text-[#040404E0]">
                  Students
                </div>
              </Tab>
              <Tab>
                <div className="text-2xl uppercase text-gray-400 font-bold hover:text-[#040404E0]">
                  Assignments
                </div>
              </Tab>
              <Tab>
                <div className="text-2xl uppercase text-gray-400 font-bold hover:text-[#040404E0]">
                  Docs
                </div>
              </Tab>
            </div>
          </Tab.List>
          <hr className="border" />
          <Tab.Panels>
            <Tab.Panel>
              <div className="p-2 md:px-4">
                <div className="">
                  <div className="p-2">
                    <div className="relative overflow-x-auto rounded-lg ">
                      {/* <Table tabledata={students_data} /> */}
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col" className="py-3 px-6"
                            >
                              Name
                            </th>

                            <th
                              scope="col" className="py-3 px-6"
                            >
                              Course
                            </th>
                            <th
                              scope="col" className="py-3 px-6"
                            >
                              ID Number
                            </th>
                            <th
                              scope="col" className="py-3 px-6"
                            >
                              Number
                            </th>
                            <th
                              scope="col" className="py-3 px-6"
                            >
                              Year
                            </th>
                            <th
                              scope="col" className="py-3 px-6"
                            >
                              Email
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            loader ?
                              <>
                                <tr>
                                  <th></th>
                                  <td></td>
                                  <td></td>

                                  <td>
                                    <Loader />

                                  </td>

                                  <td></td>

                                  <td></td>

                                </tr>
                              </>
                              :

                              students_data.map((e) => (
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={e}>
                                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {e.name}
                                  </th>
                                  <td className=" py-4 px-6 break-all">
                                    {e.course}
                                  </td>
                                  <td className=" py-4 px-6 break-all">
                                    {e.student_id}
                                  </td>
                                  <td className=" py-4 px-6 break-all">
                                    {e.phoneNumber}
                                  </td>
                                  <td className=" py-4 px-6 break-all">
                                    {e.year_of_enrollment}
                                  </td>
                                  <td className=" py-4 px-6 break-all">
                                    {e.email}
                                  </td>
                                </tr>
                              ))

                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="p-2 md:px-4">
                <div className="">
                  <Filter />
                  <div className="p-2">
                    <div className="relative overflow-x-auto rounded-lg">
                      {/* <Table tabledata={assignments} /> */}
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className=" px-2 py-3"
                            >
                              Assignments
                            </th>

                            <th
                              scope="col"
                              className="px-2 py-3"
                            >
                              Students
                            </th>
                            <th
                              scope="col"
                              className=" px-2 py-3"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className=" px-2 py-3"
                            >
                              Deadline
                            </th>
                            <th
                              scope="col"
                              className=" px-2 py-3"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className=" px-2 py-3"
                            >
                              Report
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {

                            loader ?
                              <>
                                <tr>
                                  <th></th>
                                  <td></td>
                                  <td></td>

                                  <td>
                                    <Loader />

                                  </td>

                                  <td></td>

                                  <td></td>

                                </tr>
                              </>
                              :

                              assignment_data.map((e) => (
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={e}>
                                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {e.course}
                                  </th>
                                  <td className=" px-2 py-3 break-all">
                                    {e.id}
                                  </td>
                                  <td className="  px-2 py-3 break-all">
                                    {e.getcreatedat}
                                  </td>
                                  <td className=" px-2 py-3 break-all">
                                    {e.getdue}
                                  </td>
                                  <td className=" px-2 py-3 break-all">
                                    {e.completed ? 'Completed' : 'Pending'}
                                  </td>
                                  <td className=" px-2 py-3 break-all">
                                    {e._id}
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="p-2 md:px-4">
                <div className="">
                  <div className="flex flex-wrap">
                    {



                      loader ?
                        <>
                          <div style={{ paddingLeft: "40vw", paddingTop: "40vh" }}>
                            <div className="flex justify-center items-center">
                              <Loader />
                            </div>
                          </div>
                        </>
                        :




                        document_data.map((e) => (
                          <div key={e} className="w-1/2 md:w-1/6 lg:w-1/6">
                            <a
                              href={`/classes/${e.course_name}/${e.name}/`}
                              className=""
                            >
                              <div>
                                {/* <svg
                              className="w-30 h-30 text-[#3F3F3F] fill-[#3F3F3F]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                              ></path>
                            </svg> */}
                                <img src='https://qica.site/wp-content/uploads/2021/10/file.png' alt='image' />
                                <p className="px-2 break-all">{e.name}</p>
                              </div>
                            </a>
                          </div>
                        ))}
                  </div>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="px-4 py-2 text-sm font-medium shadow-xl border text-black rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      New +
                    </button>
                  </div>
                </div>
                {showModal ? (
                  <>
                    <div className="bg-black bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="flex items-start justify-between p-5  rounded-t ">

                            <h1 className='text-2xl'>Add Document</h1>
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
                              <div className="flex flex-wrap mt-3">
                                <div className="w-1/3 pr-2 py-1">
                                  <input
                                    placeholder="Tutor"
                                    className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                                    name="tutor"
                                    onChange={onChange}
                                  />
                                </div>
                                <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                                    placeholder="Name"
                                    name="name"
                                    onChange={onChange}
                                  />
                                </div>
                                <div className="w-1/3 py-1 pr-2">
                                  <input
                                    className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                                    placeholder="Document Name"
                                    name="course_code"
                                    onChange={onChange}
                                    type="document_name"
                                  />
                                </div>
                                <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                                    placeholder="Type"
                                    name="type"
                                    onChange={onChange}
                                  />
                                </div>
                                <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                                    placeholder="Course Name"
                                    name="course_name"
                                    onChange={onChange}
                                  />
                                </div>
                                <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                                    placeholder="File"
                                    name="file"
                                    onChange={onChange}
                                    type="file"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
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
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Sidebar>
    </div>
  )
}
