import React, { useState } from 'react';
import { Language, Transaction } from '../types';
import { Plus, X, ArrowUpRight, ArrowDownLeft, ReceiptText, Users, CheckCircle2 } from 'lucide-react';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTx: Omit<Transaction, 'id'>) => void;
  lang: Language;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  lang,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<number>(5000000);
  const [isCredit, setIsCredit] = useState<boolean>(true);
  const [direction, setDirection] = useState('Direction Générale du Trésor');
  const [beneficiary, setBeneficiary] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const finalAmount = isCredit ? Math.abs(amount) : -Math.abs(amount);
    const dateStr = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    let type: Transaction['type'] = isCredit ? 'recette_budgetaire' : 'facture_fournisseur';

    onSubmit({
      title,
      date: dateStr,
      amount: finalAmount,
      type,
      status: 'valide',
      beneficiaryOrSource: beneficiary || (isCredit ? 'Recouvrement de l\'État' : 'Prestataire public'),
      reference: `OP-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`,
      direction,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative">
        <div className="bg-[#0b3b75] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-sky-300" />
            <span className="font-extrabold text-base font-['Outfit']">
              {lang === 'FR' ? 'Enregistrer une opération MCEF' : 'Record MCEF Operation'}
            </span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Operation Type Switch */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setIsCredit(true)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${isCredit ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{lang === 'FR' ? 'Recette / Virement (+)' : 'Revenue / Transfer (+)'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCredit(false)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${!isCredit ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-600'}`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>{lang === 'FR' ? 'Dépense / Décaissement (-)' : 'Expense / Payment (-)'}</span>
            </button>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'FR' ? 'Intitulé de l\'opération' : 'Operation Title'}
            </label>
            <input
              type="text"
              required
              placeholder="ex: Versement taxes spéciales, Paiement marché public..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 text-slate-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'FR' ? 'Montant (en FCFA)' : 'Amount (FCFA)'}
            </label>
            <input
              type="number"
              required
              step={50000}
              min={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 text-slate-800 font-mono font-bold text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'FR' ? 'Direction émettrice MCEF' : 'Issuing Division'}
            </label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 text-slate-800"
            >
              <option value="Direction Générale du Trésor">Direction Générale du Trésor (DGTCP)</option>
              <option value="Direction Générale des Douanes">Direction Générale des Douanes (DGD)</option>
              <option value="Direction Générale des Impôts">Direction Générale des Impôts (DGI)</option>
              <option value="Direction des Systèmes d'Information">Direction des Systèmes d'Information (DSI)</option>
              <option value="Direction des Ressources Humaines">Direction des Ressources Humaines (DRH)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'FR' ? 'Bénéficiaire ou Source' : 'Beneficiary / Source'}
            </label>
            <input
              type="text"
              placeholder="ex: Recette générale, Entreprise adjudicataire..."
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 text-slate-800"
            />
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-[#0b3b75] hover:bg-blue-900 text-white font-bold shadow-md transition"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
