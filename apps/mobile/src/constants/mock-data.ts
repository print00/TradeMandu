import type { IpoCard, PortfolioPosition, Quote } from "@/types";

export const marketQuotes: Quote[] = [
  {
    symbol: "NABIL",
    name: "Nabil Bank",
    price: 698.4,
    change: 12.4,
    changePercent: 1.81,
    volume: 124532,
    points: [640, 652, 648, 668, 676, 690, 698]
  },
  {
    symbol: "SHIVM",
    name: "Shivam Cements",
    price: 492.5,
    change: 17.1,
    changePercent: 3.6,
    volume: 223410,
    points: [430, 445, 438, 456, 470, 481, 492]
  },
  {
    symbol: "NTC",
    name: "Nepal Telecom",
    price: 911.2,
    change: -5.6,
    changePercent: -0.61,
    volume: 83211,
    points: [950, 944, 938, 928, 920, 914, 911]
  },
  {
    symbol: "HIDCL",
    name: "HIDCL",
    price: 231.8,
    change: -2.1,
    changePercent: -0.9,
    volume: 164399,
    points: [248, 244, 239, 236, 235, 233, 231]
  }
];

export const portfolioPositions: PortfolioPosition[] = [
  {
    symbol: "NABIL",
    name: "Nabil Bank",
    quantity: 40,
    avgPrice: 652.25,
    currentPrice: 698.4,
    totalPl: 1846,
    marketValue: 27936
  },
  {
    symbol: "SHIVM",
    name: "Shivam Cements",
    quantity: 100,
    avgPrice: 470,
    currentPrice: 492.5,
    totalPl: 2250,
    marketValue: 49250
  }
];

export const ipoCards: IpoCard[] = [
  {
    companyName: "Upper Arun Hydropower",
    status: "UPCOMING",
    openingDate: "Apr 15, 2026",
    closingDate: "Apr 20, 2026",
    units: 1500000,
    pricePerUnit: 100
  },
  {
    companyName: "Himalayan Renewables",
    status: "OPEN",
    openingDate: "Apr 5, 2026",
    closingDate: "Apr 10, 2026",
    units: 800000,
    pricePerUnit: 100
  }
];

export const lessons = [
  {
    title: "What is NEPSE?",
    description: "Learn how Nepal's stock exchange works and why index movement matters."
  },
  {
    title: "How to buy shares?",
    description: "Understand broker accounts, MeroShare, and CDSC flow in simple steps."
  },
  {
    title: "What is Demat?",
    description: "See how your shares are held digitally and why BOID matters."
  }
];

