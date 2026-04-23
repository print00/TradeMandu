import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { portfolioPositions } from "@/constants/mock-data";

export function usePortfolio() {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/portfolio");
        return data;
      } catch {
        return {
          summary: {
            marketValue: portfolioPositions.reduce((sum, item) => sum + item.marketValue, 0),
            totalPl: portfolioPositions.reduce((sum, item) => sum + item.totalPl, 0),
            dailyPl: 1115
          },
          positions: portfolioPositions
        };
      }
    }
  });
}

