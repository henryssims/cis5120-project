"use client";

import { ChevronLeft, Upload, X, UserPlus, UserMinus, CircleUser } from "lucide-react";
import Link from "next/link";
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePosts, User } from "@/context/PostContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function CreateContent() {
  const { addPost, editPost, posts, getFriends } = usePosts();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const friendsListRef = useRef<HTMLDivElement>(null);
  
  const [rating, setRating] = useState(5);
  const [artist, setArtist] = useState("");
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const friends = getFriends();
  const filteredFriends = friends.filter(friend => 
    friend.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (postId) {
      const post = posts.find(p => p.id === Number(postId));
      if (post) {
        setRating(post.rating);
        setArtist(post.artist);
        setCaption(post.caption);
        setImages(post.images);
        setSelectedFriends(post.taggedFriends || []);
      }
    }
  }, [postId, posts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (friendsListRef.current && !friendsListRef.current.contains(event.target as Node)) {
        setShowFriendsList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleFriend = (friend: User) => {
    setSelectedFriends(prev => {
      const isSelected = prev.some(f => f.id === friend.id);
      if (isSelected) {
        return prev.filter(f => f.id !== friend.id);
      } else {
        return [...prev, friend];
      }
    });
  };

  const handlePublish = () => {
    const missingFields = [];
    if (images.length === 0) {
      missingFields.push("image");
    }
    if (!artist.trim()) {
      missingFields.push("artist name");
    }

    if (missingFields.length > 0) {
      // Show error state by adding a shake animation to the publish button
      const button = document.querySelector('.publish-button');
      button?.classList.add('shake');
      setTimeout(() => button?.classList.remove('shake'), 500);

      // Show error message
      setErrorMessage(`Please add ${missingFields.join(" and ")}`);
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    if (postId) {
      // Edit existing post
      editPost(Number(postId), {
        rating,
        artist,
        caption,
        images,
        taggedFriends: selectedFriends
      });
    } else {
      // Create new post
      const newPost = {
        user: "Me", 
        images,
        rating,
        artist,
        caption,
        userId: "current-user",
        taggedFriends: selectedFriends
      };
      addPost(newPost);
    }
    router.push("/profile");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-8 pb-40 font-[family-name:var(--font-kosugi-maru)] flex flex-col gap-6"
    >
      <Link href="/profile">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-black rounded-full bg-white w-min p-1"
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.div>
      </Link>
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl"
      >
        {postId ? "Edit Post" : "Create"}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Input 
          className="border-black border-2 bg-white rounded-xl h-12" 
          placeholder="artist name" 
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4"
      >
        <p>How was the concert?</p>
        <Slider 
          defaultValue={[5]} 
          max={10} 
          step={1} 
          value={[rating]}
          onValueChange={(value) => setRating(value[0])}
        />
        <div className="flex justify-between w-full">
          <p>0</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4"
      >
        <p>Who did you go with?</p>
        <div className="relative" ref={friendsListRef}>
          <Input 
            className="border-black border-2 bg-white rounded-xl h-12" 
            placeholder="search friends..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowFriendsList(true)}
          />
          <AnimatePresence>
            {showFriendsList && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border-2 border-black max-h-60 overflow-y-auto z-50"
              >
                {filteredFriends.map(friend => (
                  <motion.button
                    key={friend.id}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    onClick={() => toggleFriend(friend)}
                    className="w-full px-4 py-2 text-left flex items-center gap-2"
                  >
                    <CircleUser className="w-8 h-8" />
                    <div className="flex flex-col">
                      <p className="font-medium">{friend.displayName}</p>
                      <p className="text-sm text-gray-500">@{friend.username}</p>
                    </div>
                    {selectedFriends.some(f => f.id === friend.id) ? (
                      <UserMinus className="w-4 h-4 ml-auto text-red-500" />
                    ) : (
                      <UserPlus className="w-4 h-4 ml-auto text-green-500" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {selectedFriends.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mt-2"
          >
            {selectedFriends.map(friend => (
              <motion.div 
                key={friend.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
              >
                <CircleUser className="w-6 h-6" />
                <p className="text-sm">{friend.displayName}</p>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFriend(friend)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4"
      >
        <p>Add pictures/videos</p>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div 
              key={index} 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative aspect-square"
            >
              <Image 
                src={image} 
                alt={`Uploaded image ${index + 1}`} 
                fill
                className="rounded-lg object-cover"
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square border-2 border-dashed border-black rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Upload className="w-6 h-6" />
            <p className="text-xs">Add Image</p>
          </motion.button>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4"
      >
        <p>Add a caption</p>
        <Textarea 
          className="border-black border-2 bg-white rounded-xl" 
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </motion.div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePublish}
        className="bg-[#FBC3CF] rounded-full p-4 border-2 border-black flex justify-center gap-4 publish-button"
      >
        <p>{postId ? "Save Changes" : "Publish Post"}</p>
      </motion.button>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 mr-4"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Create() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateContent />
    </Suspense>
  );
}
