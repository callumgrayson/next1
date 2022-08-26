import { Button } from "@mantine/core";
import React, { useState } from "react";
import { Binary } from "../Binary/TextToBinary";

const colorFormats = {
  rgb: "RGB",
  rgba: "RGBA",
};

function getDisplay(input: Binary[], format: string) {
  const len = format.length;
  const colors = [];
  for (let i = 0; i < input.length; i += len) {
    const bytes = input.slice(i, i + len);
    const colorHex = `#${bytes.map((el) => el.hex).join("")}`;
    colors.push(colorHex);
  }

  console.log("colors", colors);
  return colors;
}

function BinaryToColor({ input }: { input: Input }) {
  const [format, setFormat] = useState(Object.keys(colorFormats)[0]);
  const displayArray = getDisplay(input, format);
  return (
    <div className="w-full">
      <h2>BinaryToColor</h2>
      <div>
        {Object.entries(colorFormats).map((el, elIdx) => (
          <Button key={el[0]} onClick={() => setFormat(el[0])}>
            {el[1]}
          </Button>
        ))}
      </div>
      <div className="flex w-full flex-wrap ">
        {displayArray.map((el, elIdx) => (
          <span
            key={elIdx}
            style={{
              backgroundColor: el,
              border: "1px solid white",
              padding: "15px",
            }}
          >
            {el}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BinaryToColor;
