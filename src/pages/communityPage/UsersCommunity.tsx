import React from 'react';
import useAuthStore from '../../zustand/authStore';

const UsersCommunity = () => {
    const userId = useAuthStore((state)=> state.auth.id);
    
    return (
        <div>
            
        </div>
    );
};

export default UsersCommunity;