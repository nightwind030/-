const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const ytsr = require('ytsr');

if(context.params.event.content.startsWith("!channel")) { 
const search = context.params.event.content.split(" ").slice(1).join(" ")
if(!search[0]) return lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `Please provide the name of the channel if you want to search.`
});

const searchResults = await ytsr(search, { pages: 1});
const channels = searchResults.items.filter(x => x.type == "channel")

if(!channels.length) return lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `Sorry, unable to find any channel with given name.`
});

const channel = channels[0]

await lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: ``,
  embed: {
    title: channel.name,
    url: channel.url, 
    description: channel.descriptionShort,
    color: 0xff2050,
    footer: { text: `YouTube | CTK WARRIOR#7923`},
     fields: [
    { name: 'Subscribers', value: channel.subscribers || 0, inline: true},
    { name: 'Videos', value: channel.videos || 0, inline: true},
    { name: 'Verified', value: channel.verified ? 'Yes' : 'No', inline: false}
    ],
    thumbnail: { url: channel.bestAvatar.url }
  }
});

}