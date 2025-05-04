import React, { useState } from 'react';
import './App.css';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);
  const [birthDay, setBirthDay] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Function to calculate the age
  const calculateAge = () => {
    if (!birthDate) {
      setError("Please select a date of birth.");
      return;
    }

    const dob = new Date(birthDate);
    const today = new Date();

    // Check for invalid date
    if (isNaN(dob.getTime())) {
      setError("Invalid date format. Please select a valid date.");
      return;
    }

    // Check for future date
    if (dob > today) {
      setError("The birth date cannot be in the future.");
      return;
    }

    // Reset error message if valid date
    setError('');

    let ageYears = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      ageYears--;
    }

    setAge(ageYears);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornOn = days[dob.getDay()];
    setBirthDay(bornOn);

    if (ageYears >= 18) {
      setMessage('✅ You can apply for DL, Voter ID, PAN Card, and open a Bank Account.');
    } else {
      setMessage("🌱 You're a teen! Enjoy and focus on your career.");
    }
  };

  return (
    <div className="calculator-container">
      <h2>🎂 Age Calculator</h2>
      
      {/* Input to enter birth date */}
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        className="date-input"
      />
      
      {/* Button to calculate age */}
      <button onClick={calculateAge} className="calculate-button">
        Calculate Age
      </button>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Results Section */}
      {age !== null && !error && (
        <div className="result-box">
          <p>You are <strong>{age}</strong> years old.</p>
          <p>You were born on a <strong>{birthDay}</strong>.</p>
          <p className="message">{message}</p>
        </div>
      )}
    </div>
  );
}
