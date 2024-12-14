import { PermissionsBitField, EmbedBuilder } from 'discord.js';
import { sendModerationDM } from '../utils/moderationUtils.js';

export const name = 'ban';
export const description = 'Ban a user from the server';

export async function execute(message, args, client) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  if (args.length < 2) {
    return message.reply('Please provide a user and a reason for the ban.');
  }

  const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
  if (!target) {
    return message.reply('Unable to find the specified user.');
  }

  const reason = args.slice(1).join(' ');

  if (!target.bannable) {
    return message.reply('I cannot ban this user. They may have higher permissions than me.');
  }

  try {
    await sendModerationDM(target.user, 'banned', reason, null, message.author);
    await target.ban({ reason: reason });

    const embed = new EmbedBuilder()
      .setColor('#8B0000')
      .setTitle('🔨 User Banned')
      .setDescription(`**User:** ${target.user.tag}\n**Reason:** ${reason}\n**Moderator:** ${message.author.tag}`)
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error banning user:', error);
    await message.reply('An error occurred while trying to ban the user.');
  }
}

