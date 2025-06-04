'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ROUTES } from '@/router/routes';
import { errorNotification, successNotification } from '@/components/ui/notification/notifications';
import { registerCompany } from '@/actions/auth/register-company';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerCompanySchema } from '@/schemas/validation/company/registerCompanySchema';
import { LoadingOverlay } from '../../LoadingOverlay';

import type { z } from 'zod';


type FormInputs = z.infer<typeof registerCompanySchema>;

export const RegisterForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const workspace = searchParams.get('workspace');
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
        resolver: zodResolver(registerCompanySchema),
        defaultValues: {
            email: email || '',
            workspace: workspace || ''
        }
    });

    const onSubmit = async (data: FormInputs) => {
        try {
            setIsLoading(true);
            const { company_name, name, email, workspace, password } = data;

            const resp = await registerCompany(company_name, name, email, workspace, password);

            if (resp.ok) {
                successNotification(resp.message);
                router.push(ROUTES.LOGIN);
            } else {
                errorNotification(resp.message);
            }
        } catch (error) {
            errorNotification('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Company Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                        type="text"
                        {...register('company_name')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your company name"
                    />
                    {errors.company_name && (
                        <p className="mt-1 text-sm text-red-600">{errors.company_name.message}</p>
                    )}
                </div>
                {/* User name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        defaultValue={email || ''}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Workspace */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Workspace</label>
                    <div className="relative">
                        <input
                            type="text"
                            {...register('workspace')}
                            defaultValue={workspace || ''}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="my-company"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">.project.com</span>
                    </div>
                    {errors.workspace && (
                        <p className="mt-1 text-sm text-red-600">{errors.workspace.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Create Account
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign in
                    </Link>
                </p>
            </form>
        </>
    );
};
