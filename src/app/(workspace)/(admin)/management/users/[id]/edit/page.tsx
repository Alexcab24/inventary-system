
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
            <div className="max-w-[950px] mx-auto">
                <FormEdit userSession={session?.user} userById={userById} />
            </div>

        </>
    )
}

