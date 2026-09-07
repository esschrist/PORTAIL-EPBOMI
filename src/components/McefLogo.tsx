import React from 'react';

interface McefLogoProps {
  variant?: 'header' | 'footer' | 'compact';
  lang?: 'FR' | 'EN';
}

export const McefLogo: React.FC<McefLogoProps> = ({ variant = 'header', lang = 'FR' }) => {
  return (
    <div className="flex items-center gap-2.5 select-none" id="mcef-official-emblem">
      {/* Official Seal Emblem */}
      <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-b from-[#13498a] to-[#0a2e5c] p-[2px] shadow-sm flex items-center justify-center shrink-0">
        <div className="w-full h-full rounded-full border border-blue-200/40 flex items-center justify-center bg-[#0d3b73] relative overflow-hidden">
          {/* Globe lines */}
          <svg viewBox="0 0 36 36" className="w-8 h-8 text-blue-200/90" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="18" cy="18" r="14" strokeWidth="1.5" stroke="#93c5fd" />
            <ellipse cx="18" cy="18" rx="7" ry="14" stroke="#60a5fa" />
            <path d="M4 18h28M6 11h24M6 25h24" stroke="#bfdbfe" strokeWidth="1.1" />
            {/* Balance scales / crown icon */}
            <path d="M18 7v6M14 10h8M12 14l2-4 2 4M20 14l2-4 2 4" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col text-left">
        <span className="font-extrabold text-[#0a2e5c] text-sm md:text-base tracking-wider leading-none font-['Outfit',sans-serif]">
          MCEF
        </span>
        <span className="text-[9px] md:text-[10px] text-slate-500 uppercase font-semibold tracking-tight leading-tight mt-0.5 max-w-[190px]">
          {lang === 'FR' ? 'Ministère Chargé de l\'Économie et des Finances' : 'Ministry of Economy and Finance'}
        </span>
      </div>
    </div>
  );
};

export const SigefBrand: React.FC<{ size?: 'sm' | 'md' | 'lg'; lang?: 'FR' | 'EN' }> = ({ size = 'md', lang = 'FR' }) => {
  return (
    <div className="flex items-center gap-3 select-none" id="sigef-brand-header">
      <div className="flex items-center">
        <span className="font-black text-2xl md:text-3xl text-[#0b3b75] tracking-tight font-['Outfit',sans-serif]">
          SIGEF
        </span>
      </div>
      <div className="h-7 w-[1.5px] bg-slate-300 hidden sm:block" />
      <div className="hidden sm:flex flex-col text-left justify-center">
        <span className="text-[11px] md:text-xs font-semibold text-slate-700 leading-tight">
          {lang === 'FR' ? 'Système Intégré de Gestion' : 'Integrated Management System'}
        </span>
        <span className="text-[10px] md:text-[11px] text-slate-500 leading-tight">
          {lang === 'FR' ? 'des Finances du MCEF' : 'of MCEF Finances'}
        </span>
      </div>
    </div>
  );
};
