# 🤖 Advanced Discord Bot

![Bot Start](https://cdn.discordapp.com/attachments/1230854985739141262/1317289275691241472/image.png?ex=675e24bd&is=675cd33d&hm=7967de42f7d17418200336e21b1c603b11737bdbbbfb569ae49b35ecec441621&)

A powerful, feature-rich Discord bot built with discord.js, offering comprehensive moderation, utility, and fun features.

## ✨ Features

### 🛡️ Moderation System
- Advanced user management (kick, ban, mute, temp-mute)
- Automated moderation with customizable filters
- Detailed logging system for all moderation actions
- Direct message notifications for affected users

### ⚙️ Configuration
- Custom prefix support per server
- Flexible permission system
- MongoDB integration for data persistence
- Easy-to-use setup commands

### 👤 User Features
- AFK system with status tracking
- Profile viewing with avatar and banner display
- Server information command
- User information lookup

### 🎮 Commands

#### Moderation Commands
- `*kick <user> <reason>` - Kick a user
- `*ban <user> <reason>` - Ban a user
- `*mute <user> <reason>` - Mute a user indefinitely
- `*temp-mute <user> <duration> <reason>` - Temporarily mute a user
- `*unmute <user>` - Unmute a user
- `*unban <user_id>` - Unban a user

#### Utility Commands
- `*ping` - Check bot latency
- `*afk [reason]` - Set your AFK status
- `*serverinfo` - Display server information
- `*userinfo [@user]` - Display user information
- `*profile [@user]` - View user's avatar and banner
- `*setprefix <prefix>` - Change server prefix (Admin only)

## 📊 System Architecture

- **Framework**: discord.js v14
- **Database**: MongoDB
- **Language**: Node.js
- **Hosting**: Compatible with all major hosting platforms

## 🔧 Technical Features

- Efficient command handling system
- Event-driven architecture
- Robust error handling
- Automatic reconnection
- Database caching for optimal performance
- Modular command structure

## 📥 Installation

1. Clone the repository
```bash
git clone https://github.com/spejsvin/szone.git
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file with:
```
BOT_TOKEN=your_discord_bot_token
MONGODB_URI=your_mongodb_connection_string
```

4. Start the bot
```bash
npm start
```

## ⚡ Performance

- Fast response times
- Efficient resource usage
- Optimized database queries
- Minimal memory footprint

## 📋 Requirements

- Node.js 16.9.0 or higher
- MongoDB
- Discord Bot Token
- Required Discord Intents:
  - GUILDS
  - GUILD_MESSAGES
  - MESSAGE_CONTENT
  - GUILD_MEMBERS

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/spejsvin/szone/issues).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

Join our [Discord server](https://discord.gg/WDzdSNfmw3) for support and updates.

## 🌟 Credits

Created with ❤️ by Lazar S (SpaceVin)

---

Remember to ⭐ this repo if you like this bot!
