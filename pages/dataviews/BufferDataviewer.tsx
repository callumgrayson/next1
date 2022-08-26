import React from "react";
import { Row, ColumnNumbers } from "./Layout";
import { pad } from "./helpers";

function BufferDataviewer() {
  const hw = "Hello World!";
  const hwArray = hw.split("").map((char) => char.replace(" ", "SPACE"));
  //   console.log("hwArray", hwArray);
  const encoder = new TextEncoder();
  const hwBuffer = encoder.encode(hw);
  //   console.log("hwBuffer", hwBuffer);
  const hwBin = Array.from(hwBuffer);
  const asHex = hwBin.map((int, intIdx) => `0x${int.toString(16)}`);

  const asBin = hwBin.map((int, intIdx) => int.toString(2));
  const asBinPadded = asBin.map((bin, binIdx) => pad(bin, 8, "0"));

  const decoder = new TextDecoder();
  const hwDecoded = decoder.decode(hwBuffer);

  return (
    <section className="font-mono">
      <h2>Buffer Dataviewer</h2>
      <Row>
        <div>{asBinPadded.join("")}</div>
      </Row>
      <Row>
        <ColumnNumbers className="mr-4">
          <h6>Text</h6>
          {hwArray.map((i, bufIdx) => (
            <div key={bufIdx}>{i}</div>
          ))}
        </ColumnNumbers>
        <ColumnNumbers className="mr-4">
          <h6>Decimal</h6>
          {hwBin.map((i, bufIdx) => (
            <div key={bufIdx}>{i}</div>
          ))}
        </ColumnNumbers>
        <ColumnNumbers className="mr-4">
          <h6>Hex</h6>
          {asHex.map((i, bufIdx) => (
            <div key={bufIdx}>{i}</div>
          ))}
        </ColumnNumbers>
        <ColumnNumbers className="mr-4">
          <h6>Bits</h6>
          {asBin.map((i, bufIdx) => (
            <div key={bufIdx}>{i}</div>
          ))}
        </ColumnNumbers>
        <ColumnNumbers className="mr-4">
          <h6>Bytes</h6>
          {asBinPadded.map((i, bufIdx) => (
            <div key={bufIdx}>{i}</div>
          ))}
        </ColumnNumbers>
        <div>
          <h6>Text</h6>
          {hwDecoded}
        </div>
      </Row>
    </section>
  );
}

export default BufferDataviewer;
