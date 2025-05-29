
export default async function movementsPage() {
    return (
        <>
            {/* <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 py-4">
                <Card title="Productos en Stock" value={ProductsWithStock} icon={MdInventory} />
                <Card title="Productos sin Stock" value={ProductsWithoutStock} icon={MdRemoveShoppingCart} />
                <Card title="Total de Productos" value={totalProducts} icon={AiOutlineAppstore} />
            </section> */}

            {/* <section className="my-8 bg-white p-6 border shadow-sm rounded-xl">
                <div className=" py-4 grid gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Inventario de productos
                        </h2>
                        <p className="text-sm text-gray-600">
                            Agrega productos, edita y más
                        </p>
                    </div>

                    <div className="flex justify-between items-center gap-3 w-full mt-4">
                        <Search placeholder="Buscar productos..." />
                        <CreateButton label="Agregar Articulo" url={ROUTES.CREATE_PRODUCT} />
                    </div>
                </div>

                <Suspense key={query} fallback={<TableSkeleton />}>
                    <ProductsContainer query={query} page={page} />
                </Suspense>


            </section> */}
            <h1>Hola mundo</h1>
        </>

    )


}