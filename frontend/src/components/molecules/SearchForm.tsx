import React, { useState, ChangeEvent } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_NOTES } from '../../query/SEARCH_NOTES';
import Button from '../atoms/Button';
import Modal from '../atoms/Modal';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface SearchNotesResponse {
  searchNotes: Note[];
}

const SearchForm: React.FC = () => {
  const [searchString, setSearchString] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [executeSearch, { loading, error, data }] = useLazyQuery<SearchNotesResponse>(SEARCH_NOTES);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    executeSearch({ variables: { searchString: event.target.value } });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button className="mb-3 w-25" onClick={handleOpenModal}>Search</Button>
      <Modal show={isModalOpen} onHide={handleCloseModal} title="Search Results">
        <input
          type="text"
          value={searchString}
          onChange={handleChange}
          placeholder="Search notes"
          className="form-control my-3"
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error :(</p>}
        {data?.searchNotes.map((note) => (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default SearchForm;
