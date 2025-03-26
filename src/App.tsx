import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Baseline as Baseball, ShoppingBasket as Basketball, Ticket } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MLB from './pages/MLB';
import NBA from './pages/NBA';
import Loterias from './pages/Loterias';

function App() {
  const navItems = [
    { path: '/', label: 'Inicio', icon: <Baseball className="w-5 h-5" /> },
    { path: '/mlb', label: 'MLB', icon: <Baseball className="w-5 h-5" /> },
    { path: '/nba', label: 'NBA', icon: <Basketball className="w-5 h-5" /> },
    { path: '/loterias', label: 'Loterías', icon: <Ticket className="w-5 h-5" /> },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar items={navItems} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mlb" element={<MLB />} />
            <Route path="/nba" element={<NBA />} />
            <Route path="/loterias" element={<Loterias />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;