from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()

def get_database_uri():
    """Construct database URI from environment variables"""
    db_name = os.getenv('DB_NAME', 'cafe_fausse')
    db_user = os.getenv('DB_USER', 'postgres')
    db_password = os.getenv('DB_PASSWORD', 'postgres')
    db_host = os.getenv('DB_HOST', 'localhost')
    db_port = os.getenv('DB_PORT', '5432')

    return f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'

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
