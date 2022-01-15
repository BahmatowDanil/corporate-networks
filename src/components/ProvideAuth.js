import { useProvideAuth } from "../hooks/useProvideAuth";
import { AuthContext } from "../contexts/AuthContext";

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}