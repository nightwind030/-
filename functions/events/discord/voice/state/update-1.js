const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const channelRoles = {
  'CHANNEL_ID_1': 'ROLE_ID_1',
  'CHANNEL_ID_2': 'ROLE_ID_2',
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
