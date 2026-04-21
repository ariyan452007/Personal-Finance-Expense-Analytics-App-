import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCurrency(baseCurrency = 'USD') {
  const [currency, setCurrency] = useState(baseCurrency);
  const [exchangeRates, setExchangeRates] = useState({ USD: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If you want to use a real API like exchangerate-api.com:
    // const fetchRates = async () => {
    //   setLoading(true);
    //   try {
    //     const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    //     setExchangeRates(res.data.rates);
    //   } catch (error) {
    //     console.error("Failed to fetch exchange rates", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchRates();
  }, [baseCurrency]);

  const convertAmount = (amount, targetCurrency) => {
    if (!exchangeRates[targetCurrency]) return amount;
    return amount * exchangeRates[targetCurrency];
  };

  return { currency, setCurrency, convertAmount, loading };
}
