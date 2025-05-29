'use client';

import { createProduct } from '@/actions/products/create-product';
import { User } from '@/interfaces';
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { errorNotification, successNotification } from '../notification/notifications';
import { useRouter } from 'next/navigation';
import { Supplier } from '@/interfaces/supplier.interface';
import { Category } from '@/interfaces/category.interfaces';
import { CategoryModal } from './CategoryModal';
import { ROUTES } from '@/router/routes';


interface FormInputs {
    name: string;
    price: string;
    image: string;
    stock: string;
    categoryId: string;
    supplierId: string;
    description: string;
}



interface Props {
    user?: User;
    suppliers: Supplier[];
    categories: Category[];
}


export const Form = ({ user, suppliers, categories }: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);


    const router = useRouter();

    const companyId = user?.companyId;

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    if (!companyId) return;

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, price, stock, supplierId, description, categoryId } = data;

        const parsedStock = parseInt(stock, 10);
        const parsedPrice = parseFloat(price);

        if (isNaN(parsedStock) || isNaN(parsedPrice)) {
            errorNotification('Price and stock must be valid numbers.');
            return;
        }

        if (!companyId) {
            return;
        }
        // server action
        const resp = await createProduct(name, parsedPrice, parsedStock, supplierId, categoryId, description, companyId);

        if (resp.ok) {
            successNotification(resp.message || '');
            router.push(ROUTES.PRODUCTS);
            return;
        } else {
            // setErrorMessage(resp.message);
            errorNotification(resp.message || '');
            return;
        }


    };


    return (
        <div className='bg-white rounded-xl border shadow-md overflow-hidden p-8'>

            {isOpen &&
                <CategoryModal onClose={handleClose} />
            }


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Product Name */}
                <section className='flex flex-col md:flex-row gap-x-8'>
                    <div className='w-full '>
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Product Name</label>
                            <input
                                type="text"
                                id='name'
                                {...register("name", { required: "Product name is required" })}
                                placeholder='Descriptive product name'
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                                required
                            />
                        </div>
                        {/* Unit Price */}
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Unit Price</label>
                            <input
                                type="number"
                                id='price'
                                {...register("price", { required: "Product price is required" })}
                                placeholder='Product price'
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                                step="0.01"
                                required
                            />
                        </div>
                        {/* Stock Quantity */}
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Stock Quantity</label>
                            <input
                                type="number"
                                id='stock'
                                {...register("stock", { required: "Stock quantity is required" })}
                                placeholder='Available stock quantity'
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                                required
                            />
                        </div>




                    </div>

                    <div className='w-full md:w-2/5 relative'>
                        <div className='bg-gray-100 border-2 border-dashed rounded-xl h-full flex items-center justify-center relative z-10'>
                            {/* Product Image */}
                            <span className='text-gray-400 text-center'>Product Image</span>
                        </div>

                        {/* Input for selecting product image */}
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />

                        {/* Imagen de placeholder */}
                        {/* <Image
                            src={'/images/product-placeholder.png'}
                            width={500}
                            height={500}
                            className='w-full h-full absolute top-0 left-0 z-0 rounded-xl'
                            alt='Product-placeholder'
                        /> */}
                    </div>

                </section>







                <div className='flex flex-col lg:flex-row gap-x-4'>

                    {/* Product Category */}
                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Product Category</label>
                        <div className="flex gap-2">
                            <select
                                id="categoryId"
                                {...register("categoryId", { required: "Selecting a category is required" })}
                                className="block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm text-gray-500 placeholder:text-gray-500"
                                defaultValue=""
                            >
                                <option value="" disabled>Select category</option>
                                {
                                    categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>

                                    ))
                                }
                            </select>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-white bg-demoHover rounded-md hover:bg-demo transition-all duration-300"
                                onClick={handleOpen}
                            >
                                Add
                            </button>

                            {/* <AddCategory /> */}
                        </div>
                    </div>

                    {/* Supplier */}
                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Supplier</label>
                        <select
                            id="supplierId"
                            {...register("supplierId", { required: "Selecting a supplier is required" })}
                            className="block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm text-gray-500 placeholder:text-gray-500"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Select supplier</option>
                            {
                                suppliers.map(supplier => (
                                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>

                                ))
                            }
                        </select>
                    </div>


                </div>


                {/* Product Description */}
                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Product Description</label>
                    <textarea
                        id='description'
                        {...register("description")}
                        placeholder='Detailed product description'
                        className="block w-full h-36 rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col-reverse gap-4 md:flex-row justify-end gap-x-4">
                    <Link href={ROUTES.PRODUCTS} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                        Cancel
                    </Link>
                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-demoHover hover:bg-demo transition-all duration-300 text-white disabled:opacity-50 disabled:pointer-events-none">
                        Add Product
                    </button>
                </div>
            </form>
        </div>


    )
}
