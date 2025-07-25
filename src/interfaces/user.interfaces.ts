export enum Role {
    user = 'user',
    admin = 'admin',
    contador = 'contador'
}

export interface User {
    id?: string;
    name: string;
    password?: string;
    email: string;
    role: string;
    companyId: string;
    image?: string | null;
    disabled?: boolean;
}


export interface UserById {
    id: string;
    name: string;
    email: string;
    role: Role;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    image?: string | null;
}



