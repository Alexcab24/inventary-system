import Image from "next/image"
import { FaList } from "react-icons/fa6"
import { Card, CardContent, CardDescription, CardHeader } from "../card"
import { getLastProducts } from "@/actions/products/get-products-by-company"



export const LastedProducts = async () => {

    const { lastSixProducts = [] } = await getLastProducts();


    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-x-4">
                    <FaList size={28} />
                    <h1>Últimos productos agregados</h1>
                </div>
                <CardDescription>Últimos 6 productos agregados</CardDescription>
            </CardHeader>




            <CardContent>
                <table className="min-w-full divide-y divide-gray-200">


                    <tbody className="divide-y divide-gray-200">
                        {/* fila */}
                        {
                            lastSixProducts.map(product => (
                                <tr className="border-b" key={product.id}>
                                    <td className="h-px w-72 whitespace-nowrap">
                                        <div className="flex items-center gap-x-3 py-4">
                                            <Image className="inline-block size-[38px] rounded-full" src="https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={500} height={500} alt="Avatar" />
                                            <div className="grow">
                                                <span className="block text-xs md:text-sm font-semibold text-gray-800">{product.name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-3">
                                            <span className="text-xs md:text-sm  text-gray-500">
                                                ${product.price.toFixed()}
                                            </span>
                                        </div>
                                    </td>
                                    {/* <td className="size-px whitespace-nowrap">
                                        <div className="px-6 py-3">
                                            <span className="text-sm text-gray-500">
                                                {product.supplier.name}
                                            </span>
                                        </div>
                                    </td> */}
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </CardContent>


        </Card>

    )
}

export default LastedProducts
