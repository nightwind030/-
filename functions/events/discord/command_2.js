const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const { key, getEmbed, stop } = require('giveaway.js')
const event = context.params.event

const { channel_id } = event
const user = event.member.user.id;
const time = event.data.options[0].value;
const prize = event.data.options[1].value;

const isAdmin = event.member.permission_names.includes('ADMINISTRATOR')
if (!isAdmin) return lib.discord.channels['@0.2.0'].messages.create({
  channel_id, content: `Sorry <@!${user}>, only admins can create giveaways ${process.env.EMOJI}`
});

// Is there a giveaway in progress?
const giveaway = await lib.utils.kv['@0.1.16'].get({ key });
if (giveaway) await stop(true)

// Create giveaway message
const message = await lib.discord.channels['@0.1.1'].messages.create({
  channel_id,
  content: `${process.env.EMOJI} GIVEAWAY ${process.env.EMOJI}`,
  tts: false,
  embed: getEmbed(user, time, prize, 0),
});

// Add reaction
await lib.discord.channels['@0.1.1'].messages.reactions.create({
  channel_id, message_id: message.id,
  emoji: process.env.EMOJI,
});

// Create storage
await lib.utils.kv['@0.1.16'].set({
  key,
  value: {
    channel_id, message_id: message.id,
    prize, winners: [],
    finish: (new Date()).getTime() + time * 1000,
  }
});