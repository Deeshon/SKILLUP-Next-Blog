/* eslint-disable @typescript-eslint/no-unused-vars */
interface Post {
    id: string;
    title: string;
    content: string;
    views: number;
    likes: number;
    created_at: string;
    edited_at: string | null;
    author_id: string;
  }

  interface FetchAllPostsResponse {
    success: boolean;
    data: Post[]
  }

  interface FetchPostResponse {
    success: boolean;
    data: Post
  }