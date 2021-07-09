const jwt = require("jsonwebtoken");
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
    // Split the token and decode the header
    const [_header, _payload, _signature] = token.split(".");
    const header = JSON.parse(decode(_header));
    let payload = {}

    // If header.alg is "none", and the signature is blank, then we're good to trust the payload
    if (header.alg === "none" && _signature === "") {
      payload = JSON.parse(decode(_payload));

      // Otherwise, verify an HS256 token
    } else if (header.alg === "HS256") {
      payload = jwt.verify(token, "secret");

      // Lastly, assume RS256 tokens
    } else {
      payload = jwt.verify(token, pubKey);
    }

    // If payload.username is "admin", set flag to TRUE
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




const pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoLs7BC9ZVW2kT/IinXMDm17y1
mzpLPGKRR+S1pzJFDdxDu5mql/bmRdaeiE+cJ6RPp8cxCljF4iUSlF5HuNa+ONvh
YhgnUTQmo7DU3ieRtPArVNH3MUlrq9knAoAbdyc8uag9/G4Rxd5xXQ6JiL/MpXmf
OGnTgy5qgWk9PlNxtQIDAQAB
-----END PUBLIC KEY-----`;
