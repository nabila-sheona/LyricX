import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='bg-gradient-to-br from-indigo-900 to-sky-400 p-4'>
      <div className='flex justify-between items-center max-w-6xl mx-auto'>
      
        {/* Navigation Links */}
        <div className='flex items-center gap-6'>
          <Link to="/" className='flex items-center gap-2 hover:text-pink-600'>
            <AiFillHome className="text-2xl" />
            <span>Home</span>
          </Link>
          <Link to="/search" className='flex items-center gap-2 hover:text-pink-600'>
            <BsFillInfoCircleFill className="text-2xl" />
            <span>Search Lyrics</span>
          </Link>
          <Link to="/album" className='flex items-center gap-2 hover:text-pink-600'>
            <BsFillInfoCircleFill className="text-2xl" />
            <span>Search Songs</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
