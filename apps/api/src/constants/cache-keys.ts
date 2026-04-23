export const cacheKeys = {
  stocks: "stocks:list",
  topGainers: "stocks:top-gainers",
  topLosers: "stocks:top-losers",
  stockDetail: (symbol: string) => `stocks:detail:${symbol}`,
  stockHistory: (symbol: string) => `stocks:history:${symbol}`,
  portfolioSummary: (userId: string) => `portfolio:summary:${userId}`
};

