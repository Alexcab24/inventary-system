import { LoginForm } from "@/components/ui/auth/login/LoginForm";
import Image from "next/image";

export default function loginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600">Manage your inventory with efficiency and simplicity</p>
          </div>
          <LoginForm />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
        <div className="relative w-full max-w-lg">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Inventory System</h2>
            <p className="text-white/90 text-lg mb-8">
              Optimize your inventory management with our intuitive and efficient platform.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="text-white text-2xl font-bold mb-2">100%</div>
                <div className="text-white/80 text-sm">Efficiency</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <div className="text-white text-2xl font-bold mb-2">24/7</div>
                <div className="text-white/80 text-sm">Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}