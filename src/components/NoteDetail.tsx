import React, { useState, useEffect } from 'react';
import { Note } from '../data/definitions';
import { useAppContext } from '../data/context';
import Markdown from 'markdown-to-jsx';
import { encrypt, decrypt } from '../data/utils';

interface NoteDetailProps {
  note: Note,
  mode: string
}

const NoteListItem: React.FC<NoteDetailProps> = ({ note }) => {
  const [tempNote, setTempNote] = useState({ ...note });
  const [loading, setLoading] = useState(true);

  const context = useAppContext();
  const { dispatch, state } = context;
  const mode = state.mode;

  useEffect(() => {
    setLoading(true);
    const newNote = { ...note };

    if (newNote.text.length === 0) {
      // no decryption for empty notes
      setTempNote(newNote);
      setLoading(false);
      dispatch({ type: 'LOADING_END' });
    } else {
      // decrypt note and update global lading state
      decrypt(newNote.text).then(decryptedText => {
        newNote.text = decryptedText;
        setTempNote(newNote);
        setLoading(false);
        dispatch({ type: 'LOADING_END' });
      });
    }
  }, [note, dispatch]);

  const handleTitleChange = (e: any) => {
    setTempNote({ ...tempNote, title: e.target.value })
  }

  const handleTextChange = (e: any) => {
    setTempNote({ ...tempNote, text: e.target.value })
  }

  const handleSaveAsync = async (note: Note) => {
    dispatch({ type: 'LOADING' });
    note.text = await encrypt(note.text);
    dispatch({ type: 'SAVE', note: note })
  }

  return (
    <div className="note-pane-right">
      <div className={`p-1 ${loading ? 'loading-zone' : ''}`}>
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
        <div className={`controls ${mode === 'edit' && state.loading ? 'loading-zone' : ''}`}>
          {
            mode === 'view'
              ? <button onClick={() => dispatch({ type: 'EDIT' })}>Edit</button>
              : <>
                <button onClick={() => dispatch({ type: 'VIEW' })}>Cancel</button>
                <div>
                  {loading
                    ? <button disabled>Saving...</button>
                    : <button onClick={() => handleSaveAsync(tempNote)}>Save</button>
                  }
                  <button onClick={() => dispatch({ type: 'DELETE', id: tempNote.id })}>Delete this note</button>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  );
}

export default NoteListItem;
