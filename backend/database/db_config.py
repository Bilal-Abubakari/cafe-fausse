from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

def init_app(app):
    """Initialize database with Flask app"""
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()
        print("Database tables initialized successfully!")

def reset_db(app):
    """Drop all tables and reinitialize (use with caution!)"""
    with app.app_context():
        db.drop_all()
        db.create_all()
        print("Database reset successfully!")
