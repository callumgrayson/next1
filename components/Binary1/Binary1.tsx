import React from "react";

const range = ((i) => new Array(i).fill(0).map((_, idx) => idx))(10);
const centerOn = (midpoint: number) =>
  range.map((el) => midpoint + el - Math.floor(range.length / 2));
const mid0 = centerOn(0);
const mid8 = centerOn(2 ** 8 / 2);
const mid8top = centerOn(2 ** 8);
const mid16 = centerOn(2 ** 16 / 2);
const mid16top = centerOn(2 ** 16);
const mid32 = centerOn(2 ** 32 / 2);
const mid32top = centerOn(2 ** 32);
const midMaxSafe = centerOn(Math.round(Number.MAX_SAFE_INTEGER / 2));
const midMaxSafetop = centerOn(Number.MAX_SAFE_INTEGER);
const midMaxSafetopBig = centerOn(Number.MAX_SAFE_INTEGER);
const midUnSafetop = centerOn(Number.MAX_SAFE_INTEGER * 10 ** 200);
const midMaxSafetopNeg = centerOn(-Number.MAX_SAFE_INTEGER);
const midMinSafetop = centerOn(Number.MIN_SAFE_INTEGER);

const mids = [
  mid0,
  mid8,
  mid8top,
  mid16,
  mid16top,
  mid32,
  mid32top,
  midMaxSafe,
  midMaxSafetop,
  midMaxSafetopNeg,
  midMinSafetop,
];

const addBinary = ((r) =>
  Object.entries(r).map((rowEl) => {
    return rowEl[1].map((el) => {
      const as32 = (el >>> 0).toString(2);
      const parsedStringed = parseInt(el.toString(2), 2);
      return {
        decimal: el,
        binaryString: el.toString(2),
        // binaryStringParsed: parsedStringed.toString(10),
        // converts: parsedStringed === el ? "true" : "false",
        "binaryJs (x >>> 0) uInt32": as32,
        binaryJsNumber: parseInt(as32, 2),
        int8: Int8Array.of(el)[0].toString(2),
        uInt8: Uint8Array.of(el)[0].toString(2),
        int16: Int16Array.of(el)[0].toString(2),
        uInt16: Uint16Array.of(el)[0].toString(2),
        int32: Int32Array.of(el)[0].toString(2),
        uInt32: Uint32Array.of(el)[0].toString(2),
      };
    });
  }))(mids);

function Binary() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div>
        {~~0} {~~1.5} {~~2.9999} {~~10} {~~128} {~~-0} {~~-1.001} {~~-2} {~~-10}{" "}
        {~~-128}
      </div>
      <div>So ~~2.5 acts the same as Math.floor(2.5)</div>
      <div className="h-full w-full overflow-auto border border-solid border-white">
        <table className="text-end border-separate border-spacing-4">
          <thead>
            <tr>
              {Object.keys(addBinary[0][0]).map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {addBinary.map((row, rowIdx) => {
              return (
                <React.Fragment key={`row${rowIdx}`}>
                  <tr key={`row${rowIdx}`}>
                    <td>###</td>
                  </tr>
                  {Object.values(row).map((val, valIdx) => {
                    return (
                      <tr key={`val${valIdx}`}>
                        {Object.values(val).map((el, elIdx) => (
                          <td
                            key={elIdx}
                            className={`${el < 0 ? "text-red-300" : ""}`}
                          >
                            {el}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {/* {addBinary.map((digit) => (
          <div key={digit.decimal}>{JSON.stringify(digit)}</div>
        ))} */}
      </div>
    </div>
  );
}

export default Binary;
