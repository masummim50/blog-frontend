
import { Link } from "react-router-dom";
import { blogPostedTime } from "../../utils/blogPostFunctions";
import { motion } from 'framer-motion';

const CommunityCard = ({
  community,
}: {
  community: {
    _id: string;
    name: string;
    image: string;
    members: string[];
    posts: string[];
    createdAt: string;
  };
}) => {

  console.log("comm card: ", community)
  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
      
    <Link
      to={`/communities/${community._id}`}
      className="rounded-md bg-gray-200  text-black dark:text-white dark:bg-gray-700 px-2 py-3 flex items-center gap-2 justify-self-center w-full"
    >
      <div className="w-[100px] h-[100px] rounded-full overflow-clip flex items-center bg-gray-500 text-white  dark:bg-black">
        {community.image ? (
          <img src={community.image} alt={community.name} />
        ) : (
          <span className="text-center w-full text-3xl">
            {community?.name?.slice(0, 1)}
          </span>
        )}
      </div>
      <div className="info flex-grow">
        <h2 className="font-bold text-2xl">{community.name}</h2>
        <div className="flex justify-between gap-2 font-extralight">
          <div className=" text-sm">Members: {community?.members?.length}</div>
          <div className=" text-sm">Posts: {community?.posts?.length}</div>
        </div>
        <div className="text-right">
          Created: {blogPostedTime(community?.createdAt)}
        </div>
      </div>
    </Link>
    
    </motion.div>
  );
};

export default CommunityCard;
