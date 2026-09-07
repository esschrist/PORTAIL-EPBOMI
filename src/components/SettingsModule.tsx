import React from 'react';
import { Language } from '../types';
import { Settings, Shield, Key, Bell, UserCheck, Smartphone, Check } from 'lucide-react';

interface SettingsModuleProps {
  lang: Language;
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({ lang }) => {
  return (
    <div className="space-y-6" id="settings-module">
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-xl font-black text-[#0b3b75] font-['Outfit']">
          {lang === 'FR' ? 'Paramètres & Sécurité du Portail SIGEF' : 'SIGEF Portal Settings & Security'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Gestion des habilitations ministérielles, protocoles d'authentification 2FA et devises
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & Access */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Shield className="w-5 h-5 text-[#1565c0]" />
            <h3 className="font-bold text-slate-900 text-sm">Habilitations & Rôles d'accès</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Double Authentification (2FA)</span>
                <span className="text-slate-500 text-[11px]">Obligatoire pour les ordonnancements & virements</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Activé</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Rôle Ministériel Attribué</span>
                <span className="text-slate-500 text-[11px]">Contrôleur Financier Central MCEF</span>
              </div>
              <span className="bg-blue-100 text-[#0b3b75] font-bold px-2 py-0.5 rounded text-[10px]">Niveau 3</span>
            </div>
          </div>
        </div>

        {/* Currency and Platform Params */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Settings className="w-5 h-5 text-[#1565c0]" />
            <h3 className="font-bold text-slate-900 text-sm">Configuration du Système</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Devise par défaut</span>
                <span className="text-slate-500 text-[11px]">Franc CFA (XOF / XAF)</span>
              </div>
              <span className="font-mono font-bold text-slate-800">FCFA</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Synchronisation Inter-Terminaux</span>
                <span className="text-slate-500 text-[11px]">PC portable, Tablettes et Mobiles</span>
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Temps Réel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
