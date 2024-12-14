import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDatabase } from './utils/database.js';
import { loadCommands } from './utils/commandLoader.js';
import { loadEvents } from './utils/eventLoader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();
client.prefix = '*';
client.commandsUsed = 0;

async function startBot() {
  try {
    console.log('Starting bot...');
    await connectDatabase();
    console.log('Database connected. Loading commands...');
    await loadCommands(client);
    console.log('Commands loaded. Loading events...');
    await loadEvents(client);
    console.log('Events loaded. Logging in...');
    await client.login(process.env.BOT_TOKEN);
    console.log('Bot is now online and ready!');
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

startBot();

