import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { MdSpeakerNotes } from "react-icons/md"
import { extendString, decode } from "js-base64";
extendString();

const privKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`

const pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoLs7BC9ZVW2kT/IinXMDm17y1
mzpLPGKRR+S1pzJFDdxDu5mql/bmRdaeiE+cJ6RPp8cxCljF4iUSlF5HuNa+ONvh
YhgnUTQmo7DU3ieRtPArVNH3MUlrq9knAoAbdyc8uag9/G4Rxd5xXQ6JiL/MpXmf
OGnTgy5qgWk9PlNxtQIDAQAB
-----END PUBLIC KEY-----`;

const PromptForSecret = ({ children, callback }) => {
  const [show, setShow] = useState(false);
  const [secret, setSecret] = useState("secret")

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleGenerate = () => {
    setShow(false)
    callback(secret)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} block>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{children}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Secret</Form.Label>
            <Form.Control as="textarea" rows="5" value={secret} onChange={ev => setSecret(ev.target.value)} />
          </Form.Group>
          <Form.Group>
            <Container>
              <Row>
                <Col><Badge size="sm" variant="info" onClick={() => { setSecret('secret') }}>Insert Pre-Shared Key</Badge></Col>
                <Col><Badge size="sm" variant="info" onClick={() => { setSecret(pubKey) }}>Insert Public Key</Badge></Col>
                <Col><Badge size="sm" variant="info" onClick={() => { setSecret(privKey) }}>Insert Private Key</Badge></Col>
              </Row>
            </Container>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGenerate}>
            {children}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const Home = ({ jwt, setJwt, implementation }) => {
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [result, setResult] = useState({});
  const [isHMAC, setIsHMAC] = useState(false);

  const jwtChange = (ev) => {
    setJwt(ev.target.value);
  };

  const headerChange = (ev) => {
    setHeader(ev.target.value);
    setIsHMAC(ev.target.value.indexOf('"RS') === -1);
  };

  const payloadChange = (ev) => {
    setPayload(ev.target.value);
  };

  const signatureChange = (ev) => {
    setSignature(ev.target.value);
  };

  const generateHS256 = (secret) => {
    if (secret !== null) {
      const compactHeader = JSON.stringify(JSON.parse(header));
      const compactPayload = JSON.stringify(JSON.parse(payload));

      fetch("/.netlify/functions/hs256", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          header: compactHeader,
          payload: compactPayload,
          secret,
          implementation,
        }),
      })
        .then((res) => res.text())
        .then((token) => {
          const signature = token.split(".")[2];
          setSignature(signature);
          setJwt(token);
        });
    }
  };

  const generateRS256 = (secret) => {
    console.log(secret)
    if (secret !== null) {
      const compactHeader = JSON.stringify(JSON.parse(header));
      const compactPayload = JSON.stringify(JSON.parse(payload));

      fetch("/.netlify/functions/rs256", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          header: compactHeader,
          payload: compactPayload,
          secret,
        }),
      })
        .then((res) => res.text())
        .then((token) => {
          const signature = token.split(".")[2];
          setSignature(signature);
          setJwt(token);
        });
    }
  }

  const pretty = (json) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch (e) {
      return json;
    }
  };

  const submitRequest = () => {
    setResult({});

    fetch(`/.netlify/functions/request-${implementation}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(setResult);
  };

  useEffect(() => {
    if (jwt !== "") {
      try {
        const [_header, _payload, _signature] = jwt.split(".");
        setHeader(decode(_header));
        setPayload(decode(_payload));
        setSignature(_signature);
        setIsHMAC(decode(_header).indexOf('"RS') === -1);
      } catch (e) { }
    }
  }, [jwt]);

  useEffect(() => {
    if (header !== "" && payload !== "") {
      try {
        const compactHeader = JSON.stringify(JSON.parse(header)).toBase64URL();
        const compactPayload = JSON.stringify(
          JSON.parse(payload)
        ).toBase64URL();
        setJwt(`${compactHeader}.${compactPayload}.${signature}`);
      } catch (e) { }
    }
  }, [header, payload, signature, setJwt]);

  return <>
    <Container fluid className="mt-3">
      <Row>
        <Col>
          <Alert variant="secondary">
            <div class="d-flex flex-row">
              <div className="mr-2">
                <MdSpeakerNotes size="3em" />
              </div>
              <div>
                This is the demo for <a href="https://bendechrai.com">Ben Dechrai</a>'s talk, Hacking JWTs.
                You are welcome to use this demo yourself, with the caveat that it is still under heavy
                development. I am still making the tool more robust and will soon be adding explanations
                and guides for how to use all its features.
              </div>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
    <Container fluid>
      <Alert variant="primary">Your goal is to log in with the name "admin"!</Alert>
      <Row>
        <Col sm={12} md={8}>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>JSON Web Token</Form.Label>
                  <Form.Control as="textarea" rows="5" value={jwt} onChange={jwtChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Header</Form.Label>
                      <Form.Control as="textarea" rows="5" value={header && pretty(header)} onChange={headerChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Payload</Form.Label>
                      <Form.Control as="textarea" rows="5" value={payload && pretty(payload)} onChange={payloadChange} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Signature</Form.Label>
                      <Form.Control as="textarea" rows="5" value={signature} onChange={signatureChange} />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <PromptForSecret hidden={!isHMAC} callback={secret => {
                  isHMAC ? generateHS256(secret) : generateRS256(secret)
                }}>
                  {isHMAC ? 'Generate HS256 Signature' : 'Generate RS256 Signature'}
                </PromptForSecret>
              </Col>
              <Col>
                <Button onClick={submitRequest} block>
                  Submit Request
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group>
            <Form.Label>API Response</Form.Label>
            <Form.Control as="textarea" rows="15" value={JSON.stringify(result, null, 2)} readOnly className="scroll" />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  </>;
};

export default Home;
