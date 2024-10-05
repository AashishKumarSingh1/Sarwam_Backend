import express from "express";
import http from "http";
import { loadEnv } from "../config/dotenv.config";
import { Server } from "socket.io";
import { setupChat } from "./chat.help";

const app = express();
loadEnv();

export function socketConnection() {
  try {
    const server = http.createServer(app);

    if (!process.env.FRONTEND_URL) {
      console.error("FRONTEND_URL is not defined in .env file");
      process.exit(1);
    }

    const io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    setupChat(io);

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

  } catch (e) {
    console.log("An error occurred during socket connection", e);
  }
}
