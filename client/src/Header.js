import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './App.css'; // or './App.css' if that's where you added the Tailwind directives

export default function Header() {
  return (
    <div className="bg-black text-white flex justify-between items-center gap-4 p-4">
      <Link to='/' className='flex items-center gap-2'>
        TAYLOR SWIFT <span className="hidden sm:inline">Lyric book</span>
      </Link>

      <div className="flex items-center gap-4"> {/* Add this div to wrap your links */}
        <Link to="/" className="flex items-center gap-2 hover:text-pink-200">
          <AiFillHome className="text-2xl" />
          Home
        </Link>
        <Link to="/search" className="flex items-center gap-2 hover:text-pink-200">
          <BsFillInfoCircleFill className="text-2xl" />
          Search Lyrics
        </Link>
        <Link to="/album" className="flex items-center gap-2 hover:text-pink-200">
          <BsFillInfoCircleFill className="text-2xl" />
          Search Songs
        </Link>
      </div>
    </div>
  );
}
