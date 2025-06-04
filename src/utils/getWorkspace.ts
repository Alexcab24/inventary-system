'use client';

export const getWorkspace = async (): Promise<string> => {
    const fullUrl = window.location.href;
    console.log(fullUrl);

    // Ejemplo: si tu dominio es "workspace1.misitio.com"
    const host = window.location.hostname; // workspace1.misitio.com
    const workspace = host.split('.')[0];  // workspace1

    return workspace;
};