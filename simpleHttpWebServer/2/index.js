const http = require("http");
const fs = require('fs').promises;

const port = 8000;

const requestListener = function (req, res) {
  console.log(
    `Request: ${req.method}, ${req.url}`
  );
  console.log(
    `Request headers: ${JSON.stringify(req.headers)}`
  );

  if (req.url === '/newMessage') {
    let data = "";
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', (chunk) => {
      console.log(`Received message: ${data}`);
      res.setHeader("Content-Type", "text/css");
      res.writeHead(200);
      res.end();
    });

    return;
  }


  let fileName;
  let contentType;

  if (req.url === "/") {
    fileName = "index.html";
    contentType = "text/html";
  } else if (req.url.endsWith(".css")) {
    fileName = req.url.substr(1);
    contentType = "text/css";
  } else {
    res.writeHead(500);
    res.end("Error, unsupported");
    return;
  }

  fs.readFile(`${__dirname}/${fileName}`)
    .then(contents => {
      res.setHeader("Content-Type", contentType);
      res.writeHead(200);
      res.end(contents);
    })
    .catch(err => {
      res.writeHead(500);
      res.end(err.message);
      return;
    });
};

const server = http.createServer(requestListener);
server.listen(port);