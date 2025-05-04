"use client";

import { CircleUser, Settings, Upload, UserPen } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePosts } from "@/context/PostContext";
import { PostCard } from "@/components/PostCard";

export default function Profile() {
  const { posts } = usePosts();
  const userPosts = posts.filter(post => post.userId === "current-user");

  return (
    <div className="min-h-screen p-8 pb-40 pt-20 font-[family-name:var(--font-kosugi-maru)] flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center">
        <CircleUser className="w-12 h-12" />
        <p>@username</p>
        <div className="flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" />
          <Upload className="w-4 h-4" />
          <UserPen className="w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {userPosts.map((post) => (
          <Dialog key={post.id}>
            <DialogTrigger className="w-[100px] h-[100px] overflow-hidden">
              <Image 
                src={post.images[0]} 
                alt={post.artist} 
                width={100} 
                height={100} 
                className="object-cover w-full h-full" 
              />
            </DialogTrigger>
            <DialogContent className="fixed [@media(hover:hover)]:inset-0 [@media(hover:hover)]:m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px]">
              <DialogTitle></DialogTitle>
              <PostCard post={post} variant="dialog" showActions={true} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
