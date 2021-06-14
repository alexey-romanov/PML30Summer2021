const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

// let messages = [];

// fuinction addNewMessage(user, msg) {
//     messages.push({ userName: user, message: msg });
// // }

// const requestListener = function (req, res) {
//     if (req.url === "/getMessages")

// }

const requestListener = function (req, res) {
    console.log(
        `Request: ${req.method}, ${req.url}`
    );
    console.log(
        `Request headers: ${JSON.stringify(req.headers)}`
    );


    let fileName;
    let contentType;

    if (req.url === "/") {
        fileName = "index.html";
        contentType = "text/html";
    }
    else if (req.url.endsWith(".css")) {
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