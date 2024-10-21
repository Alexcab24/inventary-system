import bcryptjs from 'bcryptjs';

interface SeedUsers {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'contador';
    companyId: string;
};

interface SeedCompany {
    id_tenant: string;
    name: string;
    phone: string;
    email: string;
    // createdAt: Date;
};

interface SeedData {
    users: SeedUsers[];
    companies: SeedCompany[]
};


export const initialData: SeedData = {
    users: [
        {
            name: 'Alex Cabral',
            email: 'acabral2442@google.com',
            password: bcryptjs.hashSync('alex123'),
            role: 'admin',
            companyId: 'subdomain'
        },
        {
            name: 'Vielka Ami',
            email: 'vielka@google.com',
            password: bcryptjs.hashSync('vielka123'),
            role: 'user',
            companyId: 'subdomain'
        },
        {
            name: 'María Gómez',
            email: 'maria.gomez@google.com',
            password: bcryptjs.hashSync('maria456'),
            role: 'user',
            companyId: 'subdomain'
        },
        {
            name: 'Juan Pérez',
            email: 'juan.perez@google.com',
            password: bcryptjs.hashSync('juan789'),
            role: 'user',
            companyId: 'subdomain'
        },
        {
            name: 'Laura Sánchez',
            email: 'laura.sanchez@google.com',
            password: bcryptjs.hashSync('laura101'),
            role: 'admin',
            companyId: 'subdomain'
        },
        {
            name: 'Carlos Medina',
            email: 'carlos.medina@google.com',
            password: bcryptjs.hashSync('carlos202'),
            role: 'user',
            companyId: 'subdomain'
        },
        {
            name: 'Ana López',
            email: 'ana.lopez@google.com',
            password: bcryptjs.hashSync('ana303'),
            role: 'user',
            companyId: 'subdomain'
        },
        {
            name: 'Pedro Martínez',
            email: 'pedro.martinez@google.com',
            password: bcryptjs.hashSync('pedro404'),
            role: 'user',
            companyId: 'subdomain'
        },
        {
            name: 'Sofía Hernández',
            email: 'sofia.hernandez@google.com',
            password: bcryptjs.hashSync('sofia505'),
            role: 'user',
            companyId: 'subdomain'
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

    companies: [
        {
            id_tenant: 'subdomain',
            name: 'Subdomain Company',
            phone: '8091231234',
            email: 'subdomain@google.com',
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