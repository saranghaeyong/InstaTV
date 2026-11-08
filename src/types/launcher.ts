export type AppCategory = 'entertainment' | 'music' | 'gaming' | 'utilities' | 'social';

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  category: AppCategory;
  iconType: string;
  badge?: string;
  gradient: string;
  accentColor: string;
  description: string;
  version: string;
  sizeKb: number;
  isFavorite: boolean;
  unseenStoriesCount?: number;
  rating?: number;
}

export interface StoryItem {
  id: string;
  title: string;
  appId: string;
  appName: string;
  thumbnail: string;
  accentGradient: string;
  hasUnseen: boolean;
  badgeText: string;
}

export type NavTab = 'home' | 'apps' | 'favorites' | 'settings' | 'architecture';

export type FocusZone = 'topbar' | 'stories' | 'apps' | 'dock' | 'modal' | 'remote';

export interface LauncherSettings {
  glassIntensity: 'high' | 'medium' | 'legacy_android9';
  ambientPinkGlow: boolean;
  audioFeedback: boolean;
  tvResolution: '4K' | '1080p';
  displayMode: 'cinema_tv' | 'fullscreen';
  showRemoteHud: boolean;
}
