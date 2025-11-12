import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDescriptionPage.css';

const ProductDescriptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

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
      const outerSpeed = 0.12;
      outerX += (mouseX - outerX) * outerSpeed;
      outerY += (mouseY - outerY) * outerSpeed;

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

    const descPage = document.querySelector('.product-desc-page');
    if (descPage) {
      cursorOuter = document.createElement('div');
      cursorInner = document.createElement('div');
      
      cursorOuter.className = 'custom-cursor-outer';
      cursorInner.className = 'custom-cursor-inner';
      
      document.body.appendChild(cursorOuter);
      document.body.appendChild(cursorInner);

      descPage.addEventListener('mousemove', handleMouseMove);
      descPage.addEventListener('mouseenter', handleMouseEnter);
      descPage.addEventListener('mouseleave', handleMouseLeave);

      animateCursor();
    }

    return () => {
      if (descPage) {
        descPage.removeEventListener('mousemove', handleMouseMove);
        descPage.removeEventListener('mouseenter', handleMouseEnter);
        descPage.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (cursorOuter) cursorOuter.remove();
      if (cursorInner) cursorInner.remove();
    };
  }, []);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', product);
    // Add your cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product);
    // Add your buy logic here
  };

  return (
    <div className="product-desc-page">
      {/* Animated Background */}
      <div className="desc-bg">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="floating-orb orb-4"></div>
        
        <div className="geometric-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>

        <div className="particles-container">
          {[...Array(40)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}>✦</div>
          ))}
        </div>

        <div className="light-beams">
          <div className="beam beam-1"></div>
          <div className="beam beam-2"></div>
          <div className="beam beam-3"></div>
        </div>
      </div>

      {/* Content */}
      <div className="desc-container">
  <button className="back-btn" onClick={() => navigate('/products')} aria-label="Back to Collection">
          <span className="back-icon">←</span>
          <span className="back-text">Back to Collection</span>
        </button>

        <div className="product-detail-wrapper">
          {/* Image Section */}
          <div className="image-section">
            <div className="image-frame">
              <div className="frame-glow"></div>
              <div className="image-content">
                <img src={product.imageUrl} alt={product.title} className="detail-image" />
              </div>
              <div className="frame-corners">
                <span className="corner corner-tl"></span>
                <span className="corner corner-tr"></span>
                <span className="corner corner-bl"></span>
                <span className="corner corner-br"></span>
              </div>
            </div>

            {/* Price Section - Moved to Left */}
            <div className="price-section">
              <div className="price-label">Price</div>
              <div className="price-amount">
                <span className="currency">₹</span>
                <span className="amount">{product.price}</span>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="info-content">
              
              <h1 className="detail-title">{product.title}</h1>
              
              <div className="flavour-badge">
                <span className="badge-icon">✦</span>
                <span className="badge-text">{product.flavour}</span>
                <span className="badge-icon">✦</span>
              </div>

              <div className="description-box">
                <h3 className="desc-heading">Description</h3>
                <p className="desc-text">{product.description}</p>
              </div>

              <div className="action-buttons">
                <button className="cart-btn" onClick={handleAddToCart}>
                  <span className="btn-bg-effect"></span>
                  <span className="btn-content">
                    <span className="btn-icon">🛒</span>
                    <span className="btn-label">Add to Cart</span>
                  </span>
                </button>

                <button className="buy-btn" onClick={handleBuyNow}>
                  <span className="btn-bg-effect"></span>
                  <span className="btn-content">
                    <span className="btn-icon">⚡</span>
                    <span className="btn-label">Buy Now</span>
                  </span>
                </button>
              </div>

              {/* Removed Product ID per request */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescriptionPage;
