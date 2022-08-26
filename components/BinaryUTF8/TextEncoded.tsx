import { Button, Group } from "@mantine/core";
import { useState } from "react";
import { pad } from "../../pages/dataviews/helpers";
import { Container, Row } from "../../pages/dataviews/Layout";

const encoder = new TextEncoder();
// const textN = new Array(1000).fill("").map((_, idx) => {
//   return String.fromCodePoint(idx);
// });
// const textBuffer = encoder.encode(textN.join(""));
// const dv = new DataView(textBuffer.buffer);

// console.log("dv", dv);

// const seeBinary = (function () {
//   const len = textBuffer.byteLength;
//   console.log("len", len);

//   const out = [];

//   for (let i = 0; i < len; i++) {
//     const dec = dv.getUint8(i);
//     const bin = dec.toString(2);
//     const padded = pad(bin, 8, "0");
//     out.push({ dec: dec, bin1: padded });
//   }

//   return out;
// })();

// const withChar = seeBinary.map((el, idx) => {
//   const char = String.fromCodePoint(el.dec);
//   return { ...el, char };
// });
const st = Date.now();
const textPlus = new Array(178208).fill("").map((_, idx) => {
  const hex = "0x" + idx.toString(16);
  const char = String.fromCodePoint(idx);
  const enc = encoder.encode(char);
  const dv = new DataView(enc.buffer);
  const uint8decs = [];
  const uint8bins = [];
  const uint8chars = [];
  for (let i = 0; i < dv.byteLength; i++) {
    const element = dv.getUint8(i);
    uint8decs.push(element);
    uint8bins.push(pad(element.toString(2), 8, "0"));
    uint8chars.push(String.fromCodePoint(element));
  }
  return { dec: idx, hex, char, bin: { uint8decs, uint8chars, uint8bins } };
});
const et = Date.now();
const diff = et - st;
console.log("diff", diff);

const width1 = "w-32";
const width2 = "w-80";
const mr = "mr-4";

/**
 * TextEncoded Component
 */
function TextEncoded() {
  const [sliceLength, setSliceLength] = useState(30);
  const [jumpto, setJumpto] = useState(30);
  const [viewSlice, setViewSlice] = useState(
    textPlus.slice(jumpto, jumpto + sliceLength)
  );

  function getViewSlice(n: number) {
    const start = Math.max(0, n - 2);
    const newViewSlice = textPlus.slice(
      Math.max(0, n - 2),
      start + sliceLength
    );
    setViewSlice(newViewSlice);
    setJumpto(start);
  }

  return (
    <Container>
      <h5>Text Encoded in UTF-8</h5>
      <p>
        The highest value given in tables is {(1049087).toLocaleString()} but
        there are no meaningful characters after {(178205).toLocaleString()}.
      </p>
      <Row className="width-full justify-center">
        <div>
          {[0, 33, 48, 65, 97, 128, 160, 2048, 65535, 178205].map((n) => {
            return (
              <Button
                key={n}
                type="button"
                variant="outline"
                onClick={() => getViewSlice(n)}
              >
                {n.toLocaleString()}
              </Button>
            );
          })}
        </div>
      </Row>
      <Row className="width-full justify-between">
        <div>
          {[100000, 10000, 1000, 100, 10].map((n) => {
            return (
              <Button
                key={n}
                type="button"
                variant="outline"
                onClick={() => getViewSlice(jumpto - n)}
              >
                {`<`}
                {n.toLocaleString()}
              </Button>
            );
          })}
        </div>
        <div>
          {[10, 100, 1000, 10000, 100000].map((n) => {
            return (
              <Button
                key={n}
                type="button"
                variant="outline"
                onClick={() => getViewSlice(jumpto + n)}
              >
                {n.toLocaleString()}
                {`>`}
              </Button>
            );
          })}
        </div>
      </Row>
      <div>
        {viewSlice.map((el) => (
          <Row key={el.dec} className={`font-mono`}>
            <div className={`${mr} ${width1}`}>{el.dec.toLocaleString()}</div>
            <div className={`${mr} ${width1}`}>{el.hex}</div>
            <div className={`${mr} ${width1}`}>{el.char}</div>
            <div className={`${mr} ${width1}`}>
              {el.bin.uint8decs.join(" ")}
            </div>
            <div className={`${mr} ${width2}`}>
              {el.bin.uint8bins.join(" ")}
            </div>
            <div className={`${mr} ${width1}`}>
              {el.bin.uint8chars.join(" ")}
            </div>
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default TextEncoded;
