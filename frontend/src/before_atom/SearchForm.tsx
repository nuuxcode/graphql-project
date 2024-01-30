import React, { useState, ChangeEvent } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_NOTES } from './queries';
import { Modal, Button } from 'react-bootstrap';

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

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <Button className="mb-3 w-25"  onClick={() => setIsModalOpen(true)}>Search</Button>
          <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Search Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                value={searchString}
                onChange={handleChange}
                placeholder="Search notes"
                className="form-control my-3"
              />
              {isModalOpen && searchString && (() => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error! {error.message}</p>;

                return data?.searchNotes.map((note) => (
                  <div key={note.id} className="card mb-3">
                    <div className="card-body">
                      <h2 className="card-title">{note.title}</h2>
                      <p className="card-text">{note.content}</p>
                    </div>
                  </div>
                ));
              })()}
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
