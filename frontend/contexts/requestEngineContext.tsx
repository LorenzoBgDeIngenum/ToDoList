import React, { createContext, useContext, useMemo } from 'react';
import { RequestEngine } from '@/models/requestEngine'; // Adjust the path if necessary

// Create a context with a default value
const RequestEngineContext = createContext<RequestEngine | undefined>(undefined);

// Create a provider that exposes an instance of RequestEngine to all child components
export const RequestEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const requestEngine = useMemo(() => new RequestEngine(), []); // Memoize to avoid recreating the instance on every render

    return (
        <RequestEngineContext.Provider value={requestEngine}>
            {children}
        </RequestEngineContext.Provider>
    );
};

// Custom hook to use RequestEngine
export const useRequestEngine = (): RequestEngine => {
    const context = useContext(RequestEngineContext);
    if (context === undefined) {
        throw new Error('useRequestEngine must be used within a RequestEngineProvider');
    }
    return context;
};