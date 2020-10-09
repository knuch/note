import React, { useState, useEffect } from 'react';
import { Note } from '../data/definitions';
import { useAppContext } from '../data/context';
import Markdown from 'markdown-to-jsx';

interface NoteDetailProps {
  note: Note,
  mode: string
}

const NoteListItem: React.FC<NoteDetailProps> = ({ note, mode }) => {

  const context = useAppContext();
  const [tempNote, setTempNote] = useState({ ...note });

  useEffect(() => {
    setTempNote({ ...note })
  }, [note]);

  if (!context) return null;

  const handleTitleChange = (e: any) => {
    setTempNote({ ...tempNote, title: e.target.value })
  }

  const handleTextChange = (e: any) => {
    setTempNote({ ...tempNote, text: e.target.value })
  }

  return (
    <>
      <div className="head">
        {mode === 'view' && <div>{tempNote.title}</div>}
        {mode === 'edit' && (
          <input type="text" value={tempNote.title} onChange={handleTitleChange} />
        )}

      </div>
      <div className="content">
        {mode === 'view' && <Markdown className="markdown">{tempNote.text}</Markdown>}
        {mode === 'edit' && (
          <textarea value={tempNote.text} onChange={handleTextChange} />
        )}

      </div>
      <div className="controls">
        {
          mode === 'view'
            ? <button onClick={() => context.dispatch({ type: 'EDIT' })}>📝 Edit</button>
            : (
              <>
                <button onClick={() => context.dispatch({ type: 'VIEW' })}>🙅‍♂️ Cancel</button>
                <button onClick={() => context.dispatch({ type: 'SAVE', note: tempNote })}>💾 Save</button>
                <button onClick={() => context.dispatch({ type: 'DELETE', id: tempNote.id })}>🗑 Delete</button>
              </>
            )
        }
      </div>
    </>
  );
}

export default NoteListItem;
