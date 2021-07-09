const jwt = require("jsonwebtoken");
import { decode } from "js-base64";

export function handler(event, context, callback) {
  const token = event.headers.authorization.replace(/^bearer /i, "");
  const response = {
    isAdmin: false,
    status: 200,
  };

  try {
    // Set a default empty payload
    let payload = {};

    // Extract the header from the JWT
    const header = JSON.parse(decode(token.split(".")[0]));

    // If header says HS256, extract payload using pre-shared key
    if (header.alg === "HS256") {
      payload = jwt.verify(token, "secret");

      // If header says RS256, extract payload using public key (defined below)
    } else {
      payload = jwt.verify(token, pubKey);
    }

    // If payload.name is "admin", set response to TRUE
    if (payload.name === "admin") response.isAdmin = true;

    // If we cantch any error, access denied!
  } catch (e) {
    response.error = e;
    response.status = 401;
  }

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
