import React, { useState } from 'react';
import netFlix from '../images/netflix.jpg';
import { FcGoogle } from 'react-icons/fc';
import { Link, Navigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { useAuth } from '../context/index';

const Signup = () => {
  const { userLoggedIn } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      setErrorMessage('');
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        setIsSigningUp(false);
        return;
      }
      try {
        await doCreateUserWithEmailAndPassword(name, email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningUp(false);
      }
    }
  };

  const onGoogleSignin = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      setErrorMessage('');
      try {
        await doSignInWithGoogle();
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningUp(false);
      }
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
<div className="relative min-h-screen w-screen">
      {/* Background Image */}
      <img
        src={netFlix}
        alt="Netflix Background"
        className="absolute inset-0 object-cover w-full h-full -z-10"
      />

      {/* Signup Form */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Signup</h2>

          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className={`${
                  isSigningUp ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                } text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full`}
                disabled={isSigningUp}
              >
                {isSigningUp ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="text-center mt-4 text-gray-700">
            Already have an account?{' '}
            <Link to="/" className="text-red-600 hover:underline">
              Login
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
            className={`${
              isSigningUp ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
            } flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-400`}
            disabled={isSigningUp}
          >
            <FcGoogle className="mr-2" size={24} />
            {isSigningUp ? 'Signing Up...' : 'Continue with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
