import React, { useEffect, useState } from "react";
import { extendString, decode } from "js-base64";
extendString();

const JWTEditor = ({ jwt, setJwt }) => {
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [secret, setSecret] = useState("secret");
  const [update, setUpdate] = useState("components");
  const [result, setResult] = useState({});

  const jwtChange = (ev) => {
    setUpdate("components");
    setJwt(ev.target.value);
  };

  const headerChange = (ev) => {
    setUpdate("jwt");
    setHeader(ev.target.value);
  };

  const payloadChange = (ev) => {
    setUpdate("jwt");
    setPayload(ev.target.value);
  };

  const signatureChange = (ev) => {
    setUpdate("jwt");
    setSignature(ev.target.value);
  };

  const secretChange = (ev) => {
    setSecret(ev.target.value);
  };

  const generateHS256 = () => {
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
        }),
      })
        .then((res) => res.text())
        .then((token) => {
          const [_header, _payload, _signature] = token.split(".");
          setSignature(_signature);
          setJwt(token);
        });
    }
  };

  //   const generateRS256 = () => {
  //     fetch("/.netlify/functions/rs256", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ header, payload }),
  //     })
  //       .then((res) => res.text())
  //       .then((token) => {
  //         const [_header, _payload, _signature] = token.split(".");
  //         setSignature(_signature);
  //         setJwt(token);
  //       });
  //   };

  const submitRequest = (type) => {
    setResult({});

    fetch(`/.netlify/functions/request-${type}`, {
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
    switch (update) {
      case "jwt":
        const compactHeader = JSON.stringify(JSON.parse(header)).toBase64URL();
        const compactPayload = JSON.stringify(
          JSON.parse(payload)
        ).toBase64URL();
        setJwt(`${compactHeader}.${compactPayload}.${signature}`);
        setUpdate("");
        break;
      case "components":
        const [_header, _payload, _signature] = jwt.split(".");
        setHeader(decode(_header));
        setPayload(decode(_payload));
        setSignature(_signature);
        setUpdate("");
        break;
      default:
        break;
    }
  }, [jwt, header, payload, signature, update]);

  return (
    <div>
      <h2>Demo Zone</h2>
      <p>Your goal is to log in as admin!</p>
      <div className="jwt-editor">
        <div className="encoded">
          <textarea onChange={jwtChange} value={jwt}></textarea>
        </div>
        <div className="components">
          <textarea
            onChange={headerChange}
            value={header && JSON.stringify(JSON.parse(header), null, 2)}
          ></textarea>
          <textarea
            onChange={payloadChange}
            value={payload && JSON.stringify(JSON.parse(payload), null, 2)}
          ></textarea>
          <textarea onChange={signatureChange} value={signature}></textarea>
          <button onClick={generateHS256}>Generate HS256 Signature</button>
          <textarea onChange={secretChange} value={secret}></textarea>
          {/* <button onClick={generateRS256}>Generate RS256 Signature</button> */}
        </div>
      </div>
      <div className="request-buttons">
        <button
          type="submit"
          onClick={() => {
            submitRequest("regular");
          }}
        >
          Make Regular Request
        </button>
        <button
          type="submit"
          onClick={() => {
            submitRequest("ignore-signature");
          }}
        >
          Ignore Signature
        </button>
        <button
          type="submit"
          onClick={() => {
            submitRequest("allow-none");
          }}
        >
          Allow None
        </button>
        <button
          type="submit"
          onClick={() => {
            submitRequest("trust-algorithm");
          }}
        >
          Trust Algorithm
        </button>
      </div>
      <div className="request-result">
        <pre>{JSON.stringify(result, null, 4)}</pre>
      </div>
    </div>
  );
};

export default JWTEditor;
