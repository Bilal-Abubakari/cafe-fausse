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
  const [loading, setLoading] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [reservationDetails, setReservationDetails] = useState(null);

  // Generate time slots based on the selected date
  const generateTimeSlots = (dateString) => {
    if (!dateString) return [];

    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Operating hours: Mon-Sat 5PM-11PM, Sunday 5PM-9PM
    const startHour = 17; // 5:00 PM
    const endHour = dayOfWeek === 0 ? 21 : 23; // Sunday closes at 9PM, others at 11PM

    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    return slots;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Update available time slots when date changes
    if (name === 'date') {
      const slots = generateTimeSlots(value);
      setAvailableTimeSlots(slots);
      // Reset time if it's no longer valid
      if (formData.time && !slots.includes(formData.time)) {
        setFormData(prev => ({ ...prev, time: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

      // Combine date and time into timeslot format expected by backend
      const timeslot = `${formData.date}T${formData.time}:00`;

      // Prepare request body with timeslot
      const requestBody = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        timeslot: timeslot,
        guests: parseInt(formData.guests),
        occasion: formData.occasion,
        specialRequests: formData.specialRequests
      };

      const response = await fetch(`${backendUrl}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create reservation');
      }

      if (data.success) {
        setReservationDetails(data);
        setSubmitted(true);

        // Reset form after showing confirmation
        setTimeout(() => {
          setSubmitted(false);
          setReservationDetails(null);
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
        }, 8000);
      } else {
        setError(data.error || 'Failed to create reservation. Please try again.');
      }
    } catch (error) {
      setError(error.message || 'Failed to submit reservation. Please try again.');
      console.error('Reservation submission error:', error);
    } finally {
      setLoading(false);
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
                        disabled={!formData.date}
                      >
                        <option value="">
                          {formData.date ? 'Select a time' : 'Select a date first'}
                        </option>
                        {availableTimeSlots.map(slot => {
                          const hour = parseInt(slot.split(':')[0]);
                          const minute = slot.split(':')[1];
                          const period = hour >= 12 ? 'PM' : 'AM';
                          const displayHour = hour > 12 ? hour - 12 : hour;
                          return (
                            <option key={slot} value={slot}>
                              {displayHour}:{minute} {period}
                            </option>
                          );
                        })}
                      </select>
                      {formData.date && availableTimeSlots.length > 0 && (
                        <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                          {new Date(formData.date).getDay() === 0
                            ? 'Sunday hours: 5:00 PM - 9:00 PM'
                            : 'Hours: 5:00 PM - 11:00 PM'}
                        </small>
                      )}
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

                  <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Processing...' : 'Confirm Reservation'}
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
                  <p><strong>Reservation ID:</strong> {reservationDetails?.reservation_id}</p>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p><strong>Time:</strong> {(() => {
                    const hour = parseInt(formData.time.split(':')[0]);
                    const minute = formData.time.split(':')[1];
                    const period = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour > 12 ? hour - 12 : hour;
                    return `${displayHour}:${minute} ${period}`;
                  })()}</p>
                  <p><strong>Guests:</strong> {formData.guests}</p>
                  <p><strong>Table Number:</strong> {reservationDetails?.table_number}</p>
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

