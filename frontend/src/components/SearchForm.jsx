import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { moviesAPI } from '../services/api';

function SearchForm({ setMovies, setIsSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const [isFormHovered, setIsFormHovered] = useState(false);

    useEffect(() => {
        if (searchValue.trim() === '') {
            setMovies([]);
            setIsSearch(false);
            return;
        }

        const fetchMovies = async () => {
            try {
                const response = await moviesAPI.search(searchValue);
                setMovies(response.data || []);
                setIsSearch(true);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
                setIsSearch(true);
            }
        };

        const timeoutId = setTimeout(fetchMovies, 500);

        return () => clearTimeout(timeoutId);
    }, [searchValue, setMovies, setIsSearch]);


    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };


    return (
        <>
            {/* <h1>Search Movies</h1> */}
            <Form
                className="d-flex"
                id="form_button"
                onMouseOver={() => setIsFormHovered(true)}
                onMouseOut={() => setIsFormHovered(false)}
            // onSubmit={handleSearchSubmit} // Handle form submission
            >
                <Form.Control
                    id="form_search"
                    style={{ display: isFormHovered ? 'block' : 'none' }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchValue}
                    onChange={handleChange}
                />

                <Button
                    id="button"
                    style={{ outline: 'none', border: 'none' }}
                    variant="outline-light"
                    type="button"
                >
                    <i className="bi bi-search"></i>
                </Button>
            </Form>
        </>
    );
}

export default SearchForm;

