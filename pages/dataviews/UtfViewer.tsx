import React from "react";
import { Tooltip } from "@mantine/core";
import { Row } from "./Layout";

const utf1000 = new Array(200).fill("").map((_, idx) => {
  return {
    char: String.fromCodePoint(idx),
    decimal: idx,
    hex: idx.toString(16),
  };
});

function UtfViewer() {
  return (
    <section className="font-mono width-full">
      <h2>UTF-8 Viewer</h2>
      <p>{String.fromCodePoint(parseInt("10A60", 16))}</p>
      <Row className="width-full border border-solid border-red-700 flex-wrap">
        <div className="flex flex-wrap width-full break-words break-all">
          {/* {utf1000.join("")} */}
          {utf1000.map((el, idx) => (
            <div key={idx} className="p-2">
              <div>{el.char}</div>
              <div>{el.decimal}</div>
              <div>{el.hex}</div>
            </div>
          ))}
        </div>
      </Row>
    </section>
  );
}

export default UtfViewer;
