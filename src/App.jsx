import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Auth />;

  return (
    <div>
      <div style={{ padding: 10, textAlign: "right" }}>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>

      <Dashboard />
    </div>
  );
}
