import Sidebar from '../components/Sidebar'
import { Tab } from '@headlessui/react'
import Button from '../components/Button'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PUBLIC_API_URL } from '../config/index'
import { useNavigate } from 'react-router-dom'

export default function Announcements() {
  const [data, setData] = useState([])
  const history = useNavigate()
  const fetchPosts = () => {
    axios
      .get(`${PUBLIC_API_URL}/path/posts/`)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  const [file, setFile] = useState('')
  const [formData, setFormData] = useState({})

  const [showModal, setShowModal] = useState(false)

  const [updatefile, setupdateFile] = useState('')
  const [formupdateData, setFormupdateData] = useState({})
  const onFileUpdateChange = (e) => {
    setupdateFile(e.target.files[0])
  }
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onUpdateChange = (e) => {
    setFormupdateData({ ...formupdateData, [e.target.name]: e.target.value })
  }
  const loading = false

  const onSubmitDelete = async (e) => {
    e.preventDefault()
    var name = e.target.name.value
    axios
      .delete(`${PUBLIC_API_URL}/path/post/${name}/delete/`)
      .then((res) => {
        fetchPosts()
        history('/announcements')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()

    data.append('photo', file)
    data.append('data', JSON.stringify(formData))
    axios
      .post(`${PUBLIC_API_URL}/path/post/`, data)
      .then((res) => {
        alert('Announcement Posted Successfully')
        fetchPosts()
        history('/announcements')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onUpdateSubmit = async (e, name) => {
    e.preventDefault()
    const data = new FormData()

    data.append('photo', updatefile)
    data.append('data', JSON.stringify(formupdateData))
    axios
      .post(`${PUBLIC_API_URL}/path/post/${name}/update/`, data)
      .then((res) => {
        alert('Announcement Updated Successfully')
        fetchPosts()
        history('/announcements')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const [fetchpost, setfetchpost] = useState('')

  const onGetSubmit = async (e) => {
    e.preventDefault()
    var postname = e.target.name.value

    axios
      .get(`${PUBLIC_API_URL}/path/post/${postname}/`)
      .then((res) => {
        setfetchpost(res.data[0])
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

                    <h1 className='text-2xl'>Add an Announcement</h1>
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
                      // onSubmit={onSubmit}
                      onSubmit={(e) => {
                        onUpdateSubmit(e, fetchpost.name)
                      }}
                    >
                      <input
                        className="bg-gray-200 appearance-none  rounded w-full py-3 px-3 text-grey"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Title"
                        onChange={onChange}
                        required
                      />
                      <p style={{ paddingTop: "10px" }}></p>
                      <input
                        className="bg-gray-200 appearance-none  rounded w-full py-5 px-3 text-grey"
                        type="text"
                        id="description"
                        name="description"
                        onChange={onChange}
                        placeholder="Message"
                        required
                      />



                      <div className="md:w-1/6 flex items-end">
                        <div className={'mt-4 flex justify-end'}>
                          <div className="flex items-center p-2 mx-2 bg-gray-100 border border-gray-500 rounded">
                            <div className="mt-2">
                              <label
                                className="block  text-md font-bold text-black dark:text-white"
                                htmlFor="image"
                              >
                                <svg
                                  className="w-6 h-6 text-gray-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                  ></path>
                                </svg>
                              </label>
                              <input
                                className="hidden w-full px-5 py-1  focus:outline-none bg-transparent border rounded shadow-sm text-black"
                                type="file"
                                id="image"
                                name="photo"
                                onChange={onFileChange}
                                required
                              />
                            </div>
                          </div>

                        </div>

                      </div>
                      <div style={{ paddingTop: "20px" }}>

                      </div>
                      {loading ? (
                        <Button text={'Processing'} type={''} />
                      ) : (
                        // <Button text={'Post'} type={'submit'} />
                        <button
                          className="px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl"
                          type="submit"
                        // onClick={() => setShowModal(false)}
                        >
                          Upload
                        </button>
                      )}


                      {/* 
                      <div className="flex items-center justify-center p-6 rounded-b">
                        <button
                          className="px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl"
                          type="submit"
                        // onClick={() => setShowModal(false)}
                        >
                          Upload
                        </button>
                      </div> */}
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
              data.map((e)=>(
                <div key={e} class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src={`${e.photo}/`}  alt="Sunset in the mountains"/>
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{e.title}</div>
                  <p class="text-gray-700 text-base">
                    {e.description}
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span> */}
                  <span onClick={() => setShowModal(true)} class="inline-block bg-red-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">Delete</span>
                  <span onClick={() => setShowModal(true)} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Edit</span>
                </div>
              </div>
  
              ))

            }
     

            
          </div>

          
        </div>


        <div className="p-2 md:p-10">
          {data.map((e) => (
            <div key={e} className="md:px-60 mb-2">
              <div className="border border-gray-500">
                {/* <div className="flex">
                  <div className="w-1/6">
                    <div className="p-2">
                      {e.avater == null ? (
                        <img
                          src="/avator.png"
                          alt="avator"
                          className="rounded-full w-12 h-12"
                        />
                      ) : (
                        <>
                          <img
                            src={`${PUBLIC_API_URL}/${e.avater}/`}
                            alt="avator"
                            className="rounded-full w-12 h-12"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-5/6 flex items-center">
                    <div className="p-2  font-bold text-lg capitalize">
                      {e.name}
                    </div>
                  </div>
                </div> */}
                {/* <div className="p-2"> */}
                  {/* <img
                    src={`${e.photo}/`}
                    alt={`${e.name}`}
                    className="h-[400px] w-[500px]"
                  /> */}
                  <div className="w-full flex">
                    <form onSubmit={onGetSubmit}>
                      {/* <input
                        type="text"
                        value={e.name}
                        hidden
                        name="name"
                      />
                      <button
                        onClick={() => setShowModal(true)}
                        type="submit"
                        className="p-2 bg-transparent border-2 border-gray-500 rounded-lg mr-2"
                      >
                        <svg
                          className="w-6 h-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          ></path>
                        </svg>
                      </button> */}
                    </form>
                    <form onSubmit={onSubmitDelete}>
                      {/* <input
                        type="text"
                        value={e.name}
                        hidden
                        name="name"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-transparent border-2 border-gray-500 rounded-lg mr-2"
                      >
                        <svg
                          className="w-6 h-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button> */}
                    </form>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {e.datehumanize}
                  </p>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>


        <button type='button' onClick={() => setShowModal(true)} title="Add a class"
          class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl">+</button>
      </Sidebar>
    </div>
  )
}
