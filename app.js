const http = require('http');
const port = process.env.PORT || 80;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Docker\n');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
