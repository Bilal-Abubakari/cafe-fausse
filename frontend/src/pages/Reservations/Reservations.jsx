import { useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Reservations.css';

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      // TODO: Connect to Flask backend endpoint
      // const response = await fetch('/api/reservations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulate API call
      console.log('Reservation submitted:', formData);

      setSubmitted(true);
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          occasion: '',
          specialRequests: ''
        });
      }, 5000);
    } catch (error) {
      setError('Failed to submit reservation. Please try again.');
      console.error('Reservation submission error:', error);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="reservations-page">
      <Navigation />

      {/* Hero Section */}
      <section className="reservations-hero">
        <div className="hero-overlay">
          <h1>Reserve Your Table</h1>
          <p>Experience unforgettable dining at Café Fausse</p>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="reservation-form-section">
        <div className="container">
          <div className="form-wrapper">
            {!submitted ? (
              <>
                <div className="form-header">
                  <h2>Make a Reservation</h2>
                  <p>Please fill out the form below to reserve your table</p>
                </div>

                <form onSubmit={handleSubmit} className="reservation-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(202) 555-1234"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="guests">Number of Guests *</label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="7">7 Guests</option>
                        <option value="8">8 Guests</option>
                        <option value="9">9+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Reservation Date *</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={getMinDate()}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="time">Reservation Time *</label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                        <option value="21:30">9:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="occasion">Special Occasion (Optional)</label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                    >
                      <option value="">Select an occasion</option>
                      <option value="birthday">Birthday</option>
                      <option value="anniversary">Anniversary</option>
                      <option value="date">Date Night</option>
                      <option value="business">Business Dinner</option>
                      <option value="celebration">Celebration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialRequests">Special Requests (Optional)</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Dietary restrictions, allergies, seating preferences, etc."
                      rows="4"
                    ></textarea>
                  </div>

                  {error && <p className="error-message">{error}</p>}

                  <button type="submit" className="submit-button">
                    Confirm Reservation
                  </button>

                  <p className="form-note">
                    * Required fields. We'll send you a confirmation email shortly.
                  </p>
                </form>
              </>
            ) : (
              <div className="success-container">
                <div className="success-icon">✓</div>
                <h2>Reservation Confirmed!</h2>
                <p>Thank you for choosing Café Fausse</p>
                <div className="confirmation-details">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p><strong>Time:</strong> {formData.time}</p>
                  <p><strong>Guests:</strong> {formData.guests}</p>
                </div>
                <p className="confirmation-note">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>
            )}
          </div>

          {/* Restaurant Info Sidebar */}
          <div className="info-sidebar">
            <div className="info-card">
              <h3>📍 Location</h3>
              <p>1234 Culinary Ave, Suite 100</p>
              <p>Washington, DC 20002</p>
            </div>

            <div className="info-card">
              <h3>📞 Contact Us</h3>
              <p>(202) 555-4567</p>
              <p>info@cafefausse.com</p>
            </div>

            <div className="info-card">
              <h3>🕐 Operating Hours</h3>
              <p><strong>Monday – Saturday</strong></p>
              <p>5:00 PM – 11:00 PM</p>
              <p><strong>Sunday</strong></p>
              <p>5:00 PM – 9:00 PM</p>
            </div>

            <div className="info-card">
              <h3>ℹ️ Reservation Policy</h3>
              <p>• Reservations recommended</p>
              <p>• 15-minute grace period</p>
              <p>• Parties of 9+ please call</p>
              <p>• Cancellations 24hrs notice</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reservations;

