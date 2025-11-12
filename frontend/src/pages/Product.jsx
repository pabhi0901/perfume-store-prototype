import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate('/product-description', { state: { product } });
  };

  // Custom Cursor Movement
  useEffect(() => {
    let cursorOuter = null;
    let cursorInner = null;
    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let innerX = 0;
    let innerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      if (cursorOuter) cursorOuter.style.opacity = '1';
      if (cursorInner) cursorInner.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursorOuter) cursorOuter.style.opacity = '0';
      if (cursorInner) cursorInner.style.opacity = '0';
    };

    const animateCursor = () => {
      // Outer cursor follows with delay (royal slow movement)
      const outerSpeed = 0.12;
      outerX += (mouseX - outerX) * outerSpeed;
      outerY += (mouseY - outerY) * outerSpeed;

      // Inner cursor follows faster
      const innerSpeed = 0.25;
      innerX += (mouseX - innerX) * innerSpeed;
      innerY += (mouseY - innerY) * innerSpeed;

      if (cursorOuter) {
        cursorOuter.style.left = `${outerX}px`;
        cursorOuter.style.top = `${outerY}px`;
      }

      if (cursorInner) {
        cursorInner.style.left = `${innerX}px`;
        cursorInner.style.top = `${innerY}px`;
      }

      requestAnimationFrame(animateCursor);
    };

    // Initialize cursor elements
    const productPage = document.querySelector('.product-page');
    if (productPage) {
      cursorOuter = document.createElement('div');
      cursorInner = document.createElement('div');
      
      cursorOuter.className = 'custom-cursor-outer';
      cursorInner.className = 'custom-cursor-inner';
      
      document.body.appendChild(cursorOuter);
      document.body.appendChild(cursorInner);

      productPage.addEventListener('mousemove', handleMouseMove);
      productPage.addEventListener('mouseenter', handleMouseEnter);
      productPage.addEventListener('mouseleave', handleMouseLeave);

      animateCursor();
    }

    return () => {
      if (productPage) {
        productPage.removeEventListener('mousemove', handleMouseMove);
        productPage.removeEventListener('mouseenter', handleMouseEnter);
        productPage.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (cursorOuter) cursorOuter.remove();
      if (cursorInner) cursorInner.remove();
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cardRoute/getData?category=card`);
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-page">
        <div className="royal-bg">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="stars-layer"></div>
        </div>
        <div className="loading-container">
          <div className="luxury-spinner"></div>
          <p>Loading Collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      {/* Royal Animated Background */}
      <div className="royal-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="stars-layer"></div>
      </div>

      {/* Products Grid */}
      <div className="products-wrapper">
        <div className="products-grid">
          {products.map((product, index) => (
            <div 
              key={product._id} 
              className="luxury-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProductClick(product)}
            >
              <div className="card-glow"></div>
              <div className="card-border"></div>
              
              <div className="card-image-wrapper">
                <div className="image-bg-pattern"></div>
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="product-img"
                />
              </div>

              <div className="card-content">
                <div className="content-header">
                  <h3 className="product-name">{product.title}</h3>
                  <div className="gold-accent"></div>
                </div>
                
                <div className="card-footer">
                  <div className="price-tag">
                    <span className="currency">₹</span>
                    <span className="amount">{product.price}</span>
                  </div>
                  <button className="add-cart-btn">
                    <span className="btn-bg"></span>
                    <span className="btn-icon">🛒</span>
                    <span className="btn-text">Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
