import Image from "next/image";
import { MdInventory } from "react-icons/md";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { getLastProducts } from "@/actions/products/get-products-by-company";
import { cn } from "@/lib/utils";

export const LastedProducts = async () => {
    const { lastSixProducts = [] } = await getLastProducts();

    return (
        <Card className="shadow-sm rounded-xl border border-gray-200 bg-gradient-to-br from-emerald-50/50 to-white">
            <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-x-4">
                    <div className="p-2 rounded-lg bg-emerald-100/50">
                        <MdInventory size={24} className="text-emerald-600" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-semibold text-gray-800">Latest Added Products</CardTitle>
                        <CardDescription className="text-sm text-gray-500 mt-1">
                            Last 6 products added recently
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="space-y-3">
                    {lastSixProducts.map((product) => (
                        <div
                            key={product.id}
                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/80 transition-colors border border-gray-100"
                        >
                            <div className="flex items-center gap-x-3">
                                <div className="relative size-12 rounded-lg overflow-hidden ring-2 ring-gray-100 group-hover:ring-emerald-100 transition-all">
                                    <Image
                                        className="object-cover"
                                        src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt={`Image of ${product.name}`}
                                        fill
                                    />
                                </div>
                                <div className="grow">
                                    <span className="block text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors truncate max-w-[180px]">
                                        {product.name}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <span className="inline-flex items-center gap-x-1 rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-700">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="text-sm text-gray-500 leading-relaxed">
                    Mostrando los últimos 6 productos agregados.
                </div>
            </CardFooter>
        </Card>
    );
};

export default LastedProducts;
