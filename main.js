const http = require('http');

let serverRunning = false;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/start') {
            handleStartRequest(req, res);
        } else if (req.url === '/stop') {
            handleStopRequest(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found.');
        }
    } else if (req.method === 'POST') {
        if (req.url === '/start') {
            handleStartRequest(req, res);
        } else if (req.url === '/stop') {
            handleStopRequest(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found.');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed.');
    }
});

function handleStartRequest(req, res) {
    if (!serverRunning) {
        console.log('Starting your script...');
        // Replace this with your actual script logic
        console.log('Your script is now running.');
        serverRunning = true;

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Your script started.');
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Your script is already running.');
    }
}

function handleStopRequest(req, res) {
    if (serverRunning) {
        console.log('Stopping your script...');
        // Replace this with your actual script logic
        console.log('Your script is now stopped.');
        serverRunning = false;

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Your script stopped.');
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Your script is not running.');
    }
}

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