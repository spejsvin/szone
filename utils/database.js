import mongoose from 'mongoose';
import chalk from 'chalk';

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green('[SUCCESS] Connected to MongoDB'));
  } catch (error) {
    console.error(chalk.red('[ERROR] MongoDB connection error:'), error);
    throw error;
  }
}

