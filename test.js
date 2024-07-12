import { createContext, useState } from "react";

// Create FirebaseContext and AuthContext
export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

// Define the Context component
export default function Context({ children }) {
    const [user, setUser] = useState('Hello'); // Initialize user state

    return (
        // Provide the user state to the AuthContext.Provider
        <AuthContext.Provider value={{ user }}>
            {children} {/* Render the children inside the Provider */}
        </AuthContext.Provider>
    );
}
