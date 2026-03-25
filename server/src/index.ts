import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app";

const server = createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});