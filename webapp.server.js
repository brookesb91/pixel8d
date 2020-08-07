const express = require('express');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);
const dir = `/dist/apps/pixelate`;

app.use('/', express.static(path.join(__dirname, dir)));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, `${dir}/index.html`)));

server.listen(port, () => console.log(`App running on port ${port}`));
