import { EmbedBuilder } from 'discord.js';

export async function sendModerationDM(user, action, reason, duration, moderator) {
  const embed = new EmbedBuilder()
    .setColor('#FF0000')
    .setTitle(`🛑 You've been ${action}`)
    .setDescription(`**Reason:** ${reason}\n${duration ? `**Duration:** ${duration}\n` : ''}**Moderator:** ${moderator.tag}`)
    .setTimestamp();

  try {
    await user.send({ embeds: [embed] });
  } catch (error) {
    console.error(`Failed to send DM to ${user.tag}:`, error);
  }
}

