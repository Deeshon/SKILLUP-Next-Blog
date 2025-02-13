const BASE_URL = "http://localhost:3001/api";

interface FetchDataProps {
  url: string;
}

const fetchData = async <T>({ url }: FetchDataProps): Promise<T | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post with status: ${res.status}`);
    }

    return await res.json();

  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchAllPosts = async (): Promise<FetchAllPostsResponse | null> => {
  return fetchData<FetchAllPostsResponse>({url: 'posts'})
}

export const fetchPost = async (id: string): Promise<FetchPostResponse|null> => {
  return fetchData<FetchPostResponse>({url: `posts/${id}`})
}
