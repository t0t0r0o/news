const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = 8080;

const Article_Route = require("./Routes/Article_Route");
const GetData_Controller = require("./Controllers/GetData_Controller");
const getData_Controller = new GetData_Controller();
app.use(cors());

// tu dong cap nhat thong tin sau 10 phut
// 1
// setInterval(() => {
//   getData_Controller.handleDownloadPageFile();
// }, 300000);

// khoi tao socket
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:81",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", async (socket) => {
//   // 0
//   let data = await getData_Controller.GetArticleData();
//   socket.on("connection", data);
//   console.log("da lang nghe duoc ket noi " + socket.id);
//   setInterval(async () => {
//     await getData_Controller.handleDownloadPageFile();
//     data = await getData_Controller.GetArticleData();
//     socket.emit("connection", data);
//   }, 100000);
//   socket.on("disconnect", function () {
//     console.log("A user disconnected: " + socket.id);
//   });
// });

app.use("/databases", Article_Route);

// app.use(express.json());

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
