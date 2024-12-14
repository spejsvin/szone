import { EmbedBuilder } from 'discord.js';
import { User } from '../models/User.js';

export const name = 'afk';
export const description = 'Set your AFK status';

export async function execute(message, args, client) {
  const reason = args.join(' ') || 'No reason provided';
  const user = message.author;
  const member = message.guild.members.cache.get(user.id);

  try {
    await User.findOneAndUpdate(
      { userId: user.id },
      { 
        $set: {
          afk: true,
          afkReason: reason,
          afkTime: new Date()
        }
      },
      { upsert: true, new: true }
    );

    const oldNickname = member.nickname || user.username;
    await member.setNickname(`[AFK] ${oldNickname}`);

    const embed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle('🌙 AFK Status Set')
      .setDescription(`${user} is now AFK.\n\n**Reason:** ${reason}\n\nI'll notify others when they mention you.`)
      .setFooter({ text: 'Your AFK status will be removed when you send a message.' })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error setting AFK status:', error);
    await message.reply('There was an error setting your AFK status. Please try again later.');
  }
}

