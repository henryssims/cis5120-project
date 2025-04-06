"use client";

import Image from "next/image";
import { CircleUser, Ellipsis, Star, Heart, MessageCircle, Send } from "lucide-react";
import { Post } from "@/context/PostContext";

interface PostCardProps {
  post: Post;
  variant?: "feed" | "dialog";
}

export function PostCard({ post, variant = "feed" }: PostCardProps) {
  return (
    <div className={`flex flex-col gap-2 relative ${variant === "dialog" ? "" : "w-full"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleUser className="w-6 h-6" />
          <p>{post.user}</p>
        </div>
        <Ellipsis className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-2 absolute top-10 right-2 rounded-full px-2 py-1 border-1 border-black ${
        post.rating >= 7 ? 'bg-[#B3FFBB]' : 
        post.rating >= 4 ? 'bg-[#FFE5B3]' : 
        'bg-[#FBC3CF]'
      }`}>
        <Star className="w-4 h-4" />
        <p>{post.rating}</p>
      </div>
      <Image 
        src={post.image} 
        alt={post.user} 
        width={variant === "feed" ? 350 : 350} 
        height={variant === "feed" ? 350 : 350}
        className={variant === "dialog" ? "w-full h-auto" : ""} 
      />
      <div className="flex items-center justify-between">
        <p className="text-xl">{post.artist}</p>
        <div className="flex items-center gap-2">
          <Heart className="w-5" />
          <MessageCircle className="w-5" />
          <Send className="w-5" />
        </div>
      </div>
      <p className="text-sm -mt-2 font-[family-name:var(--font-noto-sans-jp)">{post.caption}</p>
    </div>
  );
} 