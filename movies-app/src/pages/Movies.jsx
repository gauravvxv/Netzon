import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchData2, fetchData3, fetchData4 } from '../movies/moviesSlice';
import { IoSearch } from 'react-icons/io5';
import ImageSlider from '../components/ImageSlider';
import { IoIosNotifications } from "react-icons/io";
import { MdLogin } from 'react-icons/md';
import { useTheme } from '../theme/themeContext';

const Movies = () => {
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);

  const { darkMode } = useTheme();
  const dispatch = useDispatch();

  const loading1 = useSelector((state) => state.movies.loading1);
  const loading2 = useSelector((state) => state.movies.loading2);
  const loading3 = useSelector((state) => state.movies.loading3);
  const loading4 = useSelector((state) => state.movies.loading4);


  const data = useSelector((state) => state.movies.data);
  const data2 = useSelector((state) => state.movies.data2);
  const data3 = useSelector((state) => state.movies.data3);
  const data4 = useSelector((state) => state.movies.data4);

  const error1 = useSelector((state) => state.movies.error1);
  const error2 = useSelector((state) => state.movies.error2);
  const error3 = useSelector((state) => state.movies.error3);
  const error4 = useSelector((state) => state.movies.error4);


  const currentPage = useSelector((state) => state.movies.currentPage);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchData2());
    dispatch(fetchData3());
    dispatch(fetchData4())
  }, [dispatch]);


  useEffect(() => {
    if (data4 && data4.length > 0) {
      setImages(data4.map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`))
    }
  }, [data4])

 

  if ((loading1 || loading2 || loading3 || loading4) && currentPage === 1) {
    return <div>Loading upcoming movies...</div>;
  }

  if (error1 || error2 || error3 || error4) {
    return <div>Error: {error1 || error2 || error3 || error4}</div>;
  }

  const loadNext = () => {
    dispatch(fetchData(currentPage + 1));
  };

  const loadPrev = () => {
    if (currentPage > 1) {
      dispatch(fetchData(currentPage - 1));
    }
  };

  const MovieSection = ({ title, data }) => (
    <>
      <p className={`text-xl font-bold pl-16 pt-8 ${darkMode ? 'text-black' : 'text-gray-500'}`}>{title}</p>
      <div className={`grid grid-cols-4 gap-4 p-8 ${darkMode ? 'bg-white' : 'bg-black'}`}>
        {data?.map((e) => (
          <div key={e.id} className="text-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
              alt="posters"
              className="w-96 h-3/4 object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            />
            <h3 className={`pt-4 font-semibold ${darkMode ? 'text-black' : 'text-white'}`}>
              Title: {e.title}
            </h3>
            <p className={`font-semibold ${darkMode ? 'text-black' : 'text-white'}`}>
              Release Date: {e.release_date}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className={`flex justify-center p-8 items-center ${darkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'}`}>
        <div className="flex-1 flex justify-center">
          <form className="flex w-90 h-11 text-center bg-white rounded-xl border-2">
            <input
              type="text"
              placeholder="search..."
              className="w-96 h-10 text-center rounded-lg focus:outline-none focus:ring-0"
            />
            <button type="submit" className="bg-white rounded-xl">
              <IoSearch size={30} color={darkMode ? 'black' : 'black'} />
            </button>
          </form>
        </div>
        <div className="flex items-center space-x-12">
          <a href="#">
            <IoIosNotifications color={darkMode ? 'black' : 'red'} size={40} />
          </a>
          <MdLogin color={darkMode ? 'black' : 'red'} size={40} />
        </div>

      </div>

      <p className={`text-xl font-bold pl-16 pt-8 ${darkMode ? 'text-black' : 'text-gray-500'}`}>Best Movies</p>

      
      <div className=" flex items-center justify-center w-6/6 h-auto pt-6">
        <ImageSlider images={images} />
      </div>
      

    

      <MovieSection title="Upcoming Movies" data={data} />

      {/* Pagination for Upcoming Movies */}
      <div className="flex justify-center items-center py-8" style={{ marginTop: '-100px' }}>
        {currentPage > 1 && (
          <button
            onClick={loadPrev}
            disabled={loading1}
            className={`w-40 h-12 mx-2 rounded-lg ${darkMode ? 'bg-gray-400 text-black' : 'bg-red-600 text-white'} hover:bg-gray-300 cursor-pointer`}
          >
            {loading1 ? 'Loading...' : 'Previous'}
          </button>
        )}
        <button
          onClick={loadNext}
          disabled={loading1}
          className={`w-40 h-12 mx-2 rounded-lg ${darkMode ? 'bg-gray-400 text-black' : 'bg-red-600 text-white'} hover:bg-gray-300 cursor-pointer`}
        >
          {loading1 ? 'Loading...' : 'Next'}
        </button>
      </div>

      <MovieSection title="Popular Movies" data={data2} />

      <MovieSection title="Top Rated Movies" data={data3} />



    </>
  );
};

export default Movies;
