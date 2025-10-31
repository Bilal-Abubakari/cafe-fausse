from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import random
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import database configuration and models
from database.db_config import db, init_app
from database.models import (
    Customer, Reservation,
    create_or_update_customer, create_reservation,
    get_reservations_by_timeslot, get_used_tables,
    add_newsletter_signup, get_all_reservations
)

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize database
init_app(app)

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'message': 'Backend is running'}), 200

# Newsletter signup endpoint
@app.route('/api/newsletter/signup', methods=['POST'])
def newsletter_signup():
    try:
        data = request.get_json()

        # Validate required fields
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400

        email = data['email'].strip()
        name = data.get('name', '').strip()

        # Basic email validation
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email format'}), 400

        # Add to database
        success = add_newsletter_signup(email, name)

        if success:
            return jsonify({
                'message': 'Successfully subscribed to newsletter!',
                'email': email
            }), 201
        else:
            return jsonify({'error': 'Failed to subscribe. Please try again.'}), 400

    except Exception as e:
        print(f"Error in newsletter signup: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# Create reservation endpoint
@app.route('/api/reservations', methods=['POST'])
def create_reservation_endpoint():
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['name', 'email', 'timeslot', 'guests']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field.capitalize()} is required'}), 400

        name = data['name'].strip()
        email = data['email'].strip()
        phone = data.get('phone', '').strip()
        timeslot = data['timeslot']
        guests = int(data['guests'])
        newsletter_signup = data.get('newsletter_signup', False)

        # Validate email format
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email format'}), 400

        # Validate number of guests
        if guests < 1 or guests > 20:
            return jsonify({'error': 'Number of guests must be between 1 and 20'}), 400

        # Parse and validate timeslot
        try:
            reservation_datetime = datetime.fromisoformat(timeslot.replace('Z', '+00:00'))
        except ValueError:
            return jsonify({'error': 'Invalid timeslot format'}), 400

        # Check if timeslot is in the future
        if reservation_datetime < datetime.now(reservation_datetime.tzinfo or None):
            return jsonify({'error': 'Reservation must be in the future'}), 400

        # Check table availability (30 tables total)
        existing_reservations = get_reservations_by_timeslot(reservation_datetime)

        if existing_reservations >= 30:
            return jsonify({
                'error': 'Sorry, all tables are booked for this time slot. Please choose another time.',
                'available': False
            }), 409

        # Get used tables and find available ones
        used_tables = get_used_tables(reservation_datetime)
        available_tables = [t for t in range(1, 31) if t not in used_tables]

        if not available_tables:
            return jsonify({
                'error': 'Sorry, all tables are booked for this time slot. Please choose another time.',
                'available': False
            }), 409

        # Assign a random available table
        table_number = random.choice(available_tables)

        # Create or update customer
        customer = create_or_update_customer(name, email, phone, newsletter_signup)

        if not customer:
            return jsonify({'error': 'Failed to create customer record'}), 500

        # Create reservation
        reservation = create_reservation(customer.customer_id, reservation_datetime, table_number, guests)

        if reservation:
            return jsonify({
                'message': 'Reservation confirmed successfully!',
                'reservation_id': reservation.reservation_id,
                'table_number': table_number,
                'timeslot': timeslot,
                'guests': guests,
                'customer_name': name
            }), 201
        else:
            return jsonify({'error': 'Failed to create reservation'}), 500

    except ValueError as ve:
        return jsonify({'error': f'Invalid data format: {str(ve)}'}), 400
    except Exception as e:
        print(f"Error creating reservation: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# Get all reservations (for admin purposes)
@app.route('/api/reservations', methods=['GET'])
def get_all_reservations_endpoint():
    try:
        reservations = get_all_reservations()
        return jsonify([r.to_dict() for r in reservations]), 200

    except Exception as e:
        print(f"Error fetching reservations: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# Get single reservation by ID
@app.route('/api/reservations/<int:reservation_id>', methods=['GET'])
def get_reservation_by_id_endpoint(reservation_id):
    try:
        reservation = Reservation.query.get(reservation_id)

        if not reservation:
            return jsonify({'error': 'Reservation not found'}), 404

        return jsonify(reservation.to_dict()), 200

    except Exception as e:
        print(f"Error fetching reservation: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# Check availability for a specific timeslot
@app.route('/api/reservations/availability', methods=['GET'])
def check_availability():
    try:
        timeslot = request.args.get('timeslot')

        if not timeslot:
            return jsonify({'error': 'Timeslot parameter is required'}), 400

        # Parse timeslot
        try:
            reservation_datetime = datetime.fromisoformat(timeslot.replace('Z', '+00:00'))
        except ValueError:
            return jsonify({'error': 'Invalid timeslot format'}), 400

        existing_reservations = get_reservations_by_timeslot(reservation_datetime)
        available_tables = 30 - existing_reservations

        return jsonify({
            'timeslot': timeslot,
            'total_tables': 30,
            'booked_tables': existing_reservations,
            'available_tables': available_tables,
            'is_available': available_tables > 0
        }), 200

    except Exception as e:
        print(f"Error checking availability: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
