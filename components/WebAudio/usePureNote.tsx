/**
 * https://mdn.github.io/webaudio-examples/violent-theremin/
 * https://github.com/mdn/webaudio-examples/blob/master/violent-theremin/scripts/app.js
 * https://pages.mtu.edu/~suits/notefreqs.html
 * https://github.com/samuelsit/react-frequency/blob/main/src/hooks/useFrequency/useFrequency.ts
 * https://github.com/GoogleChromeLabs/web-audio-samples/
 * https://github.com/mdn/webaudio-examples/blob/master/step-sequencer/index.html
 * https://webaudio.github.io/web-audio-api/#dom-baseaudiocontext-createperiodicwave
 */

import React, { useEffect, useRef, useState } from "react";

interface Note {
  freq: number;
  noteName: string;
  noteOrder?: number;
}

function usePureNote() {
  const [playing, setPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440);
  const [waveform, setWaveform] = useState<"sine" | "square">("sine");
  const audioContextRef = useRef<AudioContext>();
  const oscillatorRef = useRef<OscillatorNode>();

  useEffect(() => {
    // Initiate
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();

    ctx.suspend();

    audioContextRef.current = ctx;
    oscillatorRef.current = osc;

    return () => {
      // Clean up resources
      osc.disconnect(ctx.destination);
      ctx.close();
    };
  }, []);

  function toggle() {
    if (!audioContextRef.current || !oscillatorRef.current) return;

    if (playing) {
      audioContextRef.current.suspend();
    } else {
      audioContextRef.current.resume();
    }

    setPlaying((play) => !play);
  }

  function setAudio(note: Note) {
    if (!audioContextRef.current || !oscillatorRef.current) return;

    if (note.freq === frequency) {
      toggle();
    } else {
      oscillatorRef.current.frequency.setValueAtTime(
        note.freq,
        audioContextRef.current.currentTime
      );
      audioContextRef.current.resume();
      setFrequency(note.freq);
      setPlaying(true);
    }
  }

  return {
    isPlaying: playing,
    frequency,
    waveform,
    togglePlay: toggle,
    setAudio,
  };
}

export default usePureNote;
