import React from 'react';
import NoteItem from './components/NoteItem';
import NoteDetail from './components/NoteDetail';
import './styles/App.css';
import { useAppContext } from './data/context';
import { Note } from './data/definitions'

const App: React.FC = () => {
  const context = useAppContext();
  if (!context) return null;

  const { state, dispatch } = context;

  const newNote = () => {
    dispatch({ type: 'NEW' });
  }

  return (
    <>
      <div className="note-head">
        {state.mode === 'view' && <button onClick={newNote} >+ New note</button>}
        {state.mode === 'edit' && <button disabled >+ New note</button>}
      </div>
      <div className="note-columns">
        {/* Left pane: Note List */}
        <div className="note-pane-left">
          {state.notes.map((note: Note) => (
            <NoteItem
              id={note.id}
              title={note.title}
              isCurrent={state.currentNote ? state.currentNote.id === note.id : false}
            />
          ))}
        </div>

        {/* Left pane: Note detail */}
        <div className="note-pane-right">
          {
            state.currentNote && <NoteDetail
              note={state.currentNote}
              mode={state.mode}
            />
          }

        </div>
      </div>
    </>
  );
}

export default App;
