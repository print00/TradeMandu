import { IPOStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const stocks = [
    {
      symbol: "NABIL",
      name: "Nabil Bank Limited",
      sector: "Commercial Banks",
      description: "One of Nepal's leading commercial banks.",
      website: "https://www.nabilbank.com",
      quote: {
        ltp: 698.4,
        change: 12.4,
        changePercent: 1.81,
        open: 690,
        high: 703,
        low: 688,
        previousClose: 686,
        volume: 124532,
        turnover: 86743200
      }
    },
    {
      symbol: "NTC",
      name: "Nepal Telecom",
      sector: "Telecommunication",
      description: "State-backed telecom leader in Nepal.",
      website: "https://ntc.net.np",
      quote: {
        ltp: 911.2,
        change: -5.6,
        changePercent: -0.61,
        open: 919,
        high: 922,
        low: 908,
        previousClose: 916.8,
        volume: 83211,
        turnover: 75881200
      }
    },
    {
      symbol: "SHIVM",
      name: "Shivam Cements",
      sector: "Manufacturing",
      description: "Large cement manufacturer with active retail following.",
      website: "https://shivamcement.com",
      quote: {
        ltp: 492.5,
        change: 17.1,
        changePercent: 3.6,
        open: 478,
        high: 496.3,
        low: 475,
        previousClose: 475.4,
        volume: 223410,
        turnover: 110034500
      }
    },
    {
      symbol: "HIDCL",
      name: "Hydroelectricity Investment and Development Company",
      sector: "Investment",
      description: "Hydropower focused investment company.",
      website: "https://www.hidcl.org.np",
      quote: {
        ltp: 231.8,
        change: -2.1,
        changePercent: -0.9,
        open: 234.7,
        high: 236,
        low: 230.5,
        previousClose: 233.9,
        volume: 164399,
        turnover: 38111400
      }
    }
  ];

  for (const stock of stocks) {
    const record = await prisma.stock.upsert({
      where: { symbol: stock.symbol },
      update: {
        name: stock.name,
        sector: stock.sector,
        description: stock.description,
        website: stock.website
      },
      create: {
        symbol: stock.symbol,
        name: stock.name,
        sector: stock.sector,
        description: stock.description,
        website: stock.website
      }
    });

    await prisma.stockQuote.upsert({
      where: { stockId: record.id },
      update: stock.quote,
      create: {
        stockId: record.id,
        ...stock.quote
      }
    });

    for (let index = 0; index < 12; index += 1) {
      const close = Number(stock.quote.ltp) - index * 2.15 + (index % 2 === 0 ? 3.1 : -1.2);
      const historyDate = new Date(Date.now() - index * 24 * 60 * 60 * 1000);
      await prisma.stockPriceHistory.upsert({
        where: {
          stockId_date: {
            stockId: record.id,
            date: historyDate
          }
        },
        update: {},
        create: {
          stockId: record.id,
          open: close - 3,
          high: close + 8,
          low: close - 10,
          close,
          volume: 50000 + index * 2100,
          date: historyDate
        }
      });
    }
  }

  const ipos = [
    {
      companyName: "Upper Arun Hydropower",
      symbol: "UAHL",
      issueManager: "NIMB Ace Capital",
      openingDate: new Date("2026-04-15"),
      closingDate: new Date("2026-04-20"),
      units: 1500000,
      pricePerUnit: 100,
      status: IPOStatus.UPCOMING,
      description: "Public offering for hydropower expansion."
    },
    {
      companyName: "Himalayan Renewables",
      symbol: "HREL",
      issueManager: "Siddhartha Capital",
      openingDate: new Date("2026-04-05"),
      closingDate: new Date("2026-04-10"),
      units: 800000,
      pricePerUnit: 100,
      status: IPOStatus.OPEN,
      description: "Retail allocation for a renewable energy company."
    }
  ];

  for (const ipo of ipos) {
    const existing = await prisma.ipoOffer.findFirst({
      where: {
        companyName: ipo.companyName,
        openingDate: ipo.openingDate
      }
    });

    if (existing) {
      await prisma.ipoOffer.update({
        where: { id: existing.id },
        data: ipo
      });
    } else {
      await prisma.ipoOffer.create({ data: ipo });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
