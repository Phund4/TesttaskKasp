/* eslint-disable no-undef */
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/write") {
        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const fileName = `result.csv`;
            const filePath = path.join(`${__dirname}/../testkasp/public/`, fileName);

            fs.open(filePath, "w", (err, fd) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                } else {
                    console.log(fd);
                    // fs сам пишет в файл таким образом, повлиять на это не могу.
                    fs.writeFileSync(filePath, data);
                }
            });
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
