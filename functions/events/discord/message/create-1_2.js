const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if(context.params.event.content.startsWith("!purge")) {
  const args = context.params.event.content.split(" ").slice(1)
  if(!args[0] || !parseInt(args[0])) return lib.discord.channels['@0.1.1'].messages.create({
    channel_id: context.params.event.channel_id,
    content:  `Please provide the number of message you want to purge`
  });
  
  if(parseInt(args[0]) > 100) return lib.discord.channels['@0.1.1'].messages.create({
    channel_id: context.params.event.channel_id,
    content:  `Can not delete more than 100 message at a time.`
  });
  
  const messages = await lib.discord.channels['@0.1.1'].messages.list({
    channel_id: context.params.event.channel_id,
    limit: parseInt(args[0])
  });
  
   await lib.discord.channels['@0.1.1'].messages.bulkDelete({
    channel_id: context.params.event.channel_id,
    messages: messages.map(x => x.id)
  }).catch(err => {
    return lib.discord.channels['@0.1.1'].messages.create({
       channel_id: context.params.event.channel_id,
      content: "Unable to delete the messages."
    });
  })
}