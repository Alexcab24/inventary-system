import { auth } from "@/auth.config";
import Form from "@/components/ui/supplier/Form";
import { AiOutlinePlusCircle } from "react-icons/ai";


export default async function createSupplierPage() {

    const session = await auth();

    return (
        <>
            <div className="max-w-[950px] mx-auto my-10">
                <div className="mb-5">
                    <div className="flex items-center gap-x-2 mb-2">
                        <span className="p-2 bg-slate-100 rounded-full shadow-md"> <AiOutlinePlusCircle size={26} /></span>

                        <h1 className="text-2xl sm:text-4xl font-light text-gray-800">Agregar nuevo suplidor </h1>
                    </div>

                    <p className="antialiased text-sm sm:text-lg">Agrega los detalles necesarios para identificar y gestionar eficientemente tu producto en el sistema.</p>
                </div>

                <div className=" my-4">
                    <Form user={session?.user} />
                    {/* <Form user={session?.user} suppliers={suppliers} categories={categories} /> */}
                </div>
            </div>
        </>
    )
}