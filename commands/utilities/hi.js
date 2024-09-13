import { SlashCommandBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('hi')
  .setDescription('Says hi back!');

async function execute(interaction) {
  await interaction.reply(`Hello ${interaction.user.username}`);
}

export { data, execute }; 