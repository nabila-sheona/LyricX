import React from 'react';
import Header from './Header';
import { Outlet } from "react-router-dom";


export default function RootLayout({ children }) {
  return (
    <div>
      
      <Header />
    
      <main className="flex-grow">
   
        {children}
        <Outlet />
      </main>  
    </div>
  );
}
