import { fetchCategoriesByCompany } from "@/actions/products/get-categories-by-company";
import { getProductById } from "@/actions/products/get-product-by-id";
import { fetchSupplierByCompany } from "@/actions/supplier/get-supplier";
import { auth } from "@/auth.config";
import { FormEdit } from "@/components/ui/products/edit/FormEdit";
import { CiEdit } from "react-icons/ci";





export default async function EditProductPage({ params }: { params: { id: string } }) {


    const id = params.id;

    const [productById, categories, suppliers] = await Promise.all([
        getProductById(id),
        fetchCategoriesByCompany(),
        fetchSupplierByCompany()
    ])



    if (!productById) {
        return <h1>holaaa?</h1>;
    }



    const session = await auth();

    return (

        <>
            {/* <div className="max-w-[950px]"> */}


            <div className="mx-auto max-w-[950px]">
                <FormEdit
                    userSession={session?.user}
                    productById={productById}
                    categories={categories}
                    suppliers={suppliers.suppliers}
                />

            </div>
        </>

    )

}