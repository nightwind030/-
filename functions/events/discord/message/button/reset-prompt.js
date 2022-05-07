// set variables
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let anyrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_any`,
});
let askrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_ask`,
});
let hehimrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_hehim`,
});
let sheherrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_sheher`,
});
let theythemrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_theythem`,
});
let todelete = [anyrole, askrole, hehimrole, sheherrole, theythemrole];

// remove all pronoun roles
for (let i = 0; i < 4; i++) {
  await lib.discord.guilds['@0.2.2'].roles.destroy({
    role_id: todelete[i],
    guild_id: `${context.params.event.guild_id}`,
  });
}

// clear all kv values
await lib.utils.kv['@0.1.16'].clear({
  key: `${context.params.event.guild_id}_pronounsprompt`,
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${context.params.event.guild_id}_any`,
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${context.params.event.guild_id}_ask`,
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${context.params.event.guild_id}_hehim`,
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${context.params.event.guild_id}_sheher`,
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${context.params.event.guild_id}_theythem`,
});

// post succes message
await lib.discord.interactions['@0.1.0'].followups.update({
  token: `${context.params.event.token}`,
  message_id: context.params.event.message.id,
  content: `Reset succesful. You can now run the command again.`,
  embeds: [],
});
