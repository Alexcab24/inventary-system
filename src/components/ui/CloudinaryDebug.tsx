'use client';

import { checkCloudinaryStatus } from "@/actions/products/check-cloudinary-status";
import { useState } from "react";

export const CloudinaryDebug = () => {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const checkStatus = async () => {
        setLoading(true);
        try {
            const result = await checkCloudinaryStatus();
            setStatus(result);
        } catch (error) {
            setStatus({
                ok: false,
                message: 'Error al verificar estado',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Debug Cloudinary</h3>

            <button
                onClick={checkStatus}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? 'Verificando...' : 'Verificar Estado'}
            </button>

            {status && (
                <div className="mt-4 space-y-2">
                    <div className={`p-3 rounded ${status.ok ? 'bg-green-100' : 'bg-red-100'}`}>
                        <p className="font-medium">{status.message}</p>
                    </div>

                    {status.environment && (
                        <div className="bg-white p-3 rounded border">
                            <h4 className="font-medium mb-2">Variables de Entorno:</h4>
                            <ul className="space-y-1 text-sm">
                                <li>CLOUDINARY_URL: {status.environment.hasCloudinaryUrl ? '✅' : '❌'}</li>
                                <li>CLOUDINARY_CLOUD_NAME: {status.environment.hasCloudName ? '✅' : '❌'}</li>
                                <li>CLOUDINARY_API_KEY: {status.environment.hasApiKey ? '✅' : '❌'}</li>
                                <li>CLOUDINARY_API_SECRET: {status.environment.hasApiSecret ? '✅' : '❌'}</li>
                            </ul>
                        </div>
                    )}

                    {status.error && (
                        <div className="bg-red-100 p-3 rounded">
                            <p className="text-red-800 text-sm">{status.error}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}; 