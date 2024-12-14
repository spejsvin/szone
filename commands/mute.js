import { PermissionsBitField, EmbedBuilder } from 'discord.js';
import { sendModerationDM } from '../utils/moderationUtils.js';

export const name = 'mute';
export const description = 'Mute a user in the server';

export async function execute(message, args, client) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  if (args.length < 2) {
    return message.reply('Please provide a user and a reason for the mute.');
  }

  const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
  if (!target) {
    return message.reply('Unable to find the specified user.');
  }

  const reason = args.slice(1).join(' ');

  if (!target.moderatable) {
    return message.reply('I cannot mute this user. They may have higher permissions than me.');
  }

  try {
    await sendModerationDM(target.user, 'muted', reason, 'Indefinite', message.author);
    await target.timeout(null, reason);

    const embed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle('🔇 User Muted')
      .setDescription(`**User:** ${target.user.tag}\n**Reason:** ${reason}\n**Duration:** Indefinite\n**Moderator:** ${message.author.tag}`)
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error muting user:', error);
    await message.reply('An error occurred while trying to mute the user.');
  }
}

