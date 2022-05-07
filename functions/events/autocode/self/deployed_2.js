const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Create the 'giveaway' slash command
await lib.discord.commands['@0.0.0'].create({
  guild_id: process.env.GUILD_ID,
  name: 'giveaway',
  description: 'Create a timed emoji giveaway!',
  options: [
    {
      type: 4,
      name: 'time',
      description: 'The number of seconds the giveaway will last for',
      required: true,
    },
    {
      type: 3,
      name: 'prize',
      description: 'A description of the prize the user will win',
      required: true,
    },
  ],
});
