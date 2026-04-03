import { useState, useEffect } from "react";
import axios from "axios";
import Signup from "./Signup";
import Login from "./Login";
import Payments from "./Payments";
import "./App.css";

function App() {
  const [wallet, setWallet] = useState(0);
  const [page, setPage] = useState("home");
  const [weather, setWeather] = useState(null);
  const [user, setUser] = useState(null);
  const [premiumDeducted, setPremiumDeducted] = useState(false);

  // GPS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log("Lat:", pos.coords.latitude);
      console.log("Lon:", pos.coords.longitude);
    });
  }, []);

  // Dashboard effect
  useEffect(() => {
    if (user && page === "dashboard") {
      // Deduct premium once
      if (!premiumDeducted) {
        axios
          .get(`http://127.0.0.1:5000/deduct-premium/${user.id}`)
          .then((res) => {
            setWallet(res.data.wallet);
            alert(res.data.message);
            setPremiumDeducted(true);
          })
          .catch(() => alert("Error checking premium"));
      }

      // Auto check every 10s
      const interval = setInterval(() => {
        axios
          .get(`http://127.0.0.1:5000/check-event/${user.id}`)
          .then((res) => {
            setWallet(res.data.wallet);
            setWeather(res.data.weather);
            if (res.data.message !== "No new disruption") {
              alert(res.data.message + " 💰");
            }
          })
          .catch(() => alert("Backend error"));
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user, page, premiumDeducted]);

  // Reset weekly premium (frontend fallback)
  useEffect(() => {
    const today = new Date();
    const msUntilSunday =
      (7 - today.getDay()) * 24 * 60 * 60 * 1000 - 
      today.getHours() * 3600 * 1000 - 
      today.getMinutes() * 60 * 1000 - 
      today.getSeconds() * 1000;
    const timeout = setTimeout(() => setPremiumDeducted(false), msUntilSunday);
    return () => clearTimeout(timeout);
  }, [premiumDeducted]);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h2>Insurance App</h2>
        <div>
          {!user ? (
            <>
              <button onClick={() => setPage("login")}>Login</button>
              <button onClick={() => setPage("signup")}>Signup</button>
            </>
          ) : (
            <>
              <button onClick={() => setPage("dashboard")}>Dashboard</button>
              <button onClick={() => setPage("payments")}>Payments</button>
              <button
                onClick={() => {
                  setUser(null);
                  setPage("home");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Home */}
        {page === "home" && (
          <div className="center-text">
            <h2>Welcome! Please Login or Signup</h2>
          </div>
        )}

        {/* Signup */}
        {page === "signup" && (
          <Signup
            onSignup={(userData) => {
              setUser(userData);
              setPage("dashboard");
            }}
          />
        )}

        {/* Login */}
        {page === "login" && (
          <Login
            onLogin={(userData) => {
              setUser(userData);
              setPage("dashboard");
            }}
          />
        )}

        {/* Payments */}
        {page === "payments" &&
          (user ? (
            <Payments user={user} />
          ) : (
            <div className="center-text">
              <h2>Please login first</h2>
            </div>
          ))}

        {/* Dashboard */}
        {page === "dashboard" && (
          <div className="dashboard">
            <h1>Dashboard</h1>
            {user && (
              <div>
                <h2>Welcome, {user.name}</h2>
                <h3>Platform: {user.platform}</h3>
                <h3>City: {user.city}</h3>
                <h3>Plan: {user.plan}</h3>
              </div>
            )}
            <h2 className="wallet">Wallet: ₹{wallet}</h2>

            {weather ? (
              <div className="weather-card">
                <h3>🌡 Temp: {weather.temp}°C</h3>
                <h3>🌧 Rain: {weather.rain}</h3>
                <h3>🌫 AQI: {weather.aqi}</h3>
              </div>
            ) : (
              <p>Loading weather...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;