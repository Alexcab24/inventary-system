
import { auth } from "@/auth.config";
import { Form } from "@/components/ui/users/Form";
import { AiOutlinePlusCircle } from "react-icons/ai";


export default async function AddUserPage() {



    const session = await auth();
    console.log(session?.user)


    return (
        <>
            <div className="max-w-[950px] mx-auto">
                <Form user={session?.user} />
            </div>
        </>
    )
}

