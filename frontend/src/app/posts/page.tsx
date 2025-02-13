import Link from "next/link";
import { fetchAllPosts } from "../_utils/api";

const page = async () => {
  const posts: FetchAllPostsResponse|null = await fetchAllPosts();

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold ">All Posts</h1>
      <div className="flex flex-col mt-5">
        {posts?.data.map((post) => (
          <Link key={post.id} href={`/posts/${post.id }`} className="mt-4">
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
