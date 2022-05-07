// set varuabkes
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let role = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_any`,
});
let nameofrole = `Any pronouns`;

if (context.params.event.member.roles.includes(role)) {
  // if the user already had the role, remove it
  await lib.discord.guilds['@0.2.2'].members.roles.destroy({
    // remove the role
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.interactions['@0.1.0'].followups.ephemeral.create({
    // create succes message
    token: `${context.params.event.token}`,
    content: `I have taken away your ${nameofrole} role!`,
  });
} else {
  // if the user did not have the role yet, remove all other roles and set the pronoun role
  // get ID's of all roles
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
  let todelete = [askrole, hehimrole, sheherrole, theythemrole]; // put the non-selected roles in an array
  for (let i = 0; i < 4; i++) {
    // remove all non-selected roles
    await lib.discord.guilds['@0.2.2'].members.roles.destroy({
      role_id: todelete[i],
      user_id: `${context.params.event.member.user.id}`,
      guild_id: `${context.params.event.guild_id}`,
    });
  }
  await lib.discord.guilds['@0.2.2'].members.roles.update({
    // give user selected role
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.interactions['@0.1.0'].followups.ephemeral.create({
    // create succes message
    token: `${context.params.event.token}`,
    content: `I have given you the ${nameofrole} role!`,
  });
}
