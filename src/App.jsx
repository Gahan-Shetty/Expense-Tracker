import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import "./styles.css";

function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (!user) {
    return (
      <div className="p-6">
        {isSignup ? <Signup /> : <Login />}

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            className="bg-gray-200 px-3 py-1 rounded"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Go to Login" : "Go to Signup"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => signOut(auth)}
      >
        Logout
      </button>

      <Dashboard />
    </div>
  );
}

export default App;
