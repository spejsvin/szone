import { PermissionsBitField, EmbedBuilder } from 'discord.js';
import { sendModerationDM } from '../utils/moderationUtils.js';

export const name = 'kick';
export const description = 'Kick a user from the server';

export async function execute(message, args, client) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  if (args.length < 2) {
    return message.reply('Please provide a user and a reason for the kick.');
  }

  const target = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(() => null);
  if (!target) {
    return message.reply('Unable to find the specified user.');
  }

  const reason = args.slice(1).join(' ');

  if (!target.kickable) {
    return message.reply('I cannot kick this user. They may have higher permissions than me.');
  }

  try {
    await sendModerationDM(target.user, 'kicked', reason, null, message.author);
    await target.kick(reason);

    const embed = new EmbedBuilder()
      .setColor('#FF6347')
      .setTitle('👢 User Kicked')
      .setDescription(`**User:** ${target.user.tag}\n**Reason:** ${reason}\n**Moderator:** ${message.author.tag}`)
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error kicking user:', error);
    await message.reply('An error occurred while trying to kick the user.');
  }
}

