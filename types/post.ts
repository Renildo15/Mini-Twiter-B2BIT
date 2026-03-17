export type PostType = {
  id: number;
  title: string;
  content: string;
  image?: string;
  authorId: number;
  createdAt: string;
  authorName: string;
  likeCount: number;
};

export type PostsType = {
  posts: PostType[];
  total: number;
  page: number;
  limit: number;
};
export type PostCreateType = Omit<
  PostType,
  'id' | 'authorId' | 'createdAt' | 'authorName' | 'likeCount'
>;

export type PostUpdateType = Partial<
  Omit<PostType, 'id' | 'authorId' | 'createdAt' | 'authorName' | 'likeCount'>
>;
