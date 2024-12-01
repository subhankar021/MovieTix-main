import React, { createContext, useContext, useState } from 'react';
import { Seat } from '../types';

interface SeatContextType {
  selectedSeats: Seat[];
  bookedSeats: Seat[];
  toggleSeatSelection: (seat: Seat) => void;
  initializeSeats: (movieId: number) => void;
}

const SeatContext = createContext<SeatContextType | undefined>(undefined);

export const useSeatContext = () => {
  const context = useContext(SeatContext);
  if (!context) {
    throw new Error('useSeatContext must be used within a SeatProvider');
  }
  return context;
};

export const SeatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookedSeats, setBookedSeats] = useState<Seat[]>([]);

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.isBooked) return;
    
    setSelectedSeats(prev => {
      const isSelected = prev.some(s => s.id === seat.id);
      if (isSelected) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const initializeSeats = (movieId: number) => {
    // In a real app, this would fetch booked seats from an API
    // For demo, we'll generate random booked seats
    const newBookedSeats = Array.from({ length: 40 }, (_, i) => ({
      id: `${movieId}-${i}`,
      row: String.fromCharCode(65 + Math.floor(i / 8)),
      number: (i % 8) + 1,
      isBooked: Math.random() > 0.7,
      isSelected: false
    }));
    
    setBookedSeats(newBookedSeats.filter(seat => seat.isBooked));
    setSelectedSeats([]);
  };

  return (
    <SeatContext.Provider value={{
      selectedSeats,
      bookedSeats,
      toggleSeatSelection,
      initializeSeats
    }}>
      {children}
    </SeatContext.Provider>
  );
};