import React, { useState, useEffect } from 'react';
import { Settings, Wifi, Cast, Search, Code2, Sparkles } from 'lucide-react';

interface TopBarProps {
  onOpenSettings: () => void;
  onOpenArchitecture: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  focusedZone: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenSettings,
  onOpenArchitecture,
  onSearchChange,
  searchQuery,
  focusedZone
}) => {
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
      setDateStr(
        now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-30 w-full px-8 pt-5 pb-3">
      <div className="liquid-glass-surface rounded-2xl px-6 py-3.5 flex items-center justify-between transition-all duration-300">
        
        {/* Left: Insta TV Brand Wordmark in Floating Glass Badge */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5 group">
            {/* Liquid Glass Instagram Camera / TV glyph */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45] p-[1.5px] shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white/90 backdrop-blur-md rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/10 to-transparent pointer-events-none" />
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="transform group-hover:scale-105 transition-transform duration-200">
                  <rect x="2" y="3" width="20" height="15" rx="4" stroke="url(#top-ig-grad)" strokeWidth="2" />
                  <circle cx="12" cy="10.5" r="3.2" stroke="url(#top-ig-grad)" strokeWidth="1.8" />
                  <circle cx="18" cy="6.5" r="1" fill="#E1306C" />
                  <path d="M8 21L12 18L16 21" stroke="url(#top-ig-grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="top-ig-grad" x1="2" y1="21" x2="22" y2="3" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#833AB4" />
                      <stop offset="0.5" stopColor="#E1306C" />
                      <stop offset="1" stopColor="#FCAF45" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-2xl tracking-tight text-[#302832]">
                  Insta<span className="instagram-gradient-text">TV</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E1306C] bg-[#FFF0F5] px-2 py-0.5 rounded-full border border-[#E1306C]/20">
                  Liquid Glass
                </span>
              </div>
              <span className="text-[11px] text-[#6B5E6D] font-medium tracking-tight">
                Living Room Smart OS · Android 9+
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search / Quick Filter Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#C13584]/70 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search installed channels, apps, or reels..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl bg-white/80 border border-white/90 text-[#302832] placeholder-[#6B5E6D]/60 focus:outline-none focus:ring-2 focus:ring-[#E1306C] focus:bg-white shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-[#6B5E6D] hover:text-[#E1306C] font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right: Live Clock, Status Badges & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* APK Architecture & Size Check */}
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 hover:bg-white text-xs font-semibold text-[#833AB4] border border-[#833AB4]/20 hover:border-[#833AB4]/40 shadow-xs transition-all hover:scale-102 active:scale-98"
            title="Inspect Android 9 architecture and verify release APK size under 2MB"
          >
            <Code2 className="w-3.5 h-3.5 text-[#833AB4]" />
            <span className="hidden sm:inline">APK Size & Specs</span>
            <span className="text-[10px] bg-[#833AB4]/10 px-1.5 py-0.2 rounded font-mono font-bold text-[#833AB4]">
              910 KB
            </span>
          </button>

          {/* 4K & Wi-Fi Badges */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/60 border border-white/80 text-xs text-[#6B5E6D]">
            <span className="font-mono font-bold text-[11px] text-[#302832]">4K HDR</span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[11px] font-medium">Wi-Fi 6</span>
            </div>
          </div>

          {/* Live Clock with Date */}
          <div className="px-3.5 py-1.5 rounded-xl bg-white/85 border border-white/90 shadow-xs flex items-center gap-2">
            <span className="font-mono tabular-nums text-sm font-bold text-[#302832]">
              {time || '12:00 PM'}
            </span>
            <span className="text-[11px] text-[#6B5E6D] font-medium hidden sm:inline">
              · {dateStr}
            </span>
          </div>

          {/* Settings Trigger Icon */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#302832] hover:text-[#E1306C] border border-white/90 hover:border-[#E1306C]/40 shadow-xs transition-all hover:scale-105 active:scale-95"
            title="Launcher Settings & Liquid Glass Customization"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
