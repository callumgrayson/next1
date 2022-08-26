import React from "react";
import { Tabs } from "@mantine/core";
import Binary1 from "../Binary1/Binary1";
import TextToBinary from "./TextToBinary";

interface Component {
  [key: string]: React.FunctionComponent;
}

const components: Component = {
  Binary1,
  TextToBinary,
};

function Binary() {
  return (
    <div className="h-full  flex flex-col overflow-hidden">
      <h2>Binary</h2>
      <div className="h-full flex flex-col overflow-hidden">
        <Tabs defaultValue="TextToBinary" className="h-full flex flex-col">
          <Tabs.List>
            {Object.keys(components).map((key) => (
              <Tabs.Tab key={key} value={key}>
                {key}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <div className="flex-1 max-w-full max-h-full flex flex-col overflow-hidden">
            {Object.keys(components).map((key) => {
              const C = components[key];
              return (
                <Tabs.Panel key={key} value={key} className="h-full w-full">
                  <C />
                </Tabs.Panel>
              );
            })}
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Binary;
