const socialMedia = [
    { href: "https://codepen.io/DevisWisley/pens/public", backgroundColor: "#000000", hoverBackgroundColor: "#333333", icon: "fa-codepen", text: "CodePen" },
    { href: "https://www.facebook.com/devis.wisley/", backgroundColor: "#3b5998", hoverBackgroundColor: "#4b70b8", icon: "bi-facebook", text: "Facebook" },
    { href: "https://www.instagram.com/deviswisley/", backgroundColor: "#e1306c", hoverBackgroundColor: "#f1427d", icon: "bi-instagram", text: "Instagram" },
    { href: "https://github.com/DevisWisley", backgroundColor: "#333", hoverBackgroundColor: "#444", icon: "bi-github", text: "GitHub" },
    { href: "mailto:deviswisley27@gmail.com", backgroundColor: "#D44638", hoverBackgroundColor: "#e55749", icon: "bi-envelope", text: "Gmail" },
    { href: "https://t.me/deviswisley", backgroundColor: "#0088cc", hoverBackgroundColor: "#0099dd", icon: "bi-telegram", text: "Telegram" },
    { href: "https://www.threads.net/@deviswisley", backgroundColor: "#000000", hoverBackgroundColor: "#333333", icon: "fa-brands fa-threads", text: "Threads" },
    { href: "https://www.tiktok.com/@deviswisleysitumorang", backgroundColor: "#000000", hoverBackgroundColor: "#111111", icon: "bi-tiktok", text: "TikTok" },
    { href: "https://api.whatsapp.com/send?phone=6282274107967", backgroundColor: "#25D366", hoverBackgroundColor: "#36e477", icon: "bi-whatsapp", text: "WhatsApp" }
];

socialMedia.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "btn m-1 d-block d-md-none";
    a.style.backgroundColor = link.backgroundColor;
    a.style.color = "white";
    a.innerHTML = `<i class="${link.icon.includes('fa-') ? 'fa-brands' : 'bi'} ${link.icon} me-2"></i> ${link.text}`;
    a.addEventListener('mouseover', () => {
        a.style.backgroundColor = link.hoverBackgroundColor;
    });
    a.addEventListener('mouseout', () => {
        a.style.backgroundColor = link.backgroundColor;
    });
    document.querySelector('.d-flex.flex-wrap').appendChild(a);
});

window.addEventListener('load', () => {
    const loadingBar = document.getElementById('loadingBar');
    loadingBar.style.transform = 'scaleX(1)';
    setTimeout(() => {
        loadingBar.style.transform = 'scaleX(0)';
    }, 1200);
});

const itemsPerPage = 12;
let totalItems = 0;
let items = [];
let currentPage = 1;
let searchQuery = '';

async function fetchItems() {
    try {
        const response = await fetch('/tools/encoder decoder tools/data.json');
        items = await response.json();
        totalItems = items.length;
        renderList();
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function getRandomGradient() {
    const color1 = `hsl(${Math.random() * 360}, 70%, 50%)`;
    const color2 = `hsl(${Math.random() * 360}, 70%, 50%)`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}

function renderList() {
    const listContainer = document.getElementById('list-container');
    const noResults = document.getElementById('noResults');
    listContainer.innerHTML = '';
    noResults.style.display = 'none';
    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalFilteredItems = filteredItems.length;
    if (totalFilteredItems === 0) {
        noResults.style.display = 'block';
        document.getElementById('pageIndicator').innerText = '';
        return;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalFilteredItems);
    
    for (let i = startIndex; i < endIndex; i++) {
        const item = filteredItems[i];
        const gradient = getRandomGradient();
        listContainer.innerHTML += `
            <div class="col-md-4 text-center mb-4">
                <div class="list-item p-3 rounded-lg shadow-lg" style="background: ${gradient};">
                    <a href="${item.link}" class="text-white no-underline">
                        <img src="${item.icon}" class="mb-2 mx-auto" style="width: 100px; height: 100px;">
                        <h5 class="text-bold mb-2">${item.title}</h5>
                        <p class="mb-0">${item.summary}</p>
                    </a>
                </div>
            </div>
        `;
    }
    renderPagination(totalFilteredItems);
    updatePageIndicator(totalFilteredItems);
}

function updatePageIndicator(totalFilteredItems) {
    const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
    document.getElementById('pageIndicator').innerText = `Page ${currentPage} of ${totalPages}`;
}

function renderPagination(totalFilteredItems) {
    const paginationNumbers = document.getElementById('paginationNumbers');
    paginationNumbers.innerHTML = '';
    const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }
    document.getElementById('prevButton').classList.toggle('disabled', currentPage === 1);
    document.getElementById('nextButton').classList.toggle('disabled', currentPage === totalPages);
}

function changePage(page) {
    currentPage = page;
    renderList();
}

document.getElementById('prevButton').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) changePage(currentPage - 1);
});

document.getElementById('nextButton').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < Math.ceil(items.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).length / itemsPerPage)) {
        changePage(currentPage + 1);
    }
});

document.getElementById('searchButton').addEventListener('click', () => {
    searchQuery = document.getElementById('searchInput').value;
    currentPage = 1;
    renderList();
});

document.getElementById('clearButton').addEventListener('click', () => {
    searchQuery = '';
    document.getElementById('searchInput').value = '';
    currentPage = 1;
    renderList();
});

fetchItems();

document.querySelector(".buy-me-coffee-button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#bmc-wbtn").click(); 
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
    showSnackbar('fas fa-check-circle', 'You are online!', 'linear-gradient(to right, #0f5132, #198754)');
});

window.addEventListener('offline', () => {
    showSnackbar('fas fa-times-circle', 'You are offline!', 'linear-gradient(to right, #842029, #dc3545)');
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