import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Loading from "./components/Loading";
import Login from "./components/Login";
import nookies from "nookies";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        nookies.destroy(undefined, "token", token, {});
        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(true);
      nookies.set(undefined, "token", token, {});
      if (token) {
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return <Loading type="bubbles" color="yellowgreen" />;
  }
  if (!currentUser) {
    return <Login />;
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useAuth = () => useContext(AuthContext);
