import WebSocket from 'ws';

const http = require('http');
const express = require('express');
const ShareDB = require('sharedb');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

const PORT = 5000;
const DB = new ShareDB();

const startServer = () => {
  // Create a web server to serve files and listen to WebSocket connections
  const app = express();
  app.use(express.static('static'));
  const server = http.createServer(app);

  // Connect any incoming WebSocket connection to ShareDB
  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    const stream = new WebSocketJSONStream(ws);
    DB.listen(stream);
  });

  server.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
};

// Create initial document then fire callback
const createDoc = (callback: () => void) => {
  const connection = DB.connect();
  const doc = connection.get('doc', 'textarea');

  doc.fetch((err: Error) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({ content: '' }, callback);
      return;
    }
    callback();
  });
};

createDoc(startServer);
