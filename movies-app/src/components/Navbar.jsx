import React from 'react'
import { useEffect, useState } from 'react';
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { MdLogin } from 'react-icons/md';
import { useTheme } from '../theme/themeContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from '../firebase/auth';
import { HiOutlineLogin } from "react-icons/hi";
import { useAuth } from '../context';
import Search from '../pages/Search';
import {
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogContent,
    Button
} from '@chakra-ui/react';

const Navbar = ({ toggleSidebar }) => {
    const { darkMode } = useTheme();
    const { currentUser, userLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate("/")
            console.log("logout");

        } catch (error) {
            console.log("Logout Error", error)
        }
    }
    return (
        <div className={`w-full ${darkMode ? 'bg-white' : 'bg-black'} shadow-md`}>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4 space-y-4 md:space-y-0">

                <a href="/" className="flex items-center gap-1 border-b-2 px-4 md:px-0 md:border-0">
                    <BiSolidCameraMovie size={28} className={darkMode ? 'text-black' : 'text-white'} />
                    <span className={`text-lg tracking-wider font-semibold ${darkMode ? 'text-black' : 'text-white'}`}>
                        NETON<span className="text-red-700">.</span>
                    </span>
                </a>

                <div className='cursor-pointer' onClick={toggleSidebar}>
                    <GiHamburgerMenu color={darkMode ? 'black' : 'red'} size={30} />
                </div>


                <div className="w-full md:w-auto">
                    <Search />
                </div>


                <div className="flex items-center space-x-4 md:space-x-12">
                    <p className={`text-sm font-bold ${darkMode ? 'text-black' : 'text-red-600'}`}>
                        {currentUser.displayName || 'User'}
                    </p>



                    <MdLogin
                        color={darkMode ? 'black' : 'red'}
                        className="cursor-pointer"
                        size={30}
                        onClick={onOpen}
                        aria-label="Logout"
                    />
                </div>
            </div>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay
                    backdropFilter="blur(10px)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <AlertDialogContent
                        bg={darkMode ? 'black' : 'white'}
                        color={darkMode ? 'white' : 'gray'}
                        borderRadius="lg"
                        boxShadow="xl"
                        padding={22}
                        maxWidth="sm"
                    >
                        <AlertDialogHeader
                            fontSize="xl"
                            fontWeight="bold"
                            borderBottomWidth="1px"
                            display="flex"
                            justifyContent="center"
                            padding={12}
                        >
                            Logout Confirmation
                        </AlertDialogHeader>

                        <AlertDialogBody
                            fontSize="md"
                            mb={4}
                            display="flex"
                            justifyContent="center"
                            padding={12}
                        >
                            Are you sure you want to logout? You will be redirected to the login page.
                        </AlertDialogBody>

                        <AlertDialogFooter
                            display="flex"
                            justifyContent="center"
                            gap={4}
                        >
                            <Button
                                bg="blue"
                                ref={cancelRef}
                                borderRadius={10}
                                color="white"
                                onClick={onClose}
                                padding={12}
                            >
                                Cancel
                            </Button>

                            <Button
                                bg="red"
                               color="white"
                                size="md"
                                borderRadius={10}
                                onClick={handleLogout}
                                padding={12}
                            >

                                Logout
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </div>
    )
}

export default Navbar
