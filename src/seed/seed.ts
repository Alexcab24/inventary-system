import bcryptjs from 'bcryptjs';

interface SeedUsers {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'contador';
    companyId: string;
};

interface SeedCategory {
    name: string;
    companyId: string;
}

interface SeedProducts {
    name: string;
    // image: string;
    description?: string;
    price: number;
    stock: number;
    createdAt: Date;
    companyId: string;
}
interface SeedSupplier {
    name: string;
    email: string;
    phone: string;
    address: string;
    companyId: string;
}
interface SeedCompany {
    id_tenant: string;
    name: string;
    phone: string;
    email: string;
    // createdAt: Date;
};

interface SeedData {
    users: SeedUsers[];
    companies: SeedCompany[];
    category: SeedCategory[];
    products: SeedProducts[];
    suppliers: SeedSupplier[];
};


export const initialData: SeedData = {
    users: [
        {
            name: 'Alex Cabral',
            email: 'acabral2442@google.com',
            password: bcryptjs.hashSync('alex123'),
            role: 'admin',
            companyId: 'testcompany'
        },
        {
            name: 'Vielka Ami',
            email: 'vielka@google.com',
            password: bcryptjs.hashSync('vielka123'),
            role: 'user',
            companyId: 'testcompany'
        },
        {
            name: 'María Gómez',
            email: 'maria.gomez@google.com',
            password: bcryptjs.hashSync('maria456'),
            role: 'user',
            companyId: 'testcompany'
        },
        {
            name: 'Juan Pérez',
            email: 'juan.perez@google.com',
            password: bcryptjs.hashSync('juan789'),
            role: 'user',
            companyId: 'testcompany'
        },
        {
            name: 'Laura Sánchez',
            email: 'laura.sanchez@google.com',
            password: bcryptjs.hashSync('laura101'),
            role: 'admin',
            companyId: 'testcompany'
        },
        {
            name: 'Carlos Medina',
            email: 'carlos.medina@google.com',
            password: bcryptjs.hashSync('carlos202'),
            role: 'user',
            companyId: 'testcompany'
        },
        {
            name: 'Ana López',
            email: 'ana.lopez@google.com',
            password: bcryptjs.hashSync('ana303'),
            role: 'user',
            companyId: 'testcompany'
        },
        {
            name: 'Pedro Martínez',
            email: 'pedro.martinez@google.com',
            password: bcryptjs.hashSync('pedro404'),
            role: 'user',
            companyId: 'testcompany'
        },
        {
            name: 'Sofía Hernández',
            email: 'sofia.hernandez@google.com',
            password: bcryptjs.hashSync('sofia505'),
            role: 'user',
            companyId: 'testcompany'
        },
        {
            name: 'Luis Fernández',
            email: 'luis.fernandez@google.com',
            password: bcryptjs.hashSync('luis606'),
            role: 'user',
            companyId: 'subdomain'
        },
        {
            name: 'Elena Torres',
            email: 'elena.torres@google.com',
            password: bcryptjs.hashSync('elena707'),
            role: 'admin',
            companyId: 'subdomain'
        },
        {
            name: 'Eduardo Cabral',
            email: 'eduardo@google.com',
            password: bcryptjs.hashSync('123456'),
            role: 'admin',
            companyId: 'proyectomidas'
        }
    ],


    suppliers: [
        {
            name: "Proveedor A",
            email: "proveedora@google.com",
            phone: "8091234567",
            address: "Calle Principal #1",

            companyId: 'subdomain'
        },
        {
            name: "Proveedor B",
            email: "proveedorb@google.com",
            phone: "8091234567",
            address: "Calle Principal #2",
            companyId: 'subdomain'
        },
        {
            name: "Proveedor C",
            email: "proveedorc@google.com",
            phone: "8091234567",
            address: "Calle Principal #3",
            companyId: 'subdomain'
        },
    ], category: [
        { name: 'Tecnología', companyId: 'testcompany' },
        { name: 'Cosméticos', companyId: 'testcompany' },
        { name: 'Hogar', companyId: 'testcompany' },
        { name: 'Deportes', companyId: 'testcompany' }
    ],

    products: [
        { name: "Laptop", description: "Laptop de alta gama", price: 1200.99, stock: 5, createdAt: new Date(), companyId: 'testcompany' },
        { name: "Perfume", description: "Perfume exclusivo", price: 75.50, stock: 20, createdAt: new Date(), companyId: 'testcompany' },
        { name: "Sofá", description: "Sofá de cuero", price: 500.00, stock: 3, createdAt: new Date(), companyId: 'testcompany' },
        { name: "Bicicleta", description: "Bicicleta de montaña", price: 300.00, stock: 10, createdAt: new Date(), companyId: 'testcompany' }
    ],


    companies: [
        {
            id_tenant: 'testcompany',
            name: 'Test Company',
            phone: '8091231234',
            email: 'testcompany@google.com',
            // createdAt: new Date()
        },
        {
            id_tenant: 'proyectomidas',
            name: 'Proyecto Midas',
            phone: '8091231234',
            email: 'proyectomidas@google.com',
            // createdAt: new Date()
        }
    ]


}