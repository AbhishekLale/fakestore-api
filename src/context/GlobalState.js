import React, { createContext, useReducer } from 'react';
import appReducer from './AppReducer';

const initialState = {
    products: []
};



export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <GlobalContext.Provider value={[state,dispatch]}>
            {children}
        </GlobalContext.Provider>
    );
};