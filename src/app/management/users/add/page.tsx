
import { auth } from "@/auth.config";
import { Form } from "@/components/ui/users/Form";
import { AiOutlinePlusCircle } from "react-icons/ai";


export default async function AddUserPage() {
  

 
    const session = await auth();
    console.log(session?.user)
   
  
    return (
        <>
            <div className="max-w-[950px] mx-auto my-10">
                <div className="mb-5">
                    <div className="flex items-center gap-x-2 mb-2">
                        <span className="p-2 bg-slate-100 rounded-full shadow-md"> <AiOutlinePlusCircle size={26} /></span>

                        <h1 className="text-2xl sm:text-4xl font-light text-gray-800">Agregar nuevo usuario </h1>
                    </div>

                    <p className="antialiased text-sm sm:text-lg">Completa la información requerida para agregar un nuevo usuario.</p>
                </div>

                <div className=" my-4">
                    <Form user={session?.user}  />
                </div>
            </div>
        </>
    )
}

