'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showLoading) return null;

  const claudeOrange = "#FF6B35";
  const claudeOrangeDark = "#E55A2B";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${claudeOrange} 0%, ${claudeOrangeDark} 100%)`
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Dice Loader */}
        <div className="relative">
          <span 
            className="loader block"
            style={{
              width: "54px",
              height: "54px",
              position: "relative",
              borderRadius: "4px",
              backgroundColor: "#fff",
              backgroundImage: `
                radial-gradient(circle 5px, #19191a 100%, transparent 0),
                radial-gradient(circle 5px, #19191a 100%, transparent 0),
                radial-gradient(circle 5px, #19191a 100%, transparent 0),
                radial-gradient(circle 5px, #19191a 100%, transparent 0),
                radial-gradient(circle 5px, #19191a 100%, transparent 0),
                radial-gradient(circle 5px, #19191a 100%, transparent 0)
              `,
              backgroundRepeat: "no-repeat"
            }}
          />
        </div>

        {/* Loading text with animated ellipsis */}
        <div className="flex items-center gap-1">
          <span className="text-2xl font-semibold text-white">loading</span>
          <span 
            className="text-2xl font-semibold text-white"
            style={{ animation: "ellipsis 1.5s infinite", animationDelay: "0s" }}
          >
            .
          </span>
          <span 
            className="text-2xl font-semibold text-white"
            style={{ animation: "ellipsis 1.5s infinite", animationDelay: "0.3s" }}
          >
            .
          </span>
          <span 
            className="text-2xl font-semibold text-white"
            style={{ animation: "ellipsis 1.5s infinite", animationDelay: "0.6s" }}
          >
            .
          </span>
        </div>
      </div>

    </div>
  );
}
