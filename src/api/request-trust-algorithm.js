import { processToken } from "./token_processing_helper";

const pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoLs7BC9ZVW2kT/IinXMDm17y1
mzpLPGKRR+S1pzJFDdxDu5mql/bmRdaeiE+cJ6RPp8cxCljF4iUSlF5HuNa+ONvh
YhgnUTQmo7DU3ieRtPArVNH3MUlrq9knAoAbdyc8uag9/G4Rxd5xXQ6JiL/MpXmf
OGnTgy5qgWk9PlNxtQIDAQAB
-----END PUBLIC KEY-----`;

export function handler(event, context, callback) {
  let response = {}
  try {

    // Extract the JWT from Authorization: Bearer, and process it
    const token = event.headers.authorization.replace(/^bearer /i, "");
    const payload = processToken(token, pubKey);

    // Create response
    response = {
      isAdmin: payload.name === "admin",
      status: 200,
    };

  } catch (e) {
    response.error = e;
    response.status = 401;
  }

  // Return the response
  callback(null, {
    statusCode: response.status,
    body: JSON.stringify(response),
  });

}