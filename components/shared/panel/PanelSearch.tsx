import React, { useState } from 'react';
import Router from 'next/router';
import { Box } from '@chakra-ui/react';

const PanelSearch = () => {
    const [keyword, setKeyword] = useState('');

    function handleSubmit(e:any) {
        e.preventDefault();
        if (keyword !== '') {
            Router.push(`/search?keyword=${keyword}`);
        }
    }

    return (
        <Box p={3} className="ps-panel__search-results">
            <form
                className="ps-form--search-mobile"
                action="/"
                method="get"
                onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group--nest">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Хайх..."
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button>
                        <i className="icon-magnifier"></i>
                    </button>
                </div>
            </form>
        </Box>
    );
};

export default PanelSearch;
