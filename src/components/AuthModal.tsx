import React, { useState } from 'react';
import { Language } from '../types';
import { User, Lock, Mail, Building, X, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SigefBrand } from './McefLogo';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: { name: string; role: string; email: string }) => void;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode: initialMode,
  onClose,
  onSuccess,
  lang,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('agent.tresor@finances.gouv');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Koffi Mensah');
  const [role, setRole] = useState('Contrôleur Financier Central');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: mode === 'login' ? 'Dr. Christian Esse' : name,
      role: mode === 'login' ? 'Administrateur Financier MCEF' : role,
      email,
    });
    onClose();
  };

  const handleQuickLogin = (demoRole: string, demoName: string) => {
    onSuccess({
      name: demoName,
      role: demoRole,
      email: 'demo@finances.gouv',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200"
        id="auth-modal-window"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-br from-[#0b3b75] to-[#1565c0] text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="relative z-10">
            <span className="font-extrabold text-2xl font-['Outfit'] tracking-tight block">SIGEF</span>
            <span className="text-xs text-blue-200 font-medium mt-0.5 block">
              {lang === 'FR' ? 'Portail Sécurisé du Ministère de l\'Économie et des Finances' : 'Ministry of Economy & Finance Secure Portal'}
            </span>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-blue-900/60 px-2.5 py-1 rounded-full text-[11px] text-blue-100 border border-blue-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{lang === 'FR' ? 'Accès officiel habilité' : 'Authorized official access'}</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold text-slate-600">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg transition ${mode === 'login' ? 'bg-white text-[#0b3b75] shadow-xs' : 'hover:text-slate-900'}`}
            >
              {lang === 'FR' ? 'Se connecter' : 'Sign In'}
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg transition ${mode === 'register' ? 'bg-white text-[#0b3b75] shadow-xs' : 'hover:text-slate-900'}`}
            >
              {lang === 'FR' ? 'Créer un compte' : 'Create Account'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === 'register' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nom & Prénoms</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                    placeholder="ex: Dr. Christian Esse"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {lang === 'FR' ? 'Identifiant ou Email Ministériel' : 'Official ID / Ministry Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                  placeholder="agent@finances.gouv"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {lang === 'FR' ? 'Mot de passe sécurisé' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1565c0] hover:bg-[#0d47a1] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition transform active:scale-98 mt-2"
            >
              {mode === 'login' 
                ? (lang === 'FR' ? 'Se connecter à mon espace' : 'Sign in to portal')
                : (lang === 'FR' ? 'Valider mon inscription MCEF' : 'Complete registration')}
            </button>
          </form>

          {/* Quick Demo Accès Agents */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 text-center">
              {lang === 'FR' ? 'Accès rapide de démonstration' : 'Quick demo profiles'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('Contrôleur Financier', 'Dr. Christian Esse')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition"
              >
                <span className="font-bold text-[11px] text-slate-800 block">Contrôleur Financier</span>
                <span className="text-[9px] text-slate-500">Dr. Christian Esse</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Trésorier Général', 'M. Koffi Mensah')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition"
              >
                <span className="font-bold text-[11px] text-slate-800 block">Trésorier Général</span>
                <span className="text-[9px] text-slate-500">M. Koffi Mensah</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
