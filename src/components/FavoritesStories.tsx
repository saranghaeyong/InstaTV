import React, { useRef } from 'react';
import { StoryItem } from '../types/launcher';
import { ChevronLeft, ChevronRight, Play, Flame } from 'lucide-react';
import { AppIcon } from './AppIcon';

interface FavoritesStoriesProps {
  stories: StoryItem[];
  focusedIndex: number;
  isZoneFocused: boolean;
  onSelectStory: (story: StoryItem) => void;
  onFocusStory: (index: number) => void;
}

export const FavoritesStories: React.FC<FavoritesStoriesProps> = ({
  stories,
  focusedIndex,
  isZoneFocused,
  onSelectStory,
  onFocusStory
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative z-20 px-8 py-3">
      <div className="liquid-glass-surface rounded-2xl p-5 relative overflow-hidden transition-all duration-300">
        
        {/* Soft pink ambient refraction in corner */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-l from-[#FFF0F5] to-transparent pointer-events-none rounded-2xl opacity-60" />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#E1306C] to-[#833AB4]" />
            <h2 className="text-base font-bold text-[#302832] tracking-tight">
              FAVOURITES & STORIES
            </h2>
            <span className="text-xs text-[#6B5E6D] font-medium hidden sm:inline">
              · Quick-resume your channels & live streams
            </span>
          </div>

          {/* Navigation Arrows for Mouse or TV Pointer */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollLeft}
              className="p-1.5 rounded-xl bg-white/70 hover:bg-white text-[#302832] border border-white/80 shadow-xs transition-all hover:scale-105 active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-1.5 rounded-xl bg-white/70 hover:bg-white text-[#302832] border border-white/80 shadow-xs transition-all hover:scale-105 active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Story Shortcuts Row */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
        >
          {stories.map((story, index) => {
            const isSelected = isZoneFocused && focusedIndex === index;

            return (
              <button
                key={story.id}
                onClick={() => {
                  onFocusStory(index);
                  onSelectStory(story);
                }}
                onMouseEnter={() => onFocusStory(index)}
                className={`group flex flex-col items-center shrink-0 text-left transition-all duration-200 focus:outline-none ${
                  isSelected ? 'scale-108 -translate-y-1' : 'hover:scale-103'
                }`}
              >
                {/* Story Gradient Ring with Translucent Backing */}
                <div
                  className={`relative p-[3px] rounded-full transition-all duration-300 ${
                    story.hasUnseen
                      ? 'instagram-gradient-border'
                      : 'bg-gradient-to-tr from-[#E1306C]/40 via-white/80 to-[#833AB4]/30'
                  } ${
                    isSelected
                      ? 'ring-4 ring-[#E1306C]/40 shadow-[0_0_24px_rgba(225,48,108,0.45)]'
                      : 'shadow-sm'
                  }`}
                >
                  {/* Frosted Translucent Inner Disc */}
                  <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-md p-1 flex items-center justify-center relative overflow-hidden border border-white/80">
                    
                    {/* App Thumbnail / Icon Avatar */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-[#FFF7FB] flex items-center justify-center relative overflow-hidden shadow-inner">
                      <AppIcon type={story.appId} size={36} />

                      {/* Play badge / Live indicator */}
                      <div className="absolute inset-0 bg-[#302832]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-6 h-6 text-white drop-shadow-md fill-white" />
                      </div>
                    </div>

                    {/* Unseen / Status Indicator pill */}
                    {story.hasUnseen && (
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.2 bg-[#E1306C] text-[9px] font-extrabold text-white rounded-full border border-white shadow-xs">
                        {story.badgeText.includes('LIVE') ? '● LIVE' : 'NEW'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Badge Under Ring */}
                <div className="mt-2 text-center max-w-[100px]">
                  <p
                    className={`text-xs font-semibold truncate transition-colors ${
                      isSelected ? 'text-[#E1306C]' : 'text-[#302832] group-hover:text-[#E1306C]'
                    }`}
                  >
                    {story.title}
                  </p>
                  <p className="text-[10px] text-[#6B5E6D] truncate font-medium">
                    {story.appName}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
