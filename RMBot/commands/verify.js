const Discord = require('discord.js'); //discord.js

module.exports = {
	name: 'verify',
	description: 'Verify user',
	execute(message, args){
		var user = message.author;
		var username = message.author.username;
		message.delete;
		console.log(`User is: ${user}\nUsername: ${username}`);
	}
}
