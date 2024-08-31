import React from 'react'
import { IoSearch } from 'react-icons/io5';
import { useTheme } from '../theme/themeContext';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchData } from '../movies/moviesSlice';
const Search = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();


    const handlesearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(fetchSearchData(query));
        }
    }
  
    const { darkMode } = useTheme();
    return (
        <div className="flex-1 flex justify-center">
            <form className="flex w-90 h-11 text-center bg-white rounded-xl border-2" onSubmit={handlesearch}>
                <input
                    type="text"
                    placeholder="search..."
                    className="w-96 h-10 text-center rounded-lg focus:outline-none focus:ring-0"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}

                />
                <button type="submit" className="bg-white rounded-xl">
                    <IoSearch size={30} color={darkMode ? 'black' : 'black'} />
                </button>
            </form>

          


          
        </div>

    )
}

export default Search
