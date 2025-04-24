"use client";

import { usePosts } from "@/context/PostContext";
import { Star, MapPin, Calendar, Music } from "lucide-react";
import { motion } from "framer-motion";

interface ConcertRecommendation {
  id: number;
  artist: string;
  venue: string;
  date: string;
  genre: string;
  matchScore: number;
  image: string;
}

// Mock data for concert recommendations
const mockRecommendations: ConcertRecommendation[] = [
  {
    id: 1,
    artist: "The Weeknd",
    venue: "Madison Square Garden",
    date: "2025-06-15",
    genre: "R&B",
    matchScore: 95,
    image: "/images/post1.png"
  },
  {
    id: 2,
    artist: "Drake",
    venue: "Barclays Center",
    date: "2025-07-20",
    genre: "Hip Hop",
    matchScore: 88,
    image: "/images/post2.png"
  },
  {
    id: 3,
    artist: "Billie Eilish",
    venue: "MetLife Stadium",
    date: "2025-08-05",
    genre: "Pop",
    matchScore: 82,
    image: "/images/post3.png"
  },
  {
    id: 4,
    artist: "Arctic Monkeys",
    venue: "Forest Hills Stadium",
    date: "2025-09-10",
    genre: "Rock",
    matchScore: 78,
    image: "/images/post1.png"
  },
  {
    id: 5,
    artist: "Bad Bunny",
    venue: "Yankee Stadium",
    date: "2025-10-15",
    genre: "Reggaeton",
    matchScore: 75,
    image: "/images/post2.png"
  }
];

export default function Discover() {
  const { posts } = usePosts();

  // Calculate average rating for each artist
  const artistRatings = posts.reduce((acc, post) => {
    if (!acc[post.artist]) {
      acc[post.artist] = { total: 0, count: 0 };
    }
    acc[post.artist].total += post.rating;
    acc[post.artist].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  // Get top rated artists
  const topArtists = Object.entries(artistRatings)
    .map(([artist, { total, count }]) => ({
      artist,
      averageRating: total / count
    }))
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-8 pb-40 font-[family-name:var(--font-kosugi-maru)]"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl mb-8"
      >
        Discover
      </motion.h1>
      
      {/* Top Artists Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-xl mb-4">Your Top Artists</h2>
        <div className="grid grid-cols-3 gap-4">
          {topArtists.map(({ artist, averageRating }, index) => (
            <motion.div 
              key={artist}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col items-center gap-2"
            >
              <Music className="w-8 h-8" />
              <div className="flex flex-col items-center gap-1">
                <p className="font-medium text-lg text-center">{artist}</p>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 ${
                    averageRating >= 7 ? 'bg-[#B3FFBB]' : 
                    averageRating >= 4 ? 'bg-[#FFE5B3]' : 
                    'bg-[#FBC3CF]'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <p className="font-medium">{averageRating.toFixed(1)}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Concert Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl mb-4">Recommended Concerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockRecommendations.map((concert, index) => (
            <motion.div 
              key={concert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">{concert.artist}</h3>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-1 rounded-full px-2 py-1 ${
                    concert.matchScore >= 70 ? 'bg-[#B3FFBB]' : 
                    concert.matchScore >= 40 ? 'bg-[#FFE5B3]' : 
                    'bg-[#FBC3CF]'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                  <p>{concert.matchScore}%</p>
                </motion.div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <p>{concert.venue}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <p>{new Date(concert.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <p className="text-sm text-gray-600">{concert.genre}</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FBC3CF] rounded-full p-2 border-2 border-black text-center hover:bg-[#ffb0bf] transition-colors"
              >
                Get Tickets
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 