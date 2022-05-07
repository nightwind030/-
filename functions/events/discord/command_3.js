const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event;
let isAdmin = (event.member.permissions & (1 << 3)) === 1 << 3;
let userId = event.data.options[0].value; // First option!
// console.log('event');
let reason = event.data.options[1].value; // Second option!

if (isAdmin) {
  let warnCountKey = `warnCount${userId}`;
  let warnCount = await lib.utils.kv['@0.1.16'].get({
    key: warnCountKey,
    defaultValue: 0,
  });
  warnCount = warnCount + 1;
  await lib.utils.kv['@0.1.16'].set({
    key: warnCountKey,
    value: warnCount,
  });

  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${event.channel_id}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `⚠️Warn⚠️`,
        description: `<@${userId}> was warned! Reason: ${reason}\n\nThis is <@${userId}>'s  #${warnCount} warn!`,
        color: 0xfff200,
      },
    ],
  });
  await lib.discord.users['@0.2.0'].dms.create({
    recipient_id: `${userId}`,
    content: '',
    tts: false,
    embeds: [
      {
        type: 'rich',
        title: `⚠️Warn⚠️`,
        description: `Hey, you have been warned!! \n \n**Moderator**👨‍💻:\n<@${event.member.user.id}>\n\n**Reason:**\n**${reason}**\n\nYou have been warned: **${warnCount}** | Watch out!!`,
        color: 0xfff200,
      },
    ],
  });
  console.log(`${event.member.user.id}`);
} else {
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${event.channel_id}`,
    content: `You do not have permissions to use this command!! ⚠️`,
    message_reference: {
      message_id: `${event.id}`,
    },
  });
}
// Code made by the help of RoldGold and RonanFilms Video. Also with the help of the Community Heros and Janeth!!
// Make a slash command in the slash command builder and name it warn, then make two options! Option 1: user, Option 2: string! Then your done!!!!!!!
