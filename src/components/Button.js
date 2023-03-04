export default function Button({text,type}) {
  return <>
   <button
                      className={
                        'px-4 py-1 text-[#00000099] font-bold tracking-wider border-2 border-[#9FC6FF] bg-[#9FC6FF] hover:border-[#9FC6FF] hover:bg-transparent hover:text-[#9FC6FF] hover:font-bold hover:border-2 rounded-3xl'
                      }
                      type={type}
                    >
                      {text}
                    </button>
  </>
}
