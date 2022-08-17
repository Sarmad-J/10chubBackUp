/*const fs = require('fs').promises;
var path = require('path');

const express = require('express');
const app = express();

app.use(express.static('New'));

const http = require("http");
const host = 'localhost';

const port = 8000;

let indexFile;

app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
})

const server = http.createServer(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

fs.readFile(__dirname + "/index.html")
    .then(contents => 
        {
            indexFile = contents;
            server.listen(port, host, () =>
            {
                console.log(`Server is running on http://${host}:${port}`);
            })
        })
        .catch(err =>
            {
                console.log(`Could not read index.html file: ${err}`);
                process.exit(1);
       });*/
