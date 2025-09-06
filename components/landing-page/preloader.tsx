"use client";

import { useEffect, useState } from "react";
import { Bitcoin } from "lucide-react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // show 2.5s
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      <div className="relative flex items-center justify-center">
        {/* Spinning Circle */}
        <div className="w-28 h-28 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />

        {/* Bitcoin Icon with Pulse */}
        <Bitcoin className="absolute w-12 h-12 text-yellow-500 animate-pulse-scale" />
      </div>
    </div>
  );
}
