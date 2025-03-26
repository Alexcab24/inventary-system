'use client';

import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
import { Spinner } from "../../Spinner";
import { authenticate } from "@/actions/auth/login";
import { FiMail, FiLock } from "react-icons/fi";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="your@email.com"
            required
            aria-describedby="email-error"
          />
        </div>
        <p className="hidden text-xs text-red-600 mt-1" id="email-error">
          Please enter a valid email address
        </p>
      </div>

      {/* Password Input */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <a
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            href="#"
          >
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
            aria-describedby="password-error"
          />
        </div>
        <p className="hidden text-xs text-red-600 mt-1" id="password-error">
          Password must be at least 8 characters
        </p>
      </div>

      {/* Login Button */}
      <LoginButton />

      {/* Error Message */}
      {state === "Invalid credentials." && (
        <div className="rounded-lg bg-red-50 p-4 flex items-center gap-2">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">
            Invalid email or password. Please try again!
          </p>
        </div>
      )}
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm":
          !pending,
        "w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 font-medium rounded-lg text-white bg-gray-400 cursor-not-allowed":
          pending,
      })}
      disabled={pending}
    >
      {pending ? (
        <>
          <Spinner />
          <span>Signing in...</span>
        </>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
