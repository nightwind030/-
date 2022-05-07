const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const channelRoles = {
  '858970075922300971': '960551021430587482',
  '859003943081607198': '960551021430587482',
};

// Remove all roles
const roleIds = Object.values(channelRoles);
for (let roleId of roleIds)
  await lib.discord.guilds['@0.1.0'].members.roles.destroy({
    guild_id: `${context.params.event.guild_id}`,
    user_id: `${context.params.event.user_id}`,
    role_id: roleId,
  });

// Add the channel specific role
const channelId = context.params.event.channel_id;
if (channelId) {
  let roleId = channelRoles[channelId];
  if (roleId)
    await lib.discord.guilds['@0.1.0'].members.roles.update({
      guild_id: `${context.params.event.guild_id}`,
      user_id: `${context.params.event.user_id}`,
      role_id: roleId,
    });
}
