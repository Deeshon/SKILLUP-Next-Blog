
const page = async ({params}: {params: {id: string}}) => {
  const post: FetchPostResponse = await fetch(`http://localhost:3001/api/posts/${params.id}`).then((res) => res.json())


  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold ">{post?.data?.title}</h1>
        <div className="flex flex-col mt-5 w-[80%]">
        <p key={post?.data?.id} className="mt-4">{post?.data?.content}</p>

        </div>
    </div>
  );
};

export default page;
