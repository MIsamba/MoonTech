import Sidebar from '../components/Sidebar'
import { Tab } from '@headlessui/react'
import Filter from '../components/Filter'
import { PUBLIC_API_URL } from '../config/index'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Assignments() {
  const history = useNavigate()
  const [completed_data, setCompletedData] = useState([])
  const [pending_data, setPendingData] = useState([])

    // Simple Loading indicator
    const [loader, setLoader] = useState(true)

  const fetchCompletedAssignments = () => {
    axios
      .get(`${PUBLIC_API_URL}/path/filterassignment/yes/`)
      .then((res) => {
        // console.log(' completed')
        // console.log(res)
        setCompletedData(res.data)
        setLoader(false)
        
      })
      .catch((err) => console.log(err))
  }
  const fetchPendingAssignments = () => {
    axios
      .get(`${PUBLIC_API_URL}/path/filterassignment/no/`)
      .then((res) => {
        // console.log('Pending ')
        // console.log(res)
        setPendingData(res.data)
        setLoader(false)

      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchPendingAssignments()
    fetchCompletedAssignments()
  }, [])
  const [showModal, setShowModal] = useState(false)
  const [file, setFile] = useState('')
  const [formData, setFormData] = useState({})

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    // e.preventDefault()
    const data = new FormData()

    data.append('photo', file)
    data.append('data', JSON.stringify(formData))
    axios
      .post(`${PUBLIC_API_URL}/path/assignments/`, data)
      .then((res) => {
        if (res.status === 200) {
          fetchPendingAssignments()
          fetchCompletedAssignments()
          history('/assignments')
        }
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
                      <input
                        placeholder="Title"
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        name="title"
                        onChange={onChange}
                      />
                      <div className="flex flex-wrap mt-3">
                        <div className="w-1/3">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            placeholder="Course Name"
                            name="course_name"
                            onChange={onChange}
                          />
                        </div>
                        <div className="w-1/3 px-5">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            type="date"
                            placeholder="Due Date"
                            name="due_date"
                            onChange={onChange}
                          />
                        </div>
                        <div className="w-1/3">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            type="file"
                            id="image"
                            name="photo"
                            onChange={onFileChange}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                          className="px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl"
                          type="submit"
                          onClick={() => onSubmit()}
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
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-evenly mt-10">
              <Tab>
                <div className="text-2xl uppercase text-gray-400 font-bold hover:text-[#040404E0]">
                  Completed
                </div>
              </Tab>
              <Tab>
                <div className="text-2xl uppercase text-gray-400 font-bold hover:text-[#040404E0]">
                  Pending
                </div>
              </Tab>
            </div>
          </Tab.List>
          <hr className="border" />
          <Tab.Panels>
            <Tab.Panel>
              <div className="p-2 md:px-4">
                <div className="">
                  <Filter />
                  <div className="p-2">
                    <div className="relative overflow-x-auto rounded-xl border border-black">
                      {/* <Table tabledata={pendings} /> */}
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
                          {
                          
                          completed_data.map((e) => (
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
                  <Filter />
                  <div className="p-2">
                    <div className="relative overflow-x-auto rounded-xl border border-black">
                      {/* <Table tabledata={completed} /> */}
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
                          {pending_data.map((e) => (
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
                  <div className="mt-5">
                    <button
                      onClick={() => setShowModal(true)}
                      type="button"
                      className="px-4 py-2 text-sm font-medium shadow-xl border text-black rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      New Assignment
                    </button>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Sidebar>
    </div>
  )
}
