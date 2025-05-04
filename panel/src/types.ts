export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  image: string;
  onerilen: string;
  detaylar: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface Order {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  date: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}