import { initialData } from "./seed";
import prisma from '../lib/prisma';



async function main() {
    try {
        await prisma.user.deleteMany();
        await prisma.company.deleteMany();

        const { companies, users } = initialData; 

   
        await prisma.company.createMany({
            data: companies,
        });


        await prisma.user.createMany({
            data: users,
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