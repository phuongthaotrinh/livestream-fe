import React, { createContext, useContext } from 'react';
import PlatformContext from "@/lib/context/PlatformProvider";



export const usePlatform = () => {
    const context = useContext(PlatformContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};