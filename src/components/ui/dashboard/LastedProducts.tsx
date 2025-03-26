import Image from "next/image";
import { FaList } from "react-icons/fa6";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";
import { getLastProducts } from "@/actions/products/get-products-by-company";

export const LastedProducts = async () => {
    const { lastSixProducts = [] } = await getLastProducts();

    return (
        <Card className="shadow-lg rounded-2xl bg-white dark:bg-zinc-900">
            <CardHeader>
                <div className="flex items-center gap-x-4">
                    <FaList size={28} className="text-primary" />
                    <CardTitle className="text-lg font-semibold">Latest Added Products</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                    Last 6 products added recently
                </CardDescription>
            </CardHeader>

            <CardContent>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                        {lastSixProducts.map((product) => (
                            <tr key={product.id} className="border-b dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-x-3">
                                        <div className="w-12 h-12 rounded-full overflow-hidden">
                                            <Image
                                                className="object-cover w-full h-full"
                                                src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                width={48}
                                                height={48}
                                                alt="Product Image"
                                            />
                                        </div>
                                        <div className="grow">
                                            <span className="block text-sm font-medium text-gray-800 dark:text-white truncate max-w-[180px]">
                                                {product.name}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground">
                <div className="leading-none">Mostrando los últimos 6 productos agregados.</div>
            </CardFooter>
        </Card>
    );
};

export default LastedProducts;
