
import { getUserById } from "@/actions/users/get-user-by-id";
import { auth } from "@/auth.config";
import { FormEdit } from "@/components/ui/users/edit/FormEdit";

import { CiEdit } from "react-icons/ci";


export default async function EditUserPage({ params }: { params: { id: string } }) {


    const id = params.id;
    const userById = await getUserById(id)

    if (!userById) {
        return;
    }



    const session = await auth();

    return (
        <>
            <div className="max-w-[950px] mx-auto my-10">
                <div className="mb-5">
                    <div className="flex items-center gap-x-2 mb-2">
                        <span className="p-2 bg-slate-100 rounded-full shadow-md"> <CiEdit size={26} /></span>

                        <h1 className="text-2xl sm:text-4xl font-light text-gray-800">Editar usuario </h1>
                    </div>

                    <p className="antialiased text-sm sm:text-lg">Completa la información requerida para agregar un nuevo usuario.</p>
                </div>

                <div className=" my-4">
                    <FormEdit userSession={session?.user} userById={userById} userId={id} />
                </div>
            </div>
        </>
    )
}

