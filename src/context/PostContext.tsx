"use client";

import React, { createContext, useContext, useState } from "react";

export interface Post {
  id: number;
  user: string;
  image: string;
  rating: number;
  artist: string;
  caption: string;
  userId: string;
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, "id">) => void;
  deletePost: (postId: number) => void;
}

const defaultPosts: Post[] = [
  {
    id: 1,
    user: "Zora Mardjoko",
    image: "/images/post1.png",
    rating: 9,
    artist: "The Weeknd",
    caption: "cool concert",
    userId: "user1"
  },
  {
    id: 2,
    user: "Henry Sims",
    image: "/images/post2.png",
    rating: 8,
    artist: "Playboi Carti",
    caption: "awesome!",
    userId: "user2"
  },
  {
    id: 3,
    user: "Cindy Wei",
    image: "/images/post3.png",
    rating: 5,
    artist: "Taylor Swift",
    caption: "mid",
    userId: "user3"
  }
];

const PostContext = createContext<PostContextType>({
  posts: defaultPosts,
  addPost: () => {},
  deletePost: () => {},
});

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(defaultPosts);

  const addPost = (newPost: Omit<Post, "id">) => {
    const postWithId: Post = {
      ...newPost,
      id: posts.length + 1,
    };
    setPosts((prevPosts) => [postWithId, ...prevPosts]);
  };

  const deletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
} 