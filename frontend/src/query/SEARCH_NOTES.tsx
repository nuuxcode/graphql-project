import { gql } from '@apollo/client';

export const SEARCH_NOTES = gql`
  query SearchNotes($searchString: String!) {
    searchNotes(searchString: $searchString) {
      id
      title
      content
    }
  }
`;
