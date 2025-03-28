import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Palette, ShoppingCart, Star, Droplets, Package, Heart, Search, Menu, X, Instagram, Twitter, Clock } from 'lucide-react';
import { Cart } from './components/Cart';
import { useCartStore } from './store/cartStore';
import Shop from './pages/Shop';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen ethereal-bg">
        {/* Navigation */}
        <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center">
                  <Palette className="h-10 w-10 text-pink-500" />
                  <div className="ml-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-400 text-transparent bg-clip-text">FatimArt</span>
                    <span className="block text-xs text-gray-500 -mt-1">Artisanal Paints</span>
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-pink-500 transition-colors">Home</Link>
                <Link to="/shop" className="text-gray-700 hover:text-pink-500 transition-colors">Shop</Link>
                <a href="#about" className="text-gray-700 hover:text-pink-500 transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-pink-500 transition-colors">Contact</a>
                <div className="flex items-center space-x-4">
                  <Search className="h-5 w-5 text-gray-700 hover:text-pink-500 cursor-pointer" />
                  <div className="relative">
                    <ShoppingCart 
                      className="h-5 w-5 text-gray-700 hover:text-pink-500 cursor-pointer" 
                      onClick={() => setIsCartOpen(true)}
                    />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button and Cart Icon */}
              <div className="md:hidden flex items-center space-x-4">
                <div className="relative">
                  <ShoppingCart 
                    className="h-5 w-5 text-gray-700 hover:text-pink-500 cursor-pointer" 
                    onClick={() => setIsCartOpen(true)}
                  />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700">
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden glass-nav">
              <div className="px-4 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-pink-500">Home</Link>
                <Link to="/shop" className="block px-3 py-2 text-gray-700 hover:text-pink-500">Shop</Link>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-pink-500">About</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-pink-500">Contact</a>
              </div>
            </div>
          )}
        </nav>

        {/* Shopping Cart */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Routes */}
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <div className="glass-card p-8 rounded-2xl">
                <h1 className="text-6xl font-bold mb-6">
                  <span className="block">Discover the Magic of</span>
                  <span className="bg-gradient-to-r from-pink-500 to-pink-400 text-transparent bg-clip-text">Handcrafted Colors</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">Experience the extraordinary with our artisanal paints, where each color tells a story and every brush stroke brings your vision to life.</p>
                <div className="flex space-x-4">
                  <Link to="/shop" className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-8 py-3 rounded-lg hover:opacity-90 transition duration-300">
                    Explore Collection
                  </Link>
                  <a href="#about" className="border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-lg hover:bg-pink-50 transition duration-300">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1550686041-366ad85a1355?auto=format&fit=crop&w=800&q=80" 
                  alt="Colorful Paint Palette" 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Premium Quality</h3>
                  <p className="text-sm opacity-90">Each color is carefully crafted to bring your artwork to life</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="glass-card p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Droplets className="h-16 w-16 text-pink-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Premium Pigments</h3>
              <p className="text-gray-600">Our carefully selected pigments ensure vibrant, long-lasting colors that bring your artwork to life.</p>
            </div>
            <div className="glass-card p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Heart className="h-16 w-16 text-pink-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Artisanal Crafting</h3>
              <p className="text-gray-600">Each batch is handcrafted with love and attention to detail, ensuring the highest quality standards.</p>
            </div>
            <div className="glass-card p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Clock className="h-16 w-16 text-pink-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Easy Ordering</h3>
              <p className="text-gray-600">Simple and secure ordering process with fast shipping and real-time order tracking available.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Artist Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                text: "FatimArt paints have transformed my artistic practice. The quality and vibrancy of their colors are simply unmatched in the market.",
                author: "Isabella Martinez",
                role: "Professional Artist",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
              },
              {
                text: "As an art educator, I've tried many brands, but FatimArt stands out for its consistency and rich pigmentation. My students love working with these paints.",
                author: "David Chen",
                role: "Art Educator",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass-card p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <img src={testimonial.image} alt={testimonial.author} className="w-16 h-16 rounded-full object-cover mr-4" />
                  <div>
                    <p className="font-semibold text-lg">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Palette className="h-10 w-10 text-pink-400" />
                <span className="ml-2 text-3xl font-bold">FatimArt</span>
              </div>
              <p className="text-gray-400 mb-6">Elevating artistry through premium handcrafted paints</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact</h3>
              <ul className="space-y-4 text-gray-400">
                <li>Email: hello@fatimart.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Studio: 123 Artist Avenue, Creative District</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-6">Join our community for exclusive offers and creative inspiration</p>
              <div className="flex flex-col space-y-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-pink-500"
                />
                <button className="bg-gradient-to-r from-pink-500 to-pink-400 text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FatimArt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;