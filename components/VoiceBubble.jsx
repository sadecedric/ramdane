'use client';

import { useRef, useState } from 'react';

function formatTime(sec) {
  if (!Number.isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M3 1.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3" y="2" width="3.5" height="12" rx="1" />
      <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
    </svg>
  );
}

const SPEEDS = [1, 1.5, 2];

export default function VoiceBubble({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const cycleSpeed = () => {
    const nextSpeed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(nextSpeed);
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  return (
    <div className="flex justify-start">
      <div
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl shadow-sm"
        style={{
          background: '#ffffff',
          border: '1px solid #e5dcc8',
          borderBottomLeftRadius: '4px',
          minWidth: '210px',
        }}
      >
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration);
            e.currentTarget.playbackRate = speed;
          }}
          onTimeUpdate={(e) => {
            const t = e.currentTarget.currentTime;
            setCurrentTime(t);
            setProgress(duration ? t / duration : 0);
          }}
        />

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ background: '#16a34a', color: '#ffffff' }}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="flex-1 min-w-0">
          <div
            onClick={handleSeek}
            className="relative h-1.5 rounded-full cursor-pointer"
            style={{ background: '#f3ede0' }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${Math.min(progress * 100, 100)}%`, background: '#16a34a' }}
            />
          </div>
          <p className="text-[11px] mt-1 tabular-nums" style={{ color: '#8a7f6a' }}>
            {formatTime(isPlaying || currentTime ? currentTime : duration)}
          </p>
        </div>

        <button
          type="button"
          onClick={cycleSpeed}
          aria-label="Vitesse de lecture"
          className="shrink-0 text-[11px] font-bold px-2 py-1 rounded-full transition-colors"
          style={{ background: '#f3ede0', color: '#15803d', minWidth: '34px' }}
        >
          {speed}x
        </button>
      </div>
    </div>
  );
}
