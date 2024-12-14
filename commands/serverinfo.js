import { EmbedBuilder } from 'discord.js';

export const name = 'serverinfo';
export const description = 'Display information about the server';

export async function execute(message, args, client) {
  const guild = message.guild;
  const owner = await guild.fetchOwner();

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`📊 Server Information: ${guild.name}`)
    .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: '👑 Owner', value: owner.user.tag, inline: true },
      { name: '👥 Members', value: guild.memberCount.toString(), inline: true },
      { name: '📆 Created On', value: guild.createdAt.toDateString(), inline: true },
      { name: '💬 Channels', value: guild.channels.cache.size.toString(), inline: true },
      { name: '🎭 Roles', value: guild.roles.cache.size.toString(), inline: true },
      { name: '🚀 Boost Level', value: guild.premiumTier.toString(), inline: true }
    )
    .setFooter({ text: `Server ID: ${guild.id}` })
    .setTimestamp();

  await message.reply({ embeds: [embed] });
}
