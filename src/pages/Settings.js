import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { PUBLIC_API_URL } from '../config/index'

export default function Settings() {
  const history = useNavigate()
  const { user } = useSelector((state) => state.user)
  const loading = false
  const [file, setFile] = useState('')
  const [filebool, setFilebool] = useState(false)
  const [formData, setFormData] = useState({})

  const default_profile_pic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"



  const onFileChange = (e) => {
    setFile(e.target.files[0])
    setFilebool(true)
  }
  const removeSelectedImage = () => {
    setFile()
    setFilebool(false)
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('profile_photo', file)
    data.append('Id_Number', e.target.Id_Number.value)
    data.append('title', e.target.title.value)
    data.append('LastName', e.target.LastName.value)
    data.append('MiddleName', e.target.MiddleName.value)
    data.append('Surname', e.target.Surname.value)
    data.append('Email', e.target.Email.value)
    data.append('Phone_Number', e.target.Phone_Number.value)
    data.append('College', e.target.College.value)
    data.append('Department', e.target.Department.value)
    data.append('Course', e.target.Course.value)
    data.append('Building', e.target.Building.value)
    data.append('Office_Number', e.target.Office_Number.value)

    const res = await fetch(`${PUBLIC_API_URL}/path/tutorupdate/`, {
      method: 'POST',
      body: data,
    })
    if (res.status === 200) {
      alert("Update Successfully")
      history('/settings')
    }
  }
  const Styles = {
    Input:
      'w-full px-5 py-1  focus:outline-none bg-transparent border border-gray-500 rounded-lg shadow-sm text-black placeholder-black',
  }

  return (
    <div>
      <Sidebar>
        <div
          className={
            'h-full  flex  justify-center items-center  overflow-hidden'
          }
        >
          <div className={'w-full max-w-lg  flex  justify-center'}>
            <div className={'leading-loose'}>
              <form
                onSubmit={onSubmit}
                className={'max-w-sm m-4 p-10 bg-white rounded-2xl my-10'}
              >
                <div>
                  {filebool ? (
                    ''
                  ) : (
                    <div className="flex justify-center">
                      {user != null ? (
                        <>
                          {(() => {
                            if (user.user.role === 'admin') {
                              ; <>
                                <img
                                  src="/avator.png"
                                  alt="avator"
                                  className="rounded-full h-[150px] w-[150px]"
                                />
                              </>
                            } else if (user.user.role === 'teacher') {
                              return (
                                <>


                                  {
                                    user.data.profile == null ?
                                      <img src={default_profile_pic} alt='image' className="rounded-full h-36 w-36" /> :
                                      <img src={PUBLIC_API_URL + '/' + user.data.profile} alt={user.data.surname} className="rounded-full h-36 w-36"
                                      />
                                  }



                                  {/* <img
                                    src={`${PUBLIC_API_URL}${user.data.profile}`}
                                    alt={user.data.surname}
                                    className="rounded-full h-[150px] w-[150px]"
                                  /> */}
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
                            className="rounded-full h-[150px] w-[150px]"
                          />
                        </>
                      )}
                    </div>
                  )}
                  {file && (
                    <div>
                      <div className="flex justify-center">
                        <img
                          className="mx-auto rounded-full object-cover object-center h-[150px] w-[150px]"
                          src={URL.createObjectURL(file)}
                          alt="avator"

                        />
                      </div>
                      <button
                        onClick={removeSelectedImage}
                        className="flex rounded bg-red-600 text-white w-full justify-center"
                      >
                        <span className="font-bold text-md">Remove</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                {filebool ? (
                  ''
                ) : (
                  <div className="flex w-full  justify-center mt-2">
                    <label className="px-4  bg-white  border">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <input
                        type="file"
                        multiple="multiple"
                        accept="accept"
                        onChange={onFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    // onChange={onChange}
                    defaultValue={user != null ? user.data.Teacher_id : ''}
                    id="Id_Number"
                    name="Id_Number"
                    placeholder="ID Number"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    defaultValue={user != null ? user.data.title : ''}
                    id="title"
                    name="title"
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    defaultValue={user != null ? user.data.lastname : ''}
                    // value={username}
                    id="LastName"
                    name="LastName"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    capture={onChange}
                    id="MiddleName"
                    defaultValue={user != null ? user.data.middlename : ''}
                    name="MiddleName"
                    placeholder="Middle Name"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={username}
                    id="Surname"
                    name="Surname"
                    defaultValue={user != null ? user.data.surname : ''}
                    placeholder="Surname"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="email"
                    onChange={onChange}
                    id="Email"
                    name="Email"
                    defaultValue={user != null ? user.data.email : ''}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="number"
                    onChange={onChange}
                    // value={formData.phoneNumber}
                    id="Phone_Number"
                    name="Phone_Number"
                    defaultValue={user != null ? user.data.phone : ''}
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={formData.college}
                    id="College"
                    defaultValue={user != null ? user.data.college : ''}
                    name="College"
                    placeholder="College"
                    required
                  />
                </div>

                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={formData.department}
                    id="Department"
                    defaultValue={user != null ? user.data.dept : ''}
                    name="Department"
                    placeholder="Department"
                    required
                  />
                </div>

                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={formData.course}
                    id="Course"
                    name="Course"
                    defaultValue={user != null ? user.data.course : ''}
                    placeholder="Course"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    defaultValue={user != null ? user.data.building : ''}
                    // value={username}
                    id="Building"
                    name="Building"
                    required
                    placeholder="Building"
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={username}
                    id="Office_Number"
                    defaultValue={user != null ? user.data.officenumber : ''}
                    name="Office_Number"
                    placeholder="Office Number"
                  />
                </div>

                <div className={'mt-4 flex justify-center'}>
                  {loading ? (
                    <Button type={''} text={'Processing'} />
                  ) : (
                    <Button type={'submit'} text={'Save'} />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
