import React from 'react';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import './styles/App.css';
import { useAppContext } from './data/context';

const App: React.FC = () => {
  const context = useAppContext();
  if (!context) return null;

  const { state, dispatch } = context;

  const newNote = () => {
    dispatch({ type: 'NEW' });
  }

  return (
    <>
      <div className={`note-head ${state.mode === 'edit' ? 'disabled-zone' : ''}`}>
        <button onClick={newNote} >+ New note</button>
      </div>
      <div className="note-columns">
        {/* Left pane: Note List */}
        <NoteList
          mode={state.mode}
          notes={state.notes}
          currentNote={state.currentNote?.id}
        />

        {/* Left pane: Note detail */}
        {
          state.currentNote && <NoteDetail
            note={state.currentNote}
            mode={state.mode}
          />
        }
      </div>
    </>
  );
}

export default App;
