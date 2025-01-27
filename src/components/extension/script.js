document.addEventListener('DOMContentLoaded', function () {
    const drawerToggle = document.getElementById('drawerToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('overlay');

    drawerToggle.addEventListener('click', function () {
        drawer.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');

        if (toggleIcon.classList.contains('fa-bars')) {
            toggleIcon.classList.remove('fa-bars');
            toggleIcon.classList.add('fa-times');
        } else {
            toggleIcon.classList.remove('fa-times');
            toggleIcon.classList.add('fa-bars');
        }
    });

    overlay.addEventListener('click', function () {
        drawer.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
    });

    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownIcon = document.getElementById('dropdownIcon');

    dropdownToggle.addEventListener('click', function () {
        dropdownMenu.classList.toggle('hidden');
        dropdownIcon.classList.toggle('fa-chevron-down');
        dropdownIcon.classList.toggle('fa-chevron-up');
    });
});

window.addEventListener('load', () => {
    const loadingBar = document.getElementById('loadingBar');
    loadingBar.style.transform = 'scaleX(1)';
    setTimeout(() => {
        loadingBar.style.transform = 'scaleX(0)';
    }, 1200);
});

fetch('/src/components/extension/data.json')
    .then(response => response.json())
    .then(allItems => {
        let currentItems = [];
        function renderItems() {
            allItems.forEach(item => {
                const card = `
                    <div class="col-md-2 mb-4">
                        <div class="card border-0 shadow-lg rounded-lg">
                            <img src="${item.image}" alt="${item.name}" class="card-img-top">
                            <div class="card-body text-center">
                                <h5 class="card-title text-lg font-semibold text-gray-800">${item.name}</h5>
                                <p class="card-text text-gray-600">${item.description}</p>
                                <a href="vscode:extension/${item.extensionId}" class="btn btn-primary mt-3 px-6 py-2 rounded-lg shadow-md">Unduh</a>
                            </div>
                        </div>
                    </div>
                `;
                gridViewAll.innerHTML += card;
            });
        }
        renderItems();

        document.getElementById("searchBar").addEventListener("input", (event) => {
            const query = event.target.value.toLowerCase();
            const filteredItems = allItems.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );
            const gridViewAll = document.getElementById("gridViewAll");
            gridViewAll.innerHTML = "";
            
            filteredItems.forEach(item => {
                const card = `
                    <div class="col-md-2 mb-4">
                        <div class="card border-0 shadow-lg rounded-lg">
                            <img src="${item.image}" alt="${item.name}" class="card-img-top">
                            <div class="card-body text-center">
                                <h5 class="card-title text-lg font-semibold text-gray-800">${item.name}</h5>
                                <p class="card-text text-gray-600">${item.description}</p>
                                <a href="vscode:extension/${item.extensionId}" class="btn btn-primary mt-3 px-6 py-2 rounded-lg shadow-md">Unduh</a>
                            </div>
                        </div>
                    </div>
                `;
                gridViewAll.innerHTML += card;
            });
            document.getElementById("noResults").classList.toggle("hidden", filteredItems.length > 0);
        });
    })
    .catch(error => console.error('Error loading data:', error));

document.querySelector(".buy-me-coffee-button").addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector("#bmc-wbtn").click
});

function enterImmersiveReader() {
    const immersiveReader = document.createElement('div');
    immersiveReader.id = 'immersive-reader';
    immersiveReader.style.position = 'fixed';
    immersiveReader.style.top = '0';
    immersiveReader.style.left = '0';
    immersiveReader.style.width = '100%';
    immersiveReader.style.height = '100%';
    immersiveReader.style.backgroundColor = '#f0f0f0';
    immersiveReader.style.zIndex = '10000';
    immersiveReader.style.overflowY = 'auto';
    immersiveReader.style.padding = '30px';
    immersiveReader.style.boxSizing = 'border-box';
    immersiveReader.style.display = 'none';
    document.body.appendChild(immersiveReader);
}

enterImmersiveReader();

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
    showSnackbar('fas fa-check-circle', 'Anda sedang online!', 'linear-gradient(to right, #0f5132, #198754)');
});

window.addEventListener('offline', () => {
    showSnackbar('fas fa-times-circle', 'Anda sedang offline!', 'linear-gradient(to right, #842029, #dc3545)');
});

const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollBar = document.getElementById("scrollBar").children[0];
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollBar.style.width = scrollPercentage + "%";
};

scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
