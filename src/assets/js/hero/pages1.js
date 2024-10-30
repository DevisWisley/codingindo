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

function changeTheme(theme) {
    const themeLink = document.getElementById('theme-link');
    switch (theme) {
        case 'dark':
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism-dark.min.css';
            break;
        case 'funky':
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism-funky.min.css';
            break;
        case 'okaidia':
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism-okaidia.min.css';
            break;
        case 'twilight':
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism-twilight.min.css';
            break;
        case 'coy':
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism-coy.min.css';
            break;
        case 'solarizedlight':
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism-solarizedlight.min.css';
            break;
        case 'tomorrownight':
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism-tomorrow.min.css';
            break;
        default:
            themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/themes/prism.min.css';
    }
    localStorage.setItem('selectedTheme', theme);
    Prism.highlightAll();
    const themeModal = bootstrap.Modal.getInstance(document.getElementById('themeModal'));
    themeModal.hide();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
});

document.querySelectorAll('.raw-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const code = this.closest('.code-snippet-container').querySelector('pre code').innerText;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    });
});

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const code = this.closest('.code-snippet-container').querySelector('pre code').innerText;
        navigator.clipboard.writeText(code).then(() => {
            const toastEl = document.getElementById('toastNotification');
            const progressBar = document.getElementById('progressBar');
            toastEl.classList.remove('hidden');
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
            progressBar.style.width = '0%';
            let width = 0;
            const interval = setInterval(function () {
                width += 1;
                progressBar.style.width = width + '%';
                if (width >= 100) {
                    clearInterval(interval);
                }
            }, 30);
            setTimeout(function () {
                toast.hide();
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy code: ', err);
        });
    });
});

document.querySelectorAll('.extern-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const code = this.closest('.code-snippet-container').querySelector('pre code').innerText;
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    });
});

const codeHtmlExplanations = [
    { code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Defines the document as HTML5." },
    { code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "The opening tag for the HTML element and sets the page language as English (<b style='background-color: #ececec;'>en</b>)." },
    { code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "The opening tag for the <b style='background-color: #ececec;'>&lt;head&gt;</b> section which contains metadata and links to external resources." },
    { code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Sets the character encoding as UTF-8 to support international characters." },
    { code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Create responsive pages on mobile devices by setting the viewport to follow the width of the device's screen." },
    { code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Currency Converter&lt;/title&gt;</b>", explanation_html: "Set the page title as \"Currency Converter\", which will be displayed on the browser tab." },
    { code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Link an external CSS file named <b style='background-color: #ececec;'>style.css</b> to add custom styles to the page." },
    { code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Connect Bootstrap CSS for additional styles and grid-based layouts." },
    { code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Connect Tailwind CSS for additional styles and more flexible CSS utilities." },
    { code_html: "<b style='background-color: #ececec;'>&lt;body class=\"bg-gray-50\"&gt;</b>", explanation_html: "The opening tag for <b style='background-color: #ececec;'>&lt;body&gt;</b> with class <b style='background-color: #ececec;'>bg-gray-50</b> from Tailwind, which gives the page a light gray background." },
    { code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container mt-5\"&gt;</b>", explanation_html: "Create a main container for the application content with a top margin (<b style='background-color: #ececec;'>mt-5</b>) using Bootstrap." },
    { code_html: "<b style='background-color: #ececec;'>&lt;div class=\"card shadow p-5 rounded-xl border-0\"&gt;</b>", explanation_html: "Create cards with shadow, padding (<b style='background-color: #ececec;'>p-5</b>), rounded corners (<b style='background-color: #ececec;'>rounded-xl</b>), and no border (<b style='background-color: #ececec;'>border-0</b>) for a smoother look." },
    { code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-center mb-5 text-3xl font-extrabold text-gray-800\"&gt;Currency Converter&lt;/h2&gt;</b>", explanation_html: "Create the application title \"Currency Converter\" with centered text (<b style='background-color: #ececec;'>text-center</b>), bottom margin (<b style='background-color: #ececec;'>mb-5</b>), large text size (<b style='background-color: #ececec;'>text-3xl</b>), and dark gray text (text-gray-800)." },
    { code_html: "<b style='background-color: #ececec;'>&lt;form id=\"converter-form\"&gt;</b>", explanation_html: "Create a form with <b style='background-color: #ececec;'>id=\"converter-form\"</b> to hold the currency conversion input and logic." },
    { code_html: "<b style='background-color: #ececec;'>&lt;label for=\"amount\" class=\"form-label text-gray-700 font-medium\"&gt;Amount&lt;/label&gt;</b>", explanation_html: "Create a label for the (<b style='background-color: #ececec;'>amount</b>) input with a medium gray text style (<b style='background-color: #ececec;'>text-gray-700</b>) and medium font weight (<b style='background-color: #ececec;'>font-medium</b>)." },
    { code_html: "<b style='background-color: #ececec;'>&lt;input type=\"number\" class=\"form-control rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"amount\" placeholder=\"Enter amount\" required&gt;</b>", explanation_html: "Input numbers for the number of conversions with Bootstrap and Tailwind styling, such as <b style='background-color: #ececec;'>rounded-lg</b> for rounded corners and <b style='background-color: #ececec;'>focus:ring-blue-500</b> for a blue focus effect." },
    { code_html: "<b style='background-color: #ececec;'>&lt;label for=\"from-currency\" class=\"form-label text-gray-700 font-medium\"&gt;From&lt;/label&gt;</b>", explanation_html: "Create a label for the (<b style='background-color: #ececec;'>from-currency option</b>)." },
    { code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"from-currency\"&gt;</b>", explanation_html: "Dropdown (<b style='background-color: #ececec;'>select</b>) element to choose the source currency, with Bootstrap and Tailwind specific styling for a cleaner look." },
    { code_html: "<b style='background-color: #ececec;'>&lt;option value=\"USD\" selected&gt;USD - United States Dollar&lt;/option&gt;</b>", explanation_html: "The default option is for USD as the source currency, with a currency description." },
    { code_html: "<b style='background-color: #ececec;'><i>Another line of option code inside</i> &lt;select&gt;</b>", explanation_html: "Shows other currency options such as EUR, GBP, JPY, AUD, etc." },
    { code_html: "<b style='background-color: #ececec;'>&lt;label for=\"to-currency\" class=\"form-label text-gray-700 font-medium\"&gt;To&lt;/label&gt;</b>", explanation_html: "Label for the destination currency (<b style='background-color: #ececec;'>to-currency</b>) selection." },
    { code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"to-currency\"&gt;</b>", explanation_html: "Dropdown element to select the destination currency, with classes for Bootstrap and Tailwind styling." },
    { code_html: "<b style='background-color: #ececec;'><i>Another line of option code inside</i> &lt;select&gt;</b>", explanation_html: "Displays destination currency options such as EUR, GBP, JPY, AUD, etc." },
    { code_html: "<b style='background-color: #ececec;'>&lt;div class=\"text-center\"&gt;</b>", explanation_html: "Create a div to center the button element on the page." },
    { code_html: "<b style='background-color: #ececec;'>&lt;button type=\"submit\" class=\"btn btn-primary btn-lg px-5 py-3 shadow-lg hover:shadow-xl rounded-full bg-blue-600 hover:bg-blue-700 transition-transform transform hover:-translate-y-1\"&gt;Convert&lt;/button&gt;</b>", explanation_html: "Buttons to convert, with Bootstrap and Tailwind styles, such as large size (<b style='background-color: #ececec;'>btn-lg</b>), blue color (<b style='background-color: #ececec;'>bg-blue-600</b>), and hover animations that give an elevation effect." },
    { code_html: "<b style='background-color: #ececec;'>&lt;div id=\"result\" class=\"text-center mt-4 text-gray-800 text-xl font-bold\"&gt;&lt;/div&gt;</b>", explanation_html: "An empty <b style='background-color: #ececec;'>div</b> element with <b style='background-color: #ececec;'>id=\"result\"</b> to display the conversion results, with the text styled using Tailwind for large size (<b style='background-color: #ececec;'>text-xl</b>) and dark gray color (<b style='background-color: #ececec;'>text-gray-800</b>)." },
    { code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Linking external JavaScript file <b style='background-color: #ececec;'>script.js</b> for currency conversion logic." },
    { code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Linking Bootstrap JavaScript to support Bootstrap interactive components." },
    { code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Closing the <b style='background-color: #ececec;'>&lt;body&gt;</b> tag." },
    { code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Closing the <b style='background-color: #ececec;'>&lt;html&gt;</b> tag." }
];

const tableHtmlBody = document.getElementById("code-html-explanation-table");
codeHtmlExplanations.forEach(item => {
    const row = `
        <tr>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono">${item.code_html}</td>
            <td class="py-2 px-4 text-sm text-gray-700">${item.explanation_html}</td>
        </tr>
    `;
    tableHtmlBody.insertAdjacentHTML("beforeend", row);
});

const codeCssExplanations = [
    { code_css: "<b style='background-color: #ececec;'>body { font-family: 'Inter', sans-serif; }</b>", explanation_css: "Sets the font for the <b style='background-color: #ececec;'>&lt;body&gt;</b> element using the 'Inter' font with a <b style='background-color: #ececec;'>sans-serif</b> alternative." },
    { code_css: "<b style='background-color: #ececec;'>.card { background-color: #f8f9fa; border-radius: 1rem; }</b>", explanation_css: "Set the background of the element with the <b style='background-color: #ececec;'>card</b> class to a light gray (<b style='background-color: #ececec;'>#f8f9fa</b>) and add a border radius of 1 rem for a rounded corner look." },
    { code_css: "<b style='background-color: #ececec;'>.form-control, .form-select { background-color: #f1f5f9; border: 1px solid #cbd5e1; transition: border-color 0.3s ease, box-shadow 0.3s ease; }</b>", explanation_css: "Sets elements with the <b style='background-color: #ececec;'>form-control</b> and <b style='background-color: #ececec;'>form-select</b> classes with a light gray background (<b style='background-color: #ececec;'>#f1f5f9</b>), a medium gray border (<b style='background-color: #ececec;'>#cbd5e1</b>), and transition effects on the <b style='background-color: #ececec;'>border-color</b> and <b style='background-color: #ececec;'>box-shadow</b> on focus." },
    { code_css: "<b style='background-color: #ececec;'>.form-control:focus, .form-select:focus { border-color: #6366f1; box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25); }</b>", explanation_css: "When a <b style='background-color: #ececec;'>form-control</b> or <b style='background-color: #ececec;'>form-select</b> element has focus, the <b style='background-color: #ececec;'>border-color</b> changes to blue (#6366f1) and a semi-transparent light blue <b style='background-color: #ececec;'>box-shadow</b> is added around the element with the focus effect." },
    { code_css: "<b style='background-color: #ececec;'>.btn { font-size: 1.125rem; }</b>", explanation_css: "Set the font size of the element with the <b style='background-color: #ececec;'>btn</b> class to 1.125 rem to increase readability on the button." },
    { code_css: "<b style='background-color: #ececec;'>#converter-form { max-width: 500px; margin: 0 auto; }</b>", explanation_css: "Set the element with <b style='background-color: #ececec;'>id=\"converter-form\"</b> to have a maximum width of 500px and centered on the page (<b style='background-color: #ececec;'>margin: 0 auto</b>)." }
];

const tableCssBody = document.getElementById("code-css-explanation-table");
codeCssExplanations.forEach(item => {
    const row = `
        <tr>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono">${item.code_css}</td>
            <td class="py-2 px-4 text-sm text-gray-700">${item.explanation_css}</td>
        </tr>
    `;
    tableCssBody.insertAdjacentHTML("beforeend", row);
});

const codeJsExplanations = [
    { code_js: "<b style='background-color: #ececec;'>document.getElementById('converter-form').addEventListener('submit', function(e) {</b>", explanation_js: "Added an event listener for the form with the id <b style='background-color: #ececec;'>converter-form</b> to handle the <b style='background-color: #ececec;'>submit</b> event." },
    { code_js: "<b style='background-color: #ececec;'>e.preventDefault();</b>", explanation_js: "Prevents the default form submit action to prevent page reload." },
    { code_js: "<b style='background-color: #ececec;'>const amount = document.getElementById('amount').value;</b>", explanation_js: "Gets the amount value from the input with the id <b style='background-color: #ececec;'>amount</b>." },
    { code_js: "<b style='background-color: #ececec;'>const fromCurrency = document.getElementById('from-currency').value;</b>", explanation_js: "Gets the source currency value from the input element with id <b style='background-color: #ececec;'>from-currency</b>." },
    { code_js: "<b style='background-color: #ececec;'>const toCurrency = document.getElementById('to-currency').value;</b>", explanation_js: "Gets the target currency value from the input element with id <b style='background-color: #ececec;'>to-currency</b>." },
    { code_js: "<b style='background-color: #ececec;'>const exchangeRates = { ... };</b>", explanation_js: "Stores currency exchange rates in an <b style='background-color: #ececec;'>exchangeRates</b> object, where each currency has an exchange rate against every other currency." },
    { code_js: "<b style='background-color: #ececec;'>const result = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);</b>", explanation_js: "Calculates the conversion result by multiplying the (<b style='background-color: #ececec;'>amount</b>) by the exchange rate from the source currency to the destination currency. Use <b style='background-color: #ececec;'>.toFixed(2)</b> to limit the result to 2 decimal places." },
    { code_js: "<b style='background-color: #ececec;'>document.getElementById('result').innerHTML = ${amount} ${fromCurrency} = ${result} ${toCurrency};</b>", explanation_js: "Displays the conversion <b style='background-color: #ececec;'>result</b> in an element with the id result, with a format that shows the amount, source currency, conversion result, and destination currency." }
];

const tableJsBody = document.getElementById("code-js-explanation-table");
codeJsExplanations.forEach(item => {
    const row = `
        <tr>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono">${item.code_js}</td>
            <td class="py-2 px-4 text-sm text-gray-700">${item.explanation_js}</td>
        </tr>
    `;
    tableJsBody.insertAdjacentHTML("beforeend", row);
});

let downloadModal, progressModal, completedModal;
document.addEventListener("DOMContentLoaded", () => {
    downloadModal = new bootstrap.Modal(document.getElementById('downloadModal'));
    progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
    completedModal = new bootstrap.Modal(document.getElementById('completedModal'));
});

document.getElementById("confirmDownload").addEventListener("click", function() {
    downloadModal.hide();
    progressModal.show();
    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            progressText.textContent = 'Download completed!';
            progressBar.classList.remove('progress-bar-animated');
            setTimeout(() => {
                window.location.href = "/src/download/Currency Converter.rar";
                progressModal.hide();
                completedModal.show();
            }, 1000);
        } else {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
            progressText.textContent = `${progress}% completed`;
        }
    }, 500);

    document.getElementById("cancelDownload").addEventListener("click", function() {
        clearInterval(interval);
        progressBar.style.width = '0%';
        progressText.textContent = '0% completed';
    });
});

document.querySelectorAll(".closeCompleted").forEach(button => {
    button.addEventListener("click", function() {
        completedModal.hide();
    });
});

document.getElementById("openDownloadDialog").addEventListener("click", function() {
    if (!downloadModal._isDisposed) {
        downloadModal.show();
    }
});

function copyURL() {
    const copyText = document.getElementById("shareLink");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value).then(() => {
        const snackbar = document.createElement('div');
        snackbar.innerHTML = '<i class="uil uil-check-circle"></i> URL has been copied to clipboard!';
        snackbar.style.position = 'fixed';
        snackbar.style.bottom = '10px';
        snackbar.style.right = '10px';
        snackbar.style.backgroundColor = 'green';
        snackbar.style.color = 'white';
        snackbar.style.padding = '10px';
        snackbar.style.borderRadius = '5px';
        snackbar.style.zIndex = '1000';
        snackbar.style.display = 'block';
        document.body.appendChild(snackbar);
        setTimeout(() => {
            document.body.removeChild(snackbar);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy URL: ', err);
    });
}

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
