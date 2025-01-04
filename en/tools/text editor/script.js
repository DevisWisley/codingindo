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

document.addEventListener('DOMContentLoaded', () => {
    const htmlCode = document.getElementById('htmlCode');
    const cssCode = document.getElementById('cssCode');
    const jsCode = document.getElementById('jsCode');
    const preview = document.getElementById('preview');
    const htmlHighlight = document.getElementById('htmlHighlight');
    const cssHighlight = document.getElementById('cssHighlight');
    const jsHighlight = document.getElementById('jsHighlight');
    const themeSelector = document.getElementById('themeSelector');
    const prismTheme = document.getElementById('prismTheme');
    const wrapTextCheckbox = document.getElementById('wrapTextCheckbox');
    const lineNumbersCheckbox = document.getElementById('lineNumbersCheckbox');

    const updatePreview = () => {
        const html = htmlCode.value;
        const css = `<style>${cssCode.value}</style>`;
        const js = `<script>${jsCode.value}<\/script>`;
        const iframeContent = html + css + js;
        const iframeDoc = preview.contentDocument || preview.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(iframeContent);
        iframeDoc.close();
    };

    const updateHighlight = (textarea, highlightElement, language) => {
        highlightElement.textContent = textarea.value;
        Prism.highlightElement(highlightElement);
    };

    const savedTheme = localStorage.getItem('theme') || 'prism';
    const savedWrapText = localStorage.getItem('wrapText') === 'true';
    const savedLineNumbers = localStorage.getItem('lineNumbers') === 'true';
    themeSelector.value = savedTheme;
    prismTheme.href = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/${savedTheme}.min.css`;
    wrapTextCheckbox.checked = savedWrapText;
    const wrapText = savedWrapText ? 'soft' : 'off';
    htmlCode.wrap = wrapText;
    cssCode.wrap = wrapText;
    jsCode.wrap = wrapText;
    document.querySelectorAll('pre').forEach((pre) => {
        pre.style.whiteSpace = savedWrapText ? 'pre-wrap' : 'pre';
    });

    lineNumbersCheckbox.checked = savedLineNumbers;
    document.querySelectorAll('pre').forEach((pre) => {
        if (savedLineNumbers) {
            pre.classList.add('line-numbers');
        } else {
            pre.classList.remove('line-numbers');
        }
        Prism.highlightElement(pre.querySelector('code'));
    });

    themeSelector.addEventListener('change', () => {
        const selectedTheme = themeSelector.value;
        prismTheme.href = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/${selectedTheme}.min.css`;
        localStorage.setItem('theme', selectedTheme);
    });

    wrapTextCheckbox.addEventListener('change', () => {
        const wrapText = wrapTextCheckbox.checked ? 'soft' : 'off';
        htmlCode.wrap = wrapText;
        cssCode.wrap = wrapText;
        jsCode.wrap = wrapText;
        document.querySelectorAll('pre').forEach((pre) => {
            pre.style.whiteSpace = wrapTextCheckbox.checked ? 'pre-wrap' : 'pre';
        });
        localStorage.setItem('wrapText', wrapTextCheckbox.checked);
    });

    lineNumbersCheckbox.addEventListener('change', () => {
        document.querySelectorAll('pre').forEach((pre) => {
            if (lineNumbersCheckbox.checked) {
                pre.classList.add('line-numbers');
            } else {
                pre.classList.remove('line-numbers');
            }
            Prism.highlightElement(pre.querySelector('code'));
        });
        localStorage.setItem('lineNumbers', lineNumbersCheckbox.checked);
    });

    htmlCode.addEventListener('input', () => {
        updateHighlight(htmlCode, htmlHighlight, 'html');
        updatePreview();
    });

    cssCode.addEventListener('input', () => {
        updateHighlight(cssCode, cssHighlight, 'css');
        updatePreview();
    });

    jsCode.addEventListener('input', () => {
        updateHighlight(jsCode, jsHighlight, 'javascript');
        updatePreview();
    });

    updatePreview();
    updateHighlight(htmlCode, htmlHighlight, 'html');
    updateHighlight(cssCode, cssHighlight, 'css');
    updateHighlight(jsCode, jsHighlight, 'javascript');
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