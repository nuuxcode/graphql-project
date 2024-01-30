import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTES, GetNotesResponse } from './queries';
import { DELETE_NOTE } from './mutations';
import NoteForm from './NoteForm';
import { Modal, Button } from 'react-bootstrap';

interface Note {
  id?: string;
  title: string;
  content: string;
}

const NoteList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<GetNotesResponse>(GET_NOTES);
  const [deleteNote] = useMutation(DELETE_NOTE);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleDelete = async (id: string) => {
    await deleteNote({ variables: { id } });
    refetch();
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><p>Loading...</p></div>;
  if (error) return <div className="d-flex justify-content-center align-items-center text-danger" style={{ height: '100vh' }}><p>Error! {error.message}</p></div>;

  return (
    <div className="container">
      <Button className="mb-3 w-25" onClick={() => setEditingNote({ title: '', content: '' })}>Add Note</Button>
      <Modal show={editingNote !== null} onHide={() => setEditingNote(null)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingNote?.id ? 'Edit Note' : 'Add Note'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingNote && <NoteForm note={editingNote} refetch={refetch} setEditingNote={setEditingNote}/>}
        </Modal.Body>
      </Modal>
      <div className="row">
        {data?.notes.map((note) => (
          <div key={note.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{note.title}</h2>
                <p className="card-text">{note.content}</p>
                <button className="btn btn-primary" onClick={() => setEditingNote(note)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;
