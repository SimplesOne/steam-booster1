const http = require('http');

let serverRunning = false;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/start') {
            // Handle start request
            // ...
        } else if (req.url === '/stop') {
            // Handle stop request
            // ...
        } else {
            // Handle other GET requests
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found.');
        }
    } else if (req.method === 'POST') {
        if (req.url === '/start') {
            // Handle start request
            // ...
        } else if (req.url === '/stop') {
            // Handle stop request
            // ...
        } else {
            // Handle other POST requests
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found.');
        }
    } else {
        // Handle other request methods
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed.');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`HTTP server running at http://localhost:${PORT}/`);
});




const fs = require("file-system");
const path = require("path").join(__dirname, "users");
const steamClient = require('./client.js');
const keepAlive = require('./server.js')
const json = require("./users/user.json")

console.log(JSON.stringify(json));

const configsArray = [];
const botArray = [];

keepAlive();
fs.readdirSync(path).forEach(function(file) {
  const user = require("./users/" + file);
  configsArray.push(user);
});

console.log('Number of bots running: ' + configsArray.length);
 
for	(index = 0; index < configsArray.length; index++) {
	const config = configsArray[index];
	
	const bot = steamClient.newBot(config);
	bot.doLogin();
	botArray.push(bot);
}

console.log('Currently running ' + botArray.length + ' bot(s)');