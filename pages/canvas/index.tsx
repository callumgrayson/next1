import dynamic from "next/dynamic";
import { Suspense } from "react";

const CanvasC = dynamic(() => import("../../components/Canvas/Canvas"), {
  suspense: true,
});

function Canvas() {
  return (
    <Suspense fallback={`Loading...`}>
      <CanvasC />
    </Suspense>
  );
}

export default Canvas;
