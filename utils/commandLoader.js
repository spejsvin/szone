import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadCommands(client) {
  const commandsPath = join(__dirname, '..', 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = `file://${join(commandsPath, file)}`;
    const command = await import(filePath);
    if ('name' in command && 'execute' in command) {
      client.commands.set(command.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`);
    }
  }
}

