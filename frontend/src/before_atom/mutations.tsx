import { gql } from '@apollo/client';

export const ADD_NOTE = gql`
  mutation AddNote($title: String!, $content: String!) {
    addNote(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export interface AddNoteResponse {
  addNote: {
    id: string;
    title: string;
    content: string;
  };
}

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: Int!, $title: String!, $content: String!) {
    updateNote(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export interface UpdateNoteResponse {
  updateNote: {
    id: string;
    title: string;
    content: string;
  };
}

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export interface DeleteNoteResponse {
  deleteNote: {
    id: string;
  };
}
