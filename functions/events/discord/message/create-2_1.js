const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
  key: `Connections_${context.params.event.guild_id}_channelid`,
  //value: result,
});
/**
 * Command usage format:
 * !connections-channel <#Channel>
 */
if (context.params.event.content.split(' ')[0] === '!connections-channel') {
  //have permission?
  if (!(await isAdmin())) return;
  //error: no channel
  if (!context.params.event.content.split(' ')[1]) {
    await lib.discord.channels['@0.2.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Command usage: \`!connections-channel (Channel_ID)\``,
    });
    return `error`;
    console.error(`wrong command usage`);
  }
  let result = context.params.event.content.split(' ')[1];
  await lib.utils.kv['@0.1.16'].set({
    key: `Connections_${context.params.event.guild_id}_channelid`,
    value: result,
  });
  let Connections_webhook = await lib.discord.webhooks['@0.0.0'].create({
    channel_id: `${result}`,
    name: `Servers_Connections`,
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `Connections_${context.params.event.guild_id}_webhook`,
    value: Connections_webhook,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Finish! Already set to <#${result}> \nIf you want to change the channel, just enter the command again.\nIf you want to cancel, please delete the channel directly (or change to the unwanted channel and delete it again! )`,
  });
  await lib.discord.channels['@0.2.2'].messages.create({
    channel_id: result,
    content: `Members are allowed to chat across servers here! The server will be connected!`,
  });
  let Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
    key: `Connections_${context.params.event.guild_id}_channelid`,
    //value: result,
  });

  //run guild
  if (Connection_guild_channelid === `${context.params.event.channel_id}`) {
    //yourself
    let webhook = await lib.utils.kv['@0.1.16'].get({
      key: `Connections_${context.params.event.guild_id}_webhook`,
    });
    let Connection_guild_list = await lib.discord.guilds['@0.1.3'].list({
      limit: 100,
    });
    let webhook_guildsend = await lib.discord.guilds['@0.1.0'].retrieve({
      //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
      guild_id: `${context.params.event.guild_id}`,
      with_counts: true,
    });
    await lib.discord.channels['@0.2.2'].messages
      .destroy({
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      })
      .catch(() => {
        console.log(`** webhook Could not delete message`);
      });
    //return on all servers
    for (let i = 0; i < `${Connection_guild_list.length}`; i++) {
      //Connection_guild_list[i].id
      Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
        key: `Connections_${Connection_guild_list[i].id}_channelid`,
      });
      webhook = await lib.utils.kv['@0.1.16'].get({
        key: `Connections_${Connection_guild_list[i].id}_webhook`,
      });
      //console.log(webhook);
      if (webhook) {
        await lib.discord.webhooks['@0.0.0']
          .execute({
            webhook_id: `${webhook.id}`,
            webhook_token: `${webhook.token}`,
            content: `➡ Server Joined!`, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
            username: `${webhook_guildsend.name}`,
            avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
          })
          .catch(() => {
            console.log(`** webhook Unable to send`);
          });
        //console.log(`ok webhook send!`);
      }
      //end of webhook, return
    }
    //
  }
  //
}
/**
 * end of command
 */

//
//
//
//
//Connection servers
//於前面的前置作業
//執行
else if (Connection_guild_channelid === `${context.params.event.channel_id}`) {
  //自己的
  let webhook_username = await lib.discord.guilds['@0.1.0'].members.retrieve({
    user_id: `${context.params.event.author.id}`,
    guild_id: `${context.params.event.guild_id}`,
    //${context.params.event.guild_id} ${process.env.GUILD_ID}
  });
  //get nick
  if (!webhook_username.nick) {
    webhook_nickname = `${context.params.event.author.username}`;
  } else {
    webhook_nickname = webhook_username.nick;
  }
  //get avatar
  let avatarUrl = webhook_username.user.avatar_url;
  if (avatarUrl) {
    let gifCheckResponse = await lib.http.request['@1.1.5']({
      method: 'GET',
      url: avatarUrl.replace('.png', '.gif'),
    });
    if (gifCheckResponse.statusCode === 200) {
      avatarUrl = avatarUrl.replace('.png', '.gif');
    }
  }
  if (!webhook_username.user.avatar) {
    let discriminator = webhook_username.user.discriminator.split('');
    if (discriminator[3] === `0` || discriminator[3] === `5`) {
      avatarUrl = `https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png`;
    } else if (discriminator[3] === `1` || discriminator[3] === `6`) {
      avatarUrl = `https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png`;
    } else if (discriminator[3] === `2` || discriminator[3] === `7`) {
      avatarUrl = `https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png`;
    } else if (discriminator[3] === `3` || discriminator[3] === `8`) {
      avatarUrl = `https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png`;
    } else if (discriminator[3] === `4` || discriminator[3] === `9`) {
      avatarUrl = `https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png`;
    }
  }
  //取得媒體
  if (context.params.event.attachments[0]) {
    msg_url = `${context.params.event.attachments[0].url}`;
    msg_proxy_url = `${context.params.event.attachments[0].proxy_url}`;
  } else {
    msg_url = '';
    msg_proxy_url = '';
  }
  //取得回復之訊息
  //let webhook_msg_reference = await lib.discord.channels['@0.3.0'].messages.retrieve({
  //  message_id: null, // required
  //  channel_id: null,// required
  //});
  //console.log(context.params.event.referenced_message);
  //console.log(context.params.event.referenced_message.embeds[0].description .author.name
  await lib.discord.channels['@0.2.2'].messages.reactions.create({
    emoji: `${process.env.sending}`,
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`,
  });
  let webhook = await lib.utils.kv['@0.1.16'].get({
    key: `Connections_${context.params.event.guild_id}_webhook`,
  });
  let Connection_guild_list = await lib.discord.guilds['@0.1.3']
    .list({
      limit: 100,
    })
    .catch(() => {
      console.log(`** Could not get list`);
      lib.discord.channels['@0.2.2'].messages.reactions.destroy({
        emoji: `${process.env.sending}`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      lib.discord.channels['@0.2.2'].messages.reactions.create({
        emoji: `${process.env.warning}`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      return;
    });

  let webhook_guildsend = await lib.discord.guilds['@0.1.0']
    .retrieve({
      //retrieves all the available informations of the server. there is so much more you can do with the info than just server information!
      guild_id: `${context.params.event.guild_id}`,
      with_counts: true,
    })
    .catch(() => {
      console.log(`** Could not get guild`);
      lib.discord.channels['@0.2.2'].messages.reactions.destroy({
        emoji: `${process.env.sending}`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      lib.discord.channels['@0.2.2'].messages.reactions.create({
        emoji: `${process.env.warning}`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      return;
    });
  await lib.discord.channels['@0.2.2'].messages
    .destroy({
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`,
    })
    .catch(() => {
      console.log(`** webhook could not delete`);
      lib.discord.channels['@0.2.2'].messages.reactions.destroy({
        emoji: `${process.env.sending}`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      lib.discord.channels['@0.2.2'].messages.reactions.create({
        emoji: `${process.env.warning}`,
        message_id: `${context.params.event.id}`,
        channel_id: `${context.params.event.channel_id}`,
      });
      return;
    });
  //發送自己伺服器
  //
  //
  //
  //
  //
  if (!context.params.event.referenced_message) {
    await lib.discord.webhooks['@0.0.0'].execute({
      webhook_id: `${webhook.id}`,
      webhook_token: `${webhook.token}`,
      embeds: [
        {
          type: 'rich',
          title: '',
          description: `${context.params.event.content}`,
          color: 0x3a3a3a,
          author: {
            name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
            icon_url: avatarUrl,
          },
          image: {
            url: `${msg_url}`,
            proxy_url: `${msg_proxy_url}`,
            height: 0,
            width: 0,
          },
          //footer: {
          //  text: `ID: ${context.params.event.author.id}`
          //},
        },
      ],
      content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
      username: `${webhook_guildsend.name}`,
      avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
    });
    //
    //
    //
  } else {
    await lib.discord.webhooks['@0.0.0'].execute({
      webhook_id: `${webhook.id}`,
      webhook_token: `${webhook.token}`,
      embeds: [
        {
          type: 'rich',
          title: '',
          description: `${context.params.event.content}`,
          fields: [
            {
              name: `:speech_balloon: ${context.params.event.referenced_message.embeds[0].author.name}`,
              value: `${context.params.event.referenced_message.embeds[0].description} \n[[Reply message]](https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}/${context.params.event.referenced_message.id}) `,
            },
          ],
          color: 0x3a3a3a,
          author: {
            name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
            icon_url: avatarUrl,
          },
          image: {
            url: `${msg_url}`,
            proxy_url: `${msg_proxy_url}`,
            height: 0,
            width: 0,
          },
          //footer: {
          //  text: `ID: ${context.params.event.author.id}`
          //},
        },
      ],
      content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
      username: `${webhook_guildsend.name}`,
      avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
      components: [
        {
          type: 1,
          components: [
            {
              style: 1,
              label: `${context.params.event.referenced_message.embeds[0].author.name}`,
              custom_id: `webhook_referenced_1`,
              disabled: true,
              emoji: {
                id: `927185678255677440`,
                name: `return`,
                animated: false,
              },
              type: 2,
            },
            {
              style: 5,
              label: `${context.params.event.referenced_message.embeds[0].description}`,
              url: `https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}`,
              disabled: false,
              type: 2,
            },
          ],
        },
        /*
        {
          type: 1,
          components: [
            
          ],
        },
        */
      ],
    });
  }

  //
  //
  //
  //
  //

  //重複於所有伺服器
  for (let i = 0; i < `${Connection_guild_list.length}`; i++) {
    //Connection_guild_list[i].id
    Connection_guild_channelid = await lib.utils.kv['@0.1.16'].get({
      key: `Connections_${Connection_guild_list[i].id}_channelid`,
    });
    webhook = await lib.utils.kv['@0.1.16'].get({
      key: `Connections_${Connection_guild_list[i].id}_webhook`,
    });
    //console.log(webhook);
    if (webhook) {
      if (context.params.event.guild_id != `${Connection_guild_list[i].id}`)
        if (!context.params.event.referenced_message) {
          //發送webhook
          await lib.discord.webhooks['@0.0.0']
            .execute({
              webhook_id: `${webhook.id}`,
              webhook_token: `${webhook.token}`,
              embeds: [
                {
                  type: 'rich',
                  title: '',
                  description: `${context.params.event.content}`,
                  color: 0x3a3a3a,
                  author: {
                    name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
                    icon_url: avatarUrl,
                  },
                  image: {
                    url: `${msg_url}`,
                    proxy_url: `${msg_proxy_url}`,
                    height: 0,
                    width: 0,
                  },
                  //footer: {
                  //  text: `ID: ${context.params.event.author.id}`
                  //},
                },
              ],
              content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
              username: `${webhook_guildsend.name}`,
              avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
            })
            .catch(() => {
              console.log(`** webhookProcess can not send`);
              //製作退出訊息
              if (true) {
                //啟用消除的開關
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_channelid`, // required
                });
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_webhook`, // required
                });
              }
            });
          //
        } else {
          await lib.discord.webhooks['@0.0.0']
            .execute({
              webhook_id: `${webhook.id}`,
              webhook_token: `${webhook.token}`,
              embeds: [
                {
                  type: 'rich',
                  title: '',
                  description: `${context.params.event.content}`,
                  fields: [
                    {
                      name: `:speech_balloon: ${context.params.event.referenced_message.embeds[0].author.name} `,
                      value: `${context.params.event.referenced_message.embeds[0].description} \n[[Reply message]](https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}/${context.params.event.referenced_message.id}) `,
                    },
                  ],
                  color: 0x3a3a3a,
                  author: {
                    name: `${webhook_nickname} (${context.params.event.author.username}#${context.params.event.author.discriminator})`,
                    icon_url: avatarUrl,
                  },
                  image: {
                    url: `${msg_url}`,
                    proxy_url: `${msg_proxy_url}`,
                    height: 0,
                    width: 0,
                  },
                  //footer: {
                  //  text: `ID: ${context.params.event.author.id}`
                  //},
                },
              ],
              content: ``, //${context.params.event.content}\n> (於 ${webhook_guildsend.name} )
              username: `${webhook_guildsend.name}`,
              avatar_url: `https://cdn.discordapp.com/icons/${context.params.event.guild_id}/${webhook_guildsend.icon}.png`,
              components: [
                {
                  type: 1,
                  components: [
                    {
                      style: 1,
                      label: `${context.params.event.referenced_message.embeds[0].author.name}`,
                      custom_id: `webhook_referenced_1`,
                      disabled: true,
                      emoji: {
                        id: `927185678255677440`,
                        name: `return`,
                        animated: false,
                      },
                      type: 2,
                    },
                  ],
                },
                {
                  type: 1,
                  components: [
                    {
                      style: 5,
                      label: `${context.params.event.referenced_message.embeds[0].description}`,
                      url: `https://discord.com/channels/${context.params.event.guild_id}/${context.params.event.channel_id}`,
                      disabled: false,
                      type: 2,
                    },
                  ],
                },
              ],
            })
            .catch(() => {
              console.log(`** webhook could not send`);
              //製作退出訊息
              if (true) {
                //啟用消除的開關
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_channelid`, // required
                });
                lib.utils.kv['@0.1.16'].clear({
                  key: `Connections_${Connection_guild_list[i].id}_webhook`, // required
                });
              }
            });
        }
      //console.log(`ok webhook send!`);
    }
    //end of webhook 重複一次
  }
  //重複結束
}
//完結webhook

async function isAdmin() {
  guild_id = context.params.event.guild_id;
  let isAdmin = false;
  let guildInfo = await lib.discord.guilds['@0.1.0'].retrieve({guild_id});
  let roles = await lib.discord.guilds['@0.1.0'].roles.list({guild_id});
  let userRoles = roles.filter((role) =>
    context.params.event.member.roles.includes(role.id)
  );

  if (guildInfo.owner_id === context.params.event.author.id) isAdmin = true;
  else
    for (let i = 0; i < userRoles.length; i++) {
      let _role = userRoles[i];
      if (_role.permission_names.includes('ADMINISTRATOR')) {
        isAdmin = true;
        break;
      }
    }

  if (!isAdmin)
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id,
      content: `Sorry, you don't have permission to use this command. You need to have the <@&${adminRoleId}> role.`,
    });

  return isAdmin;
}
