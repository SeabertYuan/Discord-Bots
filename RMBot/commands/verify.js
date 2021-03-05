const Discord = require('discord.js'); //discord.js

module.exports = {
	name: 'verify',
	description: 'Verify user',
	//verifyComparison(discord_id, names, username, user, userNumber){
		//let discordVerified = false;
		//let nameVerified = false;
		//for(i = 0; i < discord_id.length; i++){
			//if(userNumber == discord_id[i] || user == discord_id[i]){
				//console.log("Discord verified");
				//discordVerfied = true;
				//break;
			//}
		//}
		//for(i = 0; i < names.length; i++){
			//if(username == names[i]){
				//console.log("Username verified");
				//nameVerified = true;
				//break;
			//}
		//}
		//if(discordVerified && nameVerified)
			//return true;
		//else
			//return false;
	//},
	//manipulates and interprets the message
	execute(message, discord_id, names){
		var user = String(message.author).replace('<', '');
		user = user.replace('@', '');
		user = user.replace('>', '');
		var userNumber = message.author.discriminator;
		const member = message.guild.members.cache.get(user);
		var username = String(member.nickname).toLowerCase();
		//console.log(member);
		//give role
		message.delete();
		console.log(`User is: ${user}\nUsername: ${username}`);
		ifVerified = verifyComparison(discord_id, names, username, user, userNumber);
		if(ifVerified){
			console.log("verified!");
			const role = message.guild.roles.cache.find((role) => {
				return role.name === 'registered';
			});
			//console.log(member);
			member.roles.add(role);
		}
		else
			message.author.send("Something went wrong, contact an RMSC member");
	},
	//manipulates to give only the discord discriminator
	checkDiscord(discord_id){
		let n = discord_id.length;
		for(i = 0; i < n; i++){
			let discriminant = ''; //initialize empty string
			let x = discord_id[i].length;
			for(j = 0; j < x; j++){
				if(discord_id[i][j] == ' '){
					discord_id[i] = discord_id[i].replace(discord_id[i][j], '');
					x = discord_id[i].length;
				}
			}
			discord_id[i] = discord_id[i].toLowerCase(); //redundant
			if(discord_id[i][x-5] == '#'){
				for(j = x-4; j < x; j++){
					discriminant += discord_id[i][j]; //gets last 4 digits(discriminator)
				}
				//console.log(discriminant); //log discriminator for now
				discord_id[i] = discriminant;
			}
			else
				console.log("Discord wasn't formatted properly");
		}
		console.log(discord_id);
		return discord_id;
	},
	checkName(names){
		let n = names.length;
		//let name = '';
		for(i = 0; i < n; i++){ // go through every participant
			let spaceCounter = 0
			for(j = 0; j < names[i].length; j++){
				if(names[i][j] == ' '){
					if(!spaceCounter)
						spaceIndex = j;
					spaceCounter++;
				}
				else if(names[i][j] == '('){ // if there's a bracket remove from that bracket to the end bracket
					//name += names[i].substring(0, j+1);
					firstBrac = j;
				}
				else if(names[i][j] == ')'){
					names[i] = names[i].replace(names[i].substring(firstBrac, j+2), '');
				}
				if(spaceCounter > 1 && j != names[i].length-1) //if there are more than 1 spaces in between (there's a middle name)
					names[i] = names[i].replace(names[i].substring(spaceIndex, j), '');
			}
			names[i] = names[i].toLowerCase();
		}
		console.log(names);
		return names;
	}
	//verifyComparison(discord_id, names, username, user, userNumber){
		//let discordVerified = false;
		//let nameVerified = false;
		//for(i = 0; i < discord_id.length; i++){
			//if(userNumber == discord_id[i] || user == discord_id[i]){
				//console.log("Discord verified");
				//discordVerfied = true;
				//break;
			//}
		//}
		//for(i = 0; i < names.length; i++){
			//if(username == names[i]){
				//console.log("Username verified");
				//nameVerified = true;
				//break;
			//}
		//}
		//if(discordVerified && nameVerified)
			//return true;
		//else
			//return false;
	//}
}
function verifyComparison(discord_id, names, username, user, userNumber){
	let discordVerified = false;
	let nameVerified = false;
	for(i = 0; i < discord_id.length && !discordVerified; i++){
		if(userNumber == discord_id[i] || user == discord_id[i]){
			console.log("Discord verified");
			discordVerfied = true;
		}
	}
	for(i = 0; i < names.length && !nameVerified; i++){
		if(username == names[i]){
			console.log("Username verified");
			nameVerified = true;
			break;
		}
	}
	if(discordVerified && nameVerified)
		return true;
	else
		return false;
}
