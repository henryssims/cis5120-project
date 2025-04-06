"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Search, CirclePlus, Heart, CircleUser } from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  return (
    <div className="w-full h-20 fixed bottom-0 border-t-1 border-black flex items-center justify-center gap-10 bg-[#FFFCEB]">
      <Link href="/">
        <House className={`w-8 h-8 ${pathname === "/" ? "text-[#FBC3CF]" : ""}`} />
      </Link>
      <Link href="/">
        <Search className="w-8 h-8" />
      </Link>
      <Link href="/create">
        <CirclePlus className={`w-8 h-8 ${pathname === "/create" ? "text-[#FBC3CF]" : ""}`} />
      </Link>
      <Link href="/">
        <Heart className="w-8 h-8" />
      </Link>
      <Link href="/profile">
        <CircleUser className={`w-8 h-8 ${pathname === "/profile" ? "text-[#FBC3CF]" : ""}`} />
      </Link>
    </div>
  );
} 