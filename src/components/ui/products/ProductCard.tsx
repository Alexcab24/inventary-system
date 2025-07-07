import { ProductWithRelations } from '@/interfaces'
import Image from 'next/image'
import React from 'react'
import { UpdateButton } from '../Buttons'
import { DeleteProductFunction } from './function-buttons/DeleteProductFunction'

interface Props {
    products: ProductWithRelations[]
}

const ProductCard = ({ products }: Props) => {
    return (
        <>
            {
                products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="w-full  mx-auto my-4 bg-white  border border-gray-200 rounded-xl p-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                        
                            <div className="flex flex-col flex-grow">
                                <div className='flex items-center gap-2'>

                                    {/* <Image
                                        className="rounded-full inline-block size-[36px]"
                                        src={product.image || '/images/placeholders/product-placeholder.png'}
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    /> */}
                                    <span className="text-gray-700 text-lg font-bold">
                                        {product.name}
                                    </span>

                                </div>

                                <span className="text-gray-500 text-sm"> <span className='font-semibold'>ID:</span> {product.id.split('-').at(-1)}</span>
                            </div>
                            <hr />

                            <div className='flex gap-4 justify-between'>

                                <div className="">
                                    <span className="text-gray-800 text-xl font-semibold"><span className='semibold'>$</span>{product.price.toFixed(2)}</span>
                                    <p className="text-gray-500 text-lg"><span className='font-semibold'>Stock: </span> {product.stock}</p>
                                </div>
                                <div className="flex gap-2 py-2">
                                    <UpdateButton
                                        id={product.id}
                                        url="/inventory/"
                                        aria-label={`Update product ${product.name}`}
                                    />
                                    <DeleteProductFunction id={product.id} aria-label={`Delete product ${product.name}`} />
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <span className="block text-sm text-gray-500">No products found matching the search.</span>
                )
            }
        </>
    )
}

export default ProductCard
