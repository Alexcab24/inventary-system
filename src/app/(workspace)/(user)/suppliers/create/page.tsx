import { auth } from "@/auth.config";
import Form from "@/components/ui/supplier/Form";
import { AiOutlinePlusCircle } from "react-icons/ai";


export default async function createSupplierPage() {

    const session = await auth();

    return (
        <>
            <div className="max-w-[950px] mx-auto">
                <Form user={session?.user} />
            </div>

        </>
    )
}