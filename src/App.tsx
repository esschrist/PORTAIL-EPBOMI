/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FinancialStats, 
  MonthlyDataPoint, 
  CategoryBreakdown, 
  Transaction, 
  Language, 
  NavSection 
} from './types';
import { 
  initialStats, 
  monthlyEvolutionData, 
  categoryBreakdownData, 
  initialTransactions,
  formatFCFA
} from './data/initialData';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortalLayout } from './components/PortalLayout';
import { AuthModal } from './components/AuthModal';
import { NewTransactionModal } from './components/NewTransactionModal';
import { CheckCircle2, Bell, Sparkles } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'poster' | 'portal'>('poster');
  const [lang, setLang] = useState<Language>('FR');
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');

  // Shared financial state (synchronized between PC, Tablet, and Mobile!)
  const [stats, setStats] = useState<FinancialStats>(initialStats);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>(monthlyEvolutionData);
  const [breakdown, setBreakdown] = useState<CategoryBreakdown[]>(categoryBreakdownData);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // Authentication & Modals
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; email: string } | null>({
    name: 'Dr. Christian Esse',
    role: 'Contrôleur Financier MCEF',
    email: 'christesse700@gmail.com',
  });
  const [isNewTxModalOpen, setIsNewTxModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // When adding a new transaction, state updates synchronously across all devices
  const handleAddTransaction = (newTxData: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...newTxData,
      id: `tx-${Date.now()}`,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Recalculate stats
    setStats((prev) => {
      const isCredit = newTx.amount > 0;
      const newSolde = prev.soldeDisponible + newTx.amount;
      const newRecettes = isCredit ? prev.recettesMois + newTx.amount : prev.recettesMois;
      const newDepenses = !isCredit ? prev.depensesMois + Math.abs(newTx.amount) : prev.depensesMois;

      return {
        ...prev,
        soldeDisponible: newSolde,
        recettesMois: newRecettes,
        depensesMois: newDepenses,
      };
    });

    showToast(
      lang === 'FR' 
        ? `Opération "${newTx.title}" enregistrée et synchronisée sur Tablette et PC !` 
        : `Operation "${newTx.title}" recorded and synced on Tablet and PC!`
    );
  };

  // CSV Export for public finance audits
  const handleExportCSV = () => {
    const headers = ['ID', 'Titre', 'Date', 'Montant FCFA', 'Direction', 'Bénéficiaire/Source', 'Référence'];
    const rows = transactions.map((t) => [
      t.id,
      `"${t.title}"`,
      t.date,
      t.amount,
      `"${t.direction}"`,
      `"${t.beneficiaryOrSource}"`,
      t.reference,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SIGEF_Export_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(lang === 'FR' ? 'Export CSV généré avec succès !' : 'CSV Export downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-[#0b3b75] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-blue-400/40 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Navbar
        lang={lang}
        onToggleLang={setLang}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          showToast(lang === 'FR' ? 'Vous êtes déconnecté' : 'Signed out');
        }}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* Main View Mode: Poster/Showcase vs Live SaaS Portal */}
      {viewMode === 'poster' ? (
        <HeroSection
          stats={stats}
          monthlyData={monthlyData}
          breakdown={breakdown}
          transactions={transactions}
          lang={lang}
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          onOpenPortal={() => setViewMode('portal')}
          onSelectSection={(section) => {
            setActiveSection(section);
            setViewMode('portal');
          }}
        />
      ) : (
        <PortalLayout
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          stats={stats}
          monthlyData={monthlyData}
          breakdown={breakdown}
          transactions={transactions}
          lang={lang}
          onBackToPoster={() => setViewMode('poster')}
          onNewTransaction={() => setIsNewTxModalOpen(true)}
          onExport={handleExportCSV}
        />
      )}

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
        onSuccess={(user) => {
          setCurrentUser(user);
          showToast(lang === 'FR' ? `Bienvenue, ${user.name}` : `Welcome, ${user.name}`);
        }}
        lang={lang}
      />

      {/* New Transaction Modal */}
      <NewTransactionModal
        isOpen={isNewTxModalOpen}
        onClose={() => setIsNewTxModalOpen(false)}
        onSubmit={handleAddTransaction}
        lang={lang}
      />
    </div>
  );
}
