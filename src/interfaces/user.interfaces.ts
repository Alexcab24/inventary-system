
export enum Role {
    user = 'user',
    admin = 'admin',
    contador = 'contador'
 }

 export interface User {
     id: string;
     name: string;
     email: string;
     role: string; 
     companyId: string;
     image?: string | null;
 }
 

 export interface UserById {
     name: string;
     email: string;
     role: Role;
 }
 