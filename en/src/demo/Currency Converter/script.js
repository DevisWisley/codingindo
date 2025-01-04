document.getElementById('converter-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from default submit

    const amount = document.getElementById('amount').value; // Get the amount value from input
    const fromCurrency = document.getElementById('from-currency').value; // Get the source currency value from the input
    const toCurrency = document.getElementById('to-currency').value; // Get the target currency value from the input

    // Store the currency exchange rate in an object
    const exchangeRates = {
        USD: { USD: 1, EUR: 0.85, GBP: 0.75, IDR: 14500, JPY: 110, AUD: 1.35, CAD: 1.25, CHF: 0.92, CNY: 6.45 },
        EUR: { USD: 1.18, EUR: 1, GBP: 0.88, IDR: 17000, JPY: 129, AUD: 1.59, CAD: 1.47, CHF: 1.08, CNY: 7.58 },
        GBP: { USD: 1.34, EUR: 1.14, GBP: 1, IDR: 19500, JPY: 146, AUD: 1.81, CAD: 1.67, CHF: 1.22, CNY: 8.62 },
        IDR: { USD: 0.000069, EUR: 0.000059, GBP: 0.000051, IDR: 1, JPY: 0.0075, AUD: 0.000077, CAD: 0.000073, CHF: 0.000062, CNY: 0.00053 },
        JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0068, IDR: 133.33, JPY: 1, AUD: 0.012, CAD: 0.011, CHF: 0.0084, CNY: 0.059 },
        AUD: { USD: 0.74, EUR: 0.63, GBP: 0.55, IDR: 10667, JPY: 83.33, AUD: 1, CAD: 0.93, CHF: 0.69, CNY: 4.8 },
        CAD: { USD: 0.8, EUR: 0.68, GBP: 0.6, IDR: 11467, JPY: 90.91, AUD: 1.08, CAD: 1, CHF: 0.74, CNY: 5.16 },
        CHF: { USD: 1.09, EUR: 0.92, GBP: 0.82, IDR: 15417, JPY: 119.05, AUD: 1.45, CAD: 1.36, CHF: 1, CNY: 6.97 },
        CNY: { USD: 0.16, EUR: 0.13, GBP: 0.12, IDR: 1546.15, JPY: 16.95, AUD: 0.21, CAD: 0.19, CHF: 0.14, CNY: 1 },
    };

    // Calculate currency conversion results
    const result = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);

    // Display the conversion result into an element with the id 'result'
    document.getElementById('result').innerHTML = `
        <h4>${amount} ${fromCurrency} = ${result} ${toCurrency}</h4>
    `;
});