const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith(`${process.env.PREFIX}rr`)) {
  await lib.discord.channels['@0.3.0'].messages.destroy({
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`
  });
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    "content": "",
      "tts": false,
      "components": [
        {
          "type": 1,
          "components": [
            {
              "custom_id": `Reaction role`,
              "placeholder": `SELECT ONE OF THE ROLES`,
              "options": [
                {
                  "label": `第五玩家`,
                  "value": `Builder`,
                  "description": `o3o秘密`,
                  "emoji": {
                    "id": `946258157120946226`,
                    "name": `Hammer`,
                    "animated": false
                  },
                  "default": false
                },
                {
                  "label": `ATTACK HELPER`,
                  "value": `Attack`,
                  "description": `Helps in finding best way to attack on a Base`,
                  "emoji": {
                    "id": `946258156667945020`,
                    "name": `Fight`,
                    "animated": true
                  },
                  "default": false
                },
                {
                  "label": `PARTNERSHIP`,
                  "value": `Partner`,
                  "description": `Allows you to apply for partnership`,
                  "emoji": {
                    "id": `943796116762267668`,
                    "name": `Hypesquad`,
                    "animated": true
                  },
                  "default": false
                },
                {
                  "label": `DESIGNS`,
                  "value": `Design`,
                  "description": `Opens a channel where I put my Designs`,
                  "emoji": {
                    "id": `946265150061707314`,
                    "name": `Gift`,
                    "animated": true
                  },
                  "default": false
                }
              ],
              min_values: 1,
              max_values: 1,
              type: 3
            }
          ]
        }
      ],
      embeds: [
        {
          type: "rich",
          title: `SELECT MENU ROLES`,
          description: `_Welcome to **SELECT MENU REACTION ROLES**, The Menu Bar contains different roles which can be picked or removed by selection. Kindly go through the instruction given below..._`,
          color: 0x0a0a0a,
          fields: [
            {
              name: `INSTRUCTION`,
              value: `<a:Arrow:943796120667168769>・_Open select menu to see the role names and their works._\n<a:Arrow:943796120667168769>・_Choose one of them to add/remove._\n<a:Arrow:943796120667168769>・_After selection, a message will appear related to add/remove._`
            }
          ],
          image: {
            url: `https://cdn.discordapp.com/attachments/917059261492777021/946070535522119760/Self_roles.gif`,
          }
        }
      ]
    });
}