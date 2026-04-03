from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import mysql.connector
from datetime import datetime

app = Flask(__name__)
CORS(app)

last_trigger = None

# 🗄️ DB connection
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Jayathi2005*",
        database="devtrails",
        autocommit=True
    )

# 🌦️ WEATHER
def get_weather():
    url = "https://api.open-meteo.com/v1/forecast?latitude=17.385&longitude=78.4867&current_weather=true"
    res = requests.get(url).json()
    temp = res.get("current_weather", {}).get("temperature", 30)
    rain = 60 if temp < 25 else 10
    aqi = 320 if temp > 35 else 100
    return {"temp": temp, "rain": rain, "aqi": aqi}

# 💰 PLAN PRICE
def get_premium(plan):
    return {"low": 20, "medium": 30, "high": 50}.get(plan, 0)

# 🔐 SIGNUP
@app.route('/signup', methods=['POST'])
def signup():
    db = get_db()
    cursor = db.cursor()

    data = request.json
    cursor.execute("SELECT * FROM users WHERE email=%s", (data["email"],))
    if cursor.fetchone():
        return jsonify({"message": "User already exists"})

    cursor.execute("""
        INSERT INTO users (email, password, name, platform, city, plan, wallet)
        VALUES (%s, %s, %s, %s, %s, %s, 0)
    """, (data["email"], data["password"], data["name"],
          data["platform"], data["city"], data["plan"]))

    # Fetch the new user
    cursor.execute("SELECT id, name, platform, city, plan, wallet FROM users WHERE email=%s", (data["email"],))
    user = cursor.fetchone()
    return jsonify({
        "message": "Signup successful",
        "user": {
            "id": user[0],
            "name": user[1],
            "platform": user[2],
            "city": user[3],
            "plan": user[4],
            "wallet": user[5]
        }
    })

# 🔑 LOGIN
@app.route('/login', methods=['POST'])
def login():
    db = get_db()
    cursor = db.cursor()

    data = request.json
    cursor.execute("SELECT id, name, platform, city, plan, wallet FROM users WHERE email=%s AND password=%s",
                   (data["email"], data["password"]))
    user = cursor.fetchone()

    if user:
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user[0],
                "name": user[1],
                "platform": user[2],
                "city": user[3],
                "plan": user[4],
                "wallet": user[5]
            }
        })

    return jsonify({"message": "Invalid credentials"}), 401

# 💰 PREMIUM DEDUCT
@app.route('/deduct-premium/<int:user_id>', methods=['GET'])
def deduct(user_id):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT wallet, plan FROM users WHERE id=%s", (user_id,))
    wallet, plan = cursor.fetchone()
    premium = get_premium(plan)

    cursor.execute("""
        SELECT time FROM payouts
        WHERE user_id=%s AND trigger_type='Weekly Premium'
        ORDER BY time DESC LIMIT 1
    """, (user_id,))
    last = cursor.fetchone()
    now = datetime.now()

    deduct_this_week = False
    if last:
        last_deduction = last[0]
        year, week_num, _ = last_deduction.isocalendar()
        current_year, current_week, _ = now.isocalendar()
        if (year, week_num) != (current_year, current_week):
            deduct_this_week = True
    else:
        deduct_this_week = True

    if deduct_this_week:
        new_wallet = wallet - premium
        cursor.execute("UPDATE users SET wallet=%s WHERE id=%s", (new_wallet, user_id))
        cursor.execute("INSERT INTO payouts (user_id, trigger_type, amount, time) VALUES (%s, %s, %s, NOW())",
                       (user_id, 'Weekly Premium', premium))
        return jsonify({"message": f"₹{premium} deducted for Weekly Premium", "wallet": new_wallet})

    return jsonify({"message": "Weekly premium already deducted", "wallet": wallet})

# 🚀 TRIGGER EVENTS
@app.route('/check-event/<int:user_id>', methods=['GET'])
def check_event(user_id):
    global last_trigger
    db = get_db()
    cursor = db.cursor()

    weather = get_weather()
    trigger = None
    payout = 0

    if weather["rain"] > 50:
        trigger = "Rain"
        payout = 100
    elif weather["temp"] > 42:
        trigger = "Heat"
        payout = 80
    elif weather["aqi"] > 300:
        trigger = "AQI"
        payout = 80

    cursor.execute("SELECT wallet FROM users WHERE id=%s", (user_id,))
    wallet = cursor.fetchone()[0]

    if trigger and trigger != last_trigger:
        last_trigger = trigger
        new_wallet = wallet + payout
        cursor.execute("UPDATE users SET wallet=%s WHERE id=%s", (new_wallet, user_id))
        cursor.execute("INSERT INTO payouts (user_id, trigger_type, amount, time) VALUES (%s, %s, %s, NOW())",
                       (user_id, trigger, payout))
        return jsonify({"message": f"{trigger} Triggered", "wallet": new_wallet, "weather": weather})

    return jsonify({"message": "No new disruption", "wallet": wallet, "weather": weather})

# 📜 PAYMENTS HISTORY
@app.route('/history/<int:user_id>', methods=['GET'])
def history(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT trigger_type, amount, time FROM payouts WHERE user_id=%s ORDER BY time DESC", (user_id,))
    data = cursor.fetchall()
    history = [{"type": r[0], "amount": r[1], "time": str(r[2])} for r in data]
    return jsonify(history)

if __name__ == '__main__':
    app.run(debug=True)