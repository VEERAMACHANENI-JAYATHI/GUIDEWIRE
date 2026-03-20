# Persona: Ravi Kumar (Swiggy Delivery Partner)

---

## Basic Information
- **Name:** Ravi Kumar  
- **Age:** 26  
- **City:** Hyderabad  
- **Occupation:** Swiggy Delivery Partner  

### Education
- Completed Intermediate (12th grade)  
- Basic knowledge of using smartphones and delivery apps  

---

## Living Situation
- Lives in a rented 1BHK apartment in a suburban area of Hyderabad  
- Shares accommodation with a friend to reduce expenses  

---

## Biography
Ravi Kumar is a 26-year-old Swiggy delivery partner working full-time in Hyderabad. He works approximately 8–10 hours per day and completes around 18–25 deliveries daily. His income depends entirely on the number of deliveries he completes.  

On average, Ravi earns ₹700–₹900 per day, resulting in a weekly income of ₹5,000–₹7,000. However, his earnings are highly unstable and depend on external factors such as weather conditions and pollution levels.

---

## Goals
- Earn a stable and predictable weekly income  
- Save money for future financial security  
- Avoid sudden income loss during disruptions  

---

## Motivations
- Support his family financially  
- Maintain a flexible work schedule  
- Increase his overall earnings  

---

## Frustrations
- Heavy rainfall reduces deliveries and causes income loss of ₹300–₹500 per day  
- Extreme heat reduces working hours and productivity  
- High air pollution (AQI > 300) makes it unsafe to work outdoors  
- No financial protection against income loss  
- Weekly earnings are unpredictable  

---

## Personality
- Hardworking and dedicated, puts in long hours to earn a steady income  
- Makes practical decisions and avoids unnecessary risks  
- Not very tech-savvy but comfortable using delivery apps  
- Prefers simple and quick solutions  
- Avoids complicated or time-consuming processes  

# Application Workflow

The platform provides a parametric insurance solution for delivery partners, offering automatic compensation for income loss caused by real-world disruptions such as weather and environmental conditions, without requiring manual claims.
---

### 1. User Registration
The delivery partner registers on the platform by providing basic details such as name, city, and work type (e.g., Swiggy delivery partner).

---

### 2. Location Verification & Validation
The system securely captures the user’s real-time location using GPS (with user consent).

To prevent fraud and tampering:
- Location is verified periodically during active hours  
- Sudden or unrealistic location changes are flagged  
- Ensures the user is present in the affected area during disruptions  

---

### 3. Activity Validation
The system verifies whether the delivery partner is actively working during the time of disruption.

- Checks delivery activity (real or simulated data)  
- Ensures the user is engaged in deliveries  
- Prevents claims from inactive users  

This ensures that payouts are only provided for genuine income loss.

---

### 4. AI-Based Risk Assessment
The system analyzes the user’s location using historical data such as:
- Weather patterns  
- Temperature trends  
- Air Quality Index (AQI)  

Based on this analysis, a **risk score** is calculated and the **weekly premium** is determined.

---

### 5. Policy Purchase
The user selects and activates a weekly insurance plan based on the calculated premium.

---

### 6. Real-Time Monitoring
The system continuously monitors environmental conditions using APIs or simulated data:
- Rainfall levels  
- Temperature  
- Air quality (AQI)  

---

### 7. Trigger Detection
If any predefined condition exceeds its threshold (e.g., heavy rainfall or high AQI), the system automatically detects a disruption event.

---

### 8. Automatic Claim Processing
Once a trigger is detected:
- The claim is automatically initiated  
- No manual request is required from the user  

---

### 9. Instant Payout
The system calculates the income loss and instantly credits the payout to the user (simulated payment system).

---

### 10. Notification System
The user is notified in real-time when:
- A disruption is detected  
- A claim is initiated  
- A payout is processed  

This ensures transparency and keeps the user informed at all times.

---

### 11. Dashboard & Analytics

The platform provides an interactive dashboard where users can monitor their activity and financial protection.

Users can view:
- Active weekly policy status  
- Trigger events and history  
- Payout history and total earnings protected  

### Analytics & Insights
- Weekly income vs protected income comparison  
- Number of disruption events in a week  
- Total payouts received over time  
- Risk level trends based on location  

This helps delivery partners understand how external conditions impact their earnings and how the platform provides financial support.
---

This workflow ensures a **fast, reliable, and zero-effort insurance experience** for gig workers.

# Weekly Pricing Model

The platform follows a **weekly subscription-based insurance model**, where delivery partners pay a small premium to receive income protection during that week.

### Risk-Based Premium

The weekly premium is determined based on the overall risk level of the user’s working area using environmental factors such as rainfall, temperature, and air quality.

- **Low Risk Areas** → ₹20 per week  
- **Medium Risk Areas** → ₹30 per week  
- **High Risk Areas** → ₹50 per week  

> The delivery partner pays this premium at the beginning of each week to stay covered.

> The pricing is designed to be affordable for gig workers while ensuring platform sustainability.

---

# Parametric Triggers & Payouts

The system uses predefined environmental conditions (triggers) to automatically initiate payouts when disruptions occur during the active week.

> Payouts are provided per trigger event within the weekly coverage period.

> Maximum total payout is capped at ₹500 per week per user.

---

### Rainfall Trigger (Moderate Disruption)
- **Condition:** Rainfall > 50 mm/day  
- **Impact:** Slower deliveries and reduced orders  
- **Payout:** ₹100 per event (maximum 2 times per week)  

---

### Air Quality (AQI) Trigger
- **Condition:** AQI > 300  
- **Impact:** Unsafe working conditions due to pollution  
- **Payout:** ₹80 per event (maximum 2 times per week)  

---

### Heat Trigger
- **Condition:** Temperature > 42°C  
- **Impact:** Reduced working hours due to extreme heat  
- **Payout:** ₹80 per event (maximum 2 times per week)  

---

### Flood / Severe Disruption Trigger
- **Condition:** Flood alert or continuous heavy rainfall  
- **Impact:** Delivery operations are fully disrupted  
- **Payout:** ₹250 per week (one-time payout)  

---

### Restricted Zone / Curfew Trigger
- **Condition:** Area marked as restricted or inaccessible  
- **Impact:** Delivery partner cannot operate  
- **Payout:** ₹200 per week (one-time payout)  

---

# How It Works Together

- The delivery partner pays a **weekly premium** based on risk level  
- The system continuously monitors environmental conditions  
- If a trigger occurs, a payout is automatically processed  
- Multiple small triggers may occur, but total payout is capped  

> This ensures a **simple, transparent, and financially sustainable insurance system** for gig workers.


# AI/ML Approach

The platform leverages basic AI/ML concepts to make intelligent decisions regarding pricing, risk assessment, and fraud detection.

---

### Risk Assessment Model
The system uses historical environmental data such as:
- Rainfall patterns  
- Temperature trends  
- Air Quality Index (AQI)  

Based on this data, a **risk score** is calculated for each user’s location. This risk score is used to determine the appropriate **weekly premium**.

---

### Dynamic Pricing Logic
The weekly premium is dynamically assigned based on the calculated risk level:
- Low risk → lower premium  
- High risk → higher premium  

This ensures fair and personalized pricing for each delivery partner.

---

### Trigger Detection Logic
The system continuously monitors real-time environmental data and compares it with predefined thresholds.

When conditions exceed thresholds (e.g., heavy rainfall or high AQI), the system automatically triggers a payout event.

---

### Fraud Detection (Basic Logic)
To prevent misuse of the system, simple validation checks are applied:
- Location consistency verification (GPS validation)  
- Activity validation (ensuring the user is working)  
- Detection of unusual claim patterns  

These checks ensure that only genuine claims are processed.

---
# Tech Stack

The platform is designed using a simple and beginner-friendly full-stack architecture:

- **Frontend:** React  
- **Backend:** Flask (Python)  
- **Database:** MongoDB (Atlas Free Tier)  

---

### External APIs
- OpenWeatherMap API (Free Tier) – for rainfall and temperature data  
- AQICN API – for air quality (AQI) data  

---

### Logic Implementation
- Rule-based logic is used for:
  - Risk assessment  
  - Trigger detection  
  - Pricing calculation  

> This system can be extended to advanced machine learning models in future versions.

# Platform Choice

The platform is designed as a **web application** for the initial phase.

### Justification:
- Easy to develop and deploy quickly  
- Accessible across devices without installation  
- Suitable for prototype demonstration  
- Can be extended to a mobile app in future  

> In real-world deployment, this solution can be converted into a mobile application for better accessibility for delivery partners.
