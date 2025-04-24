"use client";

import { usePosts } from "@/context/PostContext";
import { Star, Music, Trophy, Users, TrendingUp, Award, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
}

interface ConcertBuddy {
  id: string;
  name: string;
  concertsTogether: number;
  compatibility: number;
  commonArtists: string[];
}

export default function Stats() {
  const { posts } = usePosts();
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  // Add dummy posts for more realistic stats
  const dummyPosts = [
    {
      id: 4,
      user: "Me",
      images: ["/images/post1.png"],
      rating: 9,
      artist: "Drake",
      caption: "amazing show",
      userId: "current-user",
      liked: false
    },
    {
      id: 5,
      user: "Me",
      images: ["/images/post2.png"],
      rating: 8,
      artist: "Billie Eilish",
      caption: "incredible performance",
      userId: "current-user",
      liked: false
    },
    {
      id: 6,
      user: "Me",
      images: ["/images/post3.png"],
      rating: 7,
      artist: "Arctic Monkeys",
      caption: "great energy",
      userId: "current-user",
      liked: false
    }
  ];

  // Combine real and dummy posts
  const allPosts = [...posts, ...dummyPosts];

  // Calculate total concerts
  const totalConcerts = allPosts.length;

  // Calculate average rating
  const averageRating = allPosts.reduce((acc, post) => acc + post.rating, 0) / totalConcerts;

  // Get most seen artist
  const artistCounts = allPosts.reduce((acc, post) => {
    acc[post.artist] = (acc[post.artist] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostSeenArtist = Object.entries(artistCounts)
    .sort((a, b) => b[1] - a[1])[0][0];

  // Get highest rated concert
  const highestRatedConcert = allPosts.reduce((max, post) => 
    post.rating > max.rating ? post : max
  , allPosts[0]);

  // Calculate genre distribution with more genres
  const genreCounts = posts.reduce((acc, post) => {
    const genre = post.artist === "The Weeknd" ? "R&B" :
                 post.artist === "Playboi Carti" ? "Hip Hop" :
                 post.artist === "Taylor Swift" ? "Pop" : "Other";
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Add dummy data for more realistic distribution
  const dummyGenreData = {
    "R&B": 5,
    "Hip Hop": 8,
    "Pop": 6,
    "Rock": 4,
    "Electronic": 3,
    "Jazz": 2
  };


  // Mock concert buddies data
  const concertBuddies: ConcertBuddy[] = [
    {
      id: "user1",
      name: "Zora Mardjoko",
      concertsTogether: 3,
      compatibility: 85,
      commonArtists: ["The Weeknd", "Playboi Carti"]
    },
    {
      id: "user2",
      name: "Henry Sims",
      concertsTogether: 2,
      compatibility: 75,
      commonArtists: ["The Weeknd"]
    },
    {
      id: "user3",
      name: "Cindy Wei",
      concertsTogether: 1,
      compatibility: 65,
      commonArtists: ["Taylor Swift"]
    }
  ];

  // Mock achievements
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Concert Enthusiast",
      description: "Attended 5+ concerts",
      icon: <Trophy className="w-6 h-6" />,
      unlocked: totalConcerts >= 5
    },
    {
      id: 2,
      title: "Music Critic",
      description: "Average rating above 8",
      icon: <Star className="w-6 h-6" />,
      unlocked: averageRating >= 8
    },
    {
      id: 3,
      title: "Genre Explorer",
      description: "Attended concerts in 3+ genres",
      icon: <Music className="w-6 h-6" />,
      unlocked: Object.keys(genreCounts).length >= 3
    },
    {
      id: 4,
      title: "Social Butterfly",
      description: "Tagged friends in 3+ concerts",
      icon: <Users className="w-6 h-6" />,
      unlocked: posts.filter(post => post.taggedFriends?.length).length >= 3
    },
    {
      id: 5,
      title: "Early Bird",
      description: "Attended a concert before noon",
      icon: <Music className="w-6 h-6" />,
      unlocked: false
    },
    {
      id: 6,
      title: "Night Owl",
      description: "Attended a concert after 10 PM",
      icon: <Music className="w-6 h-6" />,
      unlocked: false
    },
    {
      id: 7,
      title: "Rain or Shine",
      description: "Attended a concert in the rain",
      icon: <Music className="w-6 h-6" />,
      unlocked: false
    },
    {
      id: 8,
      title: "Road Trip",
      description: "Traveled 100+ miles for a concert",
      icon: <Music className="w-6 h-6" />,
      unlocked: false
    }
  ];

  // Sort achievements by unlocked status
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    return 0;
  });

  // Prepare data for radar chart
  const radarData = {
    labels: Object.keys(dummyGenreData),
    datasets: [
      {
        label: 'Genre Distribution',
        data: Object.values(dummyGenreData),
        backgroundColor: 'rgba(179, 255, 187, 0.2)',
        borderColor: 'rgba(179, 255, 187, 1)',
        borderWidth: 2,
        pointBackgroundColor: [
          'rgba(179, 255, 187, 1)', // R&B
          'rgba(255, 229, 179, 1)', // Hip Hop
          'rgba(251, 195, 207, 1)', // Pop
          'rgba(179, 229, 255, 1)', // Rock
          'rgba(229, 179, 255, 1)', // Electronic
          'rgba(255, 179, 179, 1)'  // Jazz
        ],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179, 255, 187, 1)'
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

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
        Stats
      </motion.h1>

      {/* Stats Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col items-center gap-2"
        >
          <Music className="w-8 h-8" />
          <p className="text-2xl font-bold">{totalConcerts}</p>
          <p className="text-sm text-gray-600">Total Concerts</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col items-center gap-2"
        >
          <Star className="w-8 h-8" />
          <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
          <p className="text-sm text-gray-600">Average Rating</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col items-center gap-2"
        >
          <TrendingUp className="w-8 h-8" />
          <p className="text-2xl font-bold text-center">{mostSeenArtist}</p>
          <p className="text-sm text-gray-600">Most Seen Artist</p>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black flex flex-col items-center gap-2"
        >
          <Award className="w-8 h-8" />
          <p className="text-2xl font-bold text-center">{highestRatedConcert.artist}</p>
          <p className="text-sm text-gray-600">Highest Rated</p>
        </motion.div>
      </motion.div>

      {/* Genre Distribution */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black mb-8"
      >
        <h2 className="text-xl mb-4">Genre Distribution</h2>
        <div className="h-64 flex justify-center items-center">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </motion.div>

      {/* Concert Buddies */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black mb-8"
      >
        <h2 className="text-xl mb-4">Concert Buddies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {concertBuddies.map((buddy, index) => (
            <motion.div 
              key={buddy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-4 border-2 border-black"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{buddy.name}</p>
                <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${
                  buddy.compatibility >= 70 ? 'bg-[#B3FFBB]' : 
                  buddy.compatibility >= 40 ? 'bg-[#FFE5B3]' : 
                  'bg-[#FBC3CF]'
                }`}>
                  <Users className="w-4 h-4" />
                  <p>{buddy.compatibility}%</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{buddy.concertsTogether} concerts together</p>
              <div className="flex flex-wrap gap-1">
                {buddy.commonArtists.map(artist => (
                  <span key={artist} className="text-xs bg-gray-100 rounded-full px-2 py-1">
                    {artist}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#D9D9D9] rounded-xl p-4 border-2 border-black"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Achievements</h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllAchievements(!showAllAchievements)}
            className="flex items-center gap-2"
          >
            {showAllAchievements ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Show All</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedAchievements.slice(0, showAllAchievements ? undefined : 4).map((achievement, index) => (
            <motion.div 
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: -.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                achievement.unlocked ? 'bg-white border-black' : 'bg-gray-100 border-gray-300'
              }`}
            >
              <div className={`p-2 rounded-full ${
                achievement.unlocked ? 'bg-[#B3FFBB]' : 'bg-gray-200'
              }`}>
                {achievement.icon}
              </div>
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 