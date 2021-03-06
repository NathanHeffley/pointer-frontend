require('dotenv').config({
  path: '.env.local'
})

exports.handler = function (event, context, callback) {
  let query = event.queryStringParameters

  console.log(process.env.PUSHER_APP_ID)
  let Pusher = require('pusher')
  let pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
  })

  let presenceData = {
    user_id: query.socket_id,
    user_info: {
      name: query.username,
      vote: null
    }
  }

  let auth = JSON.stringify(pusher.authenticate(query.socket_id, query.channel_name, presenceData))
  let authCallback = query.callback.replace(/"/g, '') + '(' + auth + ');'

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/javascript'
    },
    body: authCallback
  })
}
