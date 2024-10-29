// Get element with id 'heatmap'
const heatmapContainer = document.getElementById('heatmap');

// Data for heatmap
const data = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
];

// Function to get color based on value
function getColor(value) {
    if (value <= 5) return 'rgb(198, 235, 255)';
    if (value <= 10) return 'rgb(132, 196, 255)';
    if (value <= 15) return 'rgb(66, 157, 255)';
    if (value <= 20) return 'rgb(0, 118, 255)';
    return 'rgb(0, 78, 170)';
}

// Iterate through each row of data
data.forEach(row => {
    // Iterate through each value in the row
    row.forEach(value => {
        // Create a div element for each value
        const cell = document.createElement('div');
        // Sets the background color based on the value
        cell.style.backgroundColor = getColor(value);
        // Add value text into div element
        cell.textContent = value;
        // Add a div element to the heatmap container
        heatmapContainer.appendChild(cell);
    });
});