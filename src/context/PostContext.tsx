"use client";

import React, { createContext, useContext, useState } from "react";

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
}

export interface Post {
  id: number;
  user: string;
  images: string[];
  rating: number;
  artist: string;
  caption: string;
  userId: string;
  liked?: boolean;
  taggedFriends?: User[];
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, "id">) => void;
  deletePost: (postId: number) => void;
  toggleLike: (postId: number) => void;
  editPost: (postId: number, updatedPost: Partial<Post>) => void;
  getFriends: () => User[];
}

const mockFriends: User[] = [
  { id: "user1", username: "zora", displayName: "Zora Mardjoko", avatar: "/images/post1.png" },
  { id: "user2", username: "henry", displayName: "Henry Sims", avatar: "/images/post2.png" },
  { id: "user3", username: "cindy", displayName: "Cindy Wei", avatar: "/images/post3.png" },
];

const defaultPosts: Post[] = [
  {
    id: 1,
    user: "Zora Mardjoko",
    images: ["/images/post1.png"],
    rating: 8,
    artist: "The Weeknd",
    caption: "cool concert",
    userId: "user1",
    liked: false,
    taggedFriends: [mockFriends[1], mockFriends[2]]
  },
  {
    id: 2,
    user: "Henry Sims",
    images: ["/images/post2.png"],
    rating: 9,
    artist: "Playboi Carti",
    caption: "awesome!",
    userId: "user2",
    liked: false,
    taggedFriends: [mockFriends[0]]
  },
  {
    id: 3,
    user: "Cindy Wei",
    images: ["/images/post3.png"],
    rating: 5,
    artist: "Taylor Swift",
    caption: "mid",
    userId: "user3",
    liked: false,
    taggedFriends: [mockFriends[1], mockFriends[0]]
  }
];

const PostContext = createContext<PostContextType>({
  posts: defaultPosts,
  addPost: () => {},
  deletePost: () => {},
  toggleLike: () => {},
  editPost: () => {},
  getFriends: () => [],
});

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(defaultPosts);

  const addPost = (newPost: Omit<Post, "id">) => {
    const postWithId: Post = {
      ...newPost,
      id: posts.length + 1,
      liked: false
    };
    setPosts((prevPosts) => [postWithId, ...prevPosts]);
  };

  const deletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
  };

  const toggleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const editPost = (postId: number, updatedPost: Partial<Post>) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  const getFriends = () => mockFriends;

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, toggleLike, editPost, getFriends }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
} 