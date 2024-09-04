import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fetchData2, fetchData3, fetchData4 } from '../movies/moviesSlice';
import { IoSearch } from 'react-icons/io5';
import ImageSlider from '../components/ImageSlider';
import { IoIosNotifications } from "react-icons/io";
import { MdLogin } from 'react-icons/md';
import { useTheme } from '../theme/themeContext';
import { quantum } from 'ldrs';
import Search from './Search';
import Sidebar from '../components/Sidebar';
import { GiHamburgerMenu } from "react-icons/gi";
import SearchData from './SearchData';
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from '../firebase/auth';
import { HiOutlineLogin } from "react-icons/hi";
import { useAuth } from '../context';
import Navbar from '../components/Navbar';
quantum.register();

const Movies = () => {
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [load, setLoad] = useState(true);
  const { darkMode } = useTheme();
  const dispatch = useDispatch();


  const { currentUser, userLoggedIn } = useAuth();

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
  const searchError = useSelector((state) => state.movies.searchError);
  const hasSearched = useSelector((state)=> state.movies.hasSearched);

  const currentPage = useSelector((state) => state.movies.currentPage);

 

  useEffect(() => {
    const time = setTimeout(() => {
      setLoad(false);
      dispatch(fetchData());
      dispatch(fetchData2());
      dispatch(fetchData3());
      dispatch(fetchData4());
    }, 1000);

    return () => clearTimeout(time);
  }, [dispatch]);

  useEffect(() => {
    if (data4 && data4.length > 0) {
      setImages(data4.map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`));
    }

    if (data && data.length > 0) {
      setImages2(data.map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`));
    }
    if (data3 && data3.length > 0) {
      setImages3(data3.map((movie) => `https://image.tmdb.org/t/p/w500${movie.poster_path}`));
    }
  }, [data4, data, data3]);

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


  if (!userLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-4xl font-semibold text-gray-700 mb-4">
          Please log in to view this page
        </p>
        <Link to={"/"}>
          <HiOutlineLogin size={50} className="text-red-600" />
        </Link>
      </div>
    )

  }

  if ((loading1 || loading2 || loading3 || loading4) && currentPage === 1) {
    return <div>Loading upcoming movies...</div>;
  }

  if (error1 || error2 || error3 || error4) {
    return <div>Error: {error1 || error2 || error3 || error4}</div>;
  }

  const loadNext = () => {
    setTimeout(() => {
      dispatch(fetchData(currentPage + 1));
    }, 1000);
  };

  const loadPrev = () => {
    if (currentPage > 1) {
      setTimeout(() => {
        dispatch(fetchData(currentPage - 1));
      }, 1000);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prevState => !prevState);
  }


  const MovieSection = ({ title, data }) => (
    <>
      <p className={`text-xl font-bold pl-16 pb-6 pt-8 ${darkMode ? 'text-black' : 'text-gray-500'}`}>{title}</p>
      <div className={`grid grid-cols-2  gap-10 pb-10 p-2 ${darkMode ? 'bg-white' : 'bg-black'} lg:grid-cols-4`}>
        {data?.map((e) => (
          <div key={e.id} className="text-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
              alt="posters"
              className="w-full h-60 sm:h-80 md:h-64 lg:h-80  rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            />
            <h3 className={`pt-4 font-semibold text-sm sm:text-base lg:text-lg  ${darkMode ? 'text-black' : 'text-white'}`}>
              Title: {e.title}
            </h3>
            <p className={`font-semibold text-xs sm:text-sm lg:text-base ${darkMode ? 'text-black' : 'text-white'}`}>
              Release Date: {e.release_date}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex">

        {isSidebarVisible && <Sidebar />}

        <div className={`w-full ${darkMode ? 'bg-white' : 'bg-black'} p-4 md:p-8`}>
          {searchData.length > 0 && (
            <p className={`text-xl font-bold pl-16 ${darkMode ? 'text-black' : 'text-gray-500'}`}> Search Results</p>
          )}

          <div>
            <SearchData searchData={searchData} searchLoading={searchLoading} searchError={searchError} hasSearched={hasSearched}  />
          </div>

          <p className={`text-xl font-bold pl-16 pb-6 ${darkMode ? 'text-black' : 'text-gray-500'}`}>Best Movies</p>


          <div className='flex flex-row gap-4 px-4 lg:px-8 '>
            <ImageSlider images={images} />
            <ImageSlider images={images2} />
            <ImageSlider images={images3} />
          </div>

          <MovieSection title="Upcoming Movies" data={data} />


          <div className="flex justify-center items-center py-8 mt-[-50px]">
            {currentPage > 1 && (
              <button
                onClick={loadPrev}
                disabled={loading1}
                className={`w-28 h-10 sm:w-36 sm:h-12 lg:w-40 lg:h-12 mx-2 rounded-lg ${darkMode ? 'bg-gray-400 text-black' : 'bg-red-600 text-white'} hover:bg-gray-300 cursor-pointer text-sm sm:text-base lg:text-lg`}
              >
                {loading1 ? 'Loading...' : 'Previous'}
              </button>
            )}
            <button
              onClick={loadNext}
              disabled={loading1}
              className={`w-28 h-10 sm:w-36 sm:h-12 lg:w-40 lg:h-12 mx-2 rounded-lg ${darkMode ? 'bg-gray-400 text-black' : 'bg-red-600 text-white'} hover:bg-gray-300 cursor-pointer text-sm sm:text-base lg:text-lg`}
            >
              {loading1 ? 'Loading...' : 'Next'}
            </button>
          </div>

          <MovieSection title="Popular Movies" data={data2} />

          <MovieSection title="Top Rated Movies" data={data3} />
        </div>
      </div>
    </>
  );
};

export default Movies;
