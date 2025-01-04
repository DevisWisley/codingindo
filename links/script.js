window.addEventListener('load', () => {
    const loadingBar = document.getElementById('loadingBar');
    loadingBar.style.transform = 'scaleX(1)';
    setTimeout(() => {
        loadingBar.style.transform = 'scaleX(0)';
    }, 1200);
});

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function applyDarkMode(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.style.backgroundColor = '#2d3748';
        darkModeToggle.style.color = 'white';
        darkModeToggle.onmouseover = () => {
            darkModeToggle.style.backgroundColor = '#3b4252';
        };
        darkModeToggle.onmouseout = () => {
            darkModeToggle.style.backgroundColor = '#2d3748';
        };
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.style.backgroundColor = '#1a202c';
        darkModeToggle.style.color = 'white';
        darkModeToggle.onmouseover = () => {
            darkModeToggle.style.backgroundColor = '#2a2e35';
        };
        darkModeToggle.onmouseout = () => {
            darkModeToggle.style.backgroundColor = '#1a202c';
        };
    }
}

const isDarkMode = localStorage.getItem('darkMode') === 'true';
applyDarkMode(isDarkMode);

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    applyDarkMode(isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
});

function showSnackbar(iconClass, message, bgColor) {
    const snackbar = document.getElementById('snackbar');
    const snackbarIcon = document.getElementById('snackbar-icon');
    const snackbarMessage = document.getElementById('snackbar-message');
    snackbarMessage.textContent = message;
    snackbar.style.background = bgColor;
    snackbarIcon.className = iconClass;
    snackbar.classList.remove('hidden');
    setTimeout(() => {
        snackbar.classList.add('hidden');
    }, 3000);
}

window.addEventListener('online', () => {
    const bgColor = body.classList.contains('dark-mode') ? 'linear-gradient(to right, #0f5132, #198754)' : 'linear-gradient(to right, #198754, #28a745)';
    showSnackbar('fas fa-check-circle', 'You are online!', bgColor);
});

window.addEventListener('offline', () => {
    const bgColor = body.classList.contains('dark-mode') ? 'linear-gradient(to right, #842029, #dc3545)' : 'linear-gradient(to right, #FF0000, #dc3545)';
    showSnackbar('fas fa-times-circle', 'You are offline!', bgColor);
});