from database.db_config import db
from datetime import datetime

class Customer(db.Model):
    """Customer model for storing customer information"""
    __tablename__ = 'customers'

    customer_id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    newsletter_signup = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship with reservations
    reservations = db.relationship('Reservation', backref='customer', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Customer {self.customer_name} - {self.email}>'

    def to_dict(self):
        """Convert customer object to dictionary"""
        return {
            'customer_id': self.customer_id,
            'name': self.customer_name,
            'email': self.email,
            'phone': self.phone_number,
            'newsletter_signup': self.newsletter_signup,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Reservation(db.Model):
    """Reservation model for storing table reservations"""
    __tablename__ = 'reservations'

    reservation_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    timeslot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Add constraint for table number range and unique timeslot-table combination
    __table_args__ = (
        db.CheckConstraint('table_number >= 1 AND table_number <= 30', name='check_table_number'),
        db.CheckConstraint('number_of_guests >= 1', name='check_guests'),
        db.UniqueConstraint('timeslot', 'table_number', name='unique_timeslot_table'),
    )

    def __repr__(self):
        return f'<Reservation {self.reservation_id} - Table {self.table_number}>'

    def to_dict(self):
        """Convert reservation object to dictionary"""
        return {
            'reservation_id': self.reservation_id,
            'customer_id': self.customer_id,
            'timeslot': self.timeslot.isoformat() if self.timeslot else None,
            'table_number': self.table_number,
            'guests': self.number_of_guests,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'customer_name': self.customer.customer_name if self.customer else None,
            'email': self.customer.email if self.customer else None,
            'phone': self.customer.phone_number if self.customer else None
        }

# Helper functions for database operations
def create_or_update_customer(name, email, phone='', newsletter_signup=False):
    """
    Create a new customer or update existing customer
    Returns customer object on success, None on failure
    """
    try:
        customer = Customer.query.filter_by(email=email).first()

        if customer:
            # Update existing customer
            if newsletter_signup:
                customer.newsletter_signup = True
            if phone:
                customer.phone_number = phone
            if name:
                customer.customer_name = name
        else:
            # Create new customer
            customer = Customer(
                customer_name=name if name else 'Guest',
                email=email,
                phone_number=phone if phone else None,
                newsletter_signup=newsletter_signup
            )
            db.session.add(customer)

        db.session.commit()
        return customer

    except Exception as e:
        db.session.rollback()
        print(f"Error creating/updating customer: {e}")
        return None

def create_reservation(customer_id, timeslot, table_number, number_of_guests):
    """
    Create a new reservation
    Returns reservation object on success, None on failure
    """
    try:
        reservation = Reservation(
            customer_id=customer_id,
            timeslot=timeslot,
            table_number=table_number,
            number_of_guests=number_of_guests
        )

        db.session.add(reservation)
        db.session.commit()

        return reservation

    except Exception as e:
        db.session.rollback()
        print(f"Error creating reservation: {e}")
        return None

def get_reservations_by_timeslot(timeslot):
    """
    Get count of reservations for a specific timeslot
    Returns count of existing reservations
    """
    try:
        count = Reservation.query.filter_by(timeslot=timeslot).count()
        return count
    except Exception as e:
        print(f"Error getting reservations by timeslot: {e}")
        return 0

def get_used_tables(timeslot):
    """
    Get list of used table numbers for a specific timeslot
    Returns list of table numbers
    """
    try:
        reservations = Reservation.query.filter_by(timeslot=timeslot).all()
        return [r.table_number for r in reservations]
    except Exception as e:
        print(f"Error getting used tables: {e}")
        return []

def add_newsletter_signup(email, name=''):
    """
    Add email to newsletter signup
    Returns True on success, False on failure
    """
    try:
        customer = Customer.query.filter_by(email=email).first()

        if customer:
            # Update existing customer
            customer.newsletter_signup = True
            db.session.commit()
            return True
        else:
            # Create new customer
            customer = Customer(
                customer_name=name if name else 'Newsletter Subscriber',
                email=email,
                newsletter_signup=True
            )
            db.session.add(customer)
            db.session.commit()
            return True

    except Exception as e:
        db.session.rollback()
        print(f"Error adding newsletter signup: {e}")
        return False

def get_customer_by_email(email):
    """
    Get customer by email
    Returns customer object or None
    """
    try:
        return Customer.query.filter_by(email=email).first()
    except Exception as e:
        print(f"Error getting customer by email: {e}")
        return None

def get_reservation_by_id(reservation_id):
    """
    Get reservation by ID
    Returns reservation object or None
    """
    try:
        return Reservation.query.get(reservation_id)
    except Exception as e:
        print(f"Error getting reservation by ID: {e}")
        return None

def get_all_reservations():
    """
    Get all reservations ordered by timeslot
    Returns list of reservation objects
    """
    try:
        return Reservation.query.order_by(Reservation.timeslot.desc()).all()
    except Exception as e:
        print(f"Error getting all reservations: {e}")
        return []
