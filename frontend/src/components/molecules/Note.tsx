import Button from '../atoms/Button';

interface Note {
  id?: string;
  title: string;
  content: string;
}

interface NoteProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const Note: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => (
  <div className="card">
    <div className="card-body">
      <h2 className="card-title">{note.title}</h2>
      <p className="card-text">{note.content}</p>
      <Button onClick={() => onEdit(note)}>Edit</Button>
      <Button onClick={() => note.id && onDelete(note.id)}  className="btn btn-danger">Delete</Button>
    </div>
  </div>
);

export default Note;
