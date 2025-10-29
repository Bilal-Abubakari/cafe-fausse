import { useState } from 'react';
import Footer from '../../components/Footer/Footer.jsx';
import './Home.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import galleryCafeInterior from "../../assets/images/gallery-cafe-interior.webp";
import galleryRibeyeSteak from "../../assets/images/gallery-ribeye-steak.webp";
import gallerySpecialEvent from "../../assets/images/gallery-special-event.webp";

const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // TODO: Connect to Flask backend endpoint
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (error) {
      setError('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <div className="home-page">
      <Navigation />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="restaurant-name">Café Fausse</h1>
          <p className="tagline">Where Fine Dining Meets Culinary Innovation</p>
          <a href="/reservations" className="cta-button">Make a Reservation</a>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info">
        <div className="container">
          <h2>Visit Us</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>📍 Location</h3>
              <p>1234 Culinary Ave, Suite 100</p>
              <p>Washington, DC 20002</p>
            </div>
            <div className="info-card">
              <h3>📞 Contact</h3>
              <p>(202) 555-4567</p>
              <p>info@cafefausse.com</p>
            </div>
            <div className="info-card">
              <h3>🕐 Hours</h3>
              <p>Monday – Saturday</p>
              <p>5:00 PM – 11:00 PM</p>
              <p>Sunday</p>
              <p>5:00 PM – 9:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured">
        <div className="container">
          <h2>Experience Excellence</h2>
          <div className="featured-grid">
            <div className="featured-card">
              <div className="featured-icon">🍽️</div>
              <h3>Exquisite Cuisine</h3>
              <p>Traditional Italian flavors blended with modern culinary innovation</p>
            </div>
            <div className="featured-card">
              <div className="featured-icon">🏆</div>
              <h3>Award Winning</h3>
              <p>Recognized for culinary excellence and unforgettable dining experiences</p>
            </div>
            <div className="featured-card">
              <div className="featured-icon">🌿</div>
              <h3>Fresh Ingredients</h3>
              <p>Locally sourced, premium quality ingredients in every dish</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Showcase Section */}
      <section className="image-showcase">
        <div className="container">
          <h2>Experience Our Ambiance</h2>
          <div className="showcase-grid">
            <div className="showcase-item">
              <img src={galleryCafeInterior} alt="Café Interior" />
              <div className="showcase-overlay">
                <h3>Elegant Interior</h3>
                <p>Experience fine dining in a sophisticated atmosphere</p>
              </div>
            </div>
            <div className="showcase-item">
              <img src={galleryRibeyeSteak} alt="Ribeye Steak" />
              <div className="showcase-overlay">
                <h3>Premium Cuisine</h3>
                <p>Expertly crafted dishes with the finest ingredients</p>
              </div>
            </div>
            <div className="showcase-item">
              <img src={gallerySpecialEvent} alt="Special Events" />
              <div className="showcase-overlay">
                <h3>Special Events</h3>
                <p>Perfect venue for your memorable occasions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="newsletter">
        <div className="container">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive offers and updates</p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
          {subscribed && <p className="success-message">Thank you for subscribing!</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

