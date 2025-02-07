import React, { createContext, useContext, useMemo } from 'react';

import { RequestEngine } from '@/models/requestEngine'; 

const RequestEngineContext = createContext<RequestEngine | undefined>(undefined);

export const RequestEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const requestEngine = useMemo(() => new RequestEngine(), []); 

    return (
        <RequestEngineContext.Provider value={requestEngine}>
            {children}
        </RequestEngineContext.Provider>
    );
};

export const useRequestEngine = (): RequestEngine => {
    const context = useContext(RequestEngineContext);
    if (context === undefined) {
        throw new Error('useRequestEngine must be used within a RequestEngineProvider');
    }
    return context;
};