import Sidebar from '../components/Sidebar'
import { Tab } from '@headlessui/react'
import Button from '../components/Button'
import Filter from '../components/Filter'
import { PUBLIC_API_URL } from '../config/index'
import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function Appointments() {
  const [accept_data, setAcceptData] = useState([])
  const [pending_data, setPendingData] = useState([])
  
  useEffect(() => {
    axios
      .get(`${PUBLIC_API_URL}/path/appointment/no/`)
      .then((res) => {
        setAcceptData(res.data)
      })
      .catch((err) => console.log(err))
    axios
      .get(`${PUBLIC_API_URL}/path/appointment/yes/`)
      .then((res) => {
        setPendingData(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div>
        <Sidebar>
          <Tab.Group>
            <Tab.List>
              <div className="flex justify-evenly mt-10">
                <Tab>
                  <div className="text-2xl uppercase text-gray-400 font-bold hover:text-[#040404E0]">
                    Accepted
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
                        <table className="w-full text-sm text-left border-collapse border border-black">
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
                                Email
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
                                Date
                              </th>
                              <th
                                scope="col"
                                className="border border-black px-2 py-3"
                              >
                                Time
                              </th>
                              <th
                                scope="col"
                                className="border border-black px-2 py-3"
                              >
                                Reason
                              </th>
                              <th
                                scope="col"
                                className="border border-black px-2 py-3"
                              >
                                Ignore
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {accept_data.map((e) => (
                              <tr key={e}>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_message.Subject_id}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_date}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_time}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_message.Subject_id}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.status}
                                  <Button type={'submit'} text={'Ignore'} />
                    
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
                        <table className="w-full text-sm text-left border-collapse border border-black">
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
                                Email
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
                                Date
                              </th>
                              <th
                                scope="col"
                                className="border border-black px-2 py-3"
                              >
                                Time
                              </th>
                              <th
                                scope="col"
                                className="border border-black px-2 py-3"
                              >
                                Reason
                              </th>
                              <th
                                scope="col"
                                className="border border-black px-2 py-3"
                              >
                                Ignore
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pending_data.map((e) => (
                              <tr key={e}>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_message.Subject_id}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.student_id.student_name}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_date}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_time}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.appointment_message.Subject_id}
                                </td>
                                <td className="border border-black text-black px-2 py-3 break-all">
                                  {e.status}
                                  <Button type={'submit'} text={'Ignore'} />

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
            </Tab.Panels>
          </Tab.Group>
        </Sidebar>
    </div>
  )
}
