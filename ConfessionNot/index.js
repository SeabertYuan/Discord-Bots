require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
//const {token} = require('./config.json');
//login
client.login();

const guildId = '756351450837155891';

const getApp = (guildId) => {
	const app = client.api.applications(client.user.id);
	if(guildId){
		app.guilds(guildId);
	}
	return app;
}
//log ready
client.on('ready', async () => {
	console.log('Ready!!');

	const commands = await getApp(guildId).commands.get();
	console.log(commands);

	await getApp(guildId).commands.post({
		data: {
			name: 'randomize',
			description: 'randomize message',
			options: [
				{
					name: 'Randomize',
					description: 'message to randomize',
					required: true,
					type: 3,
				}
			]
		},
		data: {
			name: 'confess',
			description: 'confess anonymously!',
			options: [
				{
					name: 'Confession',
					description: 'type your anonymous confession',
					required: true,
					type: 3,
				}
			]
		},
	});

	client.ws.on('INTERACTION_CREATE', async (interaction) => {
		const { name, options } = interaction.data
		const command = name.toLowerCase();

		console.log(options)

		if (command === 'randomize') {
			replyRandomized(interaction, options[0].value);
		} else if (command === 'confess') {
			reply(interaction, options[0].value);
		}
	});
});

const reply = (interaction, response) => {
	let confession = '"';
	confession += response+'"';
	for (i = 0; i < confession.length; i++) {
		confession = confession.replace("@", "");
	}
	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data: {
				content: confession,
			},
		}
	});
}
const replyRandomized = (interaction, response) => {
	let randomized = "";
	for (i = 0; i < response.length; i++) {
		if (i % 2 == 0) {
			randomized += response[i].toUpperCase();
		} else {
			randomized += response[i].toLowerCase();
		}
	}
	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: {
			type: 4,
			data: {
				content: randomized,
			},
		},
	});
}

//whenever a message is sent
client.on('message', message => {
	//find channel by its name
	let desChannel = client.channels.cache.find(channel => channel.name === `confessions`);
	//if starts with
	if (message.content.startsWith('^')) {
		getDelete(message, desChannel);
		message.author.send(`To confess, use the prefix "#"`);
	}
	//console.log(message.channel)
	if(message.channel.type == 'dm')
		sendConfess(message, desChannel);
});

/*function sendLinux(callback){
	let spamChannel = client.channels.cache.get('809624163533979689');
	let file = './resources/im_1.jpg';
	spamChannel.send("I use linux btw", {files: [file]});
	clearInterval(timer);
	callback();
}*/
function sendConfess (message, desChannel) {
	if(message.content.startsWith('#')){
		let sMessage = message.content.replace('#', '"');
		console.log(sMessage);
		if (sMessage.includes('@')) {
			for (i = 0; i < sMessage.length; i++) {
				sMessage = sMessage.replace("@", ` `);
			}
			desChannel.send(sMessage+'"');
		}
		else
			desChannel.send(sMessage+'"');
	}
}
//Deletes all messages in channe lthat start with !, commented out lines were for testing
function getDelete(message, desChannel){
	//let messageStr = message.content;
	message.delete();
	//messageStr = messageStr.replace('!', '');
	//desChannel.send(messageStr);
}
