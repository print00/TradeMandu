export type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  points: number[];
};

export type PortfolioPosition = {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalPl: number;
  marketValue: number;
};

export type IpoCard = {
  companyName: string;
  status: "UPCOMING" | "OPEN" | "RESULT_OUT";
  openingDate: string;
  closingDate: string;
  units: number;
  pricePerUnit: number;
};

