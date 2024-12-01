import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { SeatSelector } from '../components/SeatSelector';
import { movies } from '../data/movies';
import { useSeatContext } from '../context/SeatContext';

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === Number(id));
  const { selectedSeats, initializeSeats } = useSeatContext();

  useEffect(() => {
    if (movie) {
      initializeSeats(movie.id);
    }
  }, [movie?.id]);

  const handleCheckout = () => {
    if (selectedSeats.length === 0) return;
    navigate('/checkout', { 
      state: { 
        movieId: movie?.id,
        seats: selectedSeats,
        totalAmount: selectedSeats.length * (movie?.price || 0)
      }
    });
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={movie.imageUrl} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1">{movie.rating}</span>
                <Clock className="w-5 h-5 ml-4" />
                <span className="ml-1">{movie.duration}</span>
              </div>
              <p className="text-gray-600 mb-4">{movie.description}</p>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Select Seats</h2>
                <SeatSelector movieId={movie.id} />
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl">Total Amount:</span>
                  <span className="text-2xl font-bold">
                    ${(selectedSeats.length * movie.price).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={selectedSeats.length === 0}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold
                    disabled:bg-gray-400 disabled:cursor-not-allowed
                    hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};