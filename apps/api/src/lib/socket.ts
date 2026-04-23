import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env.js";

let io: Server | null = null;

export function initializeSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: env.CLIENT_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on("portfolio:subscribe", (userId: string) => {
      socket.join(`portfolio:${userId}`);
    });

    socket.on("stocks:subscribe", (symbol: string) => {
      socket.join(`stock:${symbol}`);
    });
  });

  return io;
}

export function emitPortfolioUpdate(userId: string, payload: unknown) {
  io?.to(`portfolio:${userId}`).emit("portfolio:update", payload);
}

export function emitStockUpdate(symbol: string, payload: unknown) {
  io?.to(`stock:${symbol}`).emit("stock:update", payload);
}

