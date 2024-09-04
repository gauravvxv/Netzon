import React, { useState } from 'react';
import netFlix from '../images/netflix.jpg';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../context/index';
import { useToast } from '@chakra-ui/react';

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignin = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSignInWithGoogle();
        
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/movies" replace={true} />;
  }
  
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">

      <img
        src={netFlix}
        alt="Netflix Background"
        className="h-full w-full object-cover absolute inset-0 -z-10"
      />


      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`${isSigningIn ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                  } text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full`}
                disabled={isSigningIn}
              >
                {isSigningIn ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="text-center mt-4 text-gray-700">
            Don't have an account?{' '}
            <Link to="/signup" className="text-red-600 hover:underline">
              Signup
            </Link>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            type="button"
            onClick={onGoogleSignin}
            className={`${isSigningIn ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
              } flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400`}
            disabled={isSigningIn}
          >
            <FcGoogle className="mr-2" size={24} />
            {isSigningIn ? 'Signing In...' : 'Continue with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
