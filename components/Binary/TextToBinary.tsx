import { TextInput, ScrollArea, Slider } from "@mantine/core";
import React, { useState } from "react";
import { pad } from "../../pages/dataviews/helpers";
import { charSafe } from "../../helpers";
import BinaryToColor from "../BinaryToColor/BinaryToColor";

export type Binary = {
  char: string | JSX.Element;
  dec: string;
  hex: string;
  binary: string;
};

function toBinary(utf8: string) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(utf8);
  const view = new DataView(encoded.buffer);
  const len = view.byteLength;
  const binary = [];
  for (let i = 0; i < len; i++) {
    const element = view.getUint8(i);
    const byte = element.toString(2);
    const hex = element.toString(16);
    const dec = element.toString(10);
    const char = charSafe(String.fromCodePoint(dec));

    binary.push({
      char: char,
      dec: dec,
      hex: hex,
      binary: pad(byte, 8, "0"),
    });
  }
  return binary;
}

const steps = [
  {
    showBinary: true,
    showDecimal: false,
    showChar: false,
    showHex: false,
    gapSize: 0,
  },
  {
    showBinary: true,
    showDecimal: false,
    showChar: false,
    showHex: false,
    gapSize: 2,
  },
  {
    showBinary: true,
    showDecimal: false,
    showChar: true,
    showHex: false,
    gapSize: 2,
  },
  {
    showBinary: true,
    showDecimal: true,
    showChar: true,
    showHex: false,
    gapSize: 2,
  },
  {
    showBinary: true,
    showDecimal: true,
    showChar: true,
    showHex: true,
    gapSize: 2,
  },
];

function TextToBinary() {
  const [text1, setText1] = useState("🧻𫠜╦ Callum G");
  const [step, setStep] = useState(0);
  const textAsBinary = toBinary(text1);
  const stepSetting = steps[step];
  return (
    <div className="h-full border border-solid border-red-500 px-4 flex flex-col">
      <ScrollArea className="flex-1">
        <p>𫠝 𫠜 🧻</p>
        <TextInput
          placeholder="Eg: enter your name..."
          label="Beginning text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        {/* <p>{text1}</p> */}
        {/* <h5>Text converted to binary</h5> */}
        <div
          className={`flex w-full flex-wrap mt-8 gap-y-4 ${
            stepSetting.gapSize === 2 ? "gap-x-2" : ""
          }`}
        >
          {textAsBinary.map((el, elIdx) => (
            <div key={elIdx}>
              <div
                className={`${
                  stepSetting.showBinary ? "visible" : "invisible"
                }`}
              >
                {el.binary}
              </div>
              <div
                className={`${stepSetting.showChar ? "visible" : "invisible"}`}
              >
                {el.char}
              </div>
              <div
                className={`${
                  stepSetting.showDecimal ? "visible" : "invisible"
                }`}
              >
                {el.dec}
              </div>
              <div
                className={`${stepSetting.showHex ? "visible" : "invisible"}`}
              >{`0x${el.hex}`}</div>
            </div>
          ))}
        </div>
        <Slider
          value={step}
          onChange={setStep}
          min={0}
          max={steps.length - 1}
          className={`w-40 mt-8`}
        />
        <BinaryToColor input={textAsBinary} />
      </ScrollArea>
    </div>
  );
}

export default TextToBinary;
