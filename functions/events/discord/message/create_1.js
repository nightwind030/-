// Originally scripted by 𝐃𝐚𝐌𝐲𝐬𝐭𝐢𝐜𝐒𝐤𝐲𝐥𝐞𝐫#4247 & MEIRABA#2222 | Any questions DM skyler.
// Make sure to define 'PREFIX' in your environment variables.
// Hope this command is useful to all!
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const event = context.params.event;

const command = `${process.env.PREFIX}afk`

const authorId = event.author.id
const mentionId = event.mentions[0]?.id

const getKey = userId => `${userId}_afk`
const authorKey = getKey(authorId)
const mentionKey = getKey(mentionId)

const authorAfk = await lib.utils.kv['@0.1.16'].get({ key: authorKey })
const mentionAfk = mentionId ? await lib.utils.kv['@0.1.16'].get({ key: mentionKey }) : null

const nick = event.member.nick ?? context.params.event.author.username;
const nickPrefix = '[AFK]'

// Is user starting an afk?
if (event.content.startsWith(command)) {
  let afkReason = event.content.replace(command, '').trim();
  await lib.utils.kv['@0.1.16'].set({
    key: authorKey,
    value: {
      reason: afkReason,
      pings: 0,
    },
  });
  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: event.channel_id,
    content: `<@!${authorId}> is now afk`,
  });
  await updateNick(event.author.id, `${nickPrefix} ${nick}`)
}

// Did someone mention an afk user? Increment the pings.
else if (mentionAfk) {
  const reason = mentionAfk.reason ? ` (${mentionAfk.reason})` : ''
  await lib.discord.channels['@0.1.0'].messages.create({
    channel_id: event.channel_id,
    content: `<@!${mentionId}> is **AFK**${reason} - Please wait until they are back.`,
  });
  await lib.utils.kv['@0.1.16'].set({
    key: mentionKey,
    value: {
      reason: mentionAfk.reason,
      pings: mentionAfk.pings + 1,
    }
  });
} 

// Is the author afk? Auto un-afk them.
else if (authorAfk) {
  await lib.utils.kv['@0.1.16'].clear({ key: authorKey });
  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: event.channel_id,
    content: `You are no longer **AFK**! While you were away you received ${authorAfk.pings} ping(s)! `,
  });
  await updateNick(event.author.id, nick.replace(nickPrefix, '').trim())
}

async function updateNick(user_id, nick) {
  try {
    await lib.discord.guilds['@0.1.0'].members.update({
      guild_id: context.params.event.guild_id,
      user_id: user_id,
      nick: nick,
    });
  } catch (e) {
    // We can't change the nickname for owners or the bot for example
    console.log("Can't update the nickname of the server owner", nick);
  }
}