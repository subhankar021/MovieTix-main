export interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  duration: string;
  genre: string[];
  rating: number;
  price: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  isBooked: boolean;
  isSelected: boolean;
}

export interface Ticket {
  id: string;
  movieId: number;
  seats: Seat[];
  showtime: string;
  totalAmount: number;
  purchaseDate: string;
}