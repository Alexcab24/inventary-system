

import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

import { FiUnlock } from 'react-icons/fi'; // Para habilitar
import { FiLock } from 'react-icons/fi'; // Para deshabilitar
import { DeleteFunction } from "./DeleteFunction";







export function CreateUser() {
  return (
    <Link href={'/management/users/add'} className=" py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
      <GoPlus size={24} />
      <span className="hidden md:flex">
        Agregar usuario
      </span>

    </Link>
  );
}


export function UpdateUser({ id }: { id: string }) {
  return (
    <Link href={`/management/users/${id}/edit`} className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline focus:outline-none focus:underline border border-gray-200 p-2 rounded-md hover:bg-gray-50 text-gray-800 ">
      <FiEdit2 size={22} />
    </Link>
  )
}


export function EnableDisableUser({ isEnabled, onClick }: any) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline focus:outline-none focus:underline border border-gray-200 p-2 rounded-md hover:bg-gray-50 text-gray-800 ">
      {isEnabled ? (
        <>
          <FiLock size={22} />
        </>
      ) : (
        <>
          <FiUnlock size={22} />
        </>
      )}
    </button>
  );
}

export async function DeleteUser({ id }: { id: string }) {
 



  return (
    <div>
          <DeleteFunction id={id} />
    </div>

  )
}