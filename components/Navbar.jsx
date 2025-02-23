'use client';
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';
import { FaSolarPanel, FaLeaf } from 'react-icons/fa';

export default function Navbar({ issignedin }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <div className="bg-gradient-to-r from-green-50 via-blue-50 to-green-50 shadow-md">
        <div className="navbar justify-between px-6 md:px-12 max-w-7xl mx-auto">
          <a href='/' className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
            <Image src={'/rewatt_logo.png'} height={150} width={150} alt='ReWatt Logo' />
          </a>
          
          <button onClick={() => setIsVisible(!isVisible)} className='md:hidden'>
            <Image src={'/hamburger.svg'} alt='Menu' height={30} width={30} />
          </button>
          
          <div className='hidden md:flex items-center space-x-4'>
            <a href="/purchase" className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'>Buy Energy</a>
            <a href="/sell" className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'>Sell Energy</a>
            <a href="/forum" className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'>Forum</a>
            {issignedin ? (
              <a href='/dashboard' className='px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity'>
                Dashboard
              </a>
            ) : (
              <a href='/register' className='px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity'>
                Register/Login
              </a>
            )}
          </div>
        </div>
      </div>

      {isVisible && (
        <div className='absolute w-full bg-white shadow-lg md:hidden z-10 transition-all duration-300 ease-in-out'>
          <div className='flex flex-col space-y-2 p-4'>
            <a href="/purchase" className='px-4 py-3 text-gray-600 hover:bg-green-50 rounded-lg transition-colors'>
              Buy Energy
            </a>
            <a href="/sell" className='px-4 py-3 text-gray-600 hover:bg-green-50 rounded-lg transition-colors'>
              Sell Energy
            </a>
            <a href="/forum" className='px-4 py-3 text-gray-600 hover:bg-green-50 rounded-lg transition-colors'>
              Forum
            </a>
            {issignedin ? (
              <a href='/dashboard' className='px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity'>
                Dashboard
              </a>
            ) : (
              <a href='/register' className='px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity'>
                Register/Login
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

