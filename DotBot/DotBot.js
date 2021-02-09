const Discord = require('discord.js');
const client = new Discord.Client();
const config = require(`./config.json`)

const command = require(`./command`)

var desChannel = client.channels.cache.find(channel => channel.name === `dotbots-spot`)
var dotChannel = (`731271371581292625`)
//var dotChannel = (`587858509094453278`)

client.on('ready', () => {
	console.log('Ready!');

	command(client, `Check`, (message) => {
		let desChannel = message.client.channels.cache.find(channel => channel.name === `dotbots-spot`)
		desChannel.send('work in progress')
	})
});

client.login(config.token);

client.on('message', message => {
	myMessage = message.toString();
	if(message.channel.id === dotChannel){
	counter(message);
	}
	/*
	if(fool == true)
	{
		const member = `${message.author.id}`;
		let role = message.guild.roles.fetch(r => r.name === "SHAME");
		member.roles.add(role);
	}
	
	if(message.content.startsWith(`${prefix}Check`))
	{
		checkHistory(message);
	}
	*/
})

/*
function checkHistory(channel)
{
	channel.messages.fetch(`485471619536388096`);
		.then(message => console.log(message.content))
		.catch(console.error);
}
*/

var dotNum
var fool = false
var prevDotNum
var on = false
function counter(message)
{
	if(message.author != '771188895094014012'){
		var i
		let desChannel = client.channels.cache.find(channel => channel.name === `dotbots-spot`)
		for(i=0; myMessage[i] != null; i++)
		{
			//console.log(i);
			if(myMessage[i] != '.')
			{
				fool = true;
				break;
			}

			dotNum = i+1
			if(prevDotNum == null){
				prevDotNum = dotNum
			}
		}
		if(fool == true){
			var shame = `${message.author}`
			console.log(`${message.author.username}: ${myMessage}`)
			//console.log(message);
			desChannel.send(shame + ' shame on you')
		}
		if(on == true && dotNum != prevDotNum+1)
		{
			var shame = `${message.author}`
			//console.log(`${message.author.username}: ${myMessage}`)
			desChannel.send(shame + ' shame on you')
			desChannel.send(`${message.author.unsername}: sent ${dotNum}, should be ${prevDotNum+1}`)
			on = false
		}
		else
		{
			console.log(dotNum)

			desChannel.send(`${message.author.username}: ${dotNum}`)
			prevDotNum = dotNum
			if(on == false){
				on = true
			}
		}
	}
}