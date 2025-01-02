import { initialData } from "./seed";
import prisma from '../lib/prisma';



async function main() {
    try {
        await prisma.user.deleteMany();
        await prisma.products.deleteMany();
        await prisma.supplier.deleteMany();
        await prisma.company.deleteMany();

        const { companies, users, products, suppliers } = initialData;


        await prisma.company.createMany({
            data: companies,
        });


        const insertedSuppliers = await prisma.supplier.createMany({
            data: suppliers
        });


        const allSuppliers = await prisma.supplier.findMany();

        const productsWithSupplierId = products.map((product, index) => ({
            ...product,
            supplierId: allSuppliers[index % allSuppliers.length]?.id,
        }));

        await prisma.user.createMany({
            data: users,
        });

        await prisma.products.createMany({
            data: productsWithSupplierId,
        });


        console.log('seed executed');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main()
})();