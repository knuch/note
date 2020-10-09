import React from 'react';
import { useAppContext } from '../data/context';

interface NoteListItemProps {
  id: string
  title: string;
  isCurrent: boolean;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ id, title, isCurrent }) => {

  const context = useAppContext();
  if (!context) return null;
  const { state, dispatch } = context;

  const handleSelectNote = (id: string, dispatch: any) => {
    dispatch({ type: 'SELECT', id: id });
  }

  return (
    <>
      { state.mode === 'view' &&
        <div
          className={`note-select active ${isCurrent ? ' note-current' : ''}`}
          onClick={() => handleSelectNote(id, dispatch)}
        >
          {`${title}`}
        </div>
      }
      { state.mode === 'edit' &&
        <div
          className={`note-select disabled ${isCurrent ? ' note-current' : ''}`}
        >
          {`${title}`}
        </div>
      }
    </>
  );
}

export default NoteListItem;
