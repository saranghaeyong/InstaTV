import React from 'react';
import { LauncherSettings } from '../types/launcher';
import {
  X,
  Sliders,
  Sparkles,
  Volume2,
  Tv,
  Check,
  ShieldCheck,
  Cpu,
  Layers
} from 'lucide-react';

interface SettingsModalProps {
  settings: LauncherSettings;
  onUpdateSettings: (newSettings: Partial<LauncherSettings>) => void;
  onClose: () => void;
  onOpenArchitecture: () => void;
  onSoundTick: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onOpenArchitecture,
  onSoundTick
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="liquid-glass-surface rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl border border-white/95 relative max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white shadow-md">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-[#302832]">
                Launcher Settings
              </h2>
              <p className="text-xs text-[#6B5E6D]">
                Liquid Glass customization & TV OS performance tuning
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onSoundTick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-[#302832] border border-white shadow-xs transition-all hover:scale-105 active:scale-95"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Setting Groups */}
        <div className="space-y-6">
          
          {/* 1. Glass Blur Mode */}
          <div className="p-4 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-[#E1306C]" />
              <label className="text-sm font-bold text-[#302832]">
                Glass Rendering & Blur Mode
              </label>
            </div>
            <p className="text-xs text-[#6B5E6D] mb-3">
              Control the intensity of the simulated frosted glass shader.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                {
                  id: 'high',
                  title: 'Apple Liquid Glass',
                  desc: '28px multi-layer specular blur'
                },
                {
                  id: 'medium',
                  title: 'Translucent White',
                  desc: '16px balanced glass shader'
                },
                {
                  id: 'legacy_android9',
                  title: 'Android 9 Native',
                  desc: 'Hardware shape alpha & gradient'
                }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    onSoundTick();
                    onUpdateSettings({ glassIntensity: mode.id as LauncherSettings['glassIntensity'] });
                  }}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    settings.glassIntensity === mode.id
                      ? 'bg-gradient-to-tr from-[#FFF0F5] to-white border-[#E1306C] shadow-sm ring-2 ring-[#E1306C]/20'
                      : 'bg-white/80 border-white/90 hover:bg-white text-[#302832]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#302832]">
                      {mode.title}
                    </span>
                    {settings.glassIntensity === mode.id && (
                      <Check className="w-3.5 h-3.5 text-[#E1306C]" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#6B5E6D]">{mode.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Interactive Remote HUD & Audio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Audio Feedback */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#833AB4]" />
                  <span className="text-xs font-bold text-[#302832]">
                    UI Audio Feedback
                  </span>
                </div>
                <p className="text-[11px] text-[#6B5E6D] mt-0.5">
                  Synthesized glass click on D-pad navigation
                </p>
              </div>

              <button
                onClick={() => {
                  onUpdateSettings({ audioFeedback: !settings.audioFeedback });
                  onSoundTick();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.audioFeedback ? 'bg-[#E1306C]' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    settings.audioFeedback ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Ambient Pink Glow */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/80 shadow-xs flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E1306C]" />
                  <span className="text-xs font-bold text-[#302832]">
                    Pink Glow Highlights
                  </span>
                </div>
                <p className="text-[11px] text-[#6B5E6D] mt-0.5">
                  Instagram neon halo on focused tiles
                </p>
              </div>

              <button
                onClick={() => {
                  onUpdateSettings({ ambientPinkGlow: !settings.ambientPinkGlow });
                  onSoundTick();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.ambientPinkGlow ? 'bg-[#E1306C]' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    settings.ambientPinkGlow ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* 3. Display Viewport Presentation */}
          <div className="p-4 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-[#302832]" />
                <span className="text-sm font-bold text-[#302832]">
                  TV Display Mode
                </span>
              </div>
              <span className="text-xs text-[#833AB4] font-semibold">
                Living Room Simulation
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onSoundTick();
                  onUpdateSettings({ displayMode: 'cinema_tv' });
                }}
                className={`p-3 rounded-xl text-left border transition-all ${
                  settings.displayMode === 'cinema_tv'
                    ? 'bg-gradient-to-tr from-[#FFF0F5] to-white border-[#E1306C] shadow-sm'
                    : 'bg-white/80 border-white/90 hover:bg-white text-[#302832]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#302832]">16:9 Living Room Frame</span>
                  {settings.displayMode === 'cinema_tv' && (
                    <Check className="w-3.5 h-3.5 text-[#E1306C]" />
                  )}
                </div>
                <p className="text-[10px] text-[#6B5E6D]">
                  Simulates authentic smart TV screen with ambient backdrop
                </p>
              </button>

              <button
                onClick={() => {
                  onSoundTick();
                  onUpdateSettings({ displayMode: 'fullscreen' });
                }}
                className={`p-3 rounded-xl text-left border transition-all ${
                  settings.displayMode === 'fullscreen'
                    ? 'bg-gradient-to-tr from-[#FFF0F5] to-white border-[#E1306C] shadow-sm'
                    : 'bg-white/80 border-white/90 hover:bg-white text-[#302832]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#302832]">Full Window Canvas</span>
                  {settings.displayMode === 'fullscreen' && (
                    <Check className="w-3.5 h-3.5 text-[#E1306C]" />
                  )}
                </div>
                <p className="text-[10px] text-[#6B5E6D]">
                  Expands launcher across the entire browser viewport
                </p>
              </button>
            </div>
          </div>

          {/* 4. APK Under 2 MB & Android 9 Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#833AB4]/10 via-[#E1306C]/10 to-[#FCAF45]/10 border border-[#E1306C]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#E1306C]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#302832]">
                  Release APK Size: <span className="text-[#833AB4]">910 KB</span> (Limit: 2,048 KB)
                </p>
                <p className="text-[11px] text-[#6B5E6D]">
                  Native Android 9 API 28+ hardware-accelerated Java architecture
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenArchitecture();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FFF0F5] text-xs font-bold text-[#E1306C] border border-[#E1306C]/30 shadow-xs hover:scale-102 transition-all whitespace-nowrap"
            >
              Inspect Specs
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
