import React from 'react';
import './About.css';
import antonioRossi from '../../assets/images/antonio_rossi.png';
import mariaLopez from '../../assets/images/maria_lopez.png';
import cafeInterior from '../../assets/images/gallery-cafe-interior.webp';
import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const About = () => {
  return (
    <div className="about-page">
        <Navigation />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>About Café Fausse</h1>
          <p>A legacy of passion, flavor, and authentic French cuisine</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, Café Fausse began as a dream shared by two culinary enthusiasts
                who met at Le Cordon Bleu in Paris. Antonio Rossi and Maria Lopez envisioned a
                place where traditional French cuisine could be experienced with a modern twist,
                creating an atmosphere that feels both sophisticated and welcoming.
              </p>
              <p>
                What started as a small bistro in the heart of the city has grown into a beloved
                dining destination, known for our commitment to using only the finest ingredients,
                traditional cooking techniques, and innovative flavor combinations. Every dish tells
                a story of our passion for excellence and our dedication to creating memorable
                dining experiences.
              </p>
              <p>
                Today, Café Fausse stands as a testament to the power of culinary artistry and the
                importance of sharing great food with great company. We continue to honor our French
                roots while embracing contemporary culinary trends, ensuring that every visit feels
                both familiar and exciting.
              </p>
            </div>
            <div className="story-image">
              <img src={cafeInterior} alt="Café Fausse Interior" />
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders">
        <div className="container">
          <h2>Meet Our Founders</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-image">
                <img src={antonioRossi} alt="Antonio Rossi" />
              </div>
              <div className="founder-info">
                <h3>Antonio Rossi</h3>
                <p className="founder-title">Co-Founder & Executive Chef</p>
                <p className="founder-bio">
                  Born in Tuscany, Italy, Antonio discovered his love for cooking in his
                  grandmother's kitchen at age seven. After training at Le Cordon Bleu Paris
                  and working in Michelin-starred restaurants across Europe, he brought his
                  expertise in classical French techniques and Italian passion for fresh
                  ingredients to Café Fausse. Antonio's philosophy is simple: respect the
                  ingredient, honor the tradition, and never stop innovating.
                </p>
                <p className="founder-specialties">
                  <strong>Specialties:</strong> French classics, seasonal menus, wine pairing
                </p>
              </div>
            </div>

            <div className="founder-card">
              <div className="founder-image">
                <img src={mariaLopez} alt="Maria Lopez" />
              </div>
              <div className="founder-info">
                <h3>Maria Lopez</h3>
                <p className="founder-title">Co-Founder & Pastry Chef</p>
                <p className="founder-bio">
                  Maria's journey began in Barcelona, where she grew up surrounded by the rich
                  culinary traditions of Catalonia. Her pursuit of pastry perfection led her to
                  Paris, where she mastered the art of French patisserie. With over 15 years of
                  experience, Maria creates desserts that are both visual masterpieces and
                  unforgettable taste experiences. Her creative vision extends to the entire
                  dining experience, ensuring every detail reflects elegance and warmth.
                </p>
                <p className="founder-specialties">
                  <strong>Specialties:</strong> French pastries, dessert innovation, presentation artistry
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Excellence</h3>
              <p>
                We are committed to excellence in every aspect of our service, from the quality
                of our ingredients to the warmth of our hospitality.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>
                We source locally and seasonally whenever possible, supporting local farmers and
                reducing our environmental impact.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>
                Café Fausse is more than a restaurant—it's a gathering place where friends become
                family and every guest feels at home.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Creativity</h3>
              <p>
                While we honor tradition, we're not afraid to innovate, constantly exploring new
                flavors and techniques to delight our guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Our Culinary Team</h2>
          <p className="team-intro">
            Behind every exceptional dining experience is a dedicated team of culinary professionals
            who bring passion, skill, and creativity to everything they do. Our kitchen brigade works
            in harmony to ensure every dish meets our exacting standards.
          </p>
          <div className="team-stats">
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-number">20+</span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Happy Guests Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="container">
          <h2>Experience Café Fausse</h2>
          <p>Join us for an unforgettable dining experience</p>
          <div className="cta-buttons">
            <a href="/reservations" className="btn btn-primary">Make a Reservation</a>
            <a href="/menu" className="btn btn-secondary">View Our Menu</a>
          </div>
        </div>
      </section>
        <Footer />
    </div>
  );
};

export default About;

