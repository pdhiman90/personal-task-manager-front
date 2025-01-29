import {createContext,useContext} from "react";

export const AuthContext = createContext({
    storeToken: (token: string) => {},
    removeToken: () => {},
});


export const AuthProvider = ({children}:any) => {
    const storeToken = (token: string) => {
        localStorage.setItem("Token", token);
    }

    const removeToken = () => {
        localStorage.removeItem("Token");
    }
  


return (
    <AuthContext.Provider value={{storeToken,removeToken}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => {
    return useContext(AuthContext);
}