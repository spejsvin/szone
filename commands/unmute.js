import { PermissionsBitField, EmbedBuilder } from 'discord.js';
import { sendModerationDM } from '../utils/moderationUtils.js';

export const name = 'unmute';
export const description = 'Unmute a user in the server';

export async function execute(message, args, client) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  if (args.length < 1) {
    return message.reply('Please provide a user to unmute.');
  }

  const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
  if (!target) {
    return message.reply('Unable to find the specified user.');
  }

  if (!target.isCommunicationDisabled()) {
    return message.reply('This user is not muted.');
  }

  try {
    await target.timeout(null);
    await sendModerationDM(target.user, 'unmuted', 'Mute duration ended or removed by moderator', null, message.author);

    const embed = new EmbedBuilder()
      .setColor('#32CD32')
      .setTitle('🔊 User Unmuted')
      .setDescription(`**User:** ${target.user.tag}\n**Moderator:** ${message.author.tag}`)
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error unmuting user:', error);
    await message.reply('An error occurred while trying to unmute the user.');
  }
}

