"""
Test script for Café Fausse API endpoints
Run this after starting the Flask server to test functionality
"""

import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:5000/api"

def print_section(title):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def test_health_check():
    print_section("Testing Health Check")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_newsletter_signup():
    print_section("Testing Newsletter Signup")
    try:
        data = {
            "email": "test@example.com",
            "name": "Test User"
        }
        response = requests.post(f"{BASE_URL}/newsletter/signup", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code in [200, 201]
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_reservation():
    print_section("Testing Reservation Creation")
    try:
        # Create a reservation for tomorrow at 7 PM
        tomorrow = datetime.now() + timedelta(days=1)
        tomorrow_7pm = tomorrow.replace(hour=19, minute=0, second=0, microsecond=0)

        data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "202-555-1234",
            "timeslot": tomorrow_7pm.isoformat(),
            "guests": 4,
            "newsletter_signup": True
        }

        response = requests.post(f"{BASE_URL}/reservations", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 201
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_check_availability():
    print_section("Testing Availability Check")
    try:
        tomorrow = datetime.now() + timedelta(days=1)
        tomorrow_7pm = tomorrow.replace(hour=19, minute=0, second=0, microsecond=0)

        response = requests.get(
            f"{BASE_URL}/reservations/availability",
            params={"timeslot": tomorrow_7pm.isoformat()}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def test_get_reservations():
    print_section("Testing Get All Reservations")
    try:
        response = requests.get(f"{BASE_URL}/reservations")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("\n🧪 Café Fausse API Test Suite")
    print("=" * 60)
    print("Make sure the Flask server is running on http://localhost:5000")
    print("=" * 60)

    input("\nPress Enter to start testing...")

    results = []

    # Run all tests
    results.append(("Health Check", test_health_check()))
    results.append(("Newsletter Signup", test_newsletter_signup()))
    results.append(("Check Availability", test_check_availability()))
    results.append(("Create Reservation", test_reservation()))
    results.append(("Get All Reservations", test_get_reservations()))

    # Print summary
    print_section("Test Results Summary")
    for test_name, passed in results:
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name}: {status}")

    total = len(results)
    passed = sum(1 for _, p in results if p)
    print(f"\nTotal: {passed}/{total} tests passed")

if __name__ == '__main__':
    main()
"""
Database initialization script for Café Fausse
Run this script to create the database tables
"""

from database.db_config import init_db, reset_db
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
                reset_db()
                print("✅ Database reset successfully!")
            except Exception as e:
                print(f"❌ Error resetting database: {e}")
                sys.exit(1)
        else:
            print("Database reset cancelled.")
            sys.exit(0)
    else:
        try:
            print("\nInitializing database tables...")
            init_db()
            print("✅ Database initialized successfully!")
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

