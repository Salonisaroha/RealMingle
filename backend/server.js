const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// ----------------- Config -----------------
dotenv.config();
connectDB();

const app = express();

// ✅ Parse JSON payloads
app.use(express.json());

// ✅ CORS for HTTP requests
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ----------------- API Routes -----------------
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ✅ Development home route
app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

// ----------------- Error Middleware -----------------
app.use(notFound);
app.use(errorHandler);

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server started on port ${PORT}`.yellow.bold)
);

// ----------------- Socket.io -----------------
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ Connected to socket.io");

  // ---------- Setup ----------
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.userId = userData._id;
    console.log(`User connected: ${userData._id}`);
    socket.emit("connected");
  });

  // ---------- Join Chat ----------
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`✅ User joined Room: ${room}`);
  });

  // ---------- Typing ----------
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // ---------- New Message ----------
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat || !chat.users) {
      console.log("❌ newMessageReceived.chat is invalid:", chat);
      return;
    }

    console.log("✅ Broadcasting message to users:", chat.users.map(u => u._id));

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // ---------- Disconnect ----------
  socket.off("setup", () => {
    console.log("❌ USER DISCONNECTED");
    socket.leave(socket.userId);
  });
});
