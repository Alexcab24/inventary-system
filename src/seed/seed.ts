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
            email: 'alex@google.com',
            password: bcryptjs.hashSync('123456'),
            role: 'admin',
            companyId: 'subdomain'
        },
        {
            name: 'Eduardo Cabral',
            email: 'eduardo@google.com',
            password: bcryptjs.hashSync('123456'),
            role: 'user',
            companyId: 'subdomain'
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
            id_tenant: 'subdomain2',
            name: 'Subdomain Company2',
            phone: '8091231234',
            email: 'subdomain2@google.com',
            // createdAt: new Date()
        }
    ]
}