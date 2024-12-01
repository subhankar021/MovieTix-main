import React from 'react';
import { useSeatContext } from '../context/SeatContext';
import { Seat } from '../types';

interface SeatSelectorProps {
  movieId: number;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({ movieId }) => {
  const { selectedSeats, bookedSeats, toggleSeatSelection } = useSeatContext();

  const allSeats: Seat[] = Array.from({ length: 40 }, (_, i) => ({
    id: `${movieId}-${i}`,
    row: String.fromCharCode(65 + Math.floor(i / 8)),
    number: (i % 8) + 1,
    isBooked: bookedSeats.some(s => s.id === `${movieId}-${i}`),
    isSelected: selectedSeats.some(s => s.id === `${movieId}-${i}`)
  }));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-8 mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2">
        {allSeats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => toggleSeatSelection(seat)}
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
              ${seat.isBooked ? 'bg-red-500 cursor-not-allowed' : 
                seat.isSelected ? 'bg-green-500 text-white' : 
                'bg-gray-200 hover:bg-gray-300'}
            `}
            disabled={seat.isBooked}
          >
            {seat.row}{seat.number}
          </button>
        ))}
      </div>
    </div>
  );
};