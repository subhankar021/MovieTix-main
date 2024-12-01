import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform group-hover:scale-105">
        <img 
          src={movie.imageUrl} 
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <div className="flex items-center mb-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1">{movie.rating}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{movie.duration}</span>
            <span className="text-green-600 font-bold">${movie.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};