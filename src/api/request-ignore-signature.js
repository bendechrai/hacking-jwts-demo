import { decode } from "js-base64";

export function handler(event, context, callback) {
  const token = event.headers.authorization.replace(/^bearer /i, "");
  const response = {
    isAdmin: false,
    tokenUsed: token,
    status: 200,
  };

  const [_header, _payload, _signature] = token.split(".");
  const payload = JSON.parse(decode(_payload));
  if (payload.name === "admin") response.isAdmin = true;

  callback(null, {
    statusCode: response.status,
    body: JSON.stringify(response),
  });
}
