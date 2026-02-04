import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful!");
    } catch (error) {
      alert("Signup Failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>

        <form onSubmit={handleSignup} className="space-y-3">
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

          <button className="bg-green-500 text-white w-full py-2 rounded">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
