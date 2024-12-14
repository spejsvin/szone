import { PermissionsBitField, EmbedBuilder } from 'discord.js';
import { sendModerationDM } from '../utils/moderationUtils.js';
import ms from 'ms';

export const name = 'temp-mute';
export const description = 'Temporarily mute a user in the server';

export async function execute(message, args, client) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  if (args.length < 3) {
    return message.reply('Please provide a user, duration, and reason for the temporary mute.');
  }

  const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
  if (!target) {
    return message.reply('Unable to find the specified user.');
  }

  const duration = ms(args[1]);
  if (!duration || duration > 2419200000) { 
    return message.reply('Invalid duration. Please provide a valid duration (e.g., 1h, 30m, 1d).');
  }

  const reason = args.slice(2).join(' ');

  if (!target.moderatable) {
    return message.reply('I cannot mute this user. They may have higher permissions than me.');
  }

  try {
    await sendModerationDM(target.user, 'temporarily muted', reason, args[1], message.author);
    await target.timeout(duration, reason);

    const embed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle('⏳ User Temporarily Muted')
      .setDescription(`**User:** ${target.user.tag}\n**Reason:** ${reason}\n**Duration:** ${args[1]}\n**Moderator:** ${message.author.tag}`)
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error temp-muting user:', error);
    await message.reply('An error occurred while trying to temporarily mute the user.');
  }
}

