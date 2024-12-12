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