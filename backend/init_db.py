"""
Database initialization script for Café Fausse
Run this script to create the database tables
"""

from app import app
from database.db_config import db, reset_db
import sys

def main():
    print("=" * 50)
    print("Café Fausse Database Initialization")
    print("=" * 50)

    if len(sys.argv) > 1 and sys.argv[1] == '--reset':
        print("\n⚠️  WARNING: This will delete all existing data!")
        response = input("Are you sure you want to reset the database? (yes/no): ")
        if response.lower() == 'yes':
            try:
                reset_db(app)
                print("✅ Database reset successfully!")
            except Exception as e:
                print(f"❌ Error resetting database: {e}")
                sys.exit(1)
        else:
            print("Database reset cancelled.")
            sys.exit(0)
    else:
        try:
            with app.app_context():
                db.create_all()
                print("\n✅ Database initialized successfully!")
                print("\nTables created:")
                print("  - customers")
                print("  - reservations")
                print("\nYou can now start the Flask application with: python app.py")
        except Exception as e:
            print(f"❌ Error initializing database: {e}")
            print("\nPlease ensure:")
            print("  1. PostgreSQL is running")
            print("  2. Database 'cafe_fausse' exists")
            print("  3. Database credentials in .env are correct")
            sys.exit(1)

if __name__ == '__main__':
    main()

