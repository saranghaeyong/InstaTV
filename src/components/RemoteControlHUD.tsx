import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  RotateCcw,
  Home,
  Volume2,
  VolumeX,
  Power,
  Tv,
  Keyboard,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface RemoteControlHUDProps {
  onDpadUp: () => void;
  onDpadDown: () => void;
  onDpadLeft: () => void;
  onDpadRight: () => void;
  onDpadOk: () => void;
  onDpadBack: () => void;
  onDpadHome: () => void;
  lastKeyPressed?: string;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const RemoteControlHUD: React.FC<RemoteControlHUDProps> = ({
  onDpadUp,
  onDpadDown,
  onDpadLeft,
  onDpadRight,
  onDpadOk,
  onDpadBack,
  onDpadHome,
  lastKeyPressed,
  isMuted,
  onToggleMute
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const triggerBtn = (name: string, callback: () => void) => {
    setActiveBtn(name);
    callback();
    setTimeout(() => setActiveBtn(null), 150);
  };

  return (
    <aside className="fixed bottom-24 right-6 z-40 transition-all duration-300">
      {/* Collapsed floating button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="liquid-glass-surface rounded-2xl px-4 py-3 flex items-center gap-2.5 shadow-xl hover:scale-105 active:scale-95 transition-all text-[#302832] border border-white"
          title="Open Virtual TV Remote Control"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#833AB4] to-[#E1306C] flex items-center justify-center text-white shadow-xs">
            <Tv className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold font-display">TV Remote</span>
            <span className="text-[10px] text-[#6B5E6D]">Click or Arrow Keys</span>
          </div>
        </button>
      )}

      {/* Expanded Remote Control Body */}
      {isExpanded && (
        <div className="w-56 liquid-glass-surface rounded-3xl p-4 shadow-2xl border border-white/95 relative backdrop-blur-2xl flex flex-col items-center">
          
          {/* Remote Top Bar */}
          <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-black/[0.05]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold font-display text-[#302832]">
                Insta Remote
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => triggerBtn('power', () => {})}
                className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                title="TV Standby / Power"
              >
                <Power className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg text-[#6B5E6D] hover:bg-black/5 transition-colors"
                title="Minimize Remote"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* D-Pad Circular Controller */}
          <div className="relative w-36 h-36 my-2 flex items-center justify-center">
            
            {/* Outer D-Pad Ring */}
            <div className="w-full h-full rounded-full bg-gradient-to-b from-white to-[#F8F4F7] border border-white/90 shadow-md flex items-center justify-center relative p-1">
              
              {/* UP Button */}
              <button
                onClick={() => triggerBtn('up', onDpadUp)}
                className={`absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-t-full flex items-center justify-center text-[#302832] hover:text-[#E1306C] transition-all ${
                  activeBtn === 'up' || lastKeyPressed === 'ArrowUp'
                    ? 'bg-[#E1306C] text-white shadow-inner scale-95'
                    : 'hover:bg-white/90'
                }`}
                title="D-Pad Up (Arrow Up)"
              >
                <ChevronUp className="w-5 h-5" />
              </button>

              {/* DOWN Button */}
              <button
                onClick={() => triggerBtn('down', onDpadDown)}
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-10 rounded-b-full flex items-center justify-center text-[#302832] hover:text-[#E1306C] transition-all ${
                  activeBtn === 'down' || lastKeyPressed === 'ArrowDown'
                    ? 'bg-[#E1306C] text-white shadow-inner scale-95'
                    : 'hover:bg-white/90'
                }`}
                title="D-Pad Down (Arrow Down)"
              >
                <ChevronDown className="w-5 h-5" />
              </button>

              {/* LEFT Button */}
              <button
                onClick={() => triggerBtn('left', onDpadLeft)}
                className={`absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-l-full flex items-center justify-center text-[#302832] hover:text-[#E1306C] transition-all ${
                  activeBtn === 'left' || lastKeyPressed === 'ArrowLeft'
                    ? 'bg-[#E1306C] text-white shadow-inner scale-95'
                    : 'hover:bg-white/90'
                }`}
                title="D-Pad Left (Arrow Left)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* RIGHT Button */}
              <button
                onClick={() => triggerBtn('right', onDpadRight)}
                className={`absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-r-full flex items-center justify-center text-[#302832] hover:text-[#E1306C] transition-all ${
                  activeBtn === 'right' || lastKeyPressed === 'ArrowRight'
                    ? 'bg-[#E1306C] text-white shadow-inner scale-95'
                    : 'hover:bg-white/90'
                }`}
                title="D-Pad Right (Arrow Right)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* CENTER OK BUTTON */}
              <button
                onClick={() => triggerBtn('ok', onDpadOk)}
                className={`w-14 h-14 rounded-full bg-gradient-to-tr from-white via-[#FFF7FB] to-white border border-[#E1306C]/30 shadow-sm flex flex-col items-center justify-center text-[#302832] font-bold text-xs transition-all ${
                  activeBtn === 'ok' || lastKeyPressed === 'Enter'
                    ? 'bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white scale-90 shadow-inner'
                    : 'hover:border-[#E1306C] hover:scale-105'
                }`}
                title="OK / Select (Enter Key)"
              >
                <span className="font-display font-extrabold tracking-wider text-[11px]">
                  OK
                </span>
              </button>

            </div>
          </div>

          {/* Navigation Action Buttons: Back, Home, Mute */}
          <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-black/[0.05]">
            
            {/* Back Button */}
            <button
              onClick={() => triggerBtn('back', onDpadBack)}
              className={`p-2.5 rounded-2xl bg-white/80 hover:bg-white border border-white shadow-xs flex flex-col items-center justify-center gap-1 text-[#302832] transition-all ${
                activeBtn === 'back' || lastKeyPressed === 'Escape' || lastKeyPressed === 'Backspace'
                  ? 'bg-[#E1306C] text-white scale-95'
                  : 'hover:text-[#E1306C]'
              }`}
              title="Back (Escape or Backspace)"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-[9px] font-bold">Back</span>
            </button>

            {/* Home Button */}
            <button
              onClick={() => triggerBtn('home', onDpadHome)}
              className={`p-2.5 rounded-2xl bg-white/80 hover:bg-white border border-white shadow-xs flex flex-col items-center justify-center gap-1 text-[#302832] transition-all ${
                activeBtn === 'home' || lastKeyPressed === 'KeyH'
                  ? 'bg-[#E1306C] text-white scale-95'
                  : 'hover:text-[#E1306C]'
              }`}
              title="Home (Press H)"
            >
              <Home className="w-4 h-4" />
              <span className="text-[9px] font-bold">Home</span>
            </button>

            {/* Mute Button */}
            <button
              onClick={onToggleMute}
              className={`p-2.5 rounded-2xl bg-white/80 hover:bg-white border border-white shadow-xs flex flex-col items-center justify-center gap-1 transition-all ${
                isMuted ? 'text-rose-500 bg-rose-50' : 'text-[#302832] hover:text-[#E1306C]'
              }`}
              title="Mute Audio FX"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="text-[9px] font-bold">{isMuted ? 'Muted' : 'Sound'}</span>
            </button>

          </div>

          {/* Keyboard Navigation Tip */}
          <div className="w-full mt-3 p-2 rounded-xl bg-white/60 border border-white/80 flex items-center gap-2 text-[10px] text-[#6B5E6D]">
            <Keyboard className="w-3.5 h-3.5 text-[#E1306C] shrink-0" />
            <span>Use Arrow Keys & Enter on keyboard</span>
          </div>

        </div>
      )}
    </aside>
  );
};
