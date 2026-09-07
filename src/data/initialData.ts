import { FinancialStats, MonthlyDataPoint, CategoryBreakdown, Transaction, BudgetAllocation } from '../types';

export const initialStats: FinancialStats = {
  soldeDisponible: 25650000, // 25 650 000 FCFA
  depensesMois: 18320000,    // 18 320 000 FCFA
  recettesMois: 125780000,   // 125 780 000 FCFA
  tauxExecution: 73.5,
  totalEngagements: 48900000,
};

export const monthlyEvolutionData: MonthlyDataPoint[] = [
  { month: 'Janvier', shortMonth: 'Jan', valeur: 12, recettes: 15, depenses: 8 },
  { month: 'Février', shortMonth: 'Fév', valeur: 38, recettes: 45, depenses: 16 },
  { month: 'Mars', shortMonth: 'Mar', valeur: 28, recettes: 35, depenses: 22 },
  { month: 'Avril', shortMonth: 'Avr', valeur: 55, recettes: 68, depenses: 31 },
  { month: 'Mai', shortMonth: 'Mai', valeur: 42, recettes: 52, depenses: 24 },
  { month: 'Juin', shortMonth: 'Juin', valeur: 88, recettes: 110, depenses: 42 },
  { month: 'Juillet', shortMonth: 'Juil', valeur: 102, recettes: 125, depenses: 18 },
];

export const categoryBreakdownData: CategoryBreakdown[] = [
  { label: 'Recettes', amount: 125780000, percentage: 58, color: '#0f4c81', type: 'recettes' },
  { label: 'Dépenses', amount: 18320000, percentage: 22, color: '#0284c7', type: 'depenses' },
  { label: 'Transferts', amount: 15450000, percentage: 14, color: '#38bdf8', type: 'transferts' },
  { label: 'Autres', amount: 6500000, percentage: 6, color: '#bae6fd', type: 'autres' },
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Virement entrant',
    date: '12/05/2025',
    amount: 25000000,
    type: 'virement_entrant',
    status: 'valide',
    beneficiaryOrSource: 'Trésor Public - Dotation Trimestrielle',
    reference: 'VIR-2025-08912',
    direction: 'Direction Générale du Trésor'
  },
  {
    id: 'tx-2',
    title: 'Facture fournisseur',
    date: '10/05/2025',
    amount: -8750000,
    type: 'facture_fournisseur',
    status: 'valide',
    beneficiaryOrSource: 'Groupe Technologie & Télécoms MCEF',
    reference: 'FAC-2025-4421',
    direction: 'Direction des Systèmes d\'Information'
  },
  {
    id: 'tx-3',
    title: 'Paiement personnel',
    date: '08/05/2025',
    amount: -2500000,
    type: 'paiement_personnel',
    status: 'valide',
    beneficiaryOrSource: 'Régie d\'Avances & Primes d\'astreinte',
    reference: 'SAL-2025-0501',
    direction: 'Direction des Ressources Humaines'
  },
  {
    id: 'tx-4',
    title: 'Recette budgétaire',
    date: '05/05/2025',
    amount: 15000000,
    type: 'recette_budgetaire',
    status: 'valide',
    beneficiaryOrSource: 'Recouvrement Droits Douaniers & Taxes',
    reference: 'REC-2025-7833',
    direction: 'Direction Générale des Douanes'
  },
  {
    id: 'tx-5',
    title: 'Subvention d\'équipement',
    date: '02/05/2025',
    amount: 32000000,
    type: 'virement_entrant',
    status: 'valide',
    beneficiaryOrSource: 'Fonds d\'Appui à la Numérisation Publique',
    reference: 'SUB-2025-1029',
    direction: 'Cabinet du Ministre'
  },
  {
    id: 'tx-6',
    title: 'Maintenance infrastructures',
    date: '28/04/2025',
    amount: -4300000,
    type: 'facture_fournisseur',
    status: 'valide',
    beneficiaryOrSource: 'BTP & Climatisation Centrale MCEF',
    reference: 'FAC-2025-3982',
    direction: 'Direction des Affaires Financières'
  }
];

export const initialBudgets: BudgetAllocation[] = [
  {
    id: 'b-1',
    code: 'PROG-01',
    name: 'Direction Générale des Impôts (DGI)',
    allocated: 450000000,
    committed: 315000000,
    liquidated: 280000000,
    available: 135000000,
    percentage: 70
  },
  {
    id: 'b-2',
    code: 'PROG-02',
    name: 'Direction Générale des Douanes (DGD)',
    allocated: 380000000,
    committed: 265000000,
    liquidated: 240000000,
    available: 115000000,
    percentage: 69.7
  },
  {
    id: 'b-3',
    code: 'PROG-03',
    name: 'Direction Générale du Trésor et de la Comptabilité Publique (DGTCP)',
    allocated: 520000000,
    committed: 410000000,
    liquidated: 395000000,
    available: 110000000,
    percentage: 78.8
  },
  {
    id: 'b-4',
    code: 'PROG-04',
    name: 'Direction Générale des Marchés Publics (DGMP)',
    allocated: 210000000,
    committed: 120000000,
    liquidated: 105000000,
    available: 90000000,
    percentage: 57.1
  }
];

export function formatFCFA(value: number): string {
  const isNeg = value < 0;
  const abs = Math.abs(value);
  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${isNeg ? '- ' : ''}${formatted} FCFA`;
}
