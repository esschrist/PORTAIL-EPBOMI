export type Language = 'FR' | 'EN';

export type NavSection = 'dashboard' | 'budgets' | 'accounting' | 'treasury' | 'reports' | 'settings';

export interface FinancialStats {
  soldeDisponible: number;
  depensesMois: number;
  recettesMois: number;
  tauxExecution: number;
  totalEngagements: number;
}

export interface MonthlyDataPoint {
  month: string;
  shortMonth: string;
  valeur: number; // in millions FCFA
  recettes: number;
  depenses: number;
}

export interface CategoryBreakdown {
  label: string;
  amount: number;
  percentage: number;
  color: string;
  type: 'recettes' | 'depenses' | 'transferts' | 'autres';
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'virement_entrant' | 'facture_fournisseur' | 'paiement_personnel' | 'recette_budgetaire' | 'autre';
  status: 'valide' | 'en_attente' | 'rejete';
  beneficiaryOrSource: string;
  reference: string;
  direction: string;
}

export interface BudgetAllocation {
  id: string;
  code: string;
  name: string;
  allocated: number;
  committed: number;
  liquidated: number;
  available: number;
  percentage: number;
}
