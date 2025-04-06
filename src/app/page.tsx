"use client";

import { usePosts } from "@/context/PostContext";
import { PostCard } from "@/components/PostCard";

export default function Home() {
  const { posts } = usePosts();

  return (
    <div className="min-h-screen p-8 pb-40 font-[family-name:var(--font-kosugi-maru)]">
      <h1 className="text-3xl">Discover</h1>
      <div className="flex flex-col gap-10 mt-10">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
