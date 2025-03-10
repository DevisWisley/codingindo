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

const subscriptMap = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
    'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
    'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
    'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
    'v': 'ᵥ', 'x': 'ₓ'
};

const reverseSubscriptMap = Object.fromEntries(
    Object.entries(subscriptMap).map(([k, v]) => [v, k])
);

function encodeToSubscript(str) {
    return str.split('').map(char => subscriptMap[char] || char).join('');
}

function encodeBtn() {
    const inputText = document.getElementById('inputText').value;
    const outputText = encodeToSubscript(inputText);
    document.getElementById('outputText').value = outputText;
}

function swapBtn() {
    const inputText = document.getElementById("inputText").value = '';
    const outputText = document.getElementById("outputText").value;
    document.getElementById("inputText").value = outputText;
    document.getElementById("outputText").value = inputText;
}

function decodeFromSubscript(str) {
    return str.split('').map(char => reverseSubscriptMap[char] || char).join('');
}

function decodeBtn() {
    const inputText = document.getElementById('inputText').value;
    const outputText = decodeFromSubscript(inputText);
    document.getElementById('outputText').value = outputText;
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