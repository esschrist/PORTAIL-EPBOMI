import React from 'react';
import { FinancialStats, MonthlyDataPoint, CategoryBreakdown, Transaction, Language, NavSection } from '../types';
import { DeviceMockupShowcase } from './DeviceMockupShowcase';
import { User, Shield, Clock, CheckCircle2, ArrowRight, Globe2, Sparkles, Building2 } from 'lucide-react';

interface HeroSectionProps {
  stats: FinancialStats;
  monthlyData: MonthlyDataPoint[];
  breakdown: CategoryBreakdown[];
  transactions: Transaction[];
  lang: Language;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenPortal: () => void;
  onSelectSection: (section: NavSection) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  monthlyData,
  breakdown,
  transactions,
  lang,
  onOpenAuth,
  onOpenPortal,
  onSelectSection,
}) => {
  return (
    <div className="relative overflow-hidden pt-4 sm:pt-8 pb-12 bg-gradient-to-b from-[#f8fafc] via-[#edf2f9] to-[#e6effa]">
      {/* Background Decorative Digital Globe & Network Rings */}
      <div className="absolute top-0 right-0 w-[420px] sm:w-[600px] lg:w-[720px] h-[420px] sm:h-[600px] lg:h-[720px] pointer-events-none select-none opacity-80 sm:opacity-90 -translate-y-8 translate-x-12 sm:translate-x-16">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          <defs>
            <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#1d4ed8" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#0f172a" stopOpacity="0.0" />
            </radialGradient>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Glowing Aura */}
          <circle cx="380" cy="240" r="220" fill="url(#globeGlow)" />

          {/* Globe Sphere with continents silhouette & lines */}
          <g transform="translate(160, 40)">
            <circle cx="200" cy="200" r="170" fill="#0f4c81" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Latitude arcs */}
            <ellipse cx="200" cy="200" rx="170" ry="60" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.6" />
            <ellipse cx="200" cy="200" rx="170" ry="120" fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeOpacity="0.5" />
            <ellipse cx="200" cy="200" rx="80" ry="170" fill="none" stroke="#38bdf8" strokeWidth="1.4" strokeOpacity="0.6" />
            <ellipse cx="200" cy="200" rx="140" ry="170" fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.5" />
            <line x1="30" y1="200" x2="370" y2="200" stroke="#93c5fd" strokeWidth="1.5" strokeOpacity="0.7" />

            {/* Orbiting data rings */}
            <circle cx="200" cy="200" r="215" fill="none" stroke="url(#orbitGrad)" strokeWidth="2.5" strokeDasharray="16 12" className="animate-spin-slow" />
            
            {/* Network Nodes */}
            <circle cx="160" cy="140" r="5" fill="#38bdf8" className="animate-ping" />
            <circle cx="160" cy="140" r="4" fill="#ffffff" />
            <circle cx="240" cy="170" r="4" fill="#ffffff" />
            <circle cx="270" cy="250" r="4.5" fill="#38bdf8" />
            <circle cx="140" cy="270" r="4" fill="#60a5fa" />
          </g>
        </svg>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tag & Title as requested by user */}
        <div className="max-w-3xl pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 bg-blue-100/90 text-[#0b3b75] px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border border-blue-200/80 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-[#1565c0]" />
            <span>MCEF • RÉPUBLIQUE • PORTAIL FINANCIER OFFICIEL</span>
          </div>

          {/* REQUIRED TITLE: "Un seul portail web pour gérer tous les services financiers du MCEF" */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#0b356e] tracking-tight leading-[1.08] font-['Outfit',sans-serif]">
            Un seul portail web pour gérer tous les services financiers du MCEF
          </h1>

          {/* Underline bar matching image */}
          <div className="w-24 sm:w-32 h-1.5 bg-[#1565c0] rounded-full mt-4 mb-3" />

          <p className="text-slate-600 text-sm sm:text-base font-medium max-w-2xl leading-relaxed mt-2">
            {lang === 'FR' 
              ? 'Pilotage budgétaire, comptabilité publique, trésorerie de l\'État et audit financier centralisés sur une plateforme institutionnelle sécurisée et accessible.'
              : 'Budget monitoring, public accounting, state treasury, and financial audits centralized on an institutional, secure, and accessible platform.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={onOpenPortal}
              className="inline-flex items-center gap-2 bg-[#0e3b75] hover:bg-[#092b57] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition transform active:scale-98"
            >
              <span>{lang === 'FR' ? 'Accéder au portail interactif' : 'Open live web portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition"
            >
              <User className="w-4 h-4 text-blue-600" />
              <span>{lang === 'FR' ? 'Espace Agent MCEF' : 'MCEF Agent Area'}</span>
            </button>
          </div>
        </div>

        {/* CENTER DEVICE SHOWCASE (Tablet, Laptop in middle, Phone on right) */}
        {/* Tablet is explicitly synchronized with the central PC */}
        <div className="mt-6 sm:mt-8">
          <DeviceMockupShowcase
            stats={stats}
            monthlyData={monthlyData}
            breakdown={breakdown}
            transactions={transactions}
            lang={lang}
            onOpenPortal={onOpenPortal}
            onSelectSection={onSelectSection}
          />
        </div>

        {/* BOTTOM WELCOME CARD (Exact reproduction of the bottom banner in the image) */}
        <div className="mt-8 sm:mt-12 max-w-5xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-blue-200/80 p-5 sm:p-7 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.12)] flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Avatar circle + Texts */}
            <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left flex-col sm:flex-row">
              {/* Blue circular avatar icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0b3b75] text-white flex items-center justify-center shrink-0 shadow-md">
                <User className="w-9 h-9 sm:w-11 sm:h-11 fill-white" />
              </div>

              <div className="flex flex-col">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                  Bienvenue sur <span className="text-[#0b3b75]">SIGEF</span>
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1 max-w-lg leading-snug">
                  {lang === 'FR'
                    ? 'Connectez-vous à votre compte pour accéder à l\'ensemble des services financiers du MCEF'
                    : 'Sign in to your account to access all MCEF financial services'}
                </p>
              </div>
            </div>

            {/* Right: Button + Badges */}
            <div className="flex flex-col items-center sm:items-end gap-2.5 shrink-0">
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-2 bg-[#1565c0] hover:bg-[#0d47a1] text-white px-7 sm:px-8 py-3 rounded-full font-bold text-sm sm:text-base shadow-md transition transform active:scale-98"
                id="btn-login-bottom-banner"
              >
                <User className="w-4 h-4 fill-white" />
                <span>{lang === 'FR' ? 'Se connecter' : 'Sign in'}</span>
              </button>

              <div className="text-[11px] font-semibold text-slate-500 tracking-wide">
                {lang === 'FR' 
                  ? 'Accès rapide • Sécurisé • Disponible 24/7' 
                  : 'Quick access • Secure • Available 24/7'}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER SLOGAN WITH HORIZONTAL LINES (Matching bottom of image) */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#0b3b75]/40 to-[#0b3b75]" />
          <h3 className="text-xs sm:text-sm md:text-base font-black text-[#0b3b75] uppercase tracking-wider text-center font-['Outfit'] whitespace-nowrap">
            {lang === 'FR'
              ? 'LA PLATEFORME DE GESTION INTELLIGENTE DES FINANCES DU MCEF'
              : 'THE INTELLIGENT FINANCIAL MANAGEMENT PLATFORM OF MCEF'}
          </h3>
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#0b3b75]/40 to-[#0b3b75]" />
        </div>
      </div>
    </div>
  );
};
