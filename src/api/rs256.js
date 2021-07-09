var jwt = require('jsonwebtoken');

export function handler(event, context, callback) {
  const body = JSON.parse(event.body);
  let token = jwt.sign(body.payload, body.secret, { algorithm: 'RS256' });
  callback(null, {
    statusCode: 200,
    body: token,
  });
}

// const privKey = `-----BEGIN RSA PRIVATE KEY-----
// MIICXQIBAAKBgQCoLs7BC9ZVW2kT/IinXMDm17y1mzpLPGKRR+S1pzJFDdxDu5mq
// l/bmRdaeiE+cJ6RPp8cxCljF4iUSlF5HuNa+ONvhYhgnUTQmo7DU3ieRtPArVNH3
// MUlrq9knAoAbdyc8uag9/G4Rxd5xXQ6JiL/MpXmfOGnTgy5qgWk9PlNxtQIDAQAB
// AoGAOAyJaPqZ7o5tQXTq0ePugcAqKtfVoJc6PjKYfRWAglTxMD2II7tLVEi4EtNY
// vLDVaJqAns5U8XXBZyS9Guf14JnUP+BkNtBb3/3SnQQwAWax2tHJxqTOkWVvC1GQ
// zEyx2dnnWohGIWmAzU890VSS53SzCdgtAT3fTWZhv/6VU6ECQQDqxravstnxJCfD
// 46jfu+rw6BZ/cngRvWcooeft6BKW+4s7hrGtWIi2GjKUKIUocWGl8POqfvcVnzVq
// o8kdZ/99AkEAt2L2h9LeUrRAKgYgXm12F3WM2Ynr+1OLCQq4j+7ysZDf/jpwQ8b5
// A4z7ilp1kuFIXfb7hlXtnMz5aLAp6ybAmQJAZZo9sWfLXcpx0xqRGNIwaLVoFxuo
// zrSTEkiPIKxQbzrJFKfD+OrZr0VDIk8u4UPAKJpQOTbdI2RVL6NWA/3f2QJBAIhv
// cib+9TTmsc4SHMbj/TXa2N2HxS+Iqioh9cnv5lPBC0TjSV7Di8Pegc4fGtYaEXMH
// K354M32y6eO/HJC8lhECQQDdTgxg6vTB1fD/SsBD4FCD6ZYPA12DahJwju5sD5Wz
// 4nNWLsRUklk1IFSWBOKQUrbmxsVtkY2WBXn/zYBQdNQW
// -----END RSA PRIVATE KEY-----`;

// const pubKey = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoLs7BC9ZVW2kT/IinXMDm17y1
// mzpLPGKRR+S1pzJFDdxDu5mql/bmRdaeiE+cJ6RPp8cxCljF4iUSlF5HuNa+ONvh
// YhgnUTQmo7DU3ieRtPArVNH3MUlrq9knAoAbdyc8uag9/G4Rxd5xXQ6JiL/MpXmf
// OGnTgy5qgWk9PlNxtQIDAQAB
// -----END PUBLIC KEY-----`;
