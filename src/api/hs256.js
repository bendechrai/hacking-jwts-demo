const base64url = require("base64-url");
const forge = require("node-forge");

export function handler(event, context, callback) {
  const body = JSON.parse(event.body);

  const header = base64url.encode(JSON.stringify(JSON.parse(body.header)));
  const payload = base64url.encode(JSON.stringify(JSON.parse(body.payload)));

  let token = `${header}.${payload}`;

  let signature = forge.hmac.create();
  signature.start("sha256", body.secret);
  signature.update(token);
  signature = Buffer.from(signature.digest().toHex(), "hex").toString("base64");
  signature = signature.split("+").join("-");
  signature = signature.split("/").join("_");
  signature = signature.replace(/=.*$/, "");
  token = `${token}.${signature}`;

  callback(null, {
    statusCode: 200,
    body: token,
  });
}
