import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { PUBLIC_API_URL } from '../config/index'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [loader, setLoader] = useState(false)
  const history = useNavigate()
  const [file, setFile] = useState(null)
  const loading = false;
  const [filebool, setFilebool] = useState(false)
  const [formData, setFormData] = useState({})
  const onFileChange = (e) => {
    setFile(e.target.files[0])
    setFilebool(true)
  }
  const removeSelectedImage = () => {
    setFile()
    setFilebool(false)
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    setLoader(true)

    e.preventDefault()

    const data = new FormData()
//     var form = $('#fileUploadForm')[0];
//     var data2 = new FormData(form);
    data.append('profile', file)
    data.append('Teacher_id', formData.Id_Number)
    data.append('title1', formData.title)
    data.append('firstname', formData.LastName)
    data.append('middlename', formData.MiddleName)
    data.append('surname', formData.Surname)
    data.append('email', formData.Email)
    data.append('phone', formData.Phone_Number)
    data.append('college', formData.College)
    data.append('dept', formData.Department)
    data.append('course', formData.Course)
    data.append('building', formData.Building)
    data.append('officenumber', formData.Office_Number)
    data.append('password', formData.Password)
    
    var datatosend ={
       "title1": formData.title,
        "surname": formData.Surname,
        "firstname": formData.LastName,
        "middlename": formData.MiddleName,
        "email": formData.Email,
        "phone": formData.Phone_Number,
        "college":formData.College,
        "dept": formData.Department,
        "course": formData.Course,
        "building": formData.Building,
        "officenumber": formData.Office_Number,
        "password": formData.Password,
        "profile": file,
        "Teacher_id":formData.Id_Number
    };
    console.log("data send:",datatosend);
    console.log("data :",data);
    axios.post(`https://kampusplusdev.xyz/path/tech/`, data).then((response) => {
      console.log("response:  ",response);
      try {
        if (response.status == 200 || response.status == 201) {
          alert('Account created successfully')
          setLoader(false)
          history('/')
        } else {
          setLoader(false)
          //alert(fail to register)
        }
      } catch (e) {
        setLoader(false)
        alert(response.data.message)
      }
    })
  }

  const Styles = {
    Input:
      'w-full px-5 py-1  focus:outline-none bg-transparent border rounded shadow-sm text-black',
  }


  return (
    <>
      <section className={'relative bg-white'}>
        <div className={'h-full  flex  justify-center items-center'}>
          <div className={'w-full max-w-lg  flex  justify-center'}>
            <div className={'leading-loose'}>
              <form
                onSubmit={onSubmit}
                className={
                  'max-w-sm m-4 p-10 bg-white rounded-2xl my-10 border shadow-2xl'
                }
              >
                {' '}
                <div>
                  {filebool ? (
                    ''
                  ) : (
                    <div className="flex justify-center">
                      <img
                        className="mx-auto rounded-full object-cover object-center w-[150px] h-[150px]"
                        src={'./avator.png'}
                        alt="avator"
                      />
                    </div>
                  )}
                  {file && (
                    <div>
                      <div className="flex justify-center">
                        <img
                          className="mx-auto rounded-full object-cover object-center w-[150px] h-[150px]"
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
                        required
                      />
                    </label>
                  </div>
                )}
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={formData.student_id}
                    id="Id_Number"
                    name="Id_Number"
                    placeholder="Id Number"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={username}
                    id="title"
                    name="title"
                    placeholder="Title"
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
                    placeholder="Surname"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={username}
                    id="LastName"
                    name="LastName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={username}
                    id="MiddleName"
                    name="MiddleName"
                    placeholder="Middle Name"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="email"
                    onChange={onChange}
                    // value={formData.email}
                    id="Email"
                    name="Email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={formData.phoneNumber}
                    id="Phone_Number"
                    name="Phone_Number"
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
                    placeholder="Course"
                    required
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="text"
                    onChange={onChange}
                    // value={username}
                    id="Building"
                    name="Building"
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
                    name="Office_Number"
                    placeholder="Office Number"
                  />
                </div>
                <div className="mt-2">
                  <input
                    className={Styles.Input}
                    type="password"
                    onChange={onChange}
                    // value={username}
                    id="Password"
                    name="Password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className={'mt-4 flex justify-center'}>
                  {loader ? (
                    <button
                      className={
                        'px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl'
                      }
                      type="submit"
                    >
                      Processing
                    </button>
                  ) : (
                    <button
                    onClick={onSubmit}
                      className={
                        'px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl'
                      }
                      type="submit"
                    >
                      Create account
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )

}

