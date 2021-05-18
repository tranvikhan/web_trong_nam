//create a new express application
const app = require("express")();
const server = require("http").Server(app);
//dotenv
require("dotenv").config();
//add cors
const cors = require("cors");
app.use(cors());
// require the socket.io module
const io = require("socket.io");
const socket = io(server, {
  cors: {
    origin: "*",
  },
});
socket.on("connection", (client) => {
  socketController(socket, client);
});

// Allow header
app.use(function (req, res, next) {
  req.io = socket;
  req.body = { ...req.body, ...req.query };
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//Body Parser (content-type - application/json)
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//NEXT JS
const next = require("next");
const { runInNewContext } = require("vm");
const { socketController } = require("./socket.io/controller");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = false; /*  process.env.NODE_ENV !== "production"; */
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  app.post("*", (req, res) => {
    return nextHandler(req, res);
  });
  app.patch("*", (req, res) => {
    return nextHandler(req, res);
  });
  app.delete("*", (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
