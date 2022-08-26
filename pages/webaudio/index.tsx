import dynamic from "next/dynamic";
import { Suspense } from "react";

const TextToSpeech = dynamic(
  () => import("../../components/WebAudio/TextToSpeech"),
  {
    suspense: true,
  }
);
const PureNotes = dynamic(() => import("../../components/WebAudio/PureNotes"), {
  suspense: true,
});

function WebAudio() {
  return (
    <Suspense fallback={`Loading...`}>
      {/* <TextToSpeech /> */}
      <PureNotes />
    </Suspense>
  );
}

export default WebAudio;
