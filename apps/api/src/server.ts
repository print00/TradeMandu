import { createServer } from "http";
import { env } from "./config/env.js";
import { app } from "./app.js";
import { initializeSocket } from "./lib/socket.js";

const server = createServer(app);
initializeSocket(server);

server.listen(env.PORT, () => {
  console.log(`TradeMandu API running on port ${env.PORT}`);
});
