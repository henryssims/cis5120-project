"use client";

import { CircleUser, Settings, Upload, Edit, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePosts } from "@/context/PostContext";
import { PostCard } from "@/components/PostCard";
import { useState } from "react";

export default function Profile() {
  const { posts, deletePost } = usePosts();
  const [isEditMode, setIsEditMode] = useState(false);
  const userPosts = posts.filter(post => post.userId === "current-user");

  return (
    <div className="min-h-screen p-8 pb-40 pt-20 font-[family-name:var(--font-kosugi-maru)] flex flex-col gap-10">
      <div className="flex flex-col gap-2 items-center">
        <CircleUser className="w-12 h-12" />
        <p>@username</p>
        <div className="flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" />
          <Upload className="w-4 h-4" />
          <button onClick={() => setIsEditMode(!isEditMode)}>
            <Edit className={`w-4 h-4 ${isEditMode ? "text-[#FBC3CF]" : ""}`} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 relative">
        {userPosts.map((post) => (
          <div key={post.id} className="relative">
            {isEditMode && (
              <button 
                onClick={() => deletePost(post.id)}
                className="absolute -top-2 -right-2 z-10 bg-red-500 rounded-full p-1"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
            <Dialog>
              <DialogTrigger className="w-[100px] h-[100px] overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.artist} 
                  width={100} 
                  height={100} 
                  className="object-cover w-full h-full" 
                />
              </DialogTrigger>
              <DialogContent className="fixed inset-0 m-auto w-[90vw] max-w-[400px] h-fit">
                <DialogTitle></DialogTitle>
                <PostCard post={post} variant="dialog" />
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
