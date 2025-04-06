"use client";

import { ChevronLeft, Upload } from "lucide-react";
import Link from "next/link";
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { usePosts } from "@/context/PostContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const { addPost } = usePosts();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [artist, setArtist] = useState("");
  const [caption, setCaption] = useState("");

  const handlePublish = () => {
    const newPost = {
      user: "Me", 
      image: "/images/post1.png", 
      rating,
      artist,
      caption,
      userId: "current-user"
    };

    addPost(newPost);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen p-8 pb-40 font-[family-name:var(--font-kosugi-maru)] flex flex-col gap-6">
      <Link href="/">
        <div className="border-2 border-black rounded-full bg-white w-min p-1">
          <ChevronLeft className="w-8 h-8" />
        </div>
      </Link>
      <h1 className="text-3xl">Create</h1>
      <Input 
        className="border-black border-2 bg-white rounded-xl h-12" 
        placeholder="artist name" 
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <div className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4">
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
      </div>
      <div className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4">
        <p>Who did you go with?</p>
        <Input className="border-black border-2 bg-white rounded-xl h-12" placeholder="search friends..." />
      </div>
      <div className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4">
        <p>Add pictures/videos</p>
        <Upload className="w-10 h-10 self-center" />
      </div>
      <div className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4">
        <p>Add a caption</p>
        <Textarea 
          className="border-black border-2 bg-white rounded-xl" 
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <button 
        onClick={handlePublish}
        className="bg-[#FBC3CF] rounded-full p-4 border-2 border-black flex justify-center gap-4"
      >
        <p>Publish Post</p>
      </button>
    </div>
  );
}
