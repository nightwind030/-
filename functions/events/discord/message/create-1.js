const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const ytsr = require('ytsr');

if(context.params.event.content.startsWith("!yt")) {
  
const search = context.params.event.content.split(" ").slice(1).join(" ")

if(!search[0]) return lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `Please provide the name of the video if you want to search.`
});

const searchResults = await ytsr(search, { pages: 1});
const videos = searchResults.items.filter(x => x.type == "video")

if(!videos.length) return lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `Sorry, unable to find any video with given query.`
});

const video = videos[Math.floor(Math.random()*videos.length)];
await lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: ``,
  embed: {
    title: video.title,
    url: video.url,
    image: { url: video.bestThumbnail.url },
    description: video.description,
    color: 0xff2050,
    footer: { text: `YouTube | ${video.uploadedAt} | ${video.duration}`},
    fields: [
      { name: 'State', value: video.isUpcoming ? 'Upcoming' : video.isLive ? 'Live' : 'None', inline: true},
      { name: 'Views', value: video.views, inline: true},
     { name: 'Author', value: `[${video.author.name}](${video.author.url})`, inline: true }
    ],
    thumbnail: { url: video.author.bestAvatar && video.author.bestAvatar.url ? video.author.bestAvatar.url : null }
  }
});

}