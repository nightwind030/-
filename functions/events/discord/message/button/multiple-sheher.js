const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let role = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_sheher`,
});
let nameofrole = `She/Her`;

if (context.params.event.member.roles.includes(role)) {
  await lib.discord.guilds['@0.2.2'].members.roles.destroy({
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.guild_id}`,
  });
  await lib.discord.interactions['@0.1.0'].followups.update({
    token: `${context.params.event.token}`,
    message_id: `${context.params.event.message.id}`,
    components: [
      {
        type: 1,
        components: [
          {
            style:
              context.params.event.message.components[0].components[0].style,
            label: `They/Them`,
            custom_id: `theythem_v2`,
            disabled: false,
            emoji: {
              id: null,
              name: `🏳️‍🌈`,
            },
            type: 2,
          },
          {
            style: 2,
            label: `She/Her`,
            custom_id: `sheher_v2`,
            disabled: false,
            emoji: {
              id: null,
              name: `♀`,
            },
            type: 2,
          },
          {
            style:
              context.params.event.message.components[0].components[2].style,
            label: `He/him`,
            custom_id: `hehim_v2`,
            disabled: false,
            emoji: {
              id: null,
              name: `♂`,
            },
            type: 2,
          },
        ],
      },
    ],
  });
} else {
  await lib.discord.guilds['@0.2.2'].members.roles.update({
    role_id: `${role}`,
    user_id: `${context.params.event.member.user.id}`,
    guild_id: `${context.params.event.message.message_reference.guild_id}`,
  });
  await lib.discord.interactions['@0.1.0'].followups.update({
    token: `${context.params.event.token}`,
    message_id: `${context.params.event.message.id}`,
    components: [
      {
        type: 1,
        components: [
          {
            style:
              context.params.event.message.components[0].components[0].style,
            label: `They/Them`,
            custom_id: `theythem_v2`,
            disabled: false,
            emoji: {
              id: null,
              name: `🏳️‍🌈`,
            },
            type: 2,
          },
          {
            style: 1,
            label: `She/Her`,
            custom_id: `sheher_v2`,
            disabled: false,
            emoji: {
              id: null,
              name: `♀`,
            },
            type: 2,
          },
          {
            style:
              context.params.event.message.components[0].components[2].style,
            label: `He/him`,
            custom_id: `hehim_v2`,
            disabled: false,
            emoji: {
              id: null,
              name: `♂`,
            },
            type: 2,
          },
        ],
      },
    ],
  });
}