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

function copyText(elementId) {
    var copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand("copy");
}

function cutText(elementId) {
    var cutText = document.getElementById(elementId);
    cutText.select();
    document.execCommand("cut");
}

function pasteText(elementId) {
    navigator.clipboard.readText().then(text => {
        document.getElementById(elementId).value = text;
        convertText();
    });
}

function clearText(elementId) {
    document.getElementById(elementId).value = "";
}

function shareText(elementId) {
    var shareText = document.getElementById(elementId).value;
    if (navigator.share) {
        navigator.share({
            title: 'Shared Text',
            text: shareText
        }).catch(console.error);
    } else {
        alert("Sharing not supported on this browser.");
    }
}

function saveTextToFile(elementId) {
    const text = document.getElementById(elementId).value;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted_text.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

function printText(elementId) {
    const printContents = document.getElementById(elementId).value;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

document.getElementById('fileInput').addEventListener('change', (e) => {
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const previewImg = document.getElementById('previewImg');
    const fileInfo = document.getElementById('fileInfo');
    const file = fileInput.files[0];
    if (file) {
        const fileType = file.type;
        const fileName = file.name;
        filePreview.style.display = 'block';
        if (fileType.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                previewImg.style.display = 'block';
                fileInfo.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            previewImg.style.display = 'none';
            fileInfo.style.display = 'block';
            fileInfo.innerHTML = `<p><strong>File Name:</strong> ${fileName}</p><p><strong>File Type:</strong> ${fileType}</p>`;
        }
    } else {
        filePreview.style.display = 'none';
        previewImg.src = '';
        fileInfo.innerHTML = '';
    }
});

function encodeBtn() {
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('outputText');
    if (fileInput.files.length === 0) {
        alert('Please select a file to encode.');
        return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = btoa(e.target.result);
        output.value = base64;
    };
    reader.onerror = (e) => {
        alert('Error reading file');
    };
    reader.readAsBinaryString(file);
}

function decodeBtn() {
    const output = document.getElementById('outputText');
    const base64 = output.value;
    try {
        const binary = atob(base64);
        const byteNumbers = new Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            byteNumbers[i] = binary.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'decoded_file';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (e) {
        alert('Error decoding base64 string');
    }
}

document.querySelector(".buy-me-coffee-button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#bmc-wbtn").click(); 
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