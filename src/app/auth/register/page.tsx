import { RegisterForm } from "@/components/ui/auth/register/RegisterForm";
import Image from "next/image";



export default function registerPage() {
    return (
        <>
        <section className=" bg-white w-3/4 h-screen px-16 py-56">
            <div className="p-4 sm:p-7">
                <div className="text-start">
                    <h1 className="block text-4xl font-semibold text-gray-700">Bienvenido/a</h1>
                    <h2>Registra tu empresa y lleva tu facturación de una forma inteligente </h2>

                </div>

                <div className="mt-5">
                    <RegisterForm />
                </div>
            </div>
        </section>

        <section className="w-full flex justify-center items-center">
            <Image src={'/images/authImage.svg'} width={500} height={500} alt="Auth Image" />
        </section>
    </>
    )
}