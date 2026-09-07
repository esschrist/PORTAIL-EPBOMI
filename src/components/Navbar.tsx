import React from 'react';
import { Language, NavSection } from '../types';
import { McefLogo, SigefBrand } from './McefLogo';
import { User, UserPlus, LogIn, ExternalLink, Globe, LayoutTemplate, MonitorCheck } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  currentUser: { name: string; role: string } | null;
  onLogout: () => void;
  viewMode: 'poster' | 'portal';
  onToggleViewMode: (mode: 'poster' | 'portal') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenAuth,
  currentUser,
  onLogout,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: SIGEF Title & Description */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onToggleViewMode('poster')}
            className="text-left focus:outline-none"
            title="Accueil SIGEF"
          >
            <SigefBrand size="md" lang={lang} />
          </button>
        </div>

        {/* Center / Right controls matching image exactly */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* View Mode Toggle: Vitrine Affiche vs Portail SaaS */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => onToggleViewMode('poster')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                viewMode === 'poster'
                  ? 'bg-white text-[#0b3b75] shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>{lang === 'FR' ? 'Vue Vitrine' : 'Showcase View'}</span>
            </button>
            <button
              onClick={() => onToggleViewMode('portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                viewMode === 'portal'
                  ? 'bg-[#0b3b75] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MonitorCheck className="w-3.5 h-3.5" />
              <span>{lang === 'FR' ? 'Portail Web MCEF' : 'MCEF Web Portal'}</span>
            </button>
          </div>

          {/* Language Toggle: FR | EN Pill */}
          <div className="flex items-center bg-[#0e3b75] rounded-lg p-0.5 text-xs font-bold text-white shadow-xs">
            <button
              onClick={() => onToggleLang('FR')}
              className={`px-2.5 py-1 rounded transition ${
                lang === 'FR'
                  ? 'bg-white text-[#0e3b75] shadow-xs'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => onToggleLang('EN')}
              className={`px-2.5 py-1 rounded transition ${
                lang === 'EN'
                  ? 'bg-white text-[#0e3b75] shadow-xs'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Auth Action Buttons matching poster */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-blue-700 font-semibold leading-tight">
                  {currentUser.role}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg font-semibold transition"
              >
                {lang === 'FR' ? 'Déconnexion' : 'Sign out'}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Se connecter - Blue filled button with User icon */}
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 bg-[#1565c0] hover:bg-[#0d47a1] text-white px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-xs transition transform active:scale-98"
                id="btn-login-header"
              >
                <User className="w-4 h-4 fill-white" />
                <span>{lang === 'FR' ? 'Se connecter' : 'Sign in'}</span>
              </button>

              {/* Créer un compte - Outlined button with UserPlus icon */}
              <button
                onClick={() => onOpenAuth('register')}
                className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-blue-50 text-[#1565c0] border-2 border-[#1565c0] px-3.5 sm:px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm transition transform active:scale-98"
                id="btn-register-header"
              >
                <UserPlus className="w-4 h-4" />
                <span>{lang === 'FR' ? 'Créer un compte' : 'Register'}</span>
              </button>
            </div>
          )}

          {/* Official MCEF Emblem Logo */}
          <div className="pl-2 border-l border-slate-200 hidden md:block">
            <McefLogo lang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
};
