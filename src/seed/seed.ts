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
    workspace: string;
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
        // Usuarios para Subdomain Company
        { name: 'Alex Cabral', email: 'acabral2442@google.com', password: bcryptjs.hashSync('alex123'), role: 'admin', companyId: 'testcompany' },
        { name: 'Vielka Ami', email: 'vielka@google.com', password: bcryptjs.hashSync('vielka123'), role: 'user', companyId: 'testcompany' },
        { name: 'Eduardo Cabral', email: 'eduardo@google.com', password: bcryptjs.hashSync('123456'), role: 'admin', companyId: 'subdomain' },
        
        // Usuarios para nuevas compañías
        { name: 'Javier Nuñez', email: 'javier@empresa1.com', password: bcryptjs.hashSync('empresa1123'), role: 'admin', companyId: 'testcompany' },
        { name: 'Mariana López', email: 'mariana@empresa1.com', password: bcryptjs.hashSync('empresa1456'), role: 'user', companyId: 'testcompany' },
        { name: 'Roberto Díaz', email: 'roberto@empresa2.com', password: bcryptjs.hashSync('empresa2123'), role: 'admin', companyId: 'testcompany' },
        { name: 'Andrea Pérez', email: 'andrea@empresa2.com', password: bcryptjs.hashSync('empresa2456'), role: 'user', companyId: 'testcompany' },
        { name: 'Carlos Suárez', email: 'carlos@empresa3.com', password: bcryptjs.hashSync('empresa3123'), role: 'admin', companyId: 'testcompany' },
        { name: 'Lucía González', email: 'lucia@empresa3.com', password: bcryptjs.hashSync('empresa3456'), role: 'user', companyId: 'testcompany' }
    ],

    suppliers: [
        { name: "Proveedor A", email: "proveedora@google.com", phone: "8091234567", address: "Calle Principal #1", companyId: 'testcompany' },
        { name: "Proveedor B", email: "proveedorb@google.com", phone: "8091234567", address: "Calle Principal #2", companyId: 'testcompany' },
        { name: "Proveedor C", email: "proveedorc@google.com", phone: "8091234567", address: "Calle Principal #3", companyId: 'testcompany' },
        { name: "Proveedor D", email: "proveedord@google.com", phone: "8091234567", address: "Calle Principal #4", companyId: 'testcompany' }
    ],

    category: [
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
        { workspace: 'testcompany', name: 'Subdomain Company', phone: '8091231234', email: 'subdomain@google.com' },
        { workspace: 'subdomain', name: 'Empresa Uno', phone: '8095551111', email: 'contacto@empresa1.com' },
        { workspace: 'empresa2', name: 'Empresa Dos', phone: '8095552222', email: 'contacto@empresa2.com' },
        { workspace: 'empresa3', name: 'Empresa Tres', phone: '8095553333', email: 'contacto@empresa3.com' }
    ]
    


}