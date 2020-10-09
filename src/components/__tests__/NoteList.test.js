import React from 'react';
import NoteList from '../NoteList';
import { mount } from 'enzyme';

// example of a snapshot-based component test
it('NoteList renders correctly', () => {
  const notes = [
    {
      title: 'My first note',
      id: 'ID-1',
      text: '#Markdown text'
    },
    {
      title: 'My second note',
      id: 'ID-2',
      text: '#Markdown text'
    },
    {
      title: 'My third note',
      id: 'ID-3',
      text: '#Markdown text'
    }
  ];
  const tree = mount(
    <NoteList
      mode='view'
      notes={notes}
      currentNode={undefined}
    />
  );
  expect(tree).toMatchSnapshot();
});
