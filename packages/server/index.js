const http = require("http");
const express = require("express");
const ShareDB = require("sharedb");
const WebSocket = require("ws");
const WebSocketJSONStream = require("@teamwork/websocket-json-stream");

const PORT = 5000;

const startServer = () => {
  // Create a web server to serve files and listen to WebSocket connections
  const app = express();
  app.use(express.static("static"));
  const server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  const wss = new WebSocket.Server({ server });
  wss.on("connection", (ws) => {
    const stream = new WebSocketJSONStream(ws);
    DB.listen(stream);
  });

  server.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
};

// Create initial document then fire callback
function createDoc(callback) {
  const connection = DB.connect();
  const doc = connection.get("doc", "textarea");

  doc.fetch(function (err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({ content: "" }, callback);
      return;
    }
    callback();
  });
}

const DB = new ShareDB();
createDoc(startServer);
