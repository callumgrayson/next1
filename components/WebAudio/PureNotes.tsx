import { Button, Group } from "@mantine/core";
import React from "react";
import usePureNote from "./usePureNote";

interface Note {
  freq: number;
  noteName: string;
  noteOrder?: number;
}

const notes = [
  { freq: 261.63, noteName: "C", noteOrder: 4 },
  { freq: 293.66, noteName: "D", noteOrder: 4 },
  { freq: 329.63, noteName: "E", noteOrder: 4 },
  { freq: 349.23, noteName: "F", noteOrder: 4 },
  { freq: 392.0, noteName: "G", noteOrder: 4 },
  { freq: 440.0, noteName: "A", noteOrder: 4 },
  { freq: 493.88, noteName: "B", noteOrder: 4 },
  { freq: 523.25, noteName: "C", noteOrder: 5 },
  { freq: 587.33, noteName: "D", noteOrder: 5 },
  { freq: 659.25, noteName: "E", noteOrder: 5 },
  { freq: 698.46, noteName: "F", noteOrder: 5 },
  { freq: 783.99, noteName: "G", noteOrder: 5 },
  { freq: 880.0, noteName: "A", noteOrder: 5 },
  { freq: 987.77, noteName: "B", noteOrder: 5 },
  { freq: 1046.5, noteName: "C", noteOrder: 5 },
];

function PureNotes() {
  const { isPlaying, frequency, setAudio } = usePureNote();

  return (
    <div className="p-3">
      <h5>Pure Notes</h5>

      <Group>
        {notes.map((note) => {
          return (
            <Button
              key={note.freq}
              variant={
                note.freq === frequency && isPlaying ? "filled" : "outline"
              }
              onClick={() => setAudio(note)}
            >
              {note.noteName}
              <sub>{note.noteOrder}</sub>
            </Button>
          );
        })}
      </Group>
    </div>
  );
}

export default PureNotes;
