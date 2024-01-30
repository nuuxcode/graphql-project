import React, { useState, useEffect, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_NOTE, UPDATE_NOTE } from './mutations';

interface Note {
  id?: string;
  title: string;
  content: string;
}

interface NoteFormProps {
  note?: Note;
  refetch: () => void;
  setEditingNote: (note: Note | null) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, refetch, setEditingNote }) => {
  const [title, setTitle] = useState(note?.id ? note.title : '');
  const [content, setContent] = useState(note?.id ? note.content : '');

  const [addNote] = useMutation(ADD_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);

  useEffect(() => {
    setTitle(note?.id ? note.title : '');
    setContent(note?.id ? note.content : '');
  }, [note]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (note?.id) {
      await updateNote({ variables: { id: note.id, title, content } });
    } else {
      await addNote({ variables: { title, content } });
    }

    refetch();
    setEditingNote(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">{note?.id ? 'Update' : 'Add'} Note</button>
    </form>
  );
}

export default NoteForm;
