// Get the context from the canvas element with id 'barChart'
const ctx = document.getElementById('barChart').getContext('2d');

// Create a new chart with type 'bar'
const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        // Label for the x-axis
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            // Labels for the dataset
            label: 'Sales',
            // Data for chart
            data: [65, 59, 80, 81, 56, 55, 40],
            // Background color for each bar
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            // Border color for each bar
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            // Border thickness
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                // Start the y-axis from zero
                beginAtZero: true
            }
        }
    }
});