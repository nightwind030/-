const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let role = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_hehim`,
});
let nameofrole = `He/Him`;

if (context.params.event.member.roles.includes(role)) {
  await lib.discord.guilds['@0.2.2'].members.roles.destroy({
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.interactions['@0.1.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `I have taken away your ${nameofrole} role!`,
  });
} else {
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
  let todelete = [anyrole, askrole, sheherrole, theythemrole];
  for (let i = 0; i < 4; i++) {
    await lib.discord.guilds['@0.2.2'].members.roles.destroy({
      role_id: todelete[i],
      user_id: `${context.params.event.member.user.id}`,
      guild_id: `${context.params.event.guild_id}`,
    });
  }
  await lib.discord.guilds['@0.2.2'].members.roles.update({
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.interactions['@0.1.0'].followups.ephemeral.create({
    token: `${context.params.event.token}`,
    content: `I have given you the ${nameofrole} role!`,
  });
}
