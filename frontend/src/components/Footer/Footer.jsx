import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Café Fausse</h3>
          <p>Fine Dining Excellence Since 2010</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>1234 Culinary Ave, Suite 100</p>
          <p>Washington, DC 20002</p>
          <p>(202) 555-4567</p>
        </div>

        <div className="footer-section">
          <h4>Hours</h4>
          <p>Mon-Sat: 5:00 PM – 11:00 PM</p>
          <p>Sunday: 5:00 PM – 9:00 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

