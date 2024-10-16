
export const RegisterForm = () => {
    return (
        <>
            {/* <!-- Form --> */}
            <form>
                <div className="grid gap-y-4">
                    {/* <!-- Form Group --> */}
                    <div>
                        <label className="block text-sm text-gray-700 font-semibold mb-2">Nombre</label>
                        <div className="relative">
                            <input type="text" id="name" name="name" className="py-3 px-4 block w-full  bg-gray-100 border-2 border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />

                        </div>
                        <span className="text-sm text-gray-500">Ingrese el nombre de la empresa</span>

                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 font-semibold mb-2">Email</label>
                        <div className="relative">
                            <input type="email" id="email" name="email" className="py-3 px-4 block w-full bg-gray-100 border-2 border-gray-300  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" required aria-describedby="email-error" />
                        </div>
                        <span className="text-sm text-gray-500">Ingrese el email de la empresa</span>
                    </div>

                    {/* <!-- End Form Group -->

          <!-- Form Group --> */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label className="block text-sm text-gray-700 font-semibold mb-2">Espacio de trabajo</label>
                        </div>
                        <div className="relative">
                            <input type="text" id="work-space" name="work-space" className=" py-3 px-4 block w-full bg-gray-100 border-2 border-gray-300  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="nombre-de-mi-empresa" required aria-describedby="password-error" />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 " >.proyecto.com</span>
                            <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">Ingrese su espacio de trabajo (nombre de su empresa)</span>
                    </div>

                    <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-lg font-medium rounded-lg border border-transparent bg-midas text-white hover:bg-midasHover focus:outline-none focus:bg-midas disabled:opacity-50 disabled:pointer-events-none transition-all">Siguiente</button>
                </div>
            </form>
            {/* <!-- End Form --> */}
        </>
    )
}
