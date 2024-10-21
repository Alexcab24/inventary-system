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
    <>
      <div className="relative flex flex-1 flex-shrink-0">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
          <IoSearchOutline size={24} />
        </div>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          className="py-2 ps-10 pe-16 block w-full bg-transparent border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-600 focus:ring-0 disabled:opacity-50 disabled:pointer-events-nonE"
          defaultValue={searchParams.get('query')?.toString()}
          placeholder={placeholder} />
        <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1">
        </div>
      </div>
    </>
  )
}
