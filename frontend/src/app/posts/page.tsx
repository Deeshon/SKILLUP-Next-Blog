import Link from "next/link";

const page = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold ">All Posts</h1>
        <div className="flex flex-col mt-5">
        <Link href={"/posts/1"} className="mt-4">His mother always taught him</Link>
      <Link href={""} className="mt-4">He was an expert but not in discipline</Link>
      <Link href={""} className="mt-4">Dave watched as the forest burned up on the hill</Link>
        </div>
    </div>
  );
};

export default page;
