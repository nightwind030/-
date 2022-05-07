const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const role = `${process.env.ROLE1}`;//role Id required

if (context.params.event.data.values[0] === `Attack`)//data name required in both here and reaction-panel.js
if (context.params.event.member.roles.includes(role)){
  await lib.discord.guilds['@0.2.2'].members.roles.destroy({//removes the role if the person has it already
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.guild_id}`
  });
}else{
  await lib.discord.guilds['@0.2.2'].members.roles.update({//adds the role to the person
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.guild_id}`
  });
}