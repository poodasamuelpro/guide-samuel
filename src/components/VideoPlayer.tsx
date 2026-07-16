'use client';

import React from 'react';

type VideoSource =
  | { type: 'youtube'; id: string }
  | { type: 'drive'; id: string }
  | { type: 'vimeo'; id: string }
  | { type: 'file'; url: string }
  | { type: 'unknown' };

function detectSource(url: string): VideoSource {
  if (!url) return { type: 'unknown' };
  const u = url.trim();

  // YouTube (URL complète ou ID brut)
  const yt = u.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  ) || u.match(/^([a-zA-Z0-9_-]{11})$/);
  if (yt) return { type: 'youtube', id: yt[1] };

  // Google Drive: /file/d/ID/... ou ?id=ID
  const drive =
    u.match(/drive\.google\.com\/file\/d\/([^/]+)/) ||
    u.match(/drive\.google\.com\/open\?id=([^&\n?#]+)/) ||
    u.match(/[?&]id=([^&\n?#]+)/);
  if (drive && u.includes('drive.google.com')) return { type: 'drive', id: drive[1] };

  // Vimeo
  const vimeo = u.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { type: 'vimeo', id: vimeo[1] };

  // Fichier vidéo direct
  if (/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(u)) return { type: 'file', url: u };

  return { type: 'unknown' };
}

interface VideoPlayerProps {
  /** URL directe de la vidéo (prioritaire si fourni) */
  url?: string;
  /** Nom d'une variable d'environnement contenant l'URL (rétrocompatibilité) */
  envKey?: string;
  className?: string;
  title?: string;
}

export default function VideoPlayer({
  url,
  envKey,
  className = '',
  title = 'Vidéo',
}: VideoPlayerProps) {
  const rawUrl = (url ?? (envKey ? process.env[envKey] : '') ?? '').trim();
  const source = detectSource(rawUrl);

  if (source.type === 'unknown') return null;

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <div className="aspect-video">
        {source.type === 'youtube' && (
          <iframe
            src={`https://www.youtube.com/embed/${source.id}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        )}

        {source.type === 'drive' && (
          <iframe
            src={`https://drive.google.com/file/d/${source.id}/preview`}
            title={title}
            allow="autoplay"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        )}

        {source.type === 'vimeo' && (
          <iframe
            src={`https://player.vimeo.com/video/${source.id}`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        )}

        {source.type === 'file' && (
          <video
            src={source.url}
            title={title}
            controls
            className="absolute inset-0 h-full w-full object-contain bg-black"
          />
        )}
      </div>
    </div>
  );
}