import React from "react";

const Tips = () => {
  return (
    <div className="tips">
      <h2>Tips</h2>
      <p>
        Need to generate an RSA keypair? Try{" "}
        <a href="http://travistidwell.com/jsencrypt/demo/">
          http://travistidwell.com/jsencrypt/demo/
        </a>
        .
      </p>
      <h3>Public RSA Keys</h3>
      <p>
        Public keys are often available at{" "}
        <a
          href="https://bendechrai.auth0.com/.well-known/jwks.json"
          target="_blank" rel="noopener noreferrer"
        >
          "well-known" URLs
        </a>
        , to allos any identity clients to rerieve the current public key.
        Gerneally, this isn't a concern, because they are, afterall, public.
      </p>
      <p>
        If a JWT consumer, like an API, trusts the header to define the
        algorithm, it's not impossible that the private key might also double as
        a pre-shared key for symmetric signing algorithms.
      </p>
      <p>To help you try this out, the public key for this application is:</p>
      <textarea readOnly>
        {`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoLs7BC9ZVW2kT/IinXMDm17y1
mzpLPGKRR+S1pzJFDdxDu5mql/bmRdaeiE+cJ6RPp8cxCljF4iUSlF5HuNa+ONvh
YhgnUTQmo7DU3ieRtPArVNH3MUlrq9knAoAbdyc8uag9/G4Rxd5xXQ6JiL/MpXmf
OGnTgy5qgWk9PlNxtQIDAQAB
-----END PUBLIC KEY-----`}
      </textarea>
      <p>The private key:</p>
      <textarea readOnly>
        {`-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCoLs7BC9ZVW2kT/IinXMDm17y1mzpLPGKRR+S1pzJFDdxDu5mq
l/bmRdaeiE+cJ6RPp8cxCljF4iUSlF5HuNa+ONvhYhgnUTQmo7DU3ieRtPArVNH3
MUlrq9knAoAbdyc8uag9/G4Rxd5xXQ6JiL/MpXmfOGnTgy5qgWk9PlNxtQIDAQAB
AoGAOAyJaPqZ7o5tQXTq0ePugcAqKtfVoJc6PjKYfRWAglTxMD2II7tLVEi4EtNY
vLDVaJqAns5U8XXBZyS9Guf14JnUP+BkNtBb3/3SnQQwAWax2tHJxqTOkWVvC1GQ
zEyx2dnnWohGIWmAzU890VSS53SzCdgtAT3fTWZhv/6VU6ECQQDqxravstnxJCfD
46jfu+rw6BZ/cngRvWcooeft6BKW+4s7hrGtWIi2GjKUKIUocWGl8POqfvcVnzVq
o8kdZ/99AkEAt2L2h9LeUrRAKgYgXm12F3WM2Ynr+1OLCQq4j+7ysZDf/jpwQ8b5
A4z7ilp1kuFIXfb7hlXtnMz5aLAp6ybAmQJAZZo9sWfLXcpx0xqRGNIwaLVoFxuo
zrSTEkiPIKxQbzrJFKfD+OrZr0VDIk8u4UPAKJpQOTbdI2RVL6NWA/3f2QJBAIhv
cib+9TTmsc4SHMbj/TXa2N2HxS+Iqioh9cnv5lPBC0TjSV7Di8Pegc4fGtYaEXMH
K354M32y6eO/HJC8lhECQQDdTgxg6vTB1fD/SsBD4FCD6ZYPA12DahJwju5sD5Wz
4nNWLsRUklk1IFSWBOKQUrbmxsVtkY2WBXn/zYBQdNQW
-----END RSA PRIVATE KEY-----`}
      </textarea>
      <p>
        A correctly signed JWT for 'bendechrai' using the RS256 algorithm looks
        like this:
      </p>
      <textarea readOnly>
        eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYmVuZGVjaHJhaSJ9.L2DD-pQ6SHuejoNJM7U6cxj__wUXSCQQ5smfigs7Ldq9FRNKLjJHEW3vPr9SrKipptKGbMDJSMSwtC3mpQuKMsDeFUBk724yuRB3KwY935g36iluHPeo_0QL38yRK7vRjO13TWIYgT6L_9mriAxWYL_M4A9C9Nz_338J71dZYzY
      </textarea>
      <p>
        A correctly signed JWT for 'admin' using the RS256 algorithm looks like
        this:
      </p>
      <textarea readOnly>
        eyJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYWRtaW4ifQ.CTcxl4t9vWbCF1EJjm3fDsobOnFjA-EZyQlwGueVnz4hsi11tunp1mb_aqpaD6tUttfG5CmV5dKBfpTKvL9BKpn1S97NSyr9QCGZ2vB9J8ejfdZZdmX0rZhWt7vX0UHtn0D1xiriGcllG2y_iDQKBSD3lJrSa9r7XNaMJWxssaA
      </textarea>
    </div>
  );
};

export default Tips;
