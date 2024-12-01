import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaymentForm } from '../components/PaymentForm';
import { movies } from '../data/movies';
import { PAYMENT_STATUS } from '../config/stripe';
import { useTicketContext } from '../context/TicketContext';

export const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addTicket } = useTicketContext();
  const [paymentStatus, setPaymentStatus] = useState<keyof typeof PAYMENT_STATUS | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { movieId, seats, totalAmount } = location.state || {};
  const movie = movies.find(m => m.id === movieId);

  if (!movie || !seats || !totalAmount) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">Invalid checkout session. Please try again.</p>
        </div>
      </div>
    );
  }

  const handlePaymentSuccess = () => {
    setPaymentStatus(PAYMENT_STATUS.SUCCESS);
    
    // Create a new ticket
    const newTicket = {
      id: crypto.randomUUID(),
      movieId,
      seats,
      showtime: new Date().toISOString(), // In a real app, this would be selected by the user
      totalAmount,
      purchaseDate: new Date().toISOString()
    };
    
    addTicket(newTicket);
    
    setTimeout(() => {
      navigate('/my-tickets');
    }, 2000);
  };

  const handlePaymentError = (errorMessage: string) => {
    setPaymentStatus(PAYMENT_STATUS.FAILED);
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{movie.title}</span>
                  <span>${movie.price.toFixed(2)} × {seats.length}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Seats: {seats.map(s => `${s.row}${s.number}`).join(', ')}
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {paymentStatus === PAYMENT_STATUS.SUCCESS ? (
              <div className="bg-green-50 p-4 rounded-lg text-green-700">
                <p className="font-medium">Payment successful! Redirecting to your tickets...</p>
              </div>
            ) : paymentStatus === PAYMENT_STATUS.FAILED ? (
              <div className="bg-red-50 p-4 rounded-lg text-red-700 mb-4">
                <p className="font-medium">Payment failed: {error}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                <PaymentForm
                  amount={totalAmount}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};