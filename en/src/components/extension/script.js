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

let currentItems = [];
fetch('/en/src/components/extension/data.json')
    .then(response => response.json())
    .then(data => {
        allItems = data;
        loadMoreItems();
}).catch(error => console.error('Error loading items:', error));

function renderGridView(filteredItems) {
    const gridView = document.getElementById("gridView");
    const noResults = document.getElementById("noResults");
    gridView.innerHTML = "";
    if (filteredItems.length === 0) {
        noResults.classList.remove("hidden");
    } else {
        noResults.classList.add("hidden");
        filteredItems.forEach(item => {
            const card = `
                <div class="col-md-2 mb-4">
                    <div class="card border-0 shadow-lg rounded-lg">
                        <img src="${item.image}" alt="${item.name}" class="card-img-top">
                        <div class="card-body text-center">
                            <h5 class="card-title text-lg font-semibold text-gray-800" title="${item.name}">${item.name}</h5>
                            <p class="card-text text-gray-600" title="${item.description}">${item.description}</p>
                            <a href="vscode:extension/${item.extensionId}" class="btn btn-success mt-3 px-6 py-2 rounded-lg shadow-md">Download</a>
                        </div>
                    </div>
                </div>
            `;
            gridView.innerHTML += card;
        });
    }
}

function loadMoreItems() {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const loading = document.getElementById("loading");
    loading.classList.remove("hidden");
    setTimeout(() => {
        loading.classList.add("hidden");
        const nextItems = allItems.slice(currentItems.length, currentItems.length + 6);
        currentItems = [...currentItems, ...nextItems];
        renderGridView(currentItems);
        if (currentItems.length >= allItems.length) {
            loadMoreBtn.classList.add("hidden");
        }
    }, 1000);
}
    
document.getElementById("searchBar").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filteredItems = currentItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
    );
    renderGridView(filteredItems);
});
document.getElementById("loadMoreBtn").addEventListener("click", loadMoreItems);

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