'use client';

import { toast } from 'nextjs-toast-notify';




export const errorNotification = (message: string) => {

    toast.error(message, {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
        sonido: false,
    });

}

export const successNotification = (message: string) => {

    toast.success(message, {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "bounceIn",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>',
        sonido: false,
    });

}

