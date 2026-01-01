import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  return { user, loading };
}

/* Fix Memory Leaks in JS */
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks

/* To Use useContext */
/*
  // context/AuthContext.jsx
  import { createContext, useContext, useEffect, useState } from "react";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  const AuthContext = createContext();

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe;
    }, []);

    return (
      <AuthContext.Provider value={{ user, loading }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
  };
*/

/*
  // components/PrivateRoute.jsx
  import { Navigate, Outlet } from "react-router-dom";
  import { useAuth } from "../context/AuthContext";

  export default function PrivateRoute() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
*/

/*
  // Final Flow
  <AuthProvider>
    <Router>
      <PrivateRoute />
    </Router>
  </AuthProvider>
*/
 