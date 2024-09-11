
import { useParams } from "react-router-dom";
import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";

const UserShareSection = () => {
  const param = useParams();
//   const {data} = useQuery({
//       queryKey: [`shared-${param.username}`],
//       queryFn: async () => {
//           const result = await axiosInstance.get(`/post/shared/${param.username}`);
//           return result.data;
//       }
//   })
  return (
    <div className="mw pt-5 px-2">
      
      <BlogPostsContainer
        apiEndPoint={`/post/shared/${param.username}`}
        queryKey={`shared-${param.username}`}
      />
    </div>
  );
};

export default UserShareSection;
