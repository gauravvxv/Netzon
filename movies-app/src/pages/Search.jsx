import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useTheme } from '../theme/themeContext';
import { useDispatch } from 'react-redux';
import { fetchSearchData } from '../movies/moviesSlice';

const Search = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const { darkMode } = useTheme();

    const handlesearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(fetchSearchData(query));
      
        }
    };

    return (
        <div className="flex-1 flex justify-center">
            <form 
                className="flex items-center w-96 max-w-lg h-11 bg-white rounded-xl border-2 border-gray-300"
                onSubmit={handlesearch}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full h-10 text-center rounded-l-xl focus:outline-none focus:ring-0 ${darkMode ? 'bg-white  text-black' : 'bg-white text-black'}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className={`flex items-center justify-center  rounded-r-xl p-2 ${darkMode ? 'text-white' : 'text-white'} focus:outline-none`}
                >
                   <IoSearch size={30} color={darkMode ? 'black' : 'black'} />
                </button>
            </form>
        </div>
    );
};

export default Search;
