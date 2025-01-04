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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Specifies the document type as HTML5 to ensure compatibility with all modern browsers." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Comments stating the source of this code comes from CodingIndo." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Opens the <b style='background-color: #ececec;'>&lt;html&gt;</b> element and set the page language to English." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Opens the <b style='background-color: #ececec;'>&lt;head&gt;</b> element which contains metadata and CSS/JavaScript references for this page." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Comments on the next <b style='background-color: #ececec;'>&lt;meta&gt;</b> element that sets the character encoding." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Set the character encoding to UTF-8 to support various international characters." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for setting the viewport to be responsive on mobile devices --&gt;</b>", explanation_html: "Comments on viewport for responsiveness on mobile devices." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Set the initial display on mobile devices to make the page responsive." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Comments on the <b style='background-color: #ececec;'>&lt;title&gt;</b> element." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Calculator&lt;/title&gt;</b>", explanation_html: "Sets the page title that will appear in the browser tab." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Connecting Bootstrap CSS --&gt;</b>", explanation_html: "Comments on references to Bootstrap CSS." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Includes Bootstrap CSS version 5.3.0 for component styling." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;!-- Connecting TailwindCSS --&gt;</b>", explanation_html: "Comments on references to Tailwind CSS." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.tailwindcss.com\"&gt;&lt;/script&gt;</b>", explanation_html: "Includes the Tailwind CSS library for additional responsive styling." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;style&gt;...&lt;/style&gt;</b>", explanation_html: "Loads custom CSS for styling the calculator elements and their appearance." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;head&gt;</b> element." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Opens the <b style='background-color: #ececec;'>&lt;body&gt;</b> element which contains the main content of the page." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container\"&gt;</b>", explanation_html: "Opens a <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the <b style='background-color: #ececec;'>container</b> class as the main wrapper for the calculator and calculation history." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"calculator\"&gt;</b>", explanation_html: "Opens a <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the <b style='background-color: #ececec;'>calculator</b> class to wrap the calculator." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"display\" class=\"display mb-4\"&gt;0&lt;/div&gt;</b>", explanation_html: "Calculator screen display to display numbers or operation results." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;!-- Memory button --&gt;</b>", explanation_html: "Comments on the memory buttons on the calculator." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex flex-wrap\"&gt;</b>", explanation_html: "Opens a <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the <b style='background-color: #ececec;'>d-flex flex-wrap</b> class to wrap the memory button in a flexible row." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom btn-memory flex-grow-1\"...&lt;/button&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>MC</b>, <b style='background-color: #ececec;'>MR</b>, <b style='background-color: #ececec;'>M+</b>, and <b style='background-color: #ececec;'>M-</b> memory buttons are for managing the calculator memory (clear, recall, add, subtract)." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;!-- Clear, delete, percent, and divide buttons --&gt;</b>", explanation_html: "Comments on the <b style='background-color: #ececec;'>Clear</b>, <b style='background-color: #ececec;'>Delete</b>, <b style='background-color: #ececec;'>%</b>, and <b style='background-color: #ececec;'>Divide</b> buttons." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex flex-wrap\"&gt;</b>", explanation_html: "Opens a <b style='background-color: #ececec;'>&lt;div&gt;</b> element to group the <b style='background-color: #ececec;'>Clear</b>, <b style='background-color: #ececec;'>Delete</b>, <b style='background-color: #ececec;'>%</b>, and <b style='background-color: #ececec;'>Divide</b> buttons." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>C</b>, <b style='background-color: #ececec;'>⌫</b>, <b style='background-color: #ececec;'>%</b>, and <b style='background-color: #ececec;'>÷</b> keys are for basic calculator functions." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 7, 8, 9, and times --&gt;</b>", explanation_html: "Comments on the number keys <b style='background-color: #ececec;'>7</b>, <b style='background-color: #ececec;'>8</b>, <b style='background-color: #ececec;'>9</b>, and <b style='background-color: #ececec;'>×</b>." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "The number keys <b style='background-color: #ececec;'>7</b>, <b style='background-color: #ececec;'>8</b>, <b style='background-color: #ececec;'>9</b>, and <b style='background-color: #ececec;'>×</b> are for entering numbers and multiplication operators." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 4, 5, 6, and less --&gt;</b>", explanation_html: "Comments on the number keys <b style='background-color: #ececec;'>4</b>, <b style='background-color: #ececec;'>5</b>, <b style='background-color: #ececec;'>6</b>, and <b style='background-color: #ececec;'>−</b>." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "The number keys <b style='background-color: #ececec;'>4</b>, <b style='background-color: #ececec;'>5</b>, <b style='background-color: #ececec;'>6</b>, and <b style='background-color: #ececec;'>−</b> are for entering numbers and subtraction operators." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 1, 2, 3, and plus --&gt;</b>", explanation_html: "Comments on the number keys <b style='background-color: #ececec;'>1</b>, <b style='background-color: #ececec;'>2</b>, <b style='background-color: #ececec;'>3</b>, and <b style='background-color: #ececec;'>+</b>." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "The number keys <b style='background-color: #ececec;'>1</b>, <b style='background-color: #ececec;'>2</b>, <b style='background-color: #ececec;'>3</b>, and <b style='background-color: #ececec;'>+</b> are for entering numbers and addition operators." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 0, period, root, and equals --&gt;</b>", explanation_html: "Comments on the number keys <b style='background-color: #ececec;'>0</b>, <b style='background-color: #ececec;'>.</b> (decimal), <b style='background-color: #ececec;'>√</b> (root), and <b style='background-color: #ececec;'>=</b>." },
    { number: 34, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>0</b>, <b style='background-color: #ececec;'>.</b> (decimal), <b style='background-color: #ececec;'>√</b> (root), and <b style='background-color: #ececec;'>=</b> keys are for mathematical functions and calculation results." },
    { number: 35, code_html: "<b style='background-color: #ececec;'>&lt;!-- Rank button 2, Rank button 3, and Rank n buttons --&gt;</b>", explanation_html: "Comments on power buttons (square, cubic, power of n)." },
    { number: 36, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>x²</b>, <b style='background-color: #ececec;'>x³</b>, and <b style='background-color: #ececec;'>^</b> keys are for calculating the exponent of the entered number." },
    { number: 37, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the calculator <b style='background-color: #ececec;'>&lt;div&gt;</b> element." },
    { number: 38, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"history-container\"&gt;</b>", explanation_html: "Opens a <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the <b style='background-color: #ececec;'>history-container</b> class to display the calculation history." },
    { number: 39, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex justify-between align-items-center mb-2\"&gt;</b>", explanation_html: "Opens a <b style='background-color: #ececec;'>&lt;div&gt;</b> element to group the history title and clear history button." },
    { number: 40, code_html: "<b style='background-color: #ececec;'>&lt;h5&gt;History&lt;/h5&gt;</b>", explanation_html: "Displays the title \"History\" as the calculation history section." },
    { number: 41, code_html: "<b style='background-color: #ececec;'>&lt;button class=\"btn btn-clear-history\" onclick=\"clearHistory()\"&gt;Clear History&lt;/button&gt;</b>", explanation_html: "Button to clear the entire calculation history on the calculator." },
    { number: 42, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;div&gt;</b> element containing the title and the clear history button." },
    { number: 43, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"history\" class=\"history\"&gt;&lt;/div&gt;</b>", explanation_html: "Elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> dengan ID <b style='background-color: #ececec;'>history</b> untuk menampilkan riwayat perhitungan." },
    { number: 44, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the history <b style='background-color: #ececec;'>&lt;div&gt;</b> element." },
    { number: 45, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the container <b style='background-color: #ececec;'>&lt;div&gt;</b> element." },
    { number: 46, code_html: "<b style='background-color: #ececec;'>&lt;!-- Links a custom JavaScript file for this page --&gt;</b>", explanation_html: "Comments about the JavaScript file specific to this page." },
    { number: 47, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Connect external JavaScript file <b style='background-color: #ececec;'>script.js</b> for calculator logic." },
    { number: 48, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 49, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;html&gt;</b> element." }
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

const codeJsExplanations = [
    { number: 1, code_js: "<b style='background-color: #ececec;'>let display = document.getElementById('display');</b>", explanation_js: "Gets the element with the id <b style='background-color: #ececec;'>display</b> from the DOM and stores it in the <b style='background-color: #ececec;'>display</b> variable." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>let history = document.getElementById('history');</b>", explanation_js: "Gets the element with id <b style='background-color: #ececec;'>history</b> from the DOM and stores it in the <b style='background-color: #ececec;'>history</b> variable." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>let memory = 0;</b>", explanation_js: "Defines a memory variable to store a memory value with an initial value of 0." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>function clearDisplay()</b>", explanation_js: "Function to clear the calculator screen, changing the contents of the <b style='background-color: #ececec;'>display</b> elements to '0'." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>function deleteLast()</b>", explanation_js: "Function to delete the last character on the <b style='background-color: #ececec;'>display</b>. If the <b style='background-color: #ececec;'>display</b> is empty after deletion, it is filled with '0'." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>function appendNumber(number)</b>", explanation_js: "Function to add a number to the <b style='background-color: #ececec;'>display</b>. If the <b style='background-color: #ececec;'>display</b> contains '0', the number will replace it. Otherwise, the number is added to the end of the existing text." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>function appendOperator(operator)</b>", explanation_js: "Function to add operators (such as +, -, *, /) to the <b style='background-color: #ececec;'>display</b>, by adding spaces before and after the operator to separate it from other numbers." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>function calculateResult()</b>", explanation_js: "Function to calculate the result of a mathematical expression on the <b style='background-color: #ececec;'>display</b> using <b style='background-color: #ececec;'>eval</b>. If successful, the result is displayed and added to the history." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>function calculateSquareRoot()</b>", explanation_js: "Function to calculate the square root of the value in <b style='background-color: #ececec;'>display</b>. If successful, the result is displayed and added to the history." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>function memoryClear()</b>", explanation_js: "Function to delete values ​​in <b style='background-color: #ececec;'>memory</b>, setting <b style='background-color: #ececec;'>memory</b> to 0." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>function memoryRecall()</b>", explanation_js: "Function to display <b style='background-color: #ececec;'>memory</b> values ​​on the <b style='background-color: #ececec;'>display</b>." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>function memoryAdd()</b>", explanation_js: "Function to add the value on the <b style='background-color: #ececec;'>display</b> to <b style='background-color: #ececec;'>memory</b>. The value on the <b style='background-color: #ececec;'>display</b> is converted to a number using <b style='background-color: #ececec;'>parseFloat</b>." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>function memorySubtract()</b>", explanation_js: "Function to subtract the value on <b style='background-color: #ececec;'>display</b> from <b style='background-color: #ececec;'>memory</b>. The value on <b style='background-color: #ececec;'>display</b> is converted to a number using <b style='background-color: #ececec;'>parseFloat</b>." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>function addToHistory(entry)</b>", explanation_js: "Function to add an entry to history. Create a new <b style='background-color: #ececec;'>div</b> element with class <b style='background-color: #ececec;'>history-item</b> and add the <b style='background-color: #ececec;'>entry</b> text and add it at the beginning of the <b style='background-color: #ececec;'>history</b>." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>function clearHistory()</b>", explanation_js: "Function to delete all entries in the history, by emptying the contents of the <b style='background-color: #ececec;'>history</b> element." }
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
                window.location.href = "/src/download/Calculator.rar";
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

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentsContainer = document.getElementById('commentsContainer');
    const commentTitle = document.getElementById('commentTitle');
    const saveInfo = document.getElementById('saveInfo');
    let commentCount = 0;
    const savedName = localStorage.getItem('username');
    const savedEmail = localStorage.getItem('email');
    if (savedName) document.getElementById('username').value = savedName;
    if (savedEmail) document.getElementById('email').value = savedEmail;
    const updateCommentTitle = () => {
        commentTitle.textContent = `${commentCount} Comment`;
    };

    const createCommentElement = (comment, username, email) => {
        const commentElement = document.createElement('div');
        commentElement.className = "bg-white p-4 shadow-md rounded-lg";
        commentElement.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    ${username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h4 class="text-sm font-semibold">${username} - <span class="text-gray-400 text-xs"><i class="fas fa-clock"></i> ${new Date().toLocaleString()}</span></h4>
                    <p class="text-gray-600 text-sm">${email}</p>
                </div>
            </div>
            <p class="mt-3 text-gray-800">${comment}</p>
            <button class="btn btn-link text-sm reply-btn">Reply</button>
            <div class="ml-4 mt-3 hidden reply-form">
                <input type="text" class="form-control reply-name mb-2" placeholder="Enter your name..." required>
                <input type="email" class="form-control reply-email mb-2" placeholder="Enter your email..." required>
                <textarea rows="2" class="form-control reply-text mb-2" placeholder="Write your reply..." required></textarea>
                <button type="button" class="btn btn-secondary btn-sm submit-reply">Send Reply</button>
            </div>
            <div class="replies-container mt-3 space-y-3"></div>
        `;
        const replyBtn = commentElement.querySelector('.reply-btn');
        const replyForm = commentElement.querySelector('.reply-form');
        const submitReply = commentElement.querySelector('.submit-reply');
        const repliesContainer = commentElement.querySelector('.replies-container');
        replyBtn.addEventListener('click', () => {
            replyForm.classList.toggle('hidden');
        });
        
        submitReply.addEventListener('click', () => {
            const replyName = replyForm.querySelector('.reply-name').value.trim();
            const replyEmail = replyForm.querySelector('.reply-email').value.trim();
            const replyText = replyForm.querySelector('.reply-text').value.trim();
            if (replyName && replyEmail && replyText) {
                const replyElement = document.createElement('div');
                replyElement.className = "bg-gray-100 p-2 rounded-lg shadow-sm";
                replyElement.innerHTML = `
                    <div class="flex items-center space-x-3">
                        <div class="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            ${replyName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h4 class="text-sm font-semibold">${replyName} - <span class="text-gray-400 text-xs"><i class="fas fa-clock"></i> ${new Date().toLocaleString()}</span></h4>
                            <p class="text-gray-600 text-xs">${replyEmail}</p>
                        </div>
                    </div>
                    <p class="mt-2 text-gray-800">${replyText}</p>
                `;
                repliesContainer.appendChild(replyElement);
                replyForm.querySelector('.reply-name').value = '';
                replyForm.querySelector('.reply-email').value = '';
                replyForm.querySelector('.reply-text').value = '';
                replyForm.classList.add('hidden');
            } else {
                alert('All reply fields must be filled in!');
            }
        });
        return commentElement;
    };
    
    const addComment = (comment, username, email) => {
        const commentElement = createCommentElement(comment, username, email);
        commentsContainer.prepend(commentElement);
        commentCount++;
        updateCommentTitle();
        const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
        savedComments.push({ comment, username, email });
        localStorage.setItem('comments', JSON.stringify(savedComments));
    };
    
    const loadComments = () => {
        const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
        savedComments.forEach(({ comment, username, email }) => {
            addComment(comment, username, email);
        });
    };
    
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const comment = document.getElementById('comment').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        if (comment && username && email) {
            addComment(comment, username, email);
            if (saveInfo.checked) {
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
            }
            commentForm.reset();
        } else {
            alert('All fields must be filled!');
        }
    });
    updateCommentTitle();
    loadComments();
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