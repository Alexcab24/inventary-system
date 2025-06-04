import { getSupplierById } from "@/actions/supplier/get-supplier-by-id";
import { auth } from "@/auth.config";
import FormEdit from "@/components/ui/supplier/edit/FormEdit";




export default async function editSupplierPage({ params }: { params: { id: string } }) {


    const id = params.id;
    const supplierById = await getSupplierById(id);
    const session = await auth();

    if (!supplierById) return;


    return (
        <>
            <div className="max-w-[950px] mx-auto">
                <FormEdit
                    userSession={session?.user}
                    supplierById={supplierById}
                />

            </div>
        </>

    )
}