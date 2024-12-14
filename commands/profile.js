import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const name = 'profile';
export const description = 'Display a user\'s avatar and banner';

export async function execute(message, args, client) {
  const user = message.mentions.users.first() || message.author;
  
  const avatarEmbed = new EmbedBuilder()
    .setColor('#9900ff')
    .setTitle(`🖼️ ${user.tag}'s Avatar`)
    .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setFooter({ text: 'Click the button below to view banner' })
    .setTimestamp();

  const bannerEmbed = new EmbedBuilder()
    .setColor('#9900ff')
    .setTitle(`🎆 ${user.tag}'s Banner`)
    .setFooter({ text: 'Click the button below to view avatar' })
    .setTimestamp();

  const fetchedUser = await client.users.fetch(user.id, { force: true });
  if (fetchedUser.banner) {
    bannerEmbed.setImage(fetchedUser.bannerURL({ dynamic: true, size: 4096 }));
  } else {
    bannerEmbed.setDescription('This user does not have a banner.');
  }

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('toggle_profile')
        .setLabel('Toggle Avatar/Banner')
        .setStyle(ButtonStyle.Primary)
    );

  const initialReply = await message.reply({ embeds: [avatarEmbed], components: [row] });

  const collector = initialReply.createMessageComponentCollector({ time: 60000 });

  collector.on('collect', async i => {
    if (i.customId === 'toggle_profile') {
      await i.update({ embeds: [i.message.embeds[0].data.title.includes('Avatar') ? bannerEmbed : avatarEmbed] });
    }
  });

  collector.on('end', () => {
    initialReply.edit({ components: [] });
  });
}
