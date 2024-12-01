import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Ticket, User } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8" />
            <span className="text-xl font-bold">MovieTix</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300">Movies</Link>
            <Link to="/my-tickets" className="flex items-center space-x-1 hover:text-gray-300">
              <Ticket className="w-5 h-5" />
              <span>My Tickets</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 hover:text-gray-300">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};