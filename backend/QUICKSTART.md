# Café Fausse Backend - Quick Start Guide

## 🚀 Quick Start

### Step 1: Verify Environment
You should already have:
- ✅ Python virtual environment activated
- ✅ Flask installed
- ✅ Required packages installed

### Step 2: Set Up PostgreSQL Database

1. **Start PostgreSQL** (if not already running)

2. **Create the database**:
   ```sql
   CREATE DATABASE cafe_fausse;
   ```
   
   Or using psql command line:
   ```bash
   psql -U postgres
   CREATE DATABASE cafe_fausse;
   \q
   ```

3. **Update .env file** with your PostgreSQL credentials (if different from defaults):
   ```
   DB_NAME=cafe_fausse
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   DB_HOST=localhost
   DB_PORT=5432
   ```

### Step 3: Initialize Database Tables

Run the initialization script:
```bash
python init_db.py
```

This will create the `customers` and `reservations` tables using Flask-SQLAlchemy ORM.

### Step 4: Start the Flask Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

You should see:
```
Database tables initialized successfully!
 * Running on http://0.0.0.0:5000
```

### Step 5: Test the API

In a new terminal, run the test script:
```bash
python test_api.py
```

Or test manually with curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Newsletter signup
curl -X POST http://localhost:5000/api/newsletter/signup -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"name\":\"Test User\"}"
```

## 📋 Available API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/newsletter/signup` | Subscribe to newsletter |
| POST | `/api/reservations` | Create a reservation |
| GET | `/api/reservations` | Get all reservations |
| GET | `/api/reservations/<id>` | Get reservation by ID |
| GET | `/api/reservations/availability?timeslot=...` | Check availability |

## 🎯 Key Features Implemented

✅ **Customer Management**
- Stores customer information (name, email, phone)
- Tracks newsletter subscriptions
- Prevents duplicate customer records
- Uses SQLAlchemy ORM for clean, maintainable code

✅ **Reservation System**
- 30 tables total
- Automatic table assignment (random selection)
- Availability checking to prevent overbooking
- Unique constraint on (timeslot, table_number)
- Relationships defined between Customer and Reservation models

✅ **Form Validation**
- Email format validation
- Required field checking
- Guest count validation (1-20)
- Future date validation

✅ **CORS Enabled**
- Ready for React frontend integration
- Accepts requests from any origin (development mode)

✅ **Flask-SQLAlchemy ORM**
- Clean model definitions with relationships
- Type safety and validation at the model level
- Easy database migrations support
- Built-in query methods

## 🏗️ Database Architecture (Flask-SQLAlchemy)

### Customer Model
```python
class Customer(db.Model):
    customer_id = Primary Key
    customer_name = String(255)
    email = String(255) - Unique
    phone_number = String(20)
    newsletter_signup = Boolean
    created_at = DateTime
    # Relationship: One-to-Many with Reservations
```

### Reservation Model
```python
class Reservation(db.Model):
    reservation_id = Primary Key
    customer_id = Foreign Key -> Customer
    timeslot = DateTime
    table_number = Integer (1-30)
    number_of_guests = Integer
    created_at = DateTime
    # Constraints: Check table_number, unique (timeslot, table_number)
```

## 🔧 Troubleshooting

### Database Connection Error
```
Error connecting to database: could not connect to server
```
**Solution**: Ensure PostgreSQL is running and credentials in `.env` are correct.

### Database Does Not Exist
```
database "cafe_fausse" does not exist
```
**Solution**: Create the database using:
```bash
psql -U postgres -c "CREATE DATABASE cafe_fausse;"
```

### Port Already in Use
```
Address already in use
```
**Solution**: Change the port in `app.py` or kill the process using port 5000.

### Module Not Found
```
ModuleNotFoundError: No module named 'flask_sqlalchemy'
```
**Solution**: Ensure virtual environment is activated and run:
```bash
pip install -r requirements.txt
```

### SQLAlchemy Version Issues
If you encounter SQLAlchemy compatibility issues, ensure you have version 2.0+:
```bash
pip install --upgrade sqlalchemy flask-sqlalchemy
```

## 📦 Project Structure

```
backend/
├── app.py                      # Main Flask application with routes
├── init_db.py                  # Database initialization script
├── test_api.py                 # API testing script
├── requirements.txt            # Python dependencies (includes flask-sqlalchemy)
├── .env                        # Environment variables
├── .env.example                # Environment template
├── database/
│   ├── __init__.py
│   ├── db_config.py           # Flask-SQLAlchemy configuration
│   └── models.py              # SQLAlchemy models (Customer, Reservation)
└── docs/
    ├── context.md
    ├── copilot-guide.md
    └── requirements.md
```

## 🔄 Next Steps

1. **For Frontend Integration**: The backend is ready to connect with your React frontend
2. **Database Migrations**: Consider adding Flask-Migrate for schema version control
3. **Update CORS**: In production, update CORS settings in `app.py` to allow only your frontend domain
4. **Add Authentication**: Consider adding JWT or session-based auth for admin endpoints
5. **Deploy**: Deploy to a cloud platform (Heroku, AWS, DigitalOcean, etc.)

## 📝 Notes

- Database tables are created automatically using SQLAlchemy's `db.create_all()`
- To reset the database: `python init_db.py --reset`
- All timestamps are stored in UTC and returned in ISO 8601 format
- The system prevents double-booking automatically with unique constraints
- Relationships between models are properly defined for easy querying
- Uses SQLAlchemy sessions for transaction management
