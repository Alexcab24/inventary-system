import { fetchPaginatedUsers } from "@/actions/users/get-user-by-company";
import { Pagination } from "../orders/Pagination"
import { UsersTable } from "./UsersTable";
import UsersCard from "./UsersCard";


interface Props {
    query: string;
    page?: number;
  }
  
  

const UsersContainer = async({ query, page }: Props) => {

    const { users = [], totalPages = 1 } = await fetchPaginatedUsers({ query, page });

    const totalUsers = users?.length || 0;



  return (
    <>
    {/* <!-- Table Section --> */}
    <div className="w-full mx-auto ">
      {/* <!-- Card --> */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hidden lg:table w-full">
              <UsersTable users={users}  />
            </div>
            <div className="lg:hidden w-full">
              <UsersCard users={users} />
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className="mt-5 flex w-full justify-center">
      <Pagination totalItems={totalUsers} totalPages={totalPages} />
    </div>
  </>
  )
}

export default UsersContainer
