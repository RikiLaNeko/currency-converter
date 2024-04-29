import React, { useEffect } from 'react';
import CurrencyConverter from './CurrencyConverter';
import './App.css';

function App() {
  useEffect(() => {
    const numStars = 100; // Nombre d'étoiles
    const starsContainer = document.querySelector('.stars');

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="App">
      <div className="stars"></div>
      <div className="container">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
