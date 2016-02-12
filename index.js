var Botkit = require('botkit')

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN
if (!slackToken) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
}

var controller = Botkit.slackbot()
var bot = controller.spawn({
  token: slackToken
})

bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack')
  }
})

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I'm here!")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hello.')
})

controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
  bot.reply(message, 'Hello.')
  bot.reply(message, 'It\'s nice to talk to you directly.')
})

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:')
})

controller.hears('nathan', ['mention'], function (bot, message) {
    var text = 'Nathan said at some point that "the level of optimism here is frightening".'
    var attachments = [{
        fallback: text,
        pretext: ':+1:',
        title: 'good times',
        image_url: 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xtp1/v/t34.0-0/p206x206/12735627_10153402981261616_275883951_n.jpg?oh=90b316ec5ef39c27d19c032a58ae2885&oe=56BF2DE9',
        title_link: 'https://beepboophq.com/',
        text: text,
        color: '#FF6969'
    },{
        fallback: text,
        pretext: ':+1: :+1:',
        title: 'good good times',
        image_url: 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xft1/v/t35.0-12/12737121_10153402982586616_1226486782_o.jpg?oh=4f54872c2089ec3356f62ccb7a5c2eb3&oe=56BF71EA',
        title_link: 'https://beepboophq.com/',
        text: text,
        color: '#FF6969'
    },{
        fallback: text,
        pretext: ':+1: :+1: :+1:',
        title: 'ship it :squirrel: :100:',
        image_url: 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xtp1/v/t34.0-12/12721922_10153402983276616_1960294648_n.jpg?oh=3913374c46aedd867d663e76451a435a&oe=56BF32DD',
        title_link: 'https://beepboophq.com/',
        text: text,
        color: '#FF6969'
    }]

    bot.reply(message, {
        attachments: attachments
    }, function (err, resp) {
        console.log(err, resp)
    })
})

controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
  var help = 'I will respond to the following messages: \n' +
      '`bot hi` for a simple message.\n' +
      '`bot attachment` to see a Slack attachment message.\n' +
      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
      '`bot nathan` to see Nathan.\n' +
      '`bot help` to see this again.'
  bot.reply(message, help)
})

controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
  var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
  var attachments = [{
    fallback: text,
    pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
    title: 'Host, deploy and share your bot in seconds.',
    image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
    title_link: 'https://beepboophq.com/',
    text: text,
    color: '#7CD197'
  }]

  bot.reply(message, {
    attachments: attachments
  }, function (err, resp) {
    console.log(err, resp)
  })
})

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})
