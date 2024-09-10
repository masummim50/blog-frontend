import React from 'react';
import BlogPostsContainer from '../../components/BlogPostsContainer/BlogPostsContainer';

const TrendingPage = () => {
    
    return (
        <div className='mw min-h-[100vh] pt-5'>

        <BlogPostsContainer apiEndPoint="post/trending" queryKey='trending'/>
        </div>
    );
};

export default TrendingPage;