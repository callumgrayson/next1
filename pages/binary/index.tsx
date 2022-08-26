import dynamic from "next/dynamic";
import { Suspense } from "react";

const Binary1 = dynamic(() => import("../../components/Binary"), {
  suspense: true,
});

function Binary() {
  return (
    <div className="h-screen">
      <Suspense fallback={`Loading...`}>
        <Binary1 />
      </Suspense>
    </div>
  );
}

export default Binary;
