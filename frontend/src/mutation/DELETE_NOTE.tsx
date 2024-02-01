import { gql } from '@apollo/client';

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: Int!) {
    deleteNote(id: $id) {
      id
    }
  }
`;
