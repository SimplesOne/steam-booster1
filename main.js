const http = require('http');
const { spawn } = require('child_process');

let childProcess;

const server = http.createServer((req, res) => {
    if (req.url === '/start') {
        if (!childProcess) {
            console.log('Starting child process...');
            childProcess = spawn('node', ['your_existing_script.js']);

            childProcess.stdout.on('data', (data) => {
                console.log(`Child process stdout: ${data}`);
            });

            childProcess.stderr.on('data', (data) => {
                console.error(`Child process stderr: ${data}`);
            });

            childProcess.on('close', (code) => {
                console.log(`Child process exited with code ${code}`);
                childProcess = null;
            });

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Child process started.');
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Child process is already running.');
        }
    } else if (req.url === '/stop') {
        if (childProcess) {
            console.log('Stopping child process...');
            childProcess.kill();
            childProcess = null;

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Child process stopped.');
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Child process is not running.');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found.');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
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