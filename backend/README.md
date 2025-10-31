# Café Fausse Backend

Flask-based REST API for the Café Fausse restaurant website using Flask-SQLAlchemy ORM.

## Features

- **Customer Management**: Store customer information with email, phone, and newsletter preferences
- **Reservation System**: Book tables with automatic availability checking (30 tables total)
- **Newsletter Signup**: Email collection for marketing purposes
- **SQLAlchemy ORM**: Clean, maintainable database operations with model relationships

## Tech Stack

- **Framework**: Flask 3.x
- **ORM**: Flask-SQLAlchemy 3.1+
- **Database**: PostgreSQL
- **CORS**: Flask-CORS for frontend integration
- **Environment Management**: python-dotenv

## Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

## Installation

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL**:
   - Install PostgreSQL if not already installed
   - Create a database named `cafe_fausse`:
     ```sql
     CREATE DATABASE cafe_fausse;
     ```
   - Update `.env` file with your database credentials (copy from `.env.example` if needed)

5. **Initialize the database**:
   ```bash
   python init_db.py
   ```

## Configuration

Create a `.env` file in the backend directory (or copy from `.env.example`):

```env
# Flask Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database Configuration
DB_NAME=cafe_fausse
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

# CORS Configuration
CORS_ORIGINS=http://localhost:3000
```

## Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/api/health`
  - Returns API status

### Newsletter
- **POST** `/api/newsletter/signup`
  - Body: `{ "email": "user@example.com", "name": "John Doe" }`
  - Subscribes user to newsletter

### Reservations
- **POST** `/api/reservations`
  - Body: 
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "timeslot": "2024-12-25T19:00:00",
      "guests": 4,
      "newsletter_signup": true
    }
    ```
  - Creates a new reservation and assigns a random available table

- **GET** `/api/reservations`
  - Returns all reservations (admin endpoint)

- **GET** `/api/reservations/<reservation_id>`
  - Returns reservation details

- **GET** `/api/reservations/availability?timeslot=2024-12-25T19:00:00`
  - Checks table availability for a specific time slot

## Database Models (Flask-SQLAlchemy)

### Customer Model
```python
class Customer(db.Model):
    customer_id (Primary Key)
    customer_name (VARCHAR 255)
    email (VARCHAR 255, UNIQUE)
    phone_number (VARCHAR 20)
    newsletter_signup (BOOLEAN)
    created_at (TIMESTAMP)
    
    # Relationship: One-to-Many with Reservation
```

### Reservation Model
```python
class Reservation(db.Model):
    reservation_id (Primary Key)
    customer_id (Foreign Key -> Customer)
    timeslot (TIMESTAMP)
    table_number (INTEGER, 1-30)
    number_of_guests (INTEGER)
    created_at (TIMESTAMP)
    
    # Constraints:
    # - Check: table_number between 1-30
    # - Check: number_of_guests >= 1
    # - Unique: (timeslot, table_number)
```

## Development

### Working with SQLAlchemy

The application uses Flask-SQLAlchemy for all database operations. Key benefits:

- **Model Relationships**: Automatic joins and relationship management
- **Type Safety**: Field validation at the model level
- **Query Interface**: Clean, Pythonic query syntax
- **Transaction Management**: Automatic session handling with rollback on errors

### Reset Database
To drop and recreate all tables:
```bash
python init_db.py --reset
```

Or programmatically:
```python
from app import app
from database.db_config import reset_db
reset_db(app)
```

### Testing the API
You can test endpoints using:
- **cURL**: Command-line tool
- **Postman**: GUI application
- **Python script**: `python test_api.py`

Example cURL command:
```bash
curl -X POST http://localhost:5000/api/newsletter/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if the `cafe_fausse` database exists

### SQLAlchemy Import Errors
- Ensure Flask-SQLAlchemy is installed: `pip install flask-sqlalchemy`
- Check version compatibility: `pip list | grep -i sqlalchemy`

### CORS Issues
- Update `CORS_ORIGINS` in `.env` to match your frontend URL
- Restart the Flask server after changing `.env`

### Port Already in Use
- Change the port in `app.py`: `app.run(debug=True, port=5001)`

## Project Structure

```
backend/
├── database/
│   ├── __init__.py
│   ├── db_config.py       # SQLAlchemy configuration & initialization
│   └── models.py          # Customer & Reservation models + helpers
├── app.py                 # Main Flask application with routes
├── init_db.py             # Database initialization script
├── test_api.py            # API testing script
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Key Improvements with Flask-SQLAlchemy

✅ **Clean Model Definitions**: No more raw SQL queries  
✅ **Automatic Relationships**: Easy access to related data  
✅ **Type Safety**: Field validation at model level  
✅ **Transaction Management**: Automatic rollback on errors  
✅ **Migration Ready**: Easy to add Flask-Migrate later  
✅ **Pythonic Queries**: `Customer.query.filter_by(email=email).first()`  

## License

This project is part of the Quantic School of Business and Technology curriculum.
