import { gql } from '@apollo/client';

export const GET_NOTES = gql`
  query {
    notes {
      id
      title
      content
    }
  }
`;

export interface GetNotesResponse {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

export const SEARCH_NOTES = gql`
  query SearchNotes($searchString: String!) {
    searchNotes(searchString: $searchString) {
      id
      title
      content
    }
  }
`;

export interface SearchNotesResponse {
  searchNotes: {
    id: string;
    title: string;
    content: string;
  }[];
}
