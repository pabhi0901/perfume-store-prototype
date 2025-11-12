import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './HomePage.css'

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [bannerImages, setBannerImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState([])

  // Fetch banner images from API
  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cardRoute/getData?category=banner_image`)
        console.log(response);
        
        if (response.data.data && response.data.data.length > 0) {
          setBannerImages(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching banner images:', error)
        // Fallback to default image if API fails
        setBannerImages([{
          imageUrl: 'https://ik.imagekit.io/g6obyrspb/maxim-lozyanko-3dLrus3c_oA-unsplash.jpg?updatedAt=1762863034296'
        }])
      }
    }

    fetchBannerImages()
  }, [])

  // Fetch product cards from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cardRoute/getData?category=card`)
        if (response.data.data && response.data.data.length > 0) {
          // Select 3-4 random products
          const numberOfProducts = Math.random() > 0.5 ? 3 : 4
          const shuffled = [...response.data.data].sort(() => Math.random() - 0.5)
          setFeaturedProducts(shuffled.slice(0, numberOfProducts))
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  // Rotate images every 2.5 seconds
  useEffect(() => {
    if (bannerImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
      }, 2500)

      return () => clearInterval(interval)
    }
  }, [bannerImages])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    setIsVisible(true)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="homepage">
      {/* Hero Banner Section */}
      <section className="hero-section">
        {/* Parallax Background with Image */}
        <div 
          className="hero-background"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          {bannerImages.length > 0 && (
            <img 
              src={bannerImages[currentImageIndex]?.imageUrl}
              alt="Luxury Perfume"
              className="hero-image"
            />
          )}
          <div className="hero-overlay"></div>
          <div className="hero-gradient"></div>
        </div>

        {/* Floating Particles */}
        <div className="particles">
          <span className="particle particle-1">✦</span>
          <span className="particle particle-2">◆</span>
          <span className="particle particle-3">✦</span>
          <span className="particle particle-4">◆</span>
          <span className="particle particle-5">✦</span>
          <span className="particle particle-6">◆</span>
        </div>

        {/* Hero Content */}
        <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
          <h1 className="hero-title">
            <span className="hero-subtitle">Luxury Redefined</span>
            <span className="hero-main">ÉLÉGANCE</span>
            <span className="hero-tagline">Premium Fragrance Collection</span>
          </h1>

          <div className="hero-cta">
            <Link to="/products" className="cta-button primary">
              <span className="button-text">Explore Collection</span>
              <span className="button-shine"></span>
            </Link>
          </div>

          {/* Scroll Indicator */}
       
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration left">
          <div className="decoration-line"></div>
          <div className="decoration-orb"></div>
        </div>
        <div className="hero-decoration right">
          <div className="decoration-line"></div>
          <div className="decoration-orb"></div>
        </div>

        {/* Floating Accent Elements */}
        <div className="accent-element accent-1"></div>
        <div className="accent-element accent-2"></div>
        <div className="accent-element accent-3"></div>
      </section>

      {/* Premium Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Curated For You</span>
            <h2 className="section-title">
              Our Premium
              <span className="gradient-text"> Selections</span>
            </h2>
            <p className="section-subtitle">
              Discover the finest fragrances handpicked from our exclusive collection
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-overlay">
                    <div className="product-details">
                      <p className="product-flavour">✦ {product.flavour}</p>
                      <p className="product-description">{product.description.substring(0, 150)}...</p>
                      <Link to="/products" className="view-details-btn">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-section">
        <div className="container">
          <div className="why-content">
            <div className="why-text">
              <span className="section-label">Why Choose Élégance</span>
              <h2 className="section-title">
                Where Luxury Meets
                <span className="gradient-text"> Perfection</span>
              </h2>
              <p className="section-description">
                For over decades, we've been curating exceptional fragrances that 
                embody sophistication and personal expression. Our commitment to 
                quality and artistry ensures every bottle tells your unique story.
              </p>
              <ul className="why-list">
                <li className="why-item">
                  <span className="check-icon">✓</span>
                  <span>100% Authentic Premium Fragrances</span>
                </li>
                <li className="why-item">
                  <span className="check-icon">✓</span>
                  <span>Long-lasting & Sophisticated Scents</span>
                </li>
                <li className="why-item">
                  <span className="check-icon">✓</span>
                  <span>Elegant Packaging & Presentation</span>
                </li>
                <li className="why-item">
                  <span className="check-icon">✓</span>
                  <span>Exclusive Limited Editions</span>
                </li>
              </ul>
              <Link to="/products" className="why-button">
                View Our Collection
                <span className="button-arrow">→</span>
              </Link>
            </div>
            <div className="why-image">
              <div className="image-placeholder">
                <img 
                  src="https://ik.imagekit.io/g6obyrspb/Gemini_Generated_Image_gmmngygmmngygmmn.png" 
                  alt="Élégance Perfume"
                  className="why-perfume-image"
                />
                <div className="image-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Find Your Signature Scent?</h2>
            <p className="cta-description">
              Explore our curated collection of premium fragrances
            </p>
            <Link to="/products" className="cta-main-button">
              <span>Discover Collection</span>
              <span className="button-shine"></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
