import React from 'react';
import { Link } from 'react-router-dom';

export default function Menuitem({ title, address, Icon }) {
  return (
    <Link to={address} className='flex items-center gap-2 hover:text-pink-600'>
      <Icon className="text-2xl" />
      <span>{title}</span>
    </Link>
  );
}
