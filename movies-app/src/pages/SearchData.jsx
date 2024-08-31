import React from 'react'
import { useTheme } from '../theme/themeContext';

const SearchData = ({searchData , searchLoading , searchError}) => {

    const { darkMode } = useTheme();


    if(searchLoading) return <>Loading....</>
    if(searchError) return <> </>


  return (
  
        <div className="grid grid-cols-4 gap-4 p-8">
                {searchData?.map((movie) => (
                    <div key={movie.id} className="text-center">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt="poster"
                            className="w-96 h-3/4 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        />
                    <h3 className={`pt-4 font-semibold ${darkMode ? 'text-black' : 'text-white'}`}>
              Title: {movie.title}
            </h3>
            <p className={`font-semibold ${darkMode ? 'text-black' : 'text-white'}`}>
              Release Date: {movie.release_date}
            </p>
                    </div>
                ))}
    </div>
  )
}

export default SearchData
