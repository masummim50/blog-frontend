import React from 'react';
import CreateCommunitySection from './CreateCommunitySection';
import useAuthStore from '../../zustand/authStore';
import UsersCommunity from './UsersCommunity';

const CommunityPage = () => {
    const userId = useAuthStore((state)=> state.auth.id);
    // community page logic
    // if user logged in show a create button else don't
    // if user is logged in and has created any community show a section or else show that they dont have their own community
    // if user is logged in and has joined any community show a section or else show that they havent joined any community
    // show a full list of community cards, if none, say oops there is no community available at this moment, create one?

    return (
        <div className='l d pt-7 mw px-2 min-h-[100vh]'>
            <CreateCommunitySection/>
            {
                userId && <UsersCommunity/>
            }
        </div>
    );
};

export default CommunityPage;