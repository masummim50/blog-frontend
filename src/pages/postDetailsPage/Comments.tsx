
import { Comment } from './PostDetailsPage';
import CommentCard from './CommentCard';

const Comments = ({comments}:{comments:Comment[]}) => {
    return (
        <div className='bg-gray-200 text-black dark:text-white dark:bg-gray-700 pt-3 pb-10  px-4 sm:px-6 md:px-10'>
            <h2 className='font-semibold  mb-3'>{comments.length} Comment{comments.length > 1 ? 's' : ''}</h2>
            {/* {JSON.stringify(comments)} */}
            {
                comments.map((comment) => (
                    <CommentCard comment={comment} />
                ))
            }
        </div>
    );
};

export default Comments;