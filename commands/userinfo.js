import { EmbedBuilder } from 'discord.js';

export const name = 'userinfo';
export const description = 'Display information about a user';

export async function execute(message, args, client) {
  const user = message.mentions.users.first() || message.author;
  const member = message.guild.members.cache.get(user.id);

  const embed = new EmbedBuilder()
    .setColor('#ff9900')
    .setTitle(`👤 User Information: ${user.tag}`)
    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: '🆔 ID', value: user.id, inline: true },
      { name: '📆 Joined Server', value: member.joinedAt.toDateString(), inline: true },
      { name: '📅 Account Created', value: user.createdAt.toDateString(), inline: true },
      { name: '🎭 Roles', value: member.roles.cache.map(role => role.name).join(', ') || 'None' }
    )
    .setFooter({ text: 'User Information' })
    .setTimestamp();

  await message.reply({ embeds: [embed] });
}
