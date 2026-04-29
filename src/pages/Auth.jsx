import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div>
          <img src="/logo.png" alt="Spottr Logo" className="logo" />
        </div>
        <div className="title">{isLogin ? "Login" : "Create Account"}</div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p
          style={{ marginTop: 10, cursor: "pointer", color: "#2e7d32" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Already have an account?"}
        </p>
      </div>
    </div>
  );
}
