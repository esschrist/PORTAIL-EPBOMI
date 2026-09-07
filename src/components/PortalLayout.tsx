import React, { useState } from 'react';
import { 
  FinancialStats, 
  MonthlyDataPoint, 
  CategoryBreakdown, 
  Transaction, 
  Language, 
  NavSection 
} from '../types';
import { formatFCFA } from '../data/initialData';
import { DashboardView } from './DashboardView';
import { BudgetsModule } from './BudgetsModule';
import { AccountingModule } from './AccountingModule';
import { TreasuryModule } from './TreasuryModule';
import { ReportsModule } from './ReportsModule';
import { SettingsModule } from './SettingsModule';
import { TabletScreenContent } from './TabletScreenContent';
import { PhoneScreenContent } from './PhoneScreenContent';
import { 
  LayoutDashboard, 
  WalletCards, 
  BookOpen, 
  Coins, 
  FileBarChart2, 
  Settings, 
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Menu,
  X,
  Plus,
  Bell,
  Search,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface PortalLayoutProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  stats: FinancialStats;
  monthlyData: MonthlyDataPoint[];
  breakdown: CategoryBreakdown[];
  transactions: Transaction[];
  lang: Language;
  onBackToPoster: () => void;
  onNewTransaction: () => void;
  onExport: () => void;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  activeSection,
  onSelectSection,
  stats,
  monthlyData,
  breakdown,
  transactions,
  lang,
  onBackToPoster,
  onNewTransaction,
  onExport,
}) => {
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard' as NavSection, label: lang === 'FR' ? 'Tableau de bord' : 'Dashboard', icon: LayoutDashboard },
    { id: 'budgets' as NavSection, label: lang === 'FR' ? 'Budgets' : 'Budgets', icon: WalletCards },
    { id: 'accounting' as NavSection, label: lang === 'FR' ? 'Comptabilité' : 'Accounting', icon: BookOpen },
    { id: 'treasury' as NavSection, label: lang === 'FR' ? 'Trésorerie' : 'Treasury', icon: Coins },
    { id: 'reports' as NavSection, label: lang === 'FR' ? 'Rapports' : 'Reports', icon: FileBarChart2 },
    { id: 'settings' as NavSection, label: lang === 'FR' ? 'Paramètres' : 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col" id="portal-full-screen-container">
      {/* Top Simulator & Navigation Switcher Bar */}
      <div className="bg-[#0a2e5c] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-blue-900/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPoster}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg font-bold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'FR' ? 'Retour à l\'affiche SIGEF' : 'Back to Showcase'}</span>
          </button>

          <div className="h-4 w-[1px] bg-blue-400/30 hidden sm:block" />

          {/* Device Preview Simulator Toggle */}
          <div className="flex items-center gap-1 bg-blue-950/60 p-0.5 rounded-lg border border-blue-800/60">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition ${
                devicePreview === 'desktop' ? 'bg-[#1565c0] text-white' : 'text-blue-200 hover:text-white'
              }`}
              title="Affichage Bureau complet"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden md:inline">Bureau (PC)</span>
            </button>
            <button
              onClick={() => setDevicePreview('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition ${
                devicePreview === 'tablet' ? 'bg-[#1565c0] text-white' : 'text-blue-200 hover:text-white'
              }`}
              title="Simulateur Tablette"
            >
              <Tablet className="w-3 h-3" />
              <span className="hidden md:inline">Tablette (Mêmes données)</span>
            </button>
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition ${
                devicePreview === 'mobile' ? 'bg-[#1565c0] text-white' : 'text-blue-200 hover:text-white'
              }`}
              title="Simulateur Mobile"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>
        </div>

        {/* Real-time stats summary pill */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-blue-100">
          <div>
            <span className="text-blue-300">Solde:</span> <strong className="text-white">{formatFCFA(stats.soldeDisponible)}</strong>
          </div>
          <div>
            <span className="text-blue-300">Dépenses:</span> <strong className="text-white">{formatFCFA(stats.depensesMois)}</strong>
          </div>
          <div>
            <span className="text-blue-300">Recettes:</span> <strong className="text-emerald-300">{formatFCFA(stats.recettesMois)}</strong>
          </div>
        </div>
      </div>

      {/* Main Body */}
      {devicePreview === 'tablet' ? (
        /* Tablet Simulation Frame */
        <div className="flex-1 p-4 sm:p-8 flex items-center justify-center bg-slate-800/10">
          <div className="w-full max-w-[500px] h-[700px] bg-slate-900 rounded-[32px] p-4 shadow-2xl border-4 border-slate-700 relative flex flex-col">
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
            <div className="flex-1 bg-white rounded-[22px] overflow-hidden">
              <TabletScreenContent
                stats={stats}
                monthlyData={monthlyData}
                breakdown={breakdown}
                transactions={transactions}
                lang={lang}
              />
            </div>
          </div>
        </div>
      ) : devicePreview === 'mobile' ? (
        /* Mobile Simulation Frame */
        <div className="flex-1 p-4 sm:p-8 flex items-center justify-center bg-slate-800/10">
          <div className="w-full max-w-[340px] h-[660px] bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full" />
            <div className="flex-1 bg-white rounded-[26px] overflow-hidden pt-2">
              <PhoneScreenContent
                stats={stats}
                transactions={transactions}
                lang={lang}
                onOpenSection={onSelectSection}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Full Layout */
        <div className="flex-1 flex overflow-hidden">
          {/* Desktop Left Sidebar (Exact reproduction of PC in poster) */}
          <aside className="w-60 bg-[#0e3b75] text-white shrink-0 hidden md:flex flex-col justify-between py-5 px-3 border-r border-blue-900 shadow-md">
            <div className="space-y-6">
              {/* Ministerial User Badge */}
              <div className="bg-blue-900/50 p-3 rounded-xl border border-blue-800/60 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#1565c0] flex items-center justify-center font-bold text-white shadow-xs">
                  CE
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold truncate">Dr. Christian Esse</span>
                  <span className="text-[10px] text-blue-200 truncate">Contrôleur Central MCEF</span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectSection(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                        isActive
                          ? 'bg-[#1565c0] text-white shadow-md'
                          : 'text-blue-100 hover:bg-blue-800/60 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight className="w-3 h-3 ml-auto opacity-70" />}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Info */}
            <div className="pt-4 border-t border-blue-900/60 text-[10px] text-blue-300">
              <div className="flex items-center gap-1 text-emerald-400 font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Serveurs MCEF Connectés</span>
              </div>
              <span>SIGEF v2.4 • SYSCOHADA Conforme</span>
            </div>
          </aside>

          {/* Main Content View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto">
              {activeSection === 'dashboard' && (
                <DashboardView
                  stats={stats}
                  monthlyData={monthlyData}
                  breakdown={breakdown}
                  transactions={transactions}
                  lang={lang}
                  onNewTransaction={onNewTransaction}
                  onExport={onExport}
                />
              )}
              {activeSection === 'budgets' && <BudgetsModule lang={lang} />}
              {activeSection === 'accounting' && <AccountingModule lang={lang} />}
              {activeSection === 'treasury' && <TreasuryModule lang={lang} stats={stats} />}
              {activeSection === 'reports' && <ReportsModule lang={lang} />}
              {activeSection === 'settings' && <SettingsModule lang={lang} />}
            </div>
          </main>
        </div>
      )}
    </div>
  );
};
