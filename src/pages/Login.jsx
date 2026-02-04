import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="bg-blue-500 text-white w-full py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
