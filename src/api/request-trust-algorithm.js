const base64url = require("base64-url");
const forge = require("node-forge");
import { decode } from "js-base64";

export function handler(event, context, callback) {
  const token = event.headers.authorization.replace(/^bearer /i, "");
  const response = {
    isAdmin: false,
    tokenUsed: token,
    status: 200,
  };

  const [_header, _payload, _signature] = token.split(".");
  let signature = forge.hmac.create();
  signature.start("sha256", pubKey);
  signature.update(`${_header}.${_payload}`);
  signature = Buffer.from(signature.digest().toHex(), "hex").toString("base64");
  signature = signature.split("+").join("-");
  signature = signature.split("/").join("_");
  signature = signature.replace(/=.*$/, "");

  if (signature === _signature) {
    const payload = JSON.parse(decode(_payload));
    if (payload.name === "admin") response.isAdmin = true;
  } else {
    response.error = {
      name: "Error",
      message: "invalid signature",
    };
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
