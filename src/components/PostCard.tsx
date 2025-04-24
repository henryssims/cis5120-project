"use client";

import Image from "next/image";
import { CircleUser, Ellipsis, Star, Heart, MessageCircle, Send, Trash2, Pencil, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Post, usePosts } from "@/context/PostContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface PostCardProps {
  post: Post;
  variant?: "feed" | "dialog";
  showActions?: boolean;
}

export function PostCard({ post, variant = "feed", showActions = false }: PostCardProps) {
  const { deletePost, toggleLike } = usePosts();
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    deletePost(post.id);
    setShowDropdown(false);
  };

  const handleEdit = () => {
    router.push(`/create?id=${post.id}`);
    setShowDropdown(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + post.images.length) % post.images.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col gap-2 relative font-[family-name:var(--font-kosugi-maru)] ${variant === "dialog" ? "" : "w-full"}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleUser className="w-6 h-6" />
          <p>{post.user}</p>
        </div>
        {showActions && (
          <div className="relative" ref={dropdownRef}>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Ellipsis className="w-6 h-6" />
            </motion.button>
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-black z-50"
                >
                  <motion.button 
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    className="w-full px-4 py-2 text-left flex items-center gap-2"
                    onClick={handleEdit}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </motion.button>
                  <motion.button 
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 text-red-500"
                    onClick={handleDelete}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center gap-2 absolute top-12 right-2 rounded-full px-2 py-1 border-1 border-black ${
          post.rating >= 7 ? 'bg-[#B3FFBB]' : 
          post.rating >= 4 ? 'bg-[#FFE5B3]' : 
          'bg-[#FBC3CF]'
        }`}
      >
        <Star className="w-4 h-4 fill-current" />
        <p>{post.rating}</p>
      </motion.div>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src={post.images[currentImageIndex]} 
            alt={post.user} 
            width={variant === "feed" ? 350 : 350} 
            height={variant === "feed" ? 350 : 350}
            className={variant === "dialog" ? "w-full h-auto" : ""} 
          />
        </motion.div>
        {post.images.length > 1 && (
          <>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {post.images.map((_, index) => (
                <motion.div 
                  key={index}
                  animate={{ 
                    scale: index === currentImageIndex ? 1.2 : 1,
                    backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)'
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-2 h-2 rounded-full"
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl">{post.artist}</p>
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleLike(post.id)}
          >
            <motion.div
              initial={false}
              animate={{
                scale: post.liked ? [1, 1.2, 1] : 1,
                color: post.liked ? "#ef4444" : "currentColor"
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              <Heart className={`w-5 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
            </motion.div>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <MessageCircle className="w-5" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Send className="w-5" />
          </motion.button>
        </div>
      </div>
      <p className="text-sm -mt-2 font-[family-name:var(--font-noto-sans-jp)">{post.caption}</p>
      {post.taggedFriends && post.taggedFriends.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <User className="w-4 h-4" />
          <p>Tagged: </p>
          <div className="flex flex-wrap gap-1">
            {post.taggedFriends.map((friend, index) => (
              <span key={friend.id}>
                {friend.displayName}
                {index < post.taggedFriends!.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
} 