import { fetchCategoriesByCompany } from "@/actions/products/get-categories-by-company";
import { fetchSupplierByCompany } from "@/actions/supplier/get-supplier";
import { auth } from "@/auth.config";
import { Form } from "@/components/ui/products/Form";
import { AiOutlinePlusCircle } from "react-icons/ai";








export default async function CreateProductPage() {


    const session = await auth();
    const { suppliers } = await fetchSupplierByCompany();
    const categories = await fetchCategoriesByCompany();


    // if (!categories) return

    return (
        <>
            <div className="max-w-[950px] mx-auto">
                <Form user={session?.user} suppliers={suppliers} categories={categories} />
            </div>


        </>
    )
}