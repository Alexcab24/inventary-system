import { CategoriesTable } from "./CategoriesTable";
import CategoryCard from "./CategoryCard";
import { Pagination } from '../Pagination';
import { getCategoriesByCompany } from "@/actions/products/get-categories-by-company";


interface Props {
    query: string;
    page?: number;
}

export const CategoriesContainer = async ({ query, page }: Props) => {
    const { categories = [], totalPages = 1 } = await getCategoriesByCompany({ query, page });
    const totalCategories = categories?.length || 0;

    return (
        <>
            {/* Table Section */}
            <div className="w-full mx-auto">
                {/* Card */}
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hidden lg:block">
                                <CategoriesTable categories={categories} />
                            </div>
                            <div className="lg:hidden w-full">
                                <CategoryCard categories={categories} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex w-full justify-center">
                <Pagination totalItems={totalCategories} totalPages={totalPages} />
            </div>
        </>
    )
} 