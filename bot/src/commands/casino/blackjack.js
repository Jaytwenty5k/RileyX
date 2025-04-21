const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('blackjack')
    .setDescription('Spiele Blackjack gegen den Bot!'),
  async execute(interaction) {
    const deck = createDeck();
    const playerCards = [drawCard(deck), drawCard(deck)];
    const dealerCards = [drawCard(deck), drawCard(deck)];

    const playerTotal = calculateTotal(playerCards);
    const dealerVisible = dealerCards[0];
    const dealerTotal = calculateTotal([dealerVisible]);

    const embed = new EmbedBuilder()
      .setColor(0x2f3136)
      .setAuthor({ name: 'StartIT', iconURL: 'https://i.imgur.com/3ZUrjUP.png' }) // optional Icon
      .addFields(
        {
          name: 'Your hand',
          value: `${cardEmoji(playerCards[0])} ${cardEmoji(playerCards[1])}\nValue: ${playerTotal}`,
          inline: true
        },
        {
          name: 'Dealer hand',
          value: `${cardEmoji(dealerVisible)} ${cardEmojiHidden()}\nValue: ${calculateTotal([dealerVisible])}`,
          inline: true
        },
        {
          name: 'Cards remaining',
          value: `${deck.length}`,
          inline: false
        }
      );

    const actionRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('hit').setLabel('Hit').setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId('stand').setLabel('Stand').setStyle(ButtonStyle.Primary),
      new ButtonBuilder().setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [embed],
      components: [actionRow]
    });

    const filter = (i) =>
      ['hit', 'stand', 'cancel'].includes(i.customId) && i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000
    });

    collector.on('collect', async (i) => {
      if (i.customId === 'hit') {
        const newCard = drawCard(deck);
        playerCards.push(newCard);

        const newTotal = calculateTotal(playerCards);

        const updatedEmbed = new EmbedBuilder(embed)
          .setFields(
            {
              name: 'Your hand',
              value: `${playerCards.map(cardEmoji).join(' ')}\nValue: ${newTotal}`,
              inline: true
            },
            {
              name: 'Dealer hand',
              value: `${cardEmoji(dealerVisible)} ${cardEmojiHidden()}\nValue: ${dealerTotal}`,
              inline: true
            },
            {
              name: 'Cards remaining',
              value: `${deck.length}`,
              inline: false
            }
          );

        await i.update({ embeds: [updatedEmbed], components: [actionRow] });

        if (newTotal > 21) {
          collector.stop('bust');
          await interaction.followUp(`💥 Du hast verloren! Dein Punktestand überschreitet 21.`);
        }
      }

      if (i.customId === 'stand') {
        let dealerTotal = calculateTotal(dealerCards);

        while (dealerTotal < 17 && deck.length > 0) {
          dealerCards.push(drawCard(deck));
          dealerTotal = calculateTotal(dealerCards);
        }

        const playerTotal = calculateTotal(playerCards);
        const result = evaluateGame(playerTotal, dealerTotal);

        const finalEmbed = new EmbedBuilder()
          .setColor(0x2f3136)
          .setAuthor({ name: 'StartIT', iconURL: 'https://i.imgur.com/3ZUrjUP.png' })
          .addFields(
            {
              name: 'Your hand',
              value: `${playerCards.map(cardEmoji).join(' ')}\nValue: ${playerTotal}`,
              inline: true
            },
            {
              name: 'Dealer hand',
              value: `${dealerCards.map(cardEmoji).join(' ')}\nValue: ${dealerTotal}`,
              inline: true
            },
            {
              name: 'Cards remaining',
              value: `${deck.length}`,
              inline: false
            }
          );

        await i.update({ embeds: [finalEmbed], components: [] });
        await interaction.followUp(result);
        collector.stop();
      }

      if (i.customId === 'cancel') {
        await i.update({ content: 'Spiel abgebrochen.', components: [] });
        collector.stop();
      }
    });

    collector.on('end', (_, reason) => {
      if (reason !== 'bust' && reason !== 'user') {
        interaction.followUp('⏰ Zeit abgelaufen!');
      }
    });
  }
};

// Kartendeck erstellen
function createDeck() {
  const suits = ['♥️', '♦️', '♣️', '♠️'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${value}${suit}`);
    }
  }
  return shuffle(deck);
}

// Karten mischen
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Karte ziehen
function drawCard(deck) {
  return deck.pop();
}

// Punktestand berechnen (Unicode-kompatibel)
function calculateTotal(cards) {
  let total = 0;
  let aces = 0;

  for (const card of cards) {
    const match = card.match(/^([0-9JQKA]+)([♥️♦️♣️♠️]+)$/);
    if (!match) continue;

    const value = match[1];

    if (['J', 'Q', 'K'].includes(value)) {
      total += 10;
    } else if (value === 'A') {
      total += 11;
      aces += 1;
    } else {
      total += parseInt(value);
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
}

// Ergebnis auswerten
function evaluateGame(player, dealer) {
  if (dealer > 21) return '🎉 Du hast gewonnen! Der Dealer hat sich überkauft.';
  if (player > dealer) return '🎉 Du hast gewonnen! Dein Punktestand ist höher.';
  if (player < dealer) return '💔 Du hast verloren! Der Dealer hat mehr Punkte.';
  return '🤝 Unentschieden!';
}

// Kartenanzeige als Emoji oder Unicode
function cardEmoji(card) {
  return `\`${card}\``;
}

function cardEmojiHidden() {
  return '▯';
}