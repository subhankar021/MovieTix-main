import React, { useState } from 'react';
import { useTicketContext } from '../context/TicketContext';
import { movies } from '../data/movies';
import { Ticket as TicketIcon } from 'lucide-react';
import { TicketDetails } from '../components/TicketDetails';
import { Ticket } from '../types';

export const MyTickets = () => {
  const { tickets } = useTicketContext();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
        {tickets.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <TicketIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">You haven't purchased any tickets yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {tickets.map((ticket) => {
              const movie = movies.find(m => m.id === ticket.movieId);
              if (!movie) return null;

              return (
                <div 
                  key={ticket.id} 
                  className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="md:flex">
                    <div className="md:w-1/4">
                      <img 
                        src={movie.imageUrl} 
                        alt={movie.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                          <p className="text-gray-600 mb-2">
                            Date: {new Date(ticket.showtime).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                          <div className="mb-4">
                            <p className="font-medium">Seats:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {ticket.seats.map(seat => (
                                <span
                                  key={seat.id}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
                                >
                                  {seat.row}{seat.number}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            ${ticket.totalAmount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-500">
                          Click to view details
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedTicket && (
        <TicketDetails 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
        />
      )}
    </div>
  );
};