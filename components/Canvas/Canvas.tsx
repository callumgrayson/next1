import { Tabs } from "@mantine/core";
import Clock1 from "./Clock1/Clock1";
import MouseTrail1 from "./MouseTrail1/MouseTrail1";
import SolarSystem from "./SolarSystem/SolarSystem";
import MouseTrail2 from "./MouseTrail2/MouseTrail2";
import Declarative from "./Declarative/Declarative";
import Declarative1 from "./Declarative1/Declarative1";

interface Component {
  [key: string]: React.FunctionComponent;
}

const components: Component = {
  Clock1,
  MouseTrail1,
  SolarSystem,
  MouseTrail2,
  // Declarative,
  Declarative1,
};

function Canvas() {
  return (
    <div>
      <h2>Canvas</h2>
      <Tabs defaultValue="Declarative1">
        <Tabs.List>
          {Object.keys(components).map((key) => (
            <Tabs.Tab key={key} value={key}>
              {key}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {Object.keys(components).map((key) => {
          const C = components[key];
          return (
            <Tabs.Panel key={key} value={key}>
              <C />
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
}

export default Canvas;
