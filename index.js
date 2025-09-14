import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; // Fixed: Added missing http import
import { Server } from "socket.io";

//socket initialise import
import initializeSocket from "./sockets/socketHandler.js";

//importing all routes here
import userRoute from "./routes/user.route.js";
import pollRoute from "./routes/poll.route.js";
import voteRoute from "./routes/vote.route.js";


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();


const server = http.createServer(app); // Correctly uses 'http'
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get("/", async (req, res) => {
    res.send("Server is succesfully running");
})

app.use((req, res, next) => {
    req.io = io;
    next();
});

//routes
app.use("/api", userRoute);
app.use("/api", pollRoute);
app.use("/api", voteRoute);

// Socket initialization
initializeSocket(io);

const PORT = process.env.PORT || 3000; // Added a fallback port

server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})