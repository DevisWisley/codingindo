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

let currentPage = 1;
const itemsPerPage = 6;
fetch('/src/assets/js/menu/Bootstrap & TailwindCSS/data.json')
.then(response => response.json())
.then(data => {
    function renderListView(items, elementId) {
        const container = document.getElementById(elementId);
        container.innerHTML = items.map(item => `
            <div class="col-md-12 mb-4">
                <a href="${item.link}">
                    <div class="card" style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"">
                        <img src="${item.imageUrl}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title text-lg font-bold">${item.title}</h5>
                            <p class="card-text">${item.summary}</p>
                        </div>
                    </div>
                </a>
            </div>
        `).join('');
    }
    function renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationNumbers = document.getElementById('paginationNumbers');
        paginationNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationNumbers.innerHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <button class="page-link" onclick="goToPage(${i})">${i}</button>
                </li>
            `;
        }
        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = currentPage === totalPages;
        document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    }
    function goToPage(page) {
        currentPage = page;
        updateListView();
    }
    function updateListView() {
        const filteredData = filterData();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = filteredData.slice(startIndex, endIndex);
        const half = Math.ceil(paginatedItems.length / 2);
        const leftItems = paginatedItems.slice(0, half);
        const rightItems = paginatedItems.slice(half);
        renderListView(leftItems, 'listViewLeft');
        renderListView(rightItems, 'listViewRight');
        renderPagination(filteredData.length);
        document.getElementById('noResults').classList.toggle('d-none', filteredData.length > 0);
    }
    function filterData() {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        return data.filter(item => item.title.toLowerCase().includes(searchValue) || item.summary.toLowerCase().includes(searchValue));
    }
    document.getElementById('searchButton').addEventListener('click', () => {
        currentPage = 1;
        updateListView();
    });
    document.getElementById('clearButton').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        currentPage = 1;
        updateListView();
    });
    document.getElementById('prevButton').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateListView();
        }
    });
    document.getElementById('nextButton').addEventListener('click', () => {
        const totalPages = Math.ceil(filterData().length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updateListView();
        }
    });
    // Initial Load
    updateListView();
})
.catch(error => console.error('Error fetching data:', error));

document.querySelector(".buy-me-coffee-button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#bmc-wbtn").click(); 
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