const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//first we use the Array.map() method to iterate over our components and return values inputted by the user for each question.

let answers = context.params.event.data.components.map((componentRow) => {
  let textField = componentRow.components[0];
  return [textField.value]
})

//we make a request using await lib.googlesheets.query['@0.3.0'].insert to insert data into our sheet
await lib.googlesheets.query['@0.3.0'].insert({
  range: `A:F`, // define the range for our Sheet as A:F. This gives us access to the data stored in column A to F - the columns we will be working with. 
  fieldsets: [ //Inn this fieldsets parameter we link every answer in our array to the corresponding question column in the Google Sheet.
    {
      'username': `${context.params.event.member.user.username}`, // We use the payload button to view the data that Discord returns and extract the username and id using dot notation.
      'user_id': `${context.params.event.member.user.id}`,
      'Why did you join our server?': answers[0],
      'What do you enjoy most about our server?': answers[1],
      'What do you dislike about the server and why?': answers[2],
      'What can we improve about our server?': answers[3]
    }
  ]
});


await lib.discord.interactions['@1.0.0'].responses.ephemeral.create({  // we send an ephemeral message to the user confirming that the responses have been logged 
  token: `${context.params.event.token}`,
  content: `Hey <@!${context.params.event.member.user.id}>! Thank you for providing this feedback! We have recorded the following answers:`,
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": ``,
      "description": "",
      "color": 0x00FFFF,
      "fields": [
        {
          "name": `Why did you join our server?`,
          "value": `${answers[0]}`        
        },
        {
          "name": `What do you enjoy most about our server?`,
          "value": `${answers[1]}` 
        },
        {
          "name": `What do you dislike about the server and why? `,
          "value": `${answers[2]}` 
        },
        {
          "name": `What can we improve about our server?`,
          "value": `${answers[3]}` 
        }
      ]
    }
  ],
  response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
});