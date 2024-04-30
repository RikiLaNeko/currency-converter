import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/eur');
      const { rates } = response.data;
      const currencyList = Object.keys(rates);
      setCurrencies(currencyList);
    };

    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (fromCurrency === toCurrency) {
      alert('Please select different currencies for conversion.');
      return;
    }

    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const { rates } = response.data;
    const conversionRate = rates[toCurrency];
    const convertedValue = (amount * conversionRate).toFixed(2);
    setConvertedAmount(convertedValue);
  };

  return (
    <div className="converter-box">
      <h2>Currency Converter</h2>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>From Currency:</label>
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To Currency:</label>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.filter((currency) => currency !== fromCurrency).map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <button className="convert-button" onClick={convertCurrency}>Convert</button>
      <div>
        <label>Converted Amount:</label>
        <span>{convertedAmount}</span>
      </div>
    </div>
  );
};

export default CurrencyConverter;
