import Navigation from '../../components/Navigation/Navigation.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Menu.css';
import bruschetaImg from '../../assets/images/bruschetta.png';
import caesarSaladImg from '../../assets/images/caesar_salad.png';
import grilledSalmonImg from '../../assets/images/grilled_salmon.png';
import ribeyeSteakImg from '../../assets/images/ribeye_steak.png';
import vegetableRisottoImg from '../../assets/images/vegetable_risotto.png';
import tiramisuImg from '../../assets/images/tiramisu.png';
import cheesecakeImg from '../../assets/images/cheesecake.png';
import redWineGlassImg from '../../assets/images/red_wine_glass.png';
import whiteWineGlassImg from '../../assets/images/white_wine_glass.png';
import craftBeerImg from '../../assets/images/craft_beer.png';
import espressoImg from '../../assets/images/espresso.png';

/**
 * Menu Page Component
 * Displays the full restaurant menu segmented into categories
 * as per requirements.md section 3.1.2
 */
const Menu = () => {
  // Menu data structured by categories with exact prices from requirements
  // Using bruschetta image as placeholder for all items
  const menuData = {
    starters: [
      {
        id: 1,
        name: 'Bruschetta',
        description: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
        price: 8.50,
        image: bruschetaImg
      },
      {
        id: 2,
        name: 'Caesar Salad',
        description: 'Crisp romaine with homemade Caesar dressing',
        price: 9.00,
        image: caesarSaladImg
      }
    ],
    mainCourses: [
      {
        id: 3,
        name: 'Grilled Salmon',
        description: 'Served with lemon butter sauce and seasonal vegetables',
        price: 22.00,
        image: grilledSalmonImg
      },
      {
        id: 4,
        name: 'Ribeye Steak',
        description: '12 oz prime cut with garlic mashed potatoes',
        price: 28.00,
        image: ribeyeSteakImg
      },
      {
        id: 5,
        name: 'Vegetable Risotto',
        description: 'Creamy Arborio rice with wild mushrooms',
        price: 18.00,
        image: vegetableRisottoImg
      }
    ],
    desserts: [
      {
        id: 6,
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone',
        price: 7.50,
        image: tiramisuImg
      },
      {
        id: 7,
        name: 'Cheesecake',
        description: 'Creamy cheesecake with berry compote',
        price: 7.00,
        image: cheesecakeImg
      }
    ],
    beverages: [
      {
        id: 8,
        name: 'Red Wine (Glass)',
        description: 'A selection of Italian reds',
        price: 10.00,
        image: redWineGlassImg
      },
      {
        id: 9,
        name: 'White Wine (Glass)',
        description: 'Crisp and refreshing',
        price: 9.00,
        image: whiteWineGlassImg
      },
      {
        id: 10,
        name: 'Craft Beer',
        description: 'Local artisan brews',
        price: 6.00,
        image: craftBeerImg
      },
      {
        id: 11,
        name: 'Espresso',
        description: 'Strong and aromatic',
        price: 3.00,
        image: espressoImg
      }
    ]
  };

  /**
   * MenuItem Component
   * Renders individual menu item with image, name, description, and price
   */
  const MenuItem = ({ item }) => (
    <div className="menu-item">
      <div className="item-image-container">
        <img src={item.image} alt={item.name} className="item-image" />
      </div>
      <div className="item-content">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          <span className="item-price">${item.price.toFixed(2)}</span>
        </div>
        <p className="item-description">{item.description}</p>
      </div>
    </div>
  );

  /**
   * MenuCategory Component
   * Renders a category section with its items
   */
  const MenuCategory = ({ title, items }) => (
    <div className="menu-category">
      <h2 className="category-title">{title}</h2>
      <div className="category-items">
        {items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="menu-page">
      <Navigation />

      {/* Hero Header */}
      <section className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-main-title">Our Menu</h1>
          <p className="menu-subtitle">
            Discover our carefully crafted dishes blending traditional Italian flavors with modern innovation
          </p>
        </div>
      </section>

      {/* Menu Content */}
      <section className="menu-content">
        <div className="menu-container">

          {/* Starters Section */}
          <MenuCategory
            title="Starters"
            items={menuData.starters}
          />

          {/* Main Courses Section */}
          <MenuCategory
            title="Main Courses"
            items={menuData.mainCourses}
          />

          {/* Desserts Section */}
          <MenuCategory
            title="Desserts"
            items={menuData.desserts}
          />

          {/* Beverages Section */}
          <MenuCategory
            title="Beverages"
            items={menuData.beverages}
          />

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="menu-cta">
        <div className="cta-content">
          <h2>Ready to Experience Our Cuisine?</h2>
          <p>Book your table today and enjoy an unforgettable dining experience</p>
          <a href="/reservations" className="cta-button">Make a Reservation</a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;

