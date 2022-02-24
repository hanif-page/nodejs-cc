const http = require("http")
const path = require("path")
const fs = require("fs")

const server = http.createServer((req, res) => {
    // if(req.url === "/"){
    //     fs.readFile(path.join(__dirname, "/public", 'index.html'), (err, content) => {
    //         if(err) throw err 
    //         res.writeHead(200, { "Content-Type":"text/html" })
    //         res.end(content)
    //     })
    // }
    // else if(req.url === "/about"){
    //     fs.readFile(path.join(__dirname, "/public", 'about.html'), (err, content) => {
    //         if(err) throw err 
    //         res.writeHead(200, { "Content-Type":"text/html" })
    //         res.end(content)
    //     })
    // }
    // // REST API example
    // else if(req.url === "/api/users"){
    //     const users = [
    //         { name : "Bob Smith", age : 40 },
    //         { name : "Taren Smith", age : 41 },
    //         { name : "Yondu Smith", age : 42 },
    //         { name : "Johny Smith", age : 43 },
    //         { name : "Lando Smith", age : 44 },
    //         { name : "Adam Smith", age : 45 },
    //     ]
    //     res.writeHead(200, { "Content-Type":"application/json" })
    //     res.end(JSON.stringify(users))
    // }
    // else 
    // {
    //     fs.readFile(path.join(__dirname, "/public", "error.html"), (err, content) => {
    //         if(err) throw err 

    //         res.writeHead(404, { "Content-Type" : "text/html" })
    //         res.end(content)
    //     })
    // }

    // ------------------------------------------------------------

    // Build file path 
    let filePath = path.join(
        __dirname, 
        "/public", 
        req.url === "/" ? 'index.html' : req.url
    );
    
    // Extension of file 
    let extName = path.extname(filePath)

    // Content Type 
    let contentType = 'text/html'; 

    // Check ext and set content tyoe
    switch(extName){
        case '.js':
            contentType = "text/javascript"
            break;
        case '.css':
            contentType = "text/css"
            break;
        case '.json':
            contentType = "application/json"
            break;
        case '.png]':
            contentType = "image/png"
            break;
        case '.jpg':
            contentType = "image/jpg"
            break;
    }

    // Read file 
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code === 'ENOENT') {
                // page not found
                fs.readFile(path.join(__dirname, '/public', '404.html'), (err, content) => {
                    res.writeHead(200, { "Content-Type":"text/html" })
                    res.end(content, 'utf8')
                })
            } else {
                // Some server error
                res.writeHead(500)
                res.end("Server Error: " + err.code)
            }
        }
        else 
        {
            // success 
            res.writeHead(200, { "Content-Type": contentType })
            res.end(content, 'utf8')
        }
    })
})
 
// process.env.PORT is an initial port for the host, so it will be used if we deploy our site to third parties
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
