import { IoSearchOutline } from "react-icons/io5"


export const Search = ({ placeholder }: { placeholder: string }) => {
  return (
    <>
    <div className="relative flex flex-1 flex-shrink-0">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
        <IoSearchOutline size={24}/>
        </div>
        <input type="text" className="py-2 ps-10 pe-16 block w-full bg-transparent border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-600 focus:ring-0 disabled:opacity-50 disabled:pointer-events-nonE" placeholder={placeholder}/>
        <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
        </div> 
      </div>
    </>
  )
}
