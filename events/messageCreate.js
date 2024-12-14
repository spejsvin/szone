import { EmbedBuilder } from 'discord.js';
import { Guild } from '../models/Guild.js';
import { User } from '../models/User.js';

export const name = 'messageCreate';

export async function execute(message, client) {
  if (message.author.bot) return;


  const user = await User.findOne({ userId: message.author.id, afk: true });
  if (user) {
    await handleReturnFromAFK(message, user);
  }


  await handleAFKMentions(message);

  if (message.mentions.has(client.user)) {
    const totalServers = client.guilds.cache.size;
    const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    const totalCommands = client.commandsUsed || 0;

    const embed = new EmbedBuilder()
      .setColor('#00CED1')
      .setTitle(`Hello, I'm ${client.user.username}! 👋`)
      .setDescription('I\'m a multi-purpose bot here to assist you with various tasks.')
      .addFields(
        { name: '🌐 Servers', value: totalServers.toString(), inline: true },
        { name: '👥 Total Members', value: totalMembers.toString(), inline: true },
        { name: '🔢 Commands Used', value: totalCommands.toString(), inline: true },
        { name: '⚙️ Current Prefix', value: client.prefix, inline: false }
      )
      .setFooter({ text: 'Type *help for a list of commands!' })
      .setTimestamp();

    await message.reply({ embeds: [embed] });
    return;
  }

  let prefix;
  try {
    const guildData = await Guild.findOne({ guildId: message.guild.id });
    prefix = guildData ? guildData.prefix : client.prefix;
  } catch (error) {
    console.error('Error fetching guild prefix:', error);
    prefix = client.prefix;
  }

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(message, args, client);
    client.commandsUsed = (client.commandsUsed || 0) + 1;
  } catch (error) {
    console.error(error);
    await message.reply('There was an error executing that command.');
  }
}


async function handleReturnFromAFK(message, user) {
  const timeDiff = Date.now() - user.afkTime;
  const formattedTime = formatTimeDifference(timeDiff);

  user.afk = false;
  user.afkReason = null;
  user.afkTime = null;
  await user.save();

  const member = message.guild.members.cache.get(message.author.id);
  if (member.nickname && member.nickname.startsWith('[AFK]')) {
    await member.setNickname(member.nickname.slice(6));
  }

  const embed = new EmbedBuilder()
    .setColor('#00FF00')
    .setTitle('🌞 Welcome Back!')
    .setDescription(`${message.author}, I've removed your AFK status.\nYou were AFK for ${formattedTime}.`)
    .setTimestamp();

  await message.reply({ embeds: [embed] });
}

async function handleAFKMentions(message) {
  const mentionedUsers = message.mentions.users;
  if (mentionedUsers.size === 0) return;

  for (const [userId, mentionedUser] of mentionedUsers) {
    const afkUser = await User.findOne({ userId: userId, afk: true });
    if (afkUser) {
      const timeDiff = Date.now() - afkUser.afkTime;
      const formattedTime = formatTimeDifference(timeDiff);

      const embed = new EmbedBuilder()
        .setColor('#FFA500')
        .setTitle('🌙 User is AFK')
        .setDescription(`${mentionedUser} is currently AFK.\n\n**Reason:** ${afkUser.afkReason}\n**Duration:** ${formattedTime}`)
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    }
  }
}

function formatTimeDifference(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days !== 1 ? 's' : ''}, ${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds % 60} second${seconds % 60 !== 1 ? 's' : ''}`;
  return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

