'use client';

import { useEffect, useState } from 'react';

interface Props {
    isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: Props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setShow(true);
        } else {
            const timer = setTimeout(() => {
                setShow(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="text-gray-700 font-medium">Loading...</p>
            </div>
        </div>
    );
}; 