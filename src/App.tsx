import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MovieDetails } from './pages/MovieDetails';
import { MyTickets } from './pages/MyTickets';
import { Checkout } from './pages/Checkout';
import { SeatProvider } from './context/SeatContext';
import { TicketProvider } from './context/TicketContext';

function App() {
  return (
    <Router>
      <TicketProvider>
        <SeatProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/my-tickets" element={<MyTickets />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SeatProvider>
      </TicketProvider>
    </Router>
  );
}

export default App;