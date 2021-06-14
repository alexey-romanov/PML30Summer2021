import * as http from "http";
import { promises as fs } from 'fs';

const host = 'localhost';
const port = 8000;

const requestListener = async function (req, res) {
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

    try {
        console.log(`Reading file: ${__dirname}/../public/${fileName}`)
        const contents = await fs.readFile(`${__dirname}/../public/${fileName}`);
        console.log("Read successfull");
        res.setHeader("Content-Type", contentType);
        res.writeHead(200);
        res.end(contents);
        return;
    } catch (err) {
        res.writeHead(500);
        res.end(err);
        return;
    };
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}, current dir: ${__dirname}`);
});