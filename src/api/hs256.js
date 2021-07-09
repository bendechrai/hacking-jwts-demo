var jwt = require('jsonwebtoken');

export function handler(event, context, callback) {
  const body = JSON.parse(event.body);
  let token = jwt.sign(body.payload, body.secret, { algorithm: 'HS256' });
  callback(null, {
    statusCode: 200,
    body: token,
  });
}
