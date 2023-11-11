const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("new Sales started", "!!!");
});
myEmitter.on("newSale", () => {
  console.log("second Sales started", "!!!", "Wouhooo!");
});

myEmitter.on("newSale", (a, b, c) => {
  console.log(`a(${a}) + b(${b} + c(${c}) = `, a + b + c);
});

myEmitter.emit("newSale", 1, 3, 9);

////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("First request received!");
  console.log("req.url", req.url);
  res.end("Some request received!!!");
});

server.on("request", (req, res) => {
  console.log("Another request received!");
});

server.on("close", (req, res) => console.log("Server's closed down!"));

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting  for requests on port 8000:");
});
