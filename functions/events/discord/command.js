const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// grab the event data from the parameters sent from Discord
let event = context.params.event;
// get the channel id to delete messages
let cid = event.channel_id;
// retrieve the line count from the command
// Make sure 
let count = Math.max(0, event.data.options[0].value);
let deletedMessages = [];

if (!count) {
  count = 100000; // set to very high limit if no count set
}

// while we still have message to delete...
while (count > 0) {
  let batchSize = Math.min(count, 100); // grab 100 messages at a time
  let messages = await lib.discord.channels['@0.0.3'].messages.list({
    channel_id: cid,
    limit: batchSize
  });
  if (messages.length) {
    // delete messages
    if (messages.length >= 2) {
      let newlyDeleted = await lib.discord.channels['@0.0.3'].messages.bulkDelete({
        channel_id: cid,
        messages: messages.map(message => message.id)
      });
      deletedMessages = [].concat(deletedMessages, newlyDeleted);
    } else {
      let newlyDeleted = await lib.discord.channels['@0.0.3'].messages.destroy({
        message_id: messages[0].id,
        channel_id: cid
      });
      deletedMessages = [].concat(deletedMessages, newlyDeleted);
    }
    // decrement count
    count = count - batchSize;
  } else {
    // if we don't get any messages, break the loop, all are cleared
    break;
  }
}

return deletedMessages;