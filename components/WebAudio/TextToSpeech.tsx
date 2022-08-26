import React, { useEffect, useRef, useState } from "react";
import ButtonCustom from "../../components/Button/Button";
import { Button } from "@mantine/core";

function TextToSpeech() {
  const [text, setText] = useState("Hello there! I see you.");
  const [voice, setVoice] = useState("");
  const synthRef = useRef<null | typeof window.speechSynthesis>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
  }, []);

  function speak(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const synth = synthRef.current;

    if (!synth) return;

    const speakText = new SpeechSynthesisUtterance(text);

    speakText.onend = (e) => {
      e.preventDefault();
      console.log("end", e);
    };
    // Speak error
    speakText.onerror = (e) => {
      e.preventDefault();
      console.error("speak error", e);
    };

    // Selected voice
    // const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Loop through voices
    // voices.forEach(voice => {
    //   if (voice.name === selectedVoice) {
    //     speakText.voice = voice;
    //   }
    // });

    // Set pitch and rate
    // speakText.rate = rate.value;
    // speakText.pitch = pitch.value;

    // Speak
    synth.speak(speakText);
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.currentTarget.value);
  }

  function getAudioContext() {
    const context = new AudioContext();
    console.log("context", context);
  }

  return (
    <div className="">
      <h1>WebAudio</h1>
      <div>
        <form onSubmit={speak}>
          <input type="text" onChange={handleTextChange} value={text} />
          <ButtonCustom type="submit">Speak!</ButtonCustom>
        </form>
        <Button onClick={getAudioContext}>Get Audio Context</Button>
        <Button onClick={() => console.log("mantine button")}>
          Mantine Button
        </Button>
      </div>
    </div>
  );
}

export default TextToSpeech;
