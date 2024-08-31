export interface BlogCardPropsType {
  title: string;
  content: string;
  image: string;
  community: string | null;
  tags: string[];
  _id: string;
  likes: [string];
  comments: [string];
  author: {
    _id: string;
    userName: string;
    coverImage: string;
  };
  views: number;
  createdAt: string;
}
