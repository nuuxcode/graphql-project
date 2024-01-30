import { gql } from '@apollo/client';

export const SEARCH_NOTES = gql`
  query SearchNotes($searchTerm: String!) {
    searchNotes(searchTerm: $searchTerm) {
      id
      title
      content
    }
  }
`;
