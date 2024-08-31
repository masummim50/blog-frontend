import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "../../axios/axiosInstance";




const fetchPostDetails = async (id: string) => {
  const response = await axiosInstance.get(`/post/${id}`);
  return response.data;
};

const PostDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id),
  })

  if (isLoading) {
    return <div>Loading post details...</div>;
  }

  if (isError) {
    return <div>Error loading post details: {error?.message}</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Render other post details here */}
    </div>
  );
};

export default PostDetailsPage;
