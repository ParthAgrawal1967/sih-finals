import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginAndRedirect = async (loginEmail, loginPassword) => {
    setError("");
    setIsLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setError(error.message);
      setIsLoggingIn(false);
      return;
    }

    window.location.href = "/tariff-simulation-builder";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginAndRedirect(email, password);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">

      {/* LEFT PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:pl-40 lg:pr-0 py-12 lg:py-0">
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-600 mb-1">Palm Tariff AI</h1>

        <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 leading-tight mt-4 lg:mt-8">
          Simulate Today.<br/> Stabilize Tomorrow.
        </h2>

        <p className="text-gray-600 mt-2 text-sm lg:text-base">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleLogin} className="mt-6 lg:mt-10 space-y-6 w-full max-w-xs lg:w-80">

          {/* Email */}
          <div className="border border-gray-300 rounded-lg flex items-center px-3">
            <Mail size={18} className="text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full py-3 px-2 focus:outline-none text-gray-700 text-sm lg:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="border border-gray-300 rounded-lg flex items-center px-3">
            <Lock size={18} className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 px-2 focus:outline-none text-gray-700 text-sm lg:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-100 border border-red-300 py-2 px-3 rounded-md">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="bg-blue-900 hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium w-full py-3 rounded-md transition shadow-sm text-sm lg:text-base"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Login as Guest */}
        <div className="mt-6 lg:mt-8 w-full max-w-xs lg:w-80">
          <p className="text-sm font-semibold text-gray-700 mb-3">Login as Guest</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isLoggingIn}
              onClick={() => loginAndRedirect("parth111@gmail.com", "parth111")}
              className="rounded-md border border-blue-200 bg-blue-50 text-blue-800 font-medium py-2 hover:bg-blue-100 disabled:opacity-60 disabled:cursor-not-allowed transition text-xs lg:text-sm"
            >
              User Mode
            </button>
            <button
              type="button"
              disabled={isLoggingIn}
              onClick={() => loginAndRedirect("admin@example.com", "admin123")}
              className="rounded-md border border-indigo-200 bg-indigo-50 text-indigo-800 font-medium py-2 hover:bg-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed transition text-xs lg:text-sm"
            >
              Admin Mode
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (Illustration) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 lg:pr-35 overflow-hidden min-h-[300px] lg:min-h-screen">
        <img
          src="https://www.presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png"
          alt="login illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
