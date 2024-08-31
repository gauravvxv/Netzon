import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchData2, fetchData3, fetchData4 } from '../movies/moviesSlice';
import { IoSearch } from 'react-icons/io5';
import ImageSlider from '../components/ImageSlider';
import { IoIosNotifications } from "react-icons/io";
import { MdLogin } from 'react-icons/md';
import { useTheme } from '../theme/themeContext';
import { quantum } from 'ldrs'
import Search from './Search';
import SearchData from './SearchData';
quantum.register()


const Movies = () => {
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [load, setLoad] = useState(true);

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

  const searchData = useSelector((state) => state.movies.searchData);
  const searchLoading = useSelector((state) => state.movies.searchLoading);
  const searchError = useSelector((state) => state.movies.searchError)

  const currentPage = useSelector((state) => state.movies.currentPage);


  useEffect(() => {
    const time = setTimeout(() => {
      setLoad(false);
      dispatch(fetchData());
      dispatch(fetchData2());
      dispatch(fetchData3());
      dispatch(fetchData4())
    }, 1000)

    return () => clearTimeout(time);

  }, [dispatch]);



  useEffect(() => {
    if (data4 && data4.length > 0) {
      setImages(data4.map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`))
    }

    if (data && data.length > 0) {
      setImages2(data.map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`))
    }
    if (data3 && data3.length > 0) {
      setImages3(data3.map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`))
    }
  }, [data4, data, data3])

  if (load) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <l-quantum
          size="200"
          speed="1.75"
          color="red"
        ></l-quantum>
      </div>
    );
  }

  if ((loading1 || loading2 || loading3 || loading4) && currentPage === 1) {
    return <div>Loading upcoming movies...</div>;
  }

  if (error1 || error2 || error3 || error4) {
    return <div>Error: {error1 || error2 || error3 || error4}</div>;
  }

  const loadNext = () => {
    setTimeout(() => {
      dispatch(fetchData( currentPage + 1));
    }, 1000)
  };

  const loadPrev = () => {
    if (currentPage > 1) {
      setTimeout(() => {
        dispatch(fetchData(currentPage - 1));
      }, 1000)
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
      <Search/>
        <div className="flex items-center space-x-12">
          <a href="#">
            <IoIosNotifications color={darkMode ? 'black' : 'red'} size={40} />
          </a>
          <a href="">
            <MdLogin color={darkMode ? 'black' : 'red'} size={40} />
          </a>
        </div>

      </div>

     

      <div>
        <SearchData searchData={searchData} searchLoading={searchLoading} searchError={searchError}/>
      </div>


      <p className={`text-xl font-bold pl-16 ${darkMode ? 'text-black' : 'text-gray-500'}`}>Best Movies</p>


      <div className=" flex items-center justify-center h-auto pt-6">
        <ImageSlider images={images} />
        <ImageSlider images={images2} />
        <ImageSlider images={images3} />
      </div>




      <MovieSection title="Upcoming Movies" data={data} />

      {/* Pagination for Upcoming Movies */}
      <div className="flex justify-center items-center py-8" style={{ marginTop: '-50px' }}>
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
