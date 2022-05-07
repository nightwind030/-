const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// create the pronoun prompt guild command upon joining a server. If you want to make this a global command, remove the line that starts with guild_id completely.
await lib.discord.commands['@0.0.0'].create({
  guild_id: `${process.env.guildID}`,
  name: 'pronoun-prompt',
  description: 'Create the prompt for the pronoun roles selection',
  options: [
    {
      type: 7,
      name: 'channel',
      description: 'The channel you want the pronouns prompt to appear in',
      required: true,
    },
  ],
});