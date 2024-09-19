import  { useEffect } from 'react';
import MyEditor from './MyEditor';
import useBoundStore from '../../zustand/store';

const CreatePostPage = () => {
    const removeCommunity = useBoundStore((state)=> state.removeCommunity)

    useEffect(() => {

        return () => {
          removeCommunity();
        };
      }, []);
    
    return (
        <div className='mw pt-6'>
            <MyEditor/>
        </div>
    );
};

export default CreatePostPage;