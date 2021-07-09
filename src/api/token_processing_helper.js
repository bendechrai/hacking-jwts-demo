const forge = require("node-forge");
import { decode } from "js-base64";
const jwt = require("jsonwebtoken");

function validateHS256Signature(token, secret) {
    try {
        const [header, payload, signature] = token.split(".");
        let _signature = forge.hmac.create();
        _signature.start("sha256", secret);
        _signature.update(`${header}.${payload}`);
        _signature = Buffer.from(_signature.digest().toHex(), "hex").toString("base64");
        _signature = _signature.split("+").join("-");
        _signature = _signature.split("/").join("_");
        _signature = _signature.replace(/=.*$/, "");
        return signature === _signature;
    } catch (e) {
        return false
    }
}

function validateRS256Signature(token, secret) {
    try {
        const payload = token.split(".")[1];
        jwt.verify(token, secret); // Throws an error if it fails
        return true;
    } catch (e) {
        return false;
    }
}

export function processToken(token, secret) {
    const [header, payload, signature] = token.split(".");
    const alg = JSON.parse(decode(header)).alg;

    switch (alg) {
        case "HS256":
            if (validateHS256Signature(token, secret)) {
                return JSON.parse(decode(payload));
            } else {
                throw "Could not validate HS256 signature"
            }

        case "RS256":
            if (validateRS256Signature(token, secret)) {
                return JSON.parse(decode(payload));
            } else {
                throw "Could not validate RS256 signature"
            }

        default:
            throw "Algorithm not recognised"
    }
}

