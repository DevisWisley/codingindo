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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Declares the document as HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Comments to include credit to the creator, namely CodingIndo." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "The opening tag of an HTML element, with the <b style='background-color: #ececec;'>lang=\"en\"</b> attribute to indicate that the primary language of this document is English." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "The opening tag of the head element, where the metadata declarations and CSS links are located." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Meta tag to define character encoding as UTF-8, allowing support for a wide range of worldwide characters." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Meta tag to make a page responsive on mobile devices, by setting the initial scale of the page to 100%." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Currency Converter&lt;/title&gt;</b>", explanation_html: "State the page title as \"Currency Converter\"." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Links to an external CSS file named \"style.css\" for additional styling." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Linking to Bootstrap 5 CDN for pre-configured component styling." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Linking to TailwindCSS CDN version 2.2.19 for utility-based styling." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;body class=\"bg-gray-50\"&gt;</b>", explanation_html: "Open <b style='background-color: #ececec;'>body</b> tag with class <b style='background-color: #ececec;'>bg-gray-50</b> from TailwindCSS to provide a light gray background." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container mt-5\"&gt;</b>", explanation_html: "Create a <b style='background-color: #ececec;'>container</b> div for the main content with a top margin (mt-5) to give it some distance from the top of the page." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"card shadow p-5 rounded-xl border-0\"&gt;</b>", explanation_html: "Create a card with a shadow, padding 5, rounded corners (rounded-xl), and no border." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-center mb-5 text-3xl font-extrabold text-gray-800\"&gt;Currency Converter&lt;/h2&gt;</b>", explanation_html: "Displays the app title in the center of the page in a large, bold style and dark gray." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;form id=\"converter-form\"&gt;</b>", explanation_html: "Opens a form with <b style='background-color: #ececec;'>id=\"converter-form\"</b> for currency conversion." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Create a div with a bottom margin (mb-4) to set the spacing between form elements." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"amount\" class=\"form-label text-gray-700 font-medium\"&gt;Amount&lt;/label&gt;</b>", explanation_html: "Create a label for the amount input, with dark gray text color and medium font." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;input type=\"number\" class=\"form-control rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"amount\" placeholder=\"Enter amount\" required&gt;</b>", explanation_html: "Create a number type input to enter the amount to be converted, with large rounded styling, light gray border color, and blue ring effect when clicked." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"from-currency\" class=\"form-label text-gray-700 font-medium\"&gt;From&lt;/label&gt;</b>", explanation_html: "Label for the initial currency dropdown select (source)." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"from-currency\"&gt;</b>", explanation_html: "Dropdown to select the initial currency (source) with a blue focus effect." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;option value=\"USD\" selected&gt;USD - United States Dollar&lt;/option&gt;</b>", explanation_html: "Displays the available currency options in a dropdown, with the default option being <b style='background-color: #ececec;'>USD</b>." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"to-currency\" class=\"form-label text-gray-700 font-medium\"&gt;To&lt;/label&gt;</b>", explanation_html: "Label for the destination currency dropdown select." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"to-currency\"&gt;</b>", explanation_html: "Dropdown to select the destination currency." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;option value=\"USD\"&gt;USD - United States Dollar&lt;/option&gt;</b>", explanation_html: "Displays available currency options in the destination dropdown." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"text-center\"&gt;</b>", explanation_html: "Create a div to center the button." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;button type=\"submit\" class=\"btn btn-primary btn-lg px-5 py-3 shadow-lg hover:shadow-xl rounded-full bg-blue-600 hover:bg-blue-700 transition-transform transform hover:-translate-y-1\"&gt;Convert&lt;/button&gt;</b>", explanation_html: "Button to enable currency conversion with hover effect, shadow and transition transformation that gives a floating effect when hovered." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"result\" class=\"text-center mt-4 text-gray-800 text-xl font-bold\"&gt;&lt;/div&gt;</b>", explanation_html: "Div to display the conversion results at the bottom with large and bold font." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Link external JavaScript file \"style.css\" to add conversion functionality." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Linking Bootstrap JavaScript files from CDN for interactive components." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;html&gt;</b> element." }
];

const tableHtmlBody = document.getElementById("code-html-explanation-table");
codeHtmlExplanations.forEach(item => {
    const row = `
        <tr>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono text-center">${item.number}</td>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono">${item.code_html}</td>
            <td class="py-2 px-4 text-sm text-gray-700">${item.explanation_html}</td>
        </tr>
    `;
    tableHtmlBody.insertAdjacentHTML("beforeend", row);
});

const codeCssExplanations = [
    { number: 1, code_css: "<b style='background-color: #ececec;'>body { font-family: 'Inter', sans-serif; }</b>", explanation_css: "Set the font on the <b style='background-color: #ececec;'>body</b> element to \"Inter\" with a <b style='background-color: #ececec;'>sans-serif</b> fallback." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>.card { background-color: #f8f9fa; border-radius: 1rem; }</b>", explanation_css: "Set the <b style='background-color: #ececec;'>card</b> background to a light gray (<b style='background-color: #ececec;'>#f8f9fa</b>) and give it a rounded corner of <b style='background-color: #ececec;'>1 rem</b>." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>.form-control, .form-select { background-color: #f1f5f9; border: 1px solid #cbd5e1; transition: border-color 0.3s ease, box-shadow 0.3s ease; }</b>", explanation_css: "Sets the background of the <b style='background-color: #ececec;'>form-control</b> and <b style='background-color: #ececec;'>form-select</b> to a light gray (<b style='background-color: #ececec;'>#f1f5f9</b>), gives it a light gray border (<b style='background-color: #ececec;'>#cbd5e1</b>), and transitions the border and box-shadow colors on focus." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>.form-control:focus, .form-select:focus { border-color: #6366f1; box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25); }</b>", explanation_css: "When a <b style='background-color: #ececec;'>form-control</b> or <b style='background-color: #ececec;'>form-select</b> element is in focus, the border is purple (<b style='background-color: #ececec;'>#6366f1</b>), with a transparent light purple <b style='background-color: #ececec;'>box-shadow</b>." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>.btn { font-size: 1.125rem; }</b>", explanation_css: "Set the button font size (<b style='background-color: #ececec;'>btn</b>) to 1.125rem." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>#converter-form { max-width: 500px; margin: 0 auto; }</b>", explanation_css: "Set the maximum width of the converter form (<b style='background-color: #ececec;'>#converter-form</b>) to 500px and add auto margin so that the form is centered on the page." }
];

const tableCssBody = document.getElementById("code-css-explanation-table");
codeCssExplanations.forEach(item => {
    const row = `
        <tr>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono text-center">${item.number}</td>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono">${item.code_css}</td>
            <td class="py-2 px-4 text-sm text-gray-700">${item.explanation_css}</td>
        </tr>
    `;
    tableCssBody.insertAdjacentHTML("beforeend", row);
});

const codeJsExplanations = [
    { number: 1, code_js: "<b style='background-color: #ececec;'>document.getElementById('converter-form').addEventListener('submit', function(e) {</b>", explanation_js: "Add an event listener to the form with the id <b style='background-color: #ececec;'>converter-form</b> so that the function is executed when the form is submitted." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>e.preventDefault();</b>", explanation_js: "Prevents the default behavior of submitting a form from refreshing the page." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>const amount = document.getElementById('amount').value;</b>", explanation_js: "Gets the amount value entered from the input with the id <b style='background-color: #ececec;'>amount</b>." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const fromCurrency = document.getElementById('from-currency').value;</b>", explanation_js: "Gets the source currency value from the input with id <b style='background-color: #ececec;'>from-currency</b>." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>const toCurrency = document.getElementById('to-currency').value;</b>", explanation_js: "Gets the target currency value from the input with id <b style='background-color: #ececec;'>to-currency</b>." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>const exchangeRates = { ... };</b>", explanation_js: "Stores currency exchange rates in object form." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>const result = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);</b>", explanation_js: "Calculate the conversion result by multiplying the <b style='background-color: #ececec;'>amount</b> by the appropriate exchange rate, then rounding the result to 2 decimal places." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;</b>", explanation_js: "Returns the conversion result on the element with id <b style='background-color: #ececec;'>result</b> in the specified format." }
];

const tableJsBody = document.getElementById("code-js-explanation-table");
codeJsExplanations.forEach(item => {
    const row = `
        <tr>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono text-center">${item.number}</td>
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
