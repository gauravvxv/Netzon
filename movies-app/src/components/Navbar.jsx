import React from 'react'
import { useState } from 'react';
import { BiSolidCameraMovie } from "react-icons/bi";
import { CiHome } from "react-icons/ci";
import { TbBuildingCommunity } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { TfiTimer } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaRegDotCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import Movies from '../pages/Movies';
import { useTheme } from '../theme/themeContext';
const Navbar = () => {

const {darkMode,toggleDarkMode} = useTheme()
  const menuLinks = [
    {
      icon: <CiHome size={24} />,
      name: "Home"
    },
    {
      icon: <TbBuildingCommunity size={24} />,
      name: "Community"
    },
    {
      icon: <FaRegCompass size={24} />,
      name: "Discovery"
    },
    {
      icon: <TfiTimer size={24} />,
      name: "Coming soon"
    },
  ]

  const socialLinks = [
    {
      icon: <CiUser size={24} />,
      name: "Profile"
    },
    {
      icon: <LiaUserFriendsSolid size={24} />,
      name: "friends"
    },
    {
      icon: < FaRegDotCircle size={24} />,
      name: "Social"
    }
  ]

  const generalLinks = [
    {
      icon: <CiSettings size={24} />,
      name: "Setting"
    },
    {
      icon: <CiLogout size={24} />,
      name: "Logout"
    },
  ]

  return (
    <div className='flex h-full'>
      <div className={`w-1/6 p-4 pr-5 pt-4 overflow-auto pb-8 ${darkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'}`}>
        <div className='pb-4 py-6'>
          <a href="#" className={`flex items-center gap-1 px-4  border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <BiSolidCameraMovie size={28} className={darkMode ? 'text-black' : 'text-white'} />
            <span className={`text-sm tracking-wider font-semibold ${darkMode ? 'text-black' : 'text-white'}`}>NETON <span className='text-red-700'>.</span></span>
          </a>

        </div>
        {/* MENU part */}

        <p className='text-gray-500 px-2 py-4 font-bold'>MENU</p>

        <ul className='flex flex-col border-b-1 border-gray-700'>
          {menuLinks.map(({ icon, name }) => {
            return (
              <li key={name} className={`py-4 hover:bg-zinc-300 rounded-xl`}>
                <a href="#" className={`flex items-center gap-2 ${darkMode ? 'text-red-600' : 'text-red-600'}`}>{icon}
                  <span className={`text-sm tracking-wider ${darkMode ? 'text-black' : 'text-white'}`}>{name}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <p className='text-gray-500 px-2 py-4 font-bold'>SOCIAL</p>

        <ul className='flex flex-col border-b-1 border-gray-700'>
          {socialLinks.map(({ icon, name }) => {
            return (
              <li key={name} className={`py-4 hover:bg-zinc-300 rounded-xl`}>
                <a href="#" className={`flex items-center gap-2 ${darkMode ? 'text-red-600' : 'text-red-600'}`}>{icon}
                  <span className={`text-sm tracking-wider ${darkMode ? 'text-black' : 'text-white'}`}>{name}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <p className='text-gray-500 px-2 py-4 font-bold'>GENERAL</p>

        <ul className='flex flex-col border-b-1 border-gray-700'>
          {generalLinks.map(({ icon, name }) => {
            return (
              <li key={name} className={`py-4 hover:bg-zinc-300 rounded-xl`}>
                <a href="#" className={`flex items-center gap-2 ${darkMode ? 'text-red-600' : 'text-red-600'}`}>{icon}
                  <span className={`text-sm tracking-wider ${darkMode ? 'text-black' : 'text-white'}`}>{name}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <ul>
          <li className={`py-4`}>
            <div className='flex items-center gap-2'>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="sr-only" />
                <div className={`w-11 h-6 bg-gray-200 rounded-full ${darkMode ? 'dark:bg-gray-700' : ''} relative`}>
                  <span className={`absolute top-0 left-0 h-6 w-6 rounded-full transition-transform ${darkMode ? 'bg-black translate-x-full' : 'bg-white'}`}></span>
                </div>
                <span className={`mr-2 px-3 ${darkMode ? 'text-black' : 'text-white'}`}>{darkMode ? 'Dark' : 'Light'}</span>
              </label>
            </div>
          </li>
        </ul>

      </div>
      <div className={`flex-1 ${darkMode ? "bg-white" : "bg-black"}`}>
        <Movies />
      </div>

    </div>
  )
}

export default Navbar
