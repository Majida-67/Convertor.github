// Fetch exchange rates and convert currency
document.getElementById('currency-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('result');
    
    if (!amount || !fromCurrency || !toCurrency) {
        resultDiv.innerHTML = 'Please enter a valid amount and currencies.';
        return;
    }

    // Use a reliable currency exchange API (ensure you have your API key)
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Check if the target currency is valid
        if (!data.rates[toCurrency]) {
            resultDiv.innerHTML = 'Invalid target currency.';
            return;
        }

        const rate = data.rates[toCurrency];
        
        // Calculate converted amount
        const convertedAmount = (amount * rate).toFixed(2);
        
        // Display results
        resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = 'Error fetching exchange rate. Try again later.';
    }
});
