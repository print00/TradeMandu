export type User = {
  id: string;
  email: string;
  name?: string | null;
  phone?: string | null;
  riskLevel?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  linkedBroker?: string | null;
};

export type Quote = {
  id?: string;
  ltp: number;
  change: number;
  changePercent: number;
  open?: number;
  high?: number;
  low?: number;
  previousClose?: number;
  volume: number;
  turnover?: number | null;
  lastUpdatedAt?: string;
};

export type Stock = {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  description?: string | null;
  website?: string | null;
  quote?: Quote | null;
  priceHistory?: Array<{
    id: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    date: string;
  }>;
};

export type PortfolioPosition = {
  id: string;
  stockId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  invested: number;
  totalPl: number;
  dailyPl: number;
  totalPlPercent: number;
};

export type PortfolioResponse = {
  summary: {
    marketValue: number;
    invested: number;
    totalPl: number;
    dailyPl: number;
    totalPlPercent: number;
  };
  positions: PortfolioPosition[];
};

export type WatchlistItem = {
  id: string;
  stockId: string;
  stock: Stock;
  createdAt: string;
};

export type Alert = {
  id: string;
  stockId: string;
  type: "PRICE" | "PERCENT_CHANGE" | "VOLUME";
  direction: "ABOVE" | "BELOW";
  targetPrice?: number | null;
  targetPercent?: number | null;
  targetVolume?: number | null;
  enabled: boolean;
  stock?: Stock;
};

export type PaperTradingResponse = {
  wallet: {
    id: string;
    balance: number;
    buyingPower: number;
    startingBalance: number;
  };
  positions: Array<{
    id: string;
    symbol: string;
    quantity: number;
    avgPrice: number;
    ltp: number;
    marketValue: number;
    totalPl: number;
  }>;
  trades: Array<{
    id: string;
    symbol: string;
    type: "BUY" | "SELL";
    quantity: number;
    price: number;
    total: number;
    createdAt: string;
  }>;
};

export type IpoOffer = {
  id: string;
  companyName: string;
  symbol?: string | null;
  issueManager?: string | null;
  openingDate: string;
  closingDate: string;
  units: number;
  pricePerUnit: number;
  status: "UPCOMING" | "OPEN" | "CLOSED" | "RESULT_OUT";
  resultDate?: string | null;
  description?: string | null;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
