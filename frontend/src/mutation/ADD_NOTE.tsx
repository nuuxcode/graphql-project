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
