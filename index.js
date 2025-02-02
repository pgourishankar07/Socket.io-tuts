import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("./public"));

io.on("connection", (socket) => {
  console.log("a user connected : ", socket.id);
  socket.on(socket.id, (msg) => {
    console.log(msg, "ID : ", socket.id);
    io.emit("messages", socket.id + " : " + msg);
  });
});

server.listen(8080, () => {
  console.log("Server running on port 8080 : http://localhost:8080/");
});
