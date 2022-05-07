const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var hehimstyle = 2;
let hehimrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_hehim`,
});
var sheherstyle = 2;
let sheherrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_sheher`,
});
var theythemstyle = 2;
let theythemrole = await lib.utils.kv['@0.1.16'].get({
  key: `${context.params.event.guild_id}_theythem`,
});
if (context.params.event.member.roles.includes(hehimrole)) {
  var hehimstyle = 1;
}
if (context.params.event.member.roles.includes(sheherrole)) {
  var sheherstyle = 1;
}
if (context.params.event.member.roles.includes(theythemrole)) {
  var theythemstyle = 1;
}

await lib.discord.interactions['@0.1.0'].followups.ephemeral.create({
  token: `${context.params.event.token}`,
  content: '',
  tts: false,
  components: [
    {
      type: 1,
      components: [
        {
          style: `${theythemstyle}`,
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
          style: `${sheherstyle}`,
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
          style: `${hehimstyle}`,
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
  embeds: [
    {
      type: 'rich',
      title: `Select your preferred pronouns`,
      description: `Use the buttons below to select what pronouns you'd like us to display for you.`,
      color: 0x7289da,
    },
  ],
});
