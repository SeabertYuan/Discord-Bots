const Discord = require('discord.js'); //discord.js
const operations = require('../operations.js');

module.exports = {
	name: 'verify',
	description: 'Verify user',
	execute(message, discord_id, names){
		let user = String(message.author).replace('<', '');
		user = user.replace('@', '');
		user = user.replace('>', '');
		let userNumbers = message.author.discriminator;
		const member = message.guild.members.cache.get(user);
		let username = String(member.nickname).toLowerCase();
		//console.log(member); give role
		message.delete();
		//console.log(`User is: ${user}\nUsername: ${username}`);
		if(operations.verifyName(names, username) && operations.verifyDiscord(discord_id, user, userNumbers)){
			console.log("verified!");
			const role = message.guild.roles.cache.find((role) => {
				return role.name === 'registered';
			});
			//console.log(member);
			member.roles.add(role);
		}
		else
			message.author.send("Something went wrong, contact an RMSC member");
	}
};
