import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollResetWrapper = ({children}: {children: React.ReactNode}) => {
    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'instant'})
    }, [location.pathname])
    return (
        children
    );
};

export default ScrollResetWrapper;