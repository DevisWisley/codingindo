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
    showSnackbar('fas fa-check-circle', 'Anda sedang online!', 'linear-gradient(to right, #0f5132, #198754)');
});

window.addEventListener('offline', () => {
    showSnackbar('fas fa-times-circle', 'Anda sedang offline!', 'linear-gradient(to right, #842029, #dc3545)');
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
            title: 'Bagikan Teks',
            text: shareText
        }).catch(console.error);
    } else {
        alert("Berbagi tidak didukung pada browser ini.");
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

function repeatText() {
    const text = document.getElementById('inputText').value;
    const repeatInput = document.getElementById('repeatInput').value;
    const newLine = document.getElementById('newLine').checked;
    const addIndex = document.getElementById('addIndex').checked;
    let output = '';

    for (let i = 0; i < repeatInput; i++) {
        let repeatedText = text;
        if (addIndex) {
            repeatedText = (i + 1) + '. ' + repeatedText;
        }
        if (newLine) {
            output += repeatedText + '\n';
        } else {
            output += repeatedText + ' ';
        }
    }
    document.getElementById('outputText').value = output;
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