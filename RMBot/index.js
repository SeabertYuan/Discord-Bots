const fs = require('fs'); //file reader
const Discord = require('discord.js'); //discord.js
const client = new Discord.Client(); //discord
const {prefix, token} = require(`./config.json`); //load configs
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

var names = new Array(), discord_id = new Array(); //gets spreadsheet data "names" and the "discord_id"
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1pUnAGi5PbGiBq-DWW3CwAD1cubaTskKsjhT47Bp7elk', //insert spreadsheet ID here
    range: 'Info!B2:H',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      // Print columns b and h, which correspond to indices 0 and 6.
      rows.map((row) => {
        names.push(row[0]);
        discord_id.push(row[6]);
        //console.log(`${row[0]}, ${row[6]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}
//log ready when everything is loaded
client.once('ready', () => {
	console.log('ready!');
});
//login
client.login(token);

//check for messages
client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot)
		return;
	var args = String(message.content.slice(prefix.length).trim());
	for(i = 0; i < args.length; i++){
    args = args.replace(' ', '');
  }
	const command = args.toLowerCase();
	if(command == 'ihavereadandagreetotherules'){
    client.commands.get('verify').checkDiscord(discord_id);
    client.commands.get('verify').checkName(names);
		client.commands.get('verify').execute(message, discord_id, names);
		console.log('command called');
	}
});

// accessing command files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
