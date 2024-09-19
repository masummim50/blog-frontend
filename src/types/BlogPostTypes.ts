export interface BlogCardPropsType {
  title: string;
  content: string;
  image: string;
  community: {
    _id: string;
    name: string;
  };
  tags: string[];
  _id: string;
  likes: [string];
  shares: [string];
  comments: [string];
  author: {
    _id: string;
    userName: string;
    avatarImage: string;
  };
  views: number;
  createdAt: string;
}
