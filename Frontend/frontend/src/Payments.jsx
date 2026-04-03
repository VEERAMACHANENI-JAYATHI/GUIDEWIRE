import { useEffect, useState } from "react";
import axios from "axios";
import "./Payments.css"; // ✅ Import CSS

function Payments({ user }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://127.0.0.1:5000/history/${user.id}`)
        .then((res) => setHistory(res.data))
        .catch(() => alert("Error loading payments"));
    }
  }, [user]);

  return (
    <div className="payments-wrapper">
      <h1>💰 Payments History</h1>

      {history.length === 0 && <p className="no-payments">No payments yet</p>}

      {history.map((h, i) => (
        <div key={i} className="payment-card">
          <h3>{h.type} Trigger</h3>
          <p>Amount: ₹{h.amount}</p>
          <p>Time: {h.time}</p>
        </div>
      ))}
    </div>
  );
}

export default Payments;