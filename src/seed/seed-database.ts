import { initialData } from "./seed";
import prisma from '../lib/prisma';



async function main() {
    try {
        await prisma.user.deleteMany();
        await prisma.products.deleteMany();
        await prisma.supplier.deleteMany();
        await prisma.category.deleteMany();
        await prisma.company.deleteMany();
        await prisma.productMovement.deleteMany();

        const { companies, users, products, suppliers, category } = initialData;


        await prisma.company.createMany({
            data: companies,
        });

        const insertedCategory = await prisma.category.createMany({
            data: category
        })


        const allCategories = await prisma.category.findMany();

        const insertedSuppliers = await prisma.supplier.createMany({
            data: suppliers
        });



        const allSuppliers = await prisma.supplier.findMany();

        const productsWithNewId = products.map((product, index) => ({
            ...product,
            supplierId: allSuppliers[index % allSuppliers.length]?.id,
            categoryId: allCategories[index % allCategories.length]?.id,
        }));

        await prisma.user.createMany({
            data: users,
        });

        const createdProducts = await prisma.products.createMany({
            data: productsWithNewId,
        });

        const allProducts = await prisma.products.findMany();

        // Create movements for each product
        await Promise.all(
            allProducts.map((product) =>
                prisma.productMovement.create({
                    data: {
                        type: 'Inbound',
                        company: {
                            connect: {
                                workspace: companies[0].workspace
                            }
                        },
                        product: {
                            connect: {
                                id: product.id
                            }
                        }
                    }
                })
            )
        );

        console.log('seed executed');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main()
})();