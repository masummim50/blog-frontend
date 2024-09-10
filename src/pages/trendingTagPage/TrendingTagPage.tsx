import React from 'react';
import BlogPostsContainer from '../../components/BlogPostsContainer/BlogPostsContainer';
import { useParams } from 'react-router-dom';

const TrendingTagPage = () => {
    const {tag}= useParams()
    return (
        <div className='mw min-h-[100vh] pt-5'>
            <BlogPostsContainer apiEndPoint={`post/trending/${tag}`} queryKey={`trending-${tag}`}/>
        </div>
    );
};

export default TrendingTagPage;