
export default function Filter({data}) {
  return (
    <>
      <div className="p-2">
        <form>
          <div className="flex justify-between ">
            <div className="mr-2">
              <input
                className="w-full px-5 py-2  focus:outline-none bg-transparent border-2 rounded shadow-sm text-black"
                type="text"
                id="search"
                name="search"
                placeholder="Search"
                required
              />
            </div>
            <div className="">
              <div className="dropdown inline-block relative">
                <button className="text-[#040404E0] font-bold px-6 py-2 rounded-lg border-2  hover:bg-transparent hover:text-[#040404E0]">
                  <div className="flex">
                    <span className="mr-1">Sort</span>
                    <div className="flex items-center">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </button>

                <ul className="dropdown-menu absolute hidden text-white z-10">
                  <li className="">
                    <a
                      className="rounded-t bg-[#040404E0] py-2 px-4 block whitespace-no-wrap"
                      href="#"
                    >
                      Ascending
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
