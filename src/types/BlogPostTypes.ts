export interface BlogCardPropsType {
  title: string;
  content: string;
  image: string;
  tags: string[];
  _id: string;
  likes: number;
  author: {
    _id: string;
    userName: string;
    coverImage: string;
  };
  views: number;
  createdAt: string;
}
