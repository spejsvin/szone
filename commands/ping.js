import { EmbedBuilder } from 'discord.js';

export const name = 'ping';
export const description = 'Check the bot\'s latency';

export async function execute(message, args, client) {
  const sent = await message.reply({ content: '🏓 Pinging...', fetchReply: true });
  const latency = sent.createdTimestamp - message.createdTimestamp;
  const apiLatency = Math.round(client.ws.ping);

  const embed = new EmbedBuilder()
    .setColor('#00ff00')
    .setTitle('🏓 Pong!')
    .addFields(
      { name: '📶 Latency', value: `${latency}ms`, inline: true },
      { name: '🌐 API Latency', value: `${apiLatency}ms`, inline: true }
    )
    .setFooter({ text: 'Bot is running smoothly!' })
    .setTimestamp();

  await sent.edit({ content: null, embeds: [embed] });
}
