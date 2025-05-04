"use client";

import Link from "next/link";
import { House, Compass, CirclePlus, CircleUser, ChartLine } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Footer() {
  const pathname = usePathname();

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-20 fixed bottom-0 z-20 border-t-1 border-black flex items-center justify-center gap-10 bg-[#FFFCEB]"
    >
      <Link href="/">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <House className={`w-8 h-8 ${pathname === "/" ? "text-[#FBC3CF]" : ""}`} />
        </motion.div>
      </Link>
      <Link href="/discover">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Compass className={`w-8 h-8 ${pathname === "/discover" ? "text-[#FBC3CF]" : ""}`} />
        </motion.div>
      </Link>
      <Link href="/create">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CirclePlus className={`w-8 h-8 ${pathname === "/create" ? "text-[#FBC3CF]" : ""}`} />
        </motion.div>
      </Link>
      <Link href="/stats">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChartLine className={`w-8 h-8 ${pathname === "/stats" ? "text-[#FBC3CF]" : ""}`} />
        </motion.div>
      </Link>
      <Link href="/profile">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CircleUser className={`w-8 h-8 ${pathname === "/profile" ? "text-[#FBC3CF]" : ""}`} />
        </motion.div>
      </Link>
    </motion.div>
  );
} 