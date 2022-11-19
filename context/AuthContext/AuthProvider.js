import React, { createContext } from 'react';
import useStore from '../../hooks/useStore';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const allContext = useStore();
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;