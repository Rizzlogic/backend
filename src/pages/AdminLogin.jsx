import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function AdminLogin() {
  const { setIsAdminLoggedIn } = useCart();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAdminLoggedIn(true);
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
      setTimeout(() => setError(""), 2000);
    }
  };

  const inputClass =
    "w-full border-2 border-black p-3 font-bold text-sm outline-none focus:shadow-[2px_2px_0px_#000] transition-shadow";

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#FFFDF9" }}
    >
      <form
        onSubmit={handleLogin}
        className="border-4 border-black shadow-[6px_6px_0px_#000] bg-white p-8 w-full max-w-sm mx-4 space-y-4"
      >
        <h2 className="text-2xl font-black uppercase text-center">Admin Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputClass}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required
        />
        {error && (
          <p className="text-xs font-bold uppercase text-red-600 text-center">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full py-3 font-black uppercase border-2 border-black 
                     bg-yellow-300 shadow-[3px_3px_0px_#000] 
                     hover:translate-x-[1px] hover:translate-y-[1px] 
                     hover:shadow-none transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
}