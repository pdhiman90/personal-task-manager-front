// import {createContext,useContext} from "react";

// export const AuthContext = createContext({
//     storeToken: (token: string) => {},
//     removeToken: () => {},
// });


// export const AuthProvider = ({children}:any) => {
//     const storeToken = (token: string) => {
//         localStorage.setItem("Token", token);
//     }

//     const removeToken = () => {
//         localStorage.removeItem("Token");
//     }
  


// return (
//     <AuthContext.Provider value={{storeToken,removeToken}}>
//         {children}
//     </AuthContext.Provider>
// )
// }

// export const useAuth = () => {
//     return useContext(AuthContext);
// }




import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  storeToken: (token: string) => void;
  removeToken: () => void;
}

// Create a default empty context
export const AuthContext = createContext<AuthContextType>({
  storeToken: () => {},
  removeToken: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storeToken = (token: string) => {
    localStorage.setItem("Token", token);
  };

  const removeToken = () => {
    localStorage.removeItem("Token");
  };

  return (
    <AuthContext.Provider value={{ storeToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
