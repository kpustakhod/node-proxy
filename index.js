const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

app.use(cors());

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://cfs-permissions-service-dev.platdev.vtxdev.net/";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});

// Proxy endpoints
app.use('/node', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/node`]: '',
    },
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});