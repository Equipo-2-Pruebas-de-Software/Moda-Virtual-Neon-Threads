import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ProductsPage from './components/ProductsPage';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import AuthPage from './components/AuthPage';
import AdvancedSearch from './components/AdvancedSearch'; // Importa la búsqueda avanzada
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ paddingBottom: '50px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/busqueda-avanzada" element={<AdvancedSearch />} /> {/* Ruta de búsqueda avanzada */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
