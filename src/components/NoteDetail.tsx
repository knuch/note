import React, { useState, useEffect } from 'react';
import { Note } from '../data/definitions';
import { useAppContext } from '../data/context';
import Markdown from 'markdown-to-jsx';
import { encrypt, decrypt } from '../data/utils';

interface NoteDetailProps {
  note: Note,
  mode: string
}

const NoteListItem: React.FC<NoteDetailProps> = ({ note, mode }) => {

  const context = useAppContext();
  const [tempNote, setTempNote] = useState({ ...note });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const tempNode = { ...note };
    decrypt(tempNode.text).then(decryptedText => {
      tempNode.text = decryptedText;
      setTempNote(tempNode);
      setLoading(false);
    });
  }, [note]);

  if (!context) return null;
  const { state, dispatch } = context;

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
      <div className={`controls ${state.loading ? 'loading-zone' : ''}`}>
        {
          mode === 'view'
            ? <button onClick={() => dispatch({ type: 'EDIT' })}>Edit</button>
            : (
              <>
                <button onClick={() => dispatch({ type: 'VIEW' })}>Cancel</button>
                <div>
                  {state.loading
                    ? <button disabled>Saving...</button>
                    : <button onClick={() => handleSaveAsync(tempNote)}>Save</button>
                  }
                  <button onClick={() => dispatch({ type: 'DELETE', id: tempNote.id })}>Delete this note</button>
                </div>
              </>
            )
        }
      </div>
    </div>
  );
}

export default NoteListItem;
