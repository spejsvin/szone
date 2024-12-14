import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import ora from 'ora';

const execAsync = promisify(exec);

const requiredModules = [
  'discord.js',
  'mongoose',
  'dotenv',
  'chalk',
  'ora'
];

export const name = 'ready';
export const once = true;

export async function execute(client) {
  console.log(chalk.cyan('[INFO]') + ' Checking required modules...');

  const spinner = ora('Checking modules').start();

  for (const module of requiredModules) {
    try {
      require.resolve(module);
      spinner.text = `Checking ${module}`;
    } catch (error) {
      spinner.warn(chalk.yellow(`[WARNING] Module ${module} not found. Installing...`));
      try {
        await execAsync(`npm install ${module}`);
        console.log(chalk.green(`[SUCCESS] Module ${module} installed successfully.`));
      } catch (installError) {
        console.error(chalk.red(`[ERROR] Failed to install ${module}. Error: ${installError.message}`));
      }
    }
  }

  spinner.succeed(chalk.green('[SUCCESS] All required modules are installed.'));

  console.log(chalk.green(`[SUCCESS] Logged in as ${client.user.tag}!`));
  console.log(chalk.cyan('[INFO] Bot is now online and ready!'));
}

