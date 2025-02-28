import { LoginForm } from "@/components/ui/auth/login/LoginForm";
import Image from "next/image";



export default function loginPage() {
    return (
        <>
        <section className="bg-white w-full md:w-3/4 h-screen px-6 sm:px-16 py-16 sm:py-56">
          <div className="p-4 sm:p-7">
            <div className="text-start">
              <h1 className="block text-3xl sm:text-4xl font-medium text-gray-800">Bienvenido/a</h1>
              <h2 className="text-lg sm:text-xl mt-2">Gestiona tu inventario con eficiencia y simplicidad</h2>
            </div>
      
            <div className="mt-5">
              <LoginForm />
            </div>
          </div>
        </section>
      
        <section className="w-full flex justify-center items-center mt-8 sm:mt-0">
          <Image 
            src={'/images/authImage.svg'} 
            width={300} 
            height={300} 
            alt="Auth Image" 
            className="max-w-full sm:max-w-xs" 
          />
        </section>
      </>
      
    )
}