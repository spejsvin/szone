import { PermissionsBitField, EmbedBuilder } from 'discord.js';

export const name = 'unban';
export const description = 'Unban a user from the server';

export async function execute(message, args, client) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  if (args.length < 1) {
    return message.reply('Please provide a user ID to unban.');
  }

  const userId = args[0];

  try {
    const banList = await message.guild.bans.fetch();
    const bannedUser = banList.find(ban => ban.user.id === userId);

    if (!bannedUser) {
      return message.reply('This user is not banned from this server.');
    }

    await message.guild.members.unban(userId);

    const embed = new EmbedBuilder()
      .setColor('#4169E1')
      .setTitle('🔓 User Unbanned')
      .setDescription(`**User:** ${bannedUser.user.tag}\n**Moderator:** ${message.author.tag}`)
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error unbanning user:', error);
    await message.reply('An error occurred while trying to unban the user.');
  }
}

