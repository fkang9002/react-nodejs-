const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./user");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);
io.on("connection", function(socket) {
  console.log("user login");
  socket.on("sendmsg", function(data) {
    console.log(data);
    io.emit("recvmsg", data);
  });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user", userRouter);

// app.get("/", function(req, res) {
//   res.send("<h1>Hello world</h1>");
// });

// app.listen(9093, function() {
//   console.log("监听端口9093");
// });

server.listen(9093, function() {
  console.log("监听端口9093");
});
