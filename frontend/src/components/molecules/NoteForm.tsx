import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NOTE, UPDATE_NOTE } from '../../before_atom/mutations';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

interface Note {
  id?: string;
  title: string;
  content: string;
}

interface NoteFormProps {
  note: Note;
  refetch: () => void;
  setEditingNote: (note: Note | null) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, refetch, setEditingNote }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [addNote] = useMutation(ADD_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (note.id) {
      await updateNote({ variables: { id: note.id, title, content } });
    } else {
      await addNote({ variables: { title, content } });
    }

    refetch();
    setEditingNote(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
      />
      <Input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Content"
      />
      <Button type="submit">{note.id ? 'Update' : 'Add'}</Button>
    </form>
  );
};

export default NoteForm;
