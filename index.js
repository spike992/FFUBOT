import { Client, Events, GatewayIntentBits, Routes, Collection } from 'discord.js';
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';
import { data as hiData, execute as hiExec } from './commands/utilities/hi.js';

config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.token;
const CLIENTID = process.env.appID;
const SERVID = process.env.serverid;

const rest = new REST({version: '10'}).setToken(TOKEN);

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

//collections for commands
client.commands = new Collection();
client.commands.set(hiData.name, { execute: hiExec });

client.on(Events.InteractionCreate, async interaction => {
	//interaction.reply({content: hiExec});
	const command = client.commands.get(interaction.commandName);

    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});



async function main() {
	const commands = [
		//count up the commands
		//hi
		hiData.toJSON(),
	];
	try {
	  console.log('Started refreshing application (/) commands.');
	  await rest.put(Routes.applicationGuildCommands(CLIENTID, SERVID), {
		body: commands,
	  });
	  client.login(TOKEN);
	} catch (err) {
	  console.log(err);
	}
  }

  main();