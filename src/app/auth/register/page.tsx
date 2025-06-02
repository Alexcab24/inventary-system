import { RegisterForm } from "@/components/ui/auth/register/RegisterForm";
import Image from "next/image";

export default function registerPage() {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Register Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-600">Register your company and start managing your inventory efficiently</p>
                    </div>
                    <RegisterForm />
                </div>
            </div>

            {/* Right side - Image and Features */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 items-center justify-center p-12">
                <div className="relative w-full max-w-lg">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
                    <div className="relative p-8">
                        <h2 className="text-3xl font-bold text-white mb-4">Inventory System</h2>
                        <p className="text-white/90 text-lg mb-8">
                            Take control of your inventory with our powerful and intuitive platform.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="text-white text-2xl font-bold mb-2">Real-time</div>
                                <div className="text-white/80 text-sm">Tracking</div>
                            </div>
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                <div className="text-white text-2xl font-bold mb-2">Smart</div>
                                <div className="text-white/80 text-sm">Analytics</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}