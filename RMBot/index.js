const fs = require('fs'); //file reader
const Discord = require('discord.js'); //discord.js
const client = new Discord.Client(); //discord
const {prefix, token} = require(`./config.json`); //load configs

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
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if(command === 'verify')
		client.commands.get('verify').execute(message, args);
});

// accessing command files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
