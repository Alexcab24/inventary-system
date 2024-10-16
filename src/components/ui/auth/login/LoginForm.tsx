'use client';


import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
import { Spinner } from "../../Spinner";
import { authenticate } from "@/actions/auth/login";




export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined)



    return (
        <>
            {/* <!-- Form --> */}
            <form action={dispatch}>
                <div className="grid gap-y-4">
                    {/* <!-- Form Group --> */}
                    <div>
                        <label className="block text-sm mb-2">Email</label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                    </div>
                    {/* <!-- End Form Group -->

          <!-- Form Group --> */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="block text-sm mb-2">Contraseña</label>
                            <a className="inline-flex items-center gap-x-1 text-sm text-midas decoration-2 hover:underline focus:outline-none focus:underline font-medium" href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="password-error"
                            />
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                    </div>



                    <LoginButton />
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {state === "Invalid credentials." && (
                            <div className="flex flex-row mb-2">
                                <IoInformationOutline className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">
                                    Email o contraseña inválida. ¡Inténtalo de nuevo!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
            {/* <!-- End Form --> */}
        </>
    )
}


function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "w-full py-3 px-4 inline-flex justify-center items-center gap-x-2  font-medium rounded-lg border border-transparent bg-midas text-lg text-white hover:bg-midasHover focus:outline-none focus:bg-midas disabled:opacity-50 disabled:pointer-events-none transition-all": !pending,
                "w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-200 text-white focus:outline-none focus:bg-gray-700  disabled:pointer-events-none transition-all": pending
            })}
            disabled={pending}
        >
            {pending ? <Spinner /> : 'Iniciar sesión'}

        </button>
    );
}
