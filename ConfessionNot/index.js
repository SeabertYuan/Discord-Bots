require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const {token} = require('./config.json');
//login
client.login();
var timer;

//log ready
client.once('ready', () => {
	console.log('Ready!!');
});

//whenever a message is sent
client.on('message', message =>{
	//find channel by its name
	let desChannel = client.channels.cache.find(channel => channel.name === `confessions`);
	//if starts with
	if(message.content.startsWith('!')){
		getDelete(message, desChannel);
		message.author.send(`To confess, use the prefix "#"`);
	}
	//console.log(message.channel)
	if(message.channel.type == 'dm')
		sendConfess(message, desChannel);
	//if(!message.author.bot)
		//timer = setInterval(() => {
		//	let spamChannel = client.channels.cache.get('809624163533979689');
		//	let file = './resources/im_1.jpg';
		//	spamChannel.send("(Andy's idea) I use linux btw", {files: [file]});
			//clearInterval(timer);
		//}, 300000);
});

/*function sendLinux(callback){
	let spamChannel = client.channels.cache.get('809624163533979689');
	let file = './resources/im_1.jpg';
	spamChannel.send("I use linux btw", {files: [file]});
	clearInterval(timer);
	callback();
}*/
function sendConfess(message, desChannel){
	if(message.content.startsWith('#')){
		let sMessage = message.content.replace('#', '"');
		console.log(sMessage);
		if(sMessage.includes('@'))
			desChannel.send(`${message.author.username} you want to fucking ping bro?`);
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
