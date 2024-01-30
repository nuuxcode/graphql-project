import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTES } from '../../before_atom/queries';
import { DELETE_NOTE } from '../../before_atom/mutations';
import Button from '../atoms/Button';
import Modal from '../atoms/Modal';
import NoteForm from '../molecules/NoteForm';
import NoteComponent from '../molecules/Note';

interface NoteType {
  id?: string;
  title: string;
  content: string;
}
interface Note {
  id?: string;
  title: string;
  content: string;
}
interface GetNotesResponse {
  notes: NoteType[];
}

const NoteList: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<GetNotesResponse>(GET_NOTES);
  const [deleteNote] = useMutation(DELETE_NOTE);
  const [editingNote, setEditingNote] = useState<NoteType | null>(null);

  const handleDelete = async (id: string) => {
    await deleteNote({ variables: { id } });
    refetch();
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><p>Loading...</p></div>;
  if (error) return <div className="d-flex justify-content-center align-items-center text-danger" style={{ height: '100vh' }}><p>Error! {error.message}</p></div>;

  return (
    <div className="container">
      <Button className="mb-3 w-25" onClick={() => setEditingNote({ title: '', content: '' })}>Add Note</Button>
      <Modal
        show={editingNote !== null}
        onHide={() => setEditingNote(null)}
        title={editingNote?.id ? 'Edit Note' : 'Add Note'}
      >
        {editingNote && <NoteForm note={editingNote} refetch={refetch} setEditingNote={setEditingNote} />}
      </Modal>
      <div className="row">
        {data?.notes.map((note) => (
          <div key={note.id} className="col-md-4 mb-4">
            <NoteComponent note={note} onEdit={setEditingNote} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
