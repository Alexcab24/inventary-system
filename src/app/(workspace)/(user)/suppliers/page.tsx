import { Search } from "@/components/ui/Search";
import { SuppliersContainer } from "@/components/ui/supplier/SuppliersContainer";
import Card from "@/components/ui/dashboard/Cards";
import { MdBusiness, MdInventory, MdStore } from "react-icons/md";
import { fetchSupplierByCompany } from "@/actions/supplier/get-supplier";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/ui/users/Skeletons/TableSkeleton";
import { CreateButton } from "@/components/ui/Buttons";
import { ROUTES } from "@/router/routes";

export default async function suppliersPage({
    searchParams }:
    {
        searchParams?: {
            query?: string;
            page?: string;
        };
    }) {

    const query = searchParams?.query || '';
    const page = searchParams?.page ? parseInt(searchParams?.page) : 1;

    const { suppliers } = await fetchSupplierByCompany();

    const totalSuppliers = suppliers?.length || 0;

    return (
        <div className="space-y-6">

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                    title="Total Suppliers"
                    value={totalSuppliers}
                    icon={MdBusiness}
                    className="bg-gradient-to-br from-blue-50 to-white border-blue-100 hover:shadow-blue-100/50"
                />
                <Card
                    title="Suppliers with products"
                    value={0}
                    icon={MdInventory}
                    className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 hover:shadow-emerald-100/50"
                />
                <Card
                    title="Suppliers without products"
                    value={0}
                    icon={MdStore}
                    className="bg-gradient-to-br from-amber-50 to-white border-amber-100 hover:shadow-amber-100/50"
                />
            </section>


            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-md">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Supplier List
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your suppliers efficiently
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Search placeholder="Search supplier..." />
                            <CreateButton
                                label="Create supplier"
                                url={ROUTES.CREATE_SUPPLIER}
                                className="whitespace-nowrap"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <Suspense key={query} fallback={<TableSkeleton />}>
                        <SuppliersContainer query={query} page={page} />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}