import { useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Gallery.css';

// Import images
import galleryCafeInterior from '../../assets/images/gallery-cafe-interior.webp';
import galleryRibeyeSteak from '../../assets/images/gallery-ribeye-steak.webp';
import gallerySpecialEvent from '../../assets/images/gallery-special-event.webp';
import restaurantInterior from '../../assets/images/restaurant_interior_ambiance.png';
import featuredDishes from '../../assets/images/featured_dishes.png';
import specialEvent from '../../assets/images/special_event.png';
import bruschetta from '../../assets/images/bruschetta.png';
import caesarSalad from '../../assets/images/caesar_salad.png';
import grilledSalmon from '../../assets/images/grilled_salmon.png';
import ribeyeSteak from '../../assets/images/ribeye_steak.png';
import awardsRecognition from '../../assets/images/awards_recognition.png';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const galleryImages = [
    { src: galleryCafeInterior, alt: 'Café Interior', category: 'Interior' },
    { src: restaurantInterior, alt: 'Restaurant Ambiance', category: 'Interior' },
    { src: galleryRibeyeSteak, alt: 'Ribeye Steak', category: 'Dishes' },
    { src: ribeyeSteak, alt: 'Premium Ribeye', category: 'Dishes' },
    { src: grilledSalmon, alt: 'Grilled Salmon', category: 'Dishes' },
    { src: bruschetta, alt: 'Fresh Bruschetta', category: 'Dishes' },
    { src: caesarSalad, alt: 'Caesar Salad', category: 'Dishes' },
    { src: featuredDishes, alt: 'Featured Dishes', category: 'Dishes' },
    { src: gallerySpecialEvent, alt: 'Special Event', category: 'Events' },
    { src: specialEvent, alt: 'Private Events', category: 'Events' },
  ];

  const awards = [
    {
      title: 'Culinary Excellence Award',
      year: '2022',
      icon: '🏆'
    },
    {
      title: 'Restaurant of the Year',
      year: '2023',
      icon: '⭐'
    },
    {
      title: 'Best Fine Dining Experience',
      year: '2023',
      organization: 'Foodie Magazine',
      icon: '🥇'
    }
  ];

  const reviews = [
    {
      quote: 'Exceptional ambiance and unforgettable flavors.',
      source: 'Gourmet Review',
      rating: 5
    },
    {
      quote: 'A must-visit restaurant for food enthusiasts.',
      source: 'The Daily Bite',
      rating: 5
    }
  ];

  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryImages.findIndex(img => img.src === currentImage.src);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }

    setCurrentImage(galleryImages[newIndex]);
  };

  return (
    <div className="gallery-page">
      <Navigation />

      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-content">
          <h1>Our Gallery</h1>
          <p>Explore the Beauty of Café Fausse</p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="photo-gallery">
        <div className="container">
          <h2>Photo Collection</h2>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img src={image.src} alt={image.alt} />
                <div className="gallery-item-overlay">
                  <span className="gallery-category">{image.category}</span>
                  <h3>{image.alt}</h3>
                  <p>Click to view</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section">
        <div className="container">
          <h2>Awards & Recognition</h2>
          <div className="awards-grid">
            {awards.map((award, index) => (
              <div key={index} className="award-card">
                <div className="award-icon">{award.icon}</div>
                <h3>{award.title}</h3>
                <p className="award-year">{award.year}</p>
                {award.organization && (
                  <p className="award-org">{award.organization}</p>
                )}
              </div>
            ))}
          </div>
          <div className="awards-image">
            <img src={awardsRecognition} alt="Awards and Recognition" />
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <h2>What Our Guests Say</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <blockquote>"{review.quote}"</blockquote>
                <p className="review-source">— {review.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
          >
            ‹
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={currentImage.src} alt={currentImage.alt} />
            <div className="lightbox-caption">
              <span className="lightbox-category">{currentImage.category}</span>
              <h3>{currentImage.alt}</h3>
            </div>
          </div>
          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
          >
            ›
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;

