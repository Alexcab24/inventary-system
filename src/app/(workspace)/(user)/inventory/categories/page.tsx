import { Search } from "@/components/ui/Search";
import { CategoriesContainer } from "@/components/ui/categories/CategoriesContainer";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { MdCategory } from "react-icons/md";
import { CategoryModal } from "@/components/ui/products/CategoryModal";

export default async function categoriesPage({
    searchParams }:
    {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }) {


    const query = searchParams?.query || '';
    const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

    return (
        <div className="space-y-6">
       
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <MdCategory className="w-6 h-6 text-blue-600" />
                                Categories list
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your categories efficiently
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Search placeholder="Search category..." />
                            {/* <CreateButton
                                label="Agregar Articulo"
                                url={ROUTES.CREATE_PRODUCT}
                                className="whitespace-nowrap"
                            /> */}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Categories Table Section */}
                    <Suspense key={query} fallback={<TableSkeleton />}>
                        <CategoriesContainer query={query} page={page} />
                    </Suspense>
                </div>
            </section>

        </div>
    )
}