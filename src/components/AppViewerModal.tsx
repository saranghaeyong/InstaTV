import React, { useState, useEffect } from 'react';
import { AppItem, StoryItem } from '../types/launcher';
import { AppIcon } from './AppIcon';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Tv,
  CheckCircle2,
  Clock,
  Sparkles,
  Wifi,
  Cast
} from 'lucide-react';

interface AppViewerModalProps {
  app: AppItem | null;
  storyContext?: StoryItem | null;
  onClose: () => void;
  onSoundTick: () => void;
}

export const AppViewerModal: React.FC<AppViewerModalProps> = ({
  app,
  storyContext,
  onClose,
  onSoundTick
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(34);
  const [volume, setVolume] = useState<number>(75);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!app) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200">
      
      {/* 16:9 Living Room TV App Container */}
      <div className="relative w-full max-w-6xl aspect-[16/9] max-h-[90vh] bg-gradient-to-br from-[#121013] via-[#1a141c] to-[#0c080e] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between text-white">
        
        {/* Top App Header Bar */}
        <header className="relative z-20 flex items-center justify-between px-8 py-5 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                onSoundTick();
                onClose();
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white font-semibold text-xs transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-[#E1306C]" />
              <span>Exit to Launcher</span>
              <span className="font-mono text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-gray-200">
                Back / Esc
              </span>
            </button>

            <div className="flex items-center gap-2.5">
              <AppIcon type={app.id} size={28} />
              <div>
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  {app.name}
                  {storyContext && (
                    <span className="text-xs font-normal text-pink-300">
                      · {storyContext.title}
                    </span>
                  )}
                </h1>
                <p className="text-[11px] text-gray-400 font-mono">
                  {app.packageName} · v{app.version}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-xs text-gray-300">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>4K Ultra HD · 60fps</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-[#E1306C] text-[11px] font-bold text-white uppercase tracking-wider">
              {app.badge || 'LIVE'}
            </div>
          </div>
        </header>

        {/* Dynamic Simulated Media Feed / Content Stage */}
        <div className="relative flex-1 flex flex-col justify-center items-center px-8 text-center overflow-hidden">
          
          {/* Ambient colored background lights */}
          <div
            className={`absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr ${app.gradient} opacity-25 blur-3xl pointer-events-none`}
          />

          <div className="relative z-10 max-w-xl flex flex-col items-center">
            
            {/* Liquid Glass Media Badge */}
            <div className="liquid-glass-surface rounded-2xl p-4 shadow-xl border border-white/30 mb-4 inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center shadow-md">
                <AppIcon type={app.id} size={28} />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-[#833AB4] uppercase tracking-wider">
                  Active TV Session
                </p>
                <p className="text-sm font-bold text-[#302832]">
                  {storyContext ? storyContext.title : `Streaming on ${app.name}`}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 max-w-md mb-6 leading-relaxed">
              {app.description}
            </p>

            {/* Simulated Live Player Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  onSoundTick();
                  setIsPlaying(!isPlaying);
                }}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  onSoundTick();
                  setVolume((v) => (v === 0 ? 75 : 0));
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Playback Scrubber & Quick TV Info */}
        <footer className="relative z-20 px-8 py-5 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-2">
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-[#E1306C] to-[#FCAF45] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
            <span>00:{progress < 10 ? `0${progress}` : progress} / 45:00</span>
            <span className="text-[11px] text-gray-400">
              Dolby Atmos 5.1 · Insta TV Liquid Glass Engine
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
};
