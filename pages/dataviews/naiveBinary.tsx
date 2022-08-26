import React from "react";
import { Row } from "./Layout";

function NaiveBinary() {
  const dataEncoded = [
    0,
    1,
    2,
    127,
    128,
    129,
    255,
    256,
    257,
    2 ** 16 - 1,
    2 ** 16,
    2 ** 16 + 1,
    2 ** 32 - 1,
    2 ** 32,
    2 ** 32 + 1,
  ];

  // const uInt8 = Int32Array.from(dataEncoded);
  // console.log("uInt8", uInt8);

  // const big = BigInt64Array.from(dataEncoded.map((el) => BigInt(el)));
  // console.log("big", big);

  // const dv = new DataView(new ArrayBuffer(dataEncoded.length));

  // const b1 = BigInt64Array.from([BigInt(-1)]);
  // console.log("b1", b1);

  const buildBinary = dataEncoded.map((el) => el.toString(2));
  // console.log("buildBinary", buildBinary);

  const as1 = buildBinary.join("");
  // console.log("as1", as1);

  const toBytes = [];
  let byte = [];
  for (let i = 0; i < as1.length; i++) {
    const element = as1[i];
    byte.push(element);
    if (byte.length === 8) {
      toBytes.push(byte);
      byte = [];
    }
  }
  // console.log("toBytes", toBytes);

  const byteStrings = toBytes.map((a) => a.join(""));
  const asUint8 = byteStrings.map((b) => parseInt(b, 2));
  // console.log("asUint8", asUint8);

  const ab1 = new ArrayBuffer(4);
  const dv1 = new DataView(ab1);
  dv1.setUint32(0, 2 ** 8 - 1);
  //   console.log("dv1", dv1);

  return (
    <section>
      <h2>Naive Binary</h2>
      <Row>
        <div className="ml-4 text-start">
          <h6>Powers</h6>
          {new Array(33).fill(0).map((el, idx) => (
            <div key={idx}>
              {idx} - {2 ** idx}
            </div>
          ))}
        </div>
        <div className="ml-4 text-end">
          <h6>Boundary values</h6>
          {dataEncoded.map((el, idx) => (
            <div key={idx}>{el}</div>
          ))}
        </div>
        <div className="ml-4 text-end">
          <h6>In Binary</h6>
          {buildBinary.map((el, idx) => (
            <div key={idx}>{el}</div>
          ))}
        </div>
        <div className="ml-4 text-end">
          <h6>Bits split</h6>
          {byteStrings.map((el, idx) => (
            <div key={idx}>{el}</div>
          ))}
        </div>
        <div className="ml-4 text-end">
          <h6>Read As Uint8</h6>
          {asUint8.map((el, idx) => (
            <div key={idx}>{el}</div>
          ))}
        </div>
      </Row>
    </section>
  );
}

export default NaiveBinary;
