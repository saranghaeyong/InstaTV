import React from 'react';
import { NavTab } from '../types/launcher';
import { Home, Grid, Heart, Settings, Code, Sparkles } from 'lucide-react';

interface BottomDockProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  favoritesCount: number;
  isZoneFocused: boolean;
  focusedIndex: number;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  currentTab,
  onTabChange,
  favoritesCount,
  isZoneFocused,
  focusedIndex
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'apps', label: 'Apps', icon: <Grid className="w-4 h-4" /> },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Heart className="w-4 h-4" />,
      badge: favoritesCount > 0 ? `${favoritesCount}` : undefined
    },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    {
      id: 'architecture',
      label: 'Android 9 Spec',
      icon: <Code className="w-4 h-4" />,
      badge: '< 2MB'
    }
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="liquid-glass-dock rounded-2xl p-2 flex items-center gap-1.5 shadow-xl transition-all duration-300">
        
        {tabs.map((tab, index) => {
          const isActive = currentTab === tab.id;
          const isSelected = isZoneFocused && focusedIndex === index;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-white shadow-md scale-102'
                  : 'text-[#6B5E6D] hover:text-[#302832] hover:bg-white/80'
              } ${isSelected ? 'ring-2 ring-[#E1306C] shadow-[0_0_16px_rgba(225,48,108,0.4)]' : ''}`}
            >
              {/* Icon */}
              <span className={isActive ? 'text-white' : 'text-[#833AB4]'}>
                {tab.icon}
              </span>

              {/* Label */}
              <span className="whitespace-nowrap tracking-tight">
                {tab.label}
              </span>

              {/* Active Pink Indicator dot if active */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs ml-0.5" />
              )}

              {/* Mini Badge if provided */}
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-[#FFF0F5] text-[#E1306C] border border-[#E1306C]/20'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

      </div>
    </nav>
  );
};
