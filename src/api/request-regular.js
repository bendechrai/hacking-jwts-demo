const jwt = require("jsonwebtoken");
import { decode } from "js-base64";

export function handler(event, context, callback) {
  const token = event.headers.authorization.replace(/^bearer /i, "");
  const response = {
    isAdmin: false,
    tokenUsed: token,
    status: 200,
  };

  try {
    const [_header, _payload, _signature] = token.split(".");
    const header = JSON.parse(decode(_header));
    let payload = {};
    if (header.alg === "HS256") {
      payload = jwt.verify(token, "secret");
    } else {
      payload = jwt.verify(token, pubKey);
    }
    if (payload.name === "admin") response.isAdmin = true;
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
