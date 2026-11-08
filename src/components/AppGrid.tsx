import React, { useRef, useEffect } from 'react';
import { AppItem, AppCategory } from '../types/launcher';
import { AppIcon } from './AppIcon';
import { Star, Tv, Film, Music, Gamepad2, Wrench, Sparkles, ExternalLink } from 'lucide-react';

interface AppGridProps {
  apps: AppItem[];
  focusedIndex: number;
  isZoneFocused: boolean;
  selectedCategory: AppCategory | 'all';
  onCategoryChange: (cat: AppCategory | 'all') => void;
  onSelectApp: (app: AppItem) => void;
  onFocusApp: (index: number) => void;
  onToggleFavorite: (appId: string) => void;
}

export const AppGrid: React.FC<AppGridProps> = ({
  apps,
  focusedIndex,
  isZoneFocused,
  selectedCategory,
  onCategoryChange,
  onSelectApp,
  onFocusApp,
  onToggleFavorite
}) => {
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Smooth scroll focused element into view
  useEffect(() => {
    if (isZoneFocused && cardRefs.current[focusedIndex]) {
      cardRefs.current[focusedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [focusedIndex, isZoneFocused]);

  const categories: { id: AppCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Apps', icon: <Tv className="w-3.5 h-3.5" /> },
    { id: 'entertainment', label: 'Entertainment', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'music', label: 'Music & Audio', icon: <Music className="w-3.5 h-3.5" /> },
    { id: 'gaming', label: 'Gaming & Emulators', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'utilities', label: 'System & Tools', icon: <Wrench className="w-3.5 h-3.5" /> }
  ];

  return (
    <section className="relative z-10 px-8 py-3 flex-1 flex flex-col">
      <div className="liquid-glass-surface rounded-2xl p-6 flex-1 flex flex-col transition-all duration-300">
        
        {/* Category Filter Tabs & Total Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/70 border border-white/80 shadow-xs overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white shadow-xs scale-102'
                      : 'text-[#6B5E6D] hover:text-[#302832] hover:bg-white/80'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6B5E6D] font-medium">
            <span>Showing {apps.length} Applications</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] bg-white/80 px-2 py-0.5 rounded border border-white">
              D-Pad Active
            </span>
          </div>
        </div>

        {/* Empty State if filter yields 0 apps */}
        {apps.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF0F5] border border-[#E1306C]/30 flex items-center justify-center mb-3">
              <Sparkles className="w-8 h-8 text-[#E1306C]" />
            </div>
            <p className="text-base font-bold text-[#302832]">No Applications Found</p>
            <p className="text-xs text-[#6B5E6D] mt-1 max-w-sm">
              No installed apps match your active filter or search term. Try switching categories or clearing search.
            </p>
            <button
              onClick={() => onCategoryChange('all')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#E1306C] text-white text-xs font-semibold shadow-sm hover:bg-[#C13584] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Applications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {apps.map((app, index) => {
            const isSelected = isZoneFocused && focusedIndex === index;

            return (
              <button
                key={app.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => {
                  onFocusApp(index);
                  onSelectApp(app);
                }}
                onMouseEnter={() => onFocusApp(index)}
                className={`group relative text-left rounded-2xl transition-all duration-200 focus:outline-none flex flex-col ${
                  isSelected
                    ? 'scale-105 z-20 focus-pink-glow bg-white'
                    : 'liquid-glass-surface hover:scale-102 hover:bg-white/95'
                }`}
              >
                {/* Specular Top Reflection Line */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rounded-t-2xl pointer-events-none" />

                {/* Card Interior */}
                <div className="p-4 flex flex-col h-full justify-between relative overflow-hidden rounded-2xl">
                  
                  {/* Subtle Top Gradient Splash */}
                  <div
                    className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${app.gradient} opacity-10 group-hover:opacity-20 blur-xl pointer-events-none transition-opacity`}
                  />

                  {/* Header: Icon + Favorite Star */}
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    {/* App Icon Container */}
                    <div className="relative p-1.5 rounded-xl bg-white/90 border border-white/95 shadow-xs group-hover:shadow-md transition-shadow">
                      <AppIcon type={app.id} size={36} />
                      {app.unseenStoriesCount && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#E1306C] text-white text-[9px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
                          {app.unseenStoriesCount}
                        </span>
                      )}
                    </div>

                    {/* Favorite Toggle Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(app.id);
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        app.isFavorite
                          ? 'text-[#E1306C] bg-[#FFF0F5]'
                          : 'text-gray-300 hover:text-[#E1306C] hover:bg-white'
                      }`}
                      title={app.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-3.5 h-3.5 ${app.isFavorite ? 'fill-[#E1306C]' : ''}`} />
                    </button>
                  </div>

                  {/* Content: Title & Badge */}
                  <div className="relative z-10 flex-1 flex flex-col justify-end">
                    {app.badge && (
                      <span className="text-[10px] font-semibold text-[#C13584] uppercase tracking-wider mb-0.5">
                        {app.badge}
                      </span>
                    )}

                    <h3 className="font-display font-bold text-sm text-[#302832] group-hover:text-[#E1306C] transition-colors truncate">
                      {app.name}
                    </h3>

                    <p className="text-[11px] text-[#6B5E6D] line-clamp-1 mt-0.5">
                      {app.description}
                    </p>

                    {/* Metadata Footer: APK Size & Category */}
                    <div className="mt-3 pt-2.5 border-t border-black/[0.04] flex items-center justify-between text-[10px] text-[#6B5E6D]">
                      <span className="capitalize">{app.category}</span>
                      <span className="font-mono tabular-nums text-gray-400">
                        {(app.sizeKb / 1024).toFixed(1)} MB
                      </span>
                    </div>
                  </div>

                  {/* D-Pad Select Hint on Focus */}
                  {isSelected && (
                    <div className="mt-2 text-center py-1 px-2 rounded-lg bg-[#FFF0F5] border border-[#E1306C]/30 text-[10px] font-bold text-[#E1306C] flex items-center justify-center gap-1">
                      <span>Press OK to Open</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  )}

                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
