import React from 'react';
import { X, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Ticket } from '../types';
import { movies } from '../data/movies';

interface TicketDetailsProps {
  ticket: Ticket;
  onClose: () => void;
}

export const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onClose }) => {
  const movie = movies.find(m => m.id === ticket.movieId);
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={movie.imageUrl} 
            alt={movie.title}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-medium">Show Date & Time</p>
                <p className="text-gray-600">
                  {new Date(ticket.showtime).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-600">
                  {new Date(ticket.showtime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-medium">Theater</p>
                <p className="text-gray-600">Screen 1, MovieTix Cinemas</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-medium">Seats</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {ticket.seats.map(seat => (
                    <span
                      key={seat.id}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {seat.row}{seat.number}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-gray-600">{movie.duration}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ${ticket.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Booking ID</p>
                <p className="text-sm font-medium">{ticket.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};