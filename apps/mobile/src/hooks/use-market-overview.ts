import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { marketQuotes } from "@/constants/mock-data";

export function useMarketOverview() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/stocks");
        return data;
      } catch {
        return marketQuotes;
      }
    }
  });
}

