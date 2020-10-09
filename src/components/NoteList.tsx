import React from 'react';
import { Note } from '../data/definitions';
import NoteItem from './NoteItem';

type Props = {
  mode: string;
  currentNote: string | undefined;
  notes: Note[];
}

const NoteList: React.FC<Props> = ({ mode, currentNote, notes }) => {
  return (
    <div className={`note-pane-left ${mode === 'edit' ? 'disabled-zone' : ''}`} >
      {notes.map((note: Note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          isCurrent={currentNote ? currentNote === note.id : false}
        />
      ))}
    </div>
  )
}

export default NoteList;
