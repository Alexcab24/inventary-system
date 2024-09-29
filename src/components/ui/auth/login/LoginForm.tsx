'use client';

import { authenticate } from "@/actions";
import { useFormState } from "react-dom";

export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined)
    console.log({state})
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
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />
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
                            <a className="inline-flex items-center gap-x-1 text-sm text-midas decoration-2 hover:underline focus:outline-none focus:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="password-error"
                            />
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                    </div>
                    {/* <!-- End Form Group -->

                                <!-- Checkbox --> */}
                    {/* <div className="flex items-center">
                                <div className="flex">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500" />
                                </div>
                                <div className="ms-3">
                                    <label className="text-sm">Remember me</label>
                                </div>
                            </div> */}
                    {/* <!-- End Checkbox --> */}

                    <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-midas text-white hover:bg-midasHover focus:outline-none focus:bg-midas disabled:opacity-50 disabled:pointer-events-none transition-all">Iniciar sesión</button>

                </div>
            </form>
            {/* <!-- End Form --> */}
        </>
    )
}
