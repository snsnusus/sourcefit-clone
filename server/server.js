// server.js
const http = require('http');
const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');

// 🚀 Import the shared client instance
const redisClient = require('./redisClient');
const { sendOtp, verifyOtp } = require('./contactController');
const { initSocketServer } = require('./socketHandler');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/contacts/send-otp', sendOtp);
app.post('/api/contacts/verify-otp', verifyOtp);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

async function startServer() {
  // Initialize socket orchestration logic using the imported client
  initSocketServer(wss, redisClient);

  server.listen(4000, () => {
    console.log('🚀 Unified Server running on http://localhost:4000');
  });
}

startServer();
