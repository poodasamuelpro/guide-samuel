'use client';

import React from 'react';

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  // Handle full URLs
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // bare ID
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

interface VideoPlayerProps {
  envKey: string;
  className?: string;
  title?: string;
}

export default function VideoPlayer({ envKey, className = '', title = 'Vidéo' }: VideoPlayerProps) {
  const rawUrl = process.env[envKey] ?? '';
  const videoId = extractYouTubeId(rawUrl.trim());

  if (!videoId) return null;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
