import React from 'react';
import { Comment } from './PostDetailsPage';
import CommentCard from './CommentCard';

const Comments = ({comments}:{comments:Comment[]}) => {
    return (
        <div className='bg-gray-700 py-3  px-4 sm:px-6 md:px-10 mt-3'>
            <h2 className='font-semibold text-white'>{comments.length} Comment{comments.length > 1 ? 's' : ''}</h2>
            {JSON.stringify(comments)}
            {
                comments.map((comment) => (
                    <CommentCard comment={comment} />
                ))
            }
        </div>
    );
};

export default Comments;