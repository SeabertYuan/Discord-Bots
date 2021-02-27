const Discord = require('discord.js'); //discord.js

module.exports = {
	name: 'verify',
	description: 'Verify user',
	//manipulates and interprets the message
	execute(message){
		var user = String(message.author).replace('<', '');
		user = user.replace('@', '');
		user = user.replace('>', '');
		var username = message.author.username;
		message.delete();
		//give role
		console.log(`User is: ${user}\nUsername: ${username}`);
		const role = message.guild.roles.cache.find((role) => {
			return role.name === 'registered';
		});
		const member = message.guild.members.cache.get(user);
		//console.log(member);
		member.roles.add(role);
	},
	//manipulates to give only the discord discriminator
	checkDiscord(discord_id){
		let n = discord_id.length;
		for(i = 0; i < n; i++){
			let discriminant = ''; //initialize empty string
			let x = discord_id[i].length;
			discord_id[i] = discord_id[i].toLowerCase(); //redundant
			for(j = x-4; j < x; j++){
				discriminant += discord_id[i][j]; //gets last 4 digits(discriminator)
			}
			console.log(discriminant); //log discriminator for now
		}
	}
}
