import { useState } from "react";
import axios from "axios";
import "./signup.css"; // ✅ Import the CSS

function Signup({ onSignup }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    platform: "",
    city: "",
    plan: ""
  });

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/signup", form);
      alert(res.data.message);
      if (res.data.message === "Signup successful") {
        onSignup(res.data.user); // send user data back
      }
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="signup-wrapper">
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        type="text"
        placeholder="Platform (Swiggy/Zomato)"
        value={form.platform}
        onChange={(e) => setForm({ ...form, platform: e.target.value })}
      />

      <input
        type="text"
        placeholder="City"
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />

      <select
        value={form.plan}
        onChange={(e) => setForm({ ...form, plan: e.target.value })}
      >
        <option value="">Select Plan</option>
        <option value="low">Low Risk (₹20/week)</option>
        <option value="medium">Medium Risk (₹30/week)</option>
        <option value="high">High Risk (₹50/week)</option>
      </select>

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;