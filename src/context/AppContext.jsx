import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const contextValue = {
        user,
        setUser,
        clearUser
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;




