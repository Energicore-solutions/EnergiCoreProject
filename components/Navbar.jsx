'use client';
import React from 'react'
import { useState } from 'react';
import Image from 'next/image';

export default function Navbar({ issignedin }) {

  const [isVisible, setIsVisible] = useState(false)

  return (
      <div>
          <div className="navbar bg-base-300 justify-between px-6 md:px-12">
              <a href='/' className="btn btn-ghost text-2xl">ReWatt</a>
              <button onClick={() => setIsVisible(!isVisible)} className=' md:hidden'>
                  <Image src={'/hamburger.svg'} alt='Hamburger-menu-icon' height={30} width={30} ></Image>
              </button>
              <div className='hidden md:flex mr-14'>
                  <a href="/menu" className='btn btn-ghost text-lg'>Page1</a>
                  <a href="/posts" className='btn btn-ghost text-lg'>Page2</a>
                  <a href="/popup" className='btn btn-ghost text-lg'>Page3</a>
              </div>
              {issignedin ? (
                <a href='/dashboard' className='btn rounded-md text-lg hidden md:flex bg-indigo-300 '>Dashboard</a>
              ) : (
                <a href='/register' className='btn rounded-md text-lg hidden md:flex bg-indigo-300 '>Register/Login</a>
              )}
          </div>
          {isVisible && (
              <div className='w-screen absolute h-auto flex flex-col md:hidden animate-flip-down animate-duration-400 z-10'>
                  <a href="/menu" className='btn bg-zinc-300 text-lg hover:bg-zinc-400'>Menu</a>
                  <a href="/posts" className='btn bg-zinc-300 hover:bg-zinc-400 text-lg'>Posts</a>
                  <a href="/popup" className='btn bg-zinc-300 hover:bg-zinc-400 text-lg'>Popup</a>
                  {issignedin ? (
                    <a href='/dashboard' className='btn rounded-md text-lg md:flex bg-indigo-300 hover:bg-indigo-400 '>Dashboard</a>
                  ) : (
                    <a href='/register' className='btn rounded-md text-lg md:flex bg-indigo-300 hover:bg-indigo-400 '>Register/Login</a>
                  )}
              </div>
          )}
          
      </div>
  );
}

