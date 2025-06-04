export interface Company {
    workspace: string;
    name: string;
    email: string;
    phone?: string | null;
    logotype?: string | null;
    address?: string | null;
    description?: string | null;
}