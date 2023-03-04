import { useParams } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { Tab } from '@headlessui/react'
import Filter from '../../components/Filter'
import { PUBLIC_API_URL,PUBLIC_API_URL_2 } from '../../config/index'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ClassSlug() {
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
      .get(`${PUBLIC_API_URL_2}/path/assignments`,headers)
      .then((res) => {
        // console.log('-=-=-=-=-=-=-=-')
        // console.log(res.data)
        setAssignmentData(res.data)
      })
      .catch((err) => console.log(err))
  }


  const fetchStudent = () => {
    axios
      // .get(`${PUBLIC_API_URL}/path/session/${slug}/`)
      .get(`${PUBLIC_API_URL_2}/path/students`)

      .then((res) => {
        setStudentsData(res.data)
      })
      .catch((err) => console.log(err))
  }


  const fetchDocument = () => {
    axios
      // .get(`${PUBLIC_API_URL}/path/document/${slug}/`)
      .get(`${PUBLIC_API_URL_2}/path/documents`)

      .then((res) => {
        setDocumentData(res.data)
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
                    <div className="relative overflow-x-auto rounded-xl border border-black">
                      {/* <Table tabledata={students_data} /> */}
                      <table className="w-full text-sm text-left border-collapse border border-grey">
                        <thead className="text-xs text-black uppercase">
                          <tr>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Name
                            </th>

                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Course
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              ID Number
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Number
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Year
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Email
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {students_data.map((e) => (
                            <tr key={e}>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.name}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.course}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.student_id}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.phoneNumber}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.year_of_enrollment}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.email}
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
                  <Filter />
                  <div className="p-2">
                    <div className="relative overflow-x-auto rounded-xl border border-black">
                      {/* <Table tabledata={assignments} /> */}
                      <table className="w-full text-sm text-left border-collapse border border-black">
                        <thead className="text-xs text-black uppercase">
                          <tr>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Assignments
                            </th>

                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Students
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Deadline
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="border border-black px-2 py-3"
                            >
                              Report
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignment_data.map((e) => (
                            <tr key={e}>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.course}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.id}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.getcreatedat}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.getdue}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
                                {e.completed ? 'Completed' : 'Pending'}
                              </td>
                              <td className="border border-black text-black px-2 py-3 break-all">
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
                    {document_data.map((e) => (
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
                            <img src='https://qica.site/wp-content/uploads/2021/10/file.png'alt='image' />
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
                          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                            <button
                              className="bg-transparent border-0 text-black float-right"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                x
                              </span>
                            </button>
                          </div>
                          <div className="relative flex-auto">
                            <form
                              className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full"
                              onSubmit={onSubmit}
                            >
                              <div className="flex flex-wrap mt-3">
                                {/* <div className="w-1/3 pr-2 py-1">
                                  <input
                                    placeholder="Tutor"
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                    name="tutor"
                                    onChange={onChange}
                                  />
                                </div> */}
                                {/* <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                    placeholder="Name"
                                    name="name"
                                    onChange={onChange}
                                  />
                                </div> */}
                                <div className="w-1/3 py-1 pr-2">
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                    placeholder="Document Name"
                                    name="course_code"
                                    onChange={onChange}
                                    type="document_name"
                                  />
                                </div>
                                <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                    placeholder="Type"
                                    name="type"
                                    onChange={onChange}
                                  />
                                </div>
                                {/* <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                                    placeholder="Course Name"
                                    name="course_name"
                                    onChange={onChange}
                                  />
                                </div> */}
                                <div className="w-1/3 pr-2 py-1">
                                  <input
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
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
