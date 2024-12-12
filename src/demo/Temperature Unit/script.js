// Add event listener for form submit
document.getElementById('converterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Get the temperature value from the input
    const temp = parseFloat(document.getElementById('temperature').value);
    // Get the original unit value from the input
    const fromUnit = document.getElementById('fromUnit').value;
    // Get the target unit value from the input
    const toUnit = document.getElementById('toUnit').value;
    let result;
    // Check if the temperature value is valid
    if (isNaN(temp)) {
        result = "Please enter a valid temperature.";
    } else {
        // Convert temperature
        result = convertTemperature(temp, fromUnit, toUnit);
    }
    // Display the conversion result
    document.getElementById('result').textContent = result;
});

// Function to convert temperature
function convertTemperature(temp, from, to) {
    let kelvin;

    // Converts the original units to Kelvin
    switch (from) {
        case 'C': kelvin = temp + 273.15; break;
        case 'F': kelvin = (temp + 459.67) * 5/9; break;
        case 'K': kelvin = temp; break;
        case 'R': kelvin = temp * 5/9; break;
        case 'Re': kelvin = temp * 1.25 + 273.15; break;
        case 'De': kelvin = 373.15 - temp * 2/3; break;
        case 'N': kelvin = temp * 100/33 + 273.15; break;
        case 'Ro': kelvin = (temp - 7.5) * 40/21 + 273.15; break;
        case 'T': kelvin = 273.16; break;
        default: return "Invalid input unit.";
    }

    let finalTemp;
    // Convert from Kelvin to target units
    switch (to) {
        case 'C': finalTemp = kelvin - 273.15; break;
        case 'F': finalTemp = kelvin * 9/5 - 459.67; break;
        case 'K': finalTemp = kelvin; break;
        case 'R': finalTemp = kelvin * 9/5; break;
        case 'Re': finalTemp = (kelvin - 273.15) * 0.8; break;
        case 'De': finalTemp = (373.15 - kelvin) * 3/2; break;
        case 'N': finalTemp = (kelvin - 273.15) * 33/100; break;
        case 'Ro': finalTemp = (kelvin - 273.15) * 21/40 + 7.5; break;
        case 'T': finalTemp = 273.16; break;
        default: return "Invalid output unit.";
    }

    // Returns the conversion result in string format
    return `${temp} ${from} = ${finalTemp.toFixed(2)} ${to}`;
}