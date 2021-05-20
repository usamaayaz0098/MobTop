const app = require("express")();
const http = require("http").Server(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const cors = require("cors");
app.use(cors());

app.get("/sock", (req, res) => {
  io.on("connection", (socket) => {
    console.log("connected");
  });
});

app.listen("4000", () => {
  console.log("server runningggg...");
});
