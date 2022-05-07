// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// this file will be triggered when app is first installed,
// or can be triggered manually from within Autocode to create command

// first grab the guild the bot belongs to
let guildResult = await lib.discord.users['@0.0.1'].me.guilds.list({
  limit: 1
});

// Make sure this has been installed to at least one guild
// before trying to create command
if (guildResult.length) {

  // create the command in the first guild the bot is in
  let gid = guildResult[0].id;
  let createCommandResult = await lib.discord.commands['@0.0.0'].create({
    guild_id: gid,
    name: `clear`,
    description: `Clears channel messages`,
    options: [
      {
        name: 'lines',
        description: 'number of messages to clear, 0 will clear all',
        type: 4, // type 4 is integer, see: https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype
        required: true
      }
    ]
  });
  
  return createCommandResult;
  
} else {
  
  return 'No guild found.';
  
}