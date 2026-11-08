/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AppItem, StoryItem, NavTab, FocusZone, LauncherSettings, AppCategory } from './types/launcher';
import { INSTALLED_APPS, STORY_SHORTCUTS } from './data/installedApps';
import { playSound } from './utils/audio';
import { TopBar } from './components/TopBar';
import { FavoritesStories } from './components/FavoritesStories';
import { AppGrid } from './components/AppGrid';
import { BottomDock } from './components/BottomDock';
import { RemoteControlHUD } from './components/RemoteControlHUD';
import { AppViewerModal } from './components/AppViewerModal';
import { SettingsModal } from './components/SettingsModal';
import { AndroidArchitectureModal } from './components/AndroidArchitectureModal';

export default function App() {
  // App catalog state
  const [apps, setApps] = useState<AppItem[]>(INSTALLED_APPS);
  const [stories, setStories] = useState<StoryItem[]>(STORY_SHORTCUTS);
  
  // Navigation & Category state
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<AppCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // D-Pad Focus & Selection state
  const [focusZone, setFocusZone] = useState<FocusZone>('apps');
  const [focusedStoryIndex, setFocusedStoryIndex] = useState<number>(0);
  const [focusedAppIndex, setFocusedAppIndex] = useState<number>(0);
  const [focusedDockIndex, setFocusedDockIndex] = useState<number>(0);

  // Modals & Active App Launch
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState<boolean>(false);

  // Launcher Settings
  const [settings, setSettings] = useState<LauncherSettings>({
    glassIntensity: 'high',
    ambientPinkGlow: true,
    audioFeedback: true,
    tvResolution: '4K',
    displayMode: 'fullscreen',
    showRemoteHud: true
  });

  const [lastKeyPressed, setLastKeyPressed] = useState<string>('');

  // Audio helper
  const triggerSound = useCallback(
    (type: 'focus' | 'select' | 'back' | 'launch' | 'dock') => {
      playSound(type, settings.audioFeedback);
    },
    [settings.audioFeedback]
  );

  // Filtered Apps based on active tab, search, and category
  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      // Tab filter
      if (currentTab === 'favorites' && !app.isFavorite) return false;

      // Category filter
      if (selectedCategory !== 'all' && app.category !== selectedCategory) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesCategory = app.category.toLowerCase().includes(q);
        const matchesDesc = app.description.toLowerCase().includes(q);
        const matchesBadge = app.badge?.toLowerCase().includes(q);
        return matchesName || matchesCategory || matchesDesc || matchesBadge;
      }

      return true;
    });
  }, [apps, currentTab, selectedCategory, searchQuery]);

  // Keep focused app index bounded
  useEffect(() => {
    if (focusedAppIndex >= filteredApps.length && filteredApps.length > 0) {
      setFocusedAppIndex(0);
    }
  }, [filteredApps.length, focusedAppIndex]);

  // Handle Tab Switch from Dock or Settings
  const handleTabChange = useCallback(
    (tab: NavTab) => {
      triggerSound('dock');
      if (tab === 'settings') {
        setIsSettingsOpen(true);
        return;
      }
      if (tab === 'architecture') {
        setIsArchitectureOpen(true);
        return;
      }
      setCurrentTab(tab);
      if (tab === 'apps') {
        setSelectedCategory('all');
      }
      setFocusZone('apps');
    },
    [triggerSound]
  );

  // Toggle Favorite
  const handleToggleFavorite = useCallback(
    (appId: string) => {
      triggerSound('select');
      setApps((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, isFavorite: !app.isFavorite } : app
        )
      );
    },
    [triggerSound]
  );

  // Launch App
  const handleLaunchApp = useCallback(
    (app: AppItem, story?: StoryItem) => {
      triggerSound('launch');
      setActiveApp(app);
      setActiveStory(story || null);
    },
    [triggerSound]
  );

  // Launch Story
  const handleLaunchStory = useCallback(
    (story: StoryItem) => {
      const targetApp = apps.find((a) => a.id === story.appId) || apps[0];
      handleLaunchApp(targetApp, story);
    },
    [apps, handleLaunchApp]
  );

  // D-PAD ENGINE: UP, DOWN, LEFT, RIGHT, OK, BACK, HOME
  const handleDpadUp = useCallback(() => {
    triggerSound('focus');
    if (focusZone === 'dock') {
      setFocusZone('apps');
    } else if (focusZone === 'apps') {
      const gridColumns = 6;
      if (focusedAppIndex >= gridColumns) {
        setFocusedAppIndex((i) => i - gridColumns);
      } else {
        setFocusZone('stories');
      }
    } else if (focusZone === 'stories') {
      setFocusZone('topbar');
    }
  }, [focusZone, focusedAppIndex, triggerSound]);

  const handleDpadDown = useCallback(() => {
    triggerSound('focus');
    if (focusZone === 'topbar') {
      setFocusZone('stories');
    } else if (focusZone === 'stories') {
      setFocusZone('apps');
    } else if (focusZone === 'apps') {
      const gridColumns = 6;
      if (focusedAppIndex + gridColumns < filteredApps.length) {
        setFocusedAppIndex((i) => i + gridColumns);
      } else {
        setFocusZone('dock');
      }
    }
  }, [focusZone, focusedAppIndex, filteredApps.length, triggerSound]);

  const handleDpadLeft = useCallback(() => {
    triggerSound('focus');
    if (focusZone === 'stories') {
      setFocusedStoryIndex((i) => (i > 0 ? i - 1 : stories.length - 1));
    } else if (focusZone === 'apps') {
      setFocusedAppIndex((i) => (i > 0 ? i - 1 : filteredApps.length - 1));
    } else if (focusZone === 'dock') {
      setFocusedDockIndex((i) => (i > 0 ? i - 1 : 4));
    }
  }, [focusZone, stories.length, filteredApps.length, triggerSound]);

  const handleDpadRight = useCallback(() => {
    triggerSound('focus');
    if (focusZone === 'stories') {
      setFocusedStoryIndex((i) => (i < stories.length - 1 ? i + 1 : 0));
    } else if (focusZone === 'apps') {
      setFocusedAppIndex((i) => (i < filteredApps.length - 1 ? i + 1 : 0));
    } else if (focusZone === 'dock') {
      setFocusedDockIndex((i) => (i < 4 ? i + 1 : 0));
    }
  }, [focusZone, stories.length, filteredApps.length, triggerSound]);

  const handleDpadOk = useCallback(() => {
    triggerSound('select');
    if (focusZone === 'stories') {
      const story = stories[focusedStoryIndex];
      if (story) handleLaunchStory(story);
    } else if (focusZone === 'apps') {
      const app = filteredApps[focusedAppIndex];
      if (app) handleLaunchApp(app);
    } else if (focusZone === 'dock') {
      const tabs: NavTab[] = ['home', 'apps', 'favorites', 'settings', 'architecture'];
      const targetTab = tabs[focusedDockIndex];
      if (targetTab) handleTabChange(targetTab);
    }
  }, [
    focusZone,
    stories,
    focusedStoryIndex,
    handleLaunchStory,
    filteredApps,
    focusedAppIndex,
    handleLaunchApp,
    focusedDockIndex,
    handleTabChange,
    triggerSound
  ]);

  const handleDpadBack = useCallback(() => {
    triggerSound('back');
    if (activeApp) {
      setActiveApp(null);
      setActiveStory(null);
      return;
    }
    if (isSettingsOpen) {
      setIsSettingsOpen(false);
      return;
    }
    if (isArchitectureOpen) {
      setIsArchitectureOpen(false);
      return;
    }
    if (currentTab !== 'home') {
      setCurrentTab('home');
      setFocusZone('apps');
      return;
    }
    setFocusZone('stories');
  }, [activeApp, isSettingsOpen, isArchitectureOpen, currentTab, triggerSound]);

  const handleDpadHome = useCallback(() => {
    triggerSound('back');
    setActiveApp(null);
    setActiveStory(null);
    setIsSettingsOpen(false);
    setIsArchitectureOpen(false);
    setCurrentTab('home');
    setSelectedCategory('all');
    setSearchQuery('');
    setFocusZone('stories');
    setFocusedStoryIndex(0);
  }, [triggerSound]);

  // Physical Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is actively typing in search input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === 'Escape') {
          (e.target as HTMLElement).blur();
        }
        return;
      }

      setLastKeyPressed(e.key);
      setTimeout(() => setLastKeyPressed(''), 200);

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleDpadUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleDpadDown();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleDpadLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleDpadRight();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleDpadOk();
          break;
        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          handleDpadBack();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          handleDpadHome();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    handleDpadUp,
    handleDpadDown,
    handleDpadLeft,
    handleDpadRight,
    handleDpadOk,
    handleDpadBack,
    handleDpadHome
  ]);

  const favoritesCount = useMemo(() => apps.filter((a) => a.isFavorite).length, [apps]);

  return (
    <div
      className={`min-h-screen w-full relative transition-all duration-500 overflow-x-hidden ${
        settings.displayMode === 'cinema_tv'
          ? 'bg-[#18151A] p-4 sm:p-8 flex items-center justify-center'
          : 'bg-[#FFFFFF]'
      }`}
    >
      {/* Living Room Smart TV Bezel Frame if cinema_tv mode */}
      <div
        className={`w-full relative transition-all duration-500 flex flex-col justify-between ${
          settings.displayMode === 'cinema_tv'
            ? 'max-w-[1560px] aspect-[16/9] bg-[#FFFFFF] rounded-[32px] shadow-[0_25px_80px_rgba(225,48,108,0.18)] border-[10px] border-[#2A232D] overflow-hidden'
            : 'min-h-screen bg-[#FFFFFF]'
        }`}
      >
        {/* Soft Ambient Refraction Background (#FFF7FB & delicate light gradients) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFF0F5] blur-3xl opacity-70" />
          <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-[#FDF0FF] blur-3xl opacity-60" />
          <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-[#FFF7FB] blur-3xl opacity-80" />
          {settings.ambientPinkGlow && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-32 bg-gradient-to-r from-[#E1306C]/5 via-[#833AB4]/5 to-[#FCAF45]/5 blur-2xl pointer-events-none" />
          )}
        </div>

        {/* 1. TOP BAR */}
        <TopBar
          onOpenSettings={() => {
            triggerSound('select');
            setIsSettingsOpen(true);
          }}
          onOpenArchitecture={() => {
            triggerSound('select');
            setIsArchitectureOpen(true);
          }}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          focusedZone={focusZone}
        />

        {/* MAIN LAUNCHER CONTENT AREA */}
        <main className="relative z-10 flex-1 flex flex-col pb-28">
          
          {/* 2. FAVOURITES & INSTAGRAM STORIES ROW (visible on Home & Favorites tabs) */}
          {(currentTab === 'home' || currentTab === 'favorites') && !searchQuery && (
            <FavoritesStories
              stories={stories}
              focusedIndex={focusedStoryIndex}
              isZoneFocused={focusZone === 'stories'}
              onSelectStory={handleLaunchStory}
              onFocusStory={(index) => {
                setFocusedStoryIndex(index);
                setFocusZone('stories');
              }}
            />
          )}

          {/* 3. APPLICATION GRID */}
          <AppGrid
            apps={filteredApps}
            focusedIndex={focusedAppIndex}
            isZoneFocused={focusZone === 'apps'}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              triggerSound('select');
              setSelectedCategory(cat);
            }}
            onSelectApp={(app) => handleLaunchApp(app)}
            onFocusApp={(index) => {
              setFocusedAppIndex(index);
              setFocusZone('apps');
            }}
            onToggleFavorite={handleToggleFavorite}
          />
        </main>

        {/* 4. FLOATING FROSTED GLASS BOTTOM DOCK */}
        <BottomDock
          currentTab={currentTab}
          onTabChange={handleTabChange}
          favoritesCount={favoritesCount}
          isZoneFocused={focusZone === 'dock'}
          focusedIndex={focusedDockIndex}
        />

        {/* 5. VIRTUAL SMART TV REMOTE CONTROL HUD */}
        {settings.showRemoteHud && (
          <RemoteControlHUD
            onDpadUp={handleDpadUp}
            onDpadDown={handleDpadDown}
            onDpadLeft={handleDpadLeft}
            onDpadRight={handleDpadRight}
            onDpadOk={handleDpadOk}
            onDpadBack={handleDpadBack}
            onDpadHome={handleDpadHome}
            lastKeyPressed={lastKeyPressed}
            isMuted={!settings.audioFeedback}
            onToggleMute={() => {
              setSettings((s) => ({ ...s, audioFeedback: !s.audioFeedback }));
            }}
          />
        )}

        {/* MODAL 1: ACTIVE TV APPLICATION PLAYER */}
        {activeApp && (
          <AppViewerModal
            app={activeApp}
            storyContext={activeStory}
            onClose={() => {
              setActiveApp(null);
              setActiveStory(null);
            }}
            onSoundTick={() => triggerSound('select')}
          />
        )}

        {/* MODAL 2: LAUNCHER SETTINGS & GLASS INTENSITY */}
        {isSettingsOpen && (
          <SettingsModal
            settings={settings}
            onUpdateSettings={(newVals) => setSettings((s) => ({ ...s, ...newVals }))}
            onClose={() => setIsSettingsOpen(false)}
            onOpenArchitecture={() => {
              setIsSettingsOpen(false);
              setIsArchitectureOpen(true);
            }}
            onSoundTick={() => triggerSound('select')}
          />
        )}

        {/* MODAL 3: ANDROID 9 ARCHITECTURE & APK UNDER 2MB VERIFIER */}
        {isArchitectureOpen && (
          <AndroidArchitectureModal
            onClose={() => setIsArchitectureOpen(false)}
            onSoundTick={() => triggerSound('select')}
          />
        )}

      </div>
    </div>
  );
}
