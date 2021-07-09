import { decode } from "js-base64";

export function handler(event, context, callback) {

  // Extract the JWT from Authorization: Bearer
  const token = event.headers.authorization.replace(/^bearer /i, "");

  // Create default response
  const response = {
    isAdmin: false,
    status: 200,
  };

  // Try and decode the JWT
  try {
    // If we decode and payload.username is "admin", set flag to TRUE
    const payload = JSON.parse(decode(token.split(".")[1]));
    if (payload.name === "admin") response.isAdmin = true;

  } catch (e) {
    // If decoding fails for any reason, set the response
    response.error = e;
    response.status = 401;
  }

  // Return the response
  callback(null, {
    statusCode: response.status,
    body: JSON.stringify(response),
  });
}
