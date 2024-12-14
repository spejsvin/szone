import { PermissionsBitField } from 'discord.js';
import { Guild } from '../models/Guild.js';

export const name = 'setprefix';
export const description = 'Sets a new prefix for the bot (Admin only)';

export async function execute(message, args, client) {
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return message.reply('You need to be an administrator to use this command!');
  }

  if (args.length !== 1) {
    return message.reply('Please provide a single character as the new prefix.');
  }

  const newPrefix = args[0];

  if (newPrefix.length !== 1) {
    return message.reply('The prefix must be a single character.');
  }

  try {
    await Guild.findOneAndUpdate(
      { guildId: message.guild.id },
      { prefix: newPrefix },
      { upsert: true, new: true }
    );

    client.prefix = newPrefix;
    await message.reply(`The prefix has been updated to: ${newPrefix}`);
  } catch (error) {
    console.error('Error updating prefix:', error);
    await message.reply('An error occurred while updating the prefix.');
  }
}

