'use client';

import { ProductWithRelations, User } from "@/interfaces";
import { Category } from "@/interfaces/category.interfaces";
import { Supplier } from "@/interfaces/supplier.interface";
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form";
import { AddCategory } from "../AddCategory";
import { useState } from "react";
import { CategoryModal } from "../CategoryModal";
import { updateProdut } from "@/actions/products/update-product";
import { errorNotification, successNotification } from "../../notification/notifications";
import { useRouter } from "next/navigation";



interface Props {
    userSession?: User;
    productById: ProductWithRelations;
    categories: Category[];
    suppliers: Supplier[];
}


interface FormInputs {
    name: string;
    price: string;
    image: string;
    stock: string;
    categoryId: string;
    supplierId: string;
    description: string;
}


export const FormEdit = ({ userSession, productById, categories, suppliers }: Props) => {

    const { id } = productById;

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);


    const router = useRouter();


    const companyId = userSession?.companyId;

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        defaultValues: {
            ...productById,
            price: productById.price.toString(),
            stock: productById.stock.toString()
        }
    });



    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, price, stock, categoryId, supplierId, description } = data;

        const parsedStock = parseInt(stock, 10);
        const parsedPrice = parseFloat(price);

        if (!companyId) {
            return;
        }

        //server action

        const resp = await updateProdut(id, name, parsedPrice, parsedStock, supplierId, categoryId, description, companyId);



        if (resp.ok) {
            successNotification(resp.message);
            router.push('/dashboard/inventory');
            return;
        } else {
            // setErrorMessage(resp.message);
            errorNotification(resp.message);
            return;
        }

    }

    return (
        <div className='bg-gray-50 rounded-xl shadow-sm overflow-hidden p-8'>

            {isOpen &&
                <CategoryModal onClose={handleClose} />
            }


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Nombre del Producto */}
                <section className='flex flex-col md:flex-row gap-x-8'>
                    <div className='w-full '>
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Nombre del Producto</label>
                            <input
                                type="text"
                                id='name'
                                {...register("name", { required: "El nombre del producto es obligatorio" })}
                                placeholder='Nombre descriptivo del producto'
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                                required
                            />
                        </div>
                        {/* Precio Unitario */}
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Precio Unitario</label>
                            <input
                                type="number"
                                id='price'
                                {...register("price", { required: "El precio del producto es obligatorio" })}
                                placeholder='Precio del producto'
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                                step="0.01"
                                required
                            />
                        </div>
                        {/* Cantidad en Inventario */}
                        <div className="w-full mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Cantidad en Inventario</label>
                            <input
                                type="number"
                                id='stock'
                                {...register("stock", { required: "El nombre del producto es obligatorio" })}
                                placeholder='Cantidad disponible en stock'
                                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                                required
                            />
                        </div>




                    </div>

                    <div className='w-full md:w-2/5 relative'>
                        <div className='bg-gray-100 border-2 border-dashed rounded-xl h-full flex items-center justify-center relative z-10'>
                            {/* Imagen de producto */}
                            <span className='text-gray-400 text-center'>Imagen del Producto</span>
                        </div>

                        {/* Input para seleccionar la imagen del producto */}
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







                <div className='flex gap-x-4'>

                    {/* Categoría del Producto */}
                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Categoría del Producto</label>
                        <div className="flex gap-2">
                            <select
                                id="categoryId"
                                {...register("categoryId", { required: "Seleccionar una categoría es obligatorio" })}
                                className="block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm text-gray-500 placeholder:text-gray-500"
                                defaultValue={productById.category.id || ''}
                            >
                                <option value="" disabled>Seleccionar categoría</option>
                                {
                                    categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>

                                    ))
                                }
                            </select>
                            <button
                                type="button"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                onClick={handleOpen}
                            >
                                Añadir
                            </button>

                            <AddCategory />
                        </div>
                    </div>

                    {/* Proveedor */}
                    <div className="w-full mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Proveedor</label>
                        <select
                            id="supplierId  "
                            {...register("supplierId", { required: "Seleccionar un proveedor es obligatorio" })}
                            className="block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm text-gray-500 placeholder:text-gray-500"
                            defaultValue={productById.supplier.id || ''}
                            required
                        >
                            <option value="" disabled>Seleccionar un proveedor</option>
                            {
                                suppliers.map(supplier => (
                                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>

                                ))
                            }
                        </select>
                    </div>


                </div>


                {/* Descripción del Producto */}
                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Descripción del Producto</label>
                    <textarea
                        id='description'
                        {...register("description")}
                        placeholder='Descripción detallada del producto'
                        className="block w-full h-36 rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-500 placeholder:text-gray-500"
                    />
                </div>

                {/* Botón de envío */}
                <div className="flex flex-col md:flex-row justify-end gap-x-4">
                    <Link href={'/inventory'} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                        Cancelar
                    </Link>
                    <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        Agregar Producto
                    </button>
                </div>
            </form>
        </div>

    )
}


