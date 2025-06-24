'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { IoSearchOutline } from "react-icons/io5"


export const Search = ({ placeholder }: { placeholder: string }) => {

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathName}?${params.toString()}`)

  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
        <IoSearchOutline size={20} className="text-gray-400" />
      </div>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        type="text"
        className="py-3 ps-12 pe-4 block w-full bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-sm hover:border-gray-300"
        defaultValue={searchParams.get('query')?.toString()}
        placeholder={placeholder}
      />
    </div>
  )
}
