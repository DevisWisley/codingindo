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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Declares the HTML document type." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Comments indicating the coder, namely \"CodingIndo\"." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "HTML opening element with document language set to English." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "The opening section for HTML document metadata." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Comments for the character encoding meta tag." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Sets the page character encoding to UTF-8." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for setting the viewport to be responsive on mobile devices --&gt;</b>", explanation_html: "Comments for meta tags for responsive display on mobile devices." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Sets the viewport to be responsive to the device screen width and an initial scale of 1.0." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Comments on page title." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Currency Converter&lt;/title&gt;</b>", explanation_html: "Set the page title to \"Currency Converter\"." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CSS file for styling --&gt;</b>", explanation_html: "Comments for links to external CSS files." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Link external CSS files for additional styling." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;!-- Bootstrap CSS link for styling --&gt;</b>", explanation_html: "Comments for link to Bootstrap CSS." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Connecting Bootstrap CDN for Bootstrap 5 default styling." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- TailwindCSS link for styling --&gt;</b>", explanation_html: "Comments for link to Tailwind CSS." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Connecting Tailwind CSS CDN for styling with Tailwind utilities." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Penutup elemen <b style='background-color: #ececec;'>&lt;head&gt;</b>." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;body class=\"bg-gray-50\"&gt;</b>", explanation_html: "Opening a <b style='background-color: #ececec;'>&lt;body&gt;</b> element with a light gray background using the Tailwind CSS class." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container mt-5\"&gt;</b>", explanation_html: "Opens a div with the Bootstrap <b style='background-color: #ececec;'>container</b> class and a top margin (<b style='background-color: #ececec;'>mt-5</b>)." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"card shadow p-5 rounded-xl border-0\"&gt;</b>", explanation_html: "Create a card element with Bootstrap and Tailwind classes to provide shadow, padding, rounded corners, and no border." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;!-- Application title --&gt;</b>", explanation_html: "Comments on the app title." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-center mb-5 text-3xl font-extrabold text-gray-800\"&gt;Currency Converter&lt;/h2&gt;</b>", explanation_html: "Displays the app title in large, bold, dark gray, centered text." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;!-- Form for currency conversion --&gt;</b>", explanation_html: "Comments for currency conversion form." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;form id=\"converter-form\"&gt;</b>", explanation_html: "Opens the form element with the id <b style='background-color: #ececec;'>converter-form</b>." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Opens a div for grouping input elements, with a bottom margin (<b style='background-color: #ececec;'>mb-4</b>)." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Comments for labels and amount input." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"amount\" class=\"form-label text-gray-700 font-medium\"&gt;Amount&lt;/label&gt;</b>", explanation_html: "Label for quantity input with gray text and medium font." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;input type=\"number\" class=\"form-control rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"amount\" placeholder=\"Enter amount\" required&gt;</b>", explanation_html: "<b style='background-color: #ececec;'>Number</b> type input for money amounts with Bootstrap and Tailwind styling, including gray border, blue focus, and \"Enter amount\" placeholder." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the div for the amount input." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Opens a div for initial currency input, with bottom margin (<b style='background-color: #ececec;'>mb-4</b>)." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;!-- Label and select for the source currency --&gt;</b>", explanation_html: "Comments on labels and initial currency choices." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"from-currency\" class=\"form-label text-gray-700 font-medium\"&gt;From&lt;/label&gt;</b>", explanation_html: "Labels for early currencies with gray text and medium font." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"from-currency\"&gt;</b>", explanation_html: "<b style='background-color: #ececec;'>&lt;select&gt;</b> element to select the initial currency with Bootstrap and Tailwind classes, blue focus." },
    { number: 34, code_html: "<b style='background-color: #ececec;'>&lt;option value=\"USD\" selected&gt;USD - United States Dollar&lt;/option&gt; <i>to</i> &lt;option value=\"CNY\">CNY - Chinese Yuan (China)&lt;/option&gt;</b>", explanation_html: "Options in select for various currencies, such as USD, EUR, GBP, etc. The first option is selected as default." },
    { number: 35, code_html: "<b style='background-color: #ececec;'>&lt;/select&gt;</b>", explanation_html: "Closes the select element for the initial currency." },
    { number: 36, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the div for the initial currency input." },
    { number: 37, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Opens a div for the destination currency input with a bottom margin (<b style='background-color: #ececec;'>mb-4</b>)." },
    { number: 38, code_html: "<b style='background-color: #ececec;'>&lt;!-- Label and select for destination currency --&gt;</b>", explanation_html: "Comments on labels and destination currency options." },
    { number: 39, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"to-currency\" class=\"form-label text-gray-700 font-medium\"&gt;To&lt;/label&gt;</b>", explanation_html: "Label for the destination currency with gray text and medium font." },
    { number: 40, code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"to-currency\"&gt;</b>", explanation_html: "<b style='background-color: #ececec;'>&lt;select&gt;</b> element to select the target currency with Bootstrap and Tailwind classes, blue focus." },
    { number: 41, code_html: "<b style='background-color: #ececec;'>&lt;option value=\"USD\"&gt;USD - United States Dollar&lt;/option&gt; <i>to</i> &lt;option value=\"CNY\">CNY - Chinese Yuan (China)&lt;/option&gt;</b>", explanation_html: "Options in select for various destination currencies like USD, EUR, GBP, etc." },
    { number: 42, code_html: "<b style='background-color: #ececec;'>&lt;/select&gt;</b>", explanation_html: "Closes the select element for the target currency." },
    { number: 43, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the div for the destination currency input." },
    { number: 44, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"text-center\"&gt;</b>", explanation_html: "Opens a div for the convert button, with center aligned text." },
    { number: 45, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to perform conversion --&gt;</b>", explanation_html: "Comments for the conversion button." },
    { number: 46, code_html: "<b style='background-color: #ececec;'>&lt;button type=\"submit\" class=\"btn btn-primary btn-lg px-5 py-3 shadow-lg hover:shadow-xl rounded-full bg-blue-600 hover:bg-blue-700 transition-transform transform hover:-translate-y-1\"&gt;Convert&lt;/button&gt;</b>", explanation_html: "Button to submit form with Bootstrap and Tailwind classes, hover effect, shadow, animation and blue color." },
    { number: 47, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the div for the conversion button." },
    { number: 48, code_html: "<b style='background-color: #ececec;'>&lt;/form&gt;</b>", explanation_html: "Closes a form element." },
    { number: 49, code_html: "<b style='background-color: #ececec;'>&lt;!-- Div to display conversion results --&gt;</b>", explanation_html: "Comments for the converted div." },
    { number: 50, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"result\" class=\"text-center mt-4 text-gray-800 text-xl font-bold\"&gt;&lt;/div&gt;</b>", explanation_html: "Div to display the conversion results, with large, bold, dark gray text." },
    { number: 51, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the div for the card element." },
    { number: 52, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the main container div." },
    { number: 53, code_html: "<b style='background-color: #ececec;'>&lt;!-- JavaScript file link for functionality --&gt;</b>", explanation_html: "Comments for external JavaScript files." },
    { number: 54, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Connect external JavaScript files for conversion functionality." },
    { number: 55, code_html: "<b style='background-color: #ececec;'>&lt;!-- Bootstrap JavaScript link for functionality --&gt;</b>", explanation_html: "Comments for Bootstrap JavaScript." },
    { number: 56, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Connecting the Bootstrap JavaScript CDN for Bootstrap interactive functions." },
    { number: 57, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 58, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>&lt;html&gt;</b> element." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>/* Sets the font for the body element */</b>", explanation_css: "Comments to explain that the following rule will set the font on the <b style='background-color: #ececec;'>body</b> element." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>body {</b>", explanation_css: "Opens the CSS rules for the <b style='background-color: #ececec;'>body</b> element." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>font-family: 'Inter', sans-serif;</b>", explanation_css: "Sets the <b style='background-color: #ececec;'>Inter</b> font as the primary font on the <b style='background-color: #ececec;'>body</b>; element uses a <b style='background-color: #ececec;'>sans-serif</b> as a fallback." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the CSS rules for the <b style='background-color: #ececec;'>body</b> element." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>/* Sets the background and border radius for elements with class card */</b>", explanation_css: "Comments to explain that the following rules set the background and border radius of elements with the <b style='background-color: #ececec;'>card</b> class." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>.card {</b>", explanation_css: "Opens the CSS rules for elements with the <b style='background-color: #ececec;'>.card</b> class." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>background-color: #f8f9fa;</b>", explanation_css: "Sets the background color of the <b style='background-color: #ececec;'>.card</b> element to light gray (#f8f9fa)." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>border-radius: 1rem;</b>", explanation_css: "Sets the corners of the <b style='background-color: #ececec;'>.card</b> element to be curved with a radius of 1rem." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the CSS rules for the <b style='background-color: #ececec;'>.card</b> element." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>/* Set the background, border, and transition for elements with the form-control and form-select classes */</b>", explanation_css: "Comments to explain that the following rules set the background, borders, and transitions for elements with the classes <b style='background-color: #ececec;'>form-control</b> and <b style='background-color: #ececec;'>form-select</b>." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>.form-control,</b>", explanation_css: "Opens the CSS rules for elements with the class <b style='background-color: #ececec;'>.form-control</b>." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>.form-select {</b>", explanation_css: "Combines CSS rules for elements with the <b style='background-color: #ececec;'>.form-select</b> class along with <b style='background-color: #ececec;'>.form-control</b>." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>background-color: #f1f5f9;</b>", explanation_css: "Set the background color to light gray (#f1f5f9)." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>border: 1px solid #cbd5e1;</b>", explanation_css: "Set a 1px border with a gray color (#cbd5e1)." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>transition: border-color 0.3s ease, box-shadow 0.3s ease;</b>", explanation_css: "Sets a smooth transition for border color changes and box shadows over 0.3 seconds." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes CSS rules for <b style='background-color: #ececec;'>.form-control</b> and <b style='background-color: #ececec;'>.form-select</b>." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>/* Sets the border and box-shadow when an element with the class form-control and form-select is in focus */</b>", explanation_css: "Comments explain that the following rules set the border and box shadow when the <b style='background-color: #ececec;'>.form-control</b> and <b style='background-color: #ececec;'>.form-select</b> elements gain focus." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>.form-control:focus,</b>", explanation_css: "Opens the CSS rules for the <b style='background-color: #ececec;'>.form-control</b> element in focus." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>.form-select:focus {</b>", explanation_css: "Combines CSS rules for <b style='background-color: #ececec;'>.form-select</b> elements in focus state along with <b style='background-color: #ececec;'>.form-control</b>." },
    { number: 20, code_css: "<b style='background-color: #ececec;'>border-color: #6366f1;</b>", explanation_css: "Changes the border color to blue (with color code #6366f1) when the element is in focus." },
    { number: 21, code_css: "<b style='background-color: #ececec;'>box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);</b>", explanation_css: "Adds a semi-transparent blue shadow with a size of 0.2rem when the element is in focus." },
    { number: 22, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes CSS rules for <b style='background-color: #ececec;'>.form-control</b> and <b style='background-color: #ececec;'>.form-select</b> in focus state." },
    { number: 23, code_css: "<b style='background-color: #ececec;'>/* Sets the font size for elements with class btn */</b>", explanation_css: "Comments to explain that the following rule sets the font size for elements with the class <b style='background-color: #ececec;'>btn</b>." },
    { number: 24, code_css: "<b style='background-color: #ececec;'>.btn {</b>", explanation_css: "Opens CSS rules for elements with class <b style='background-color: #ececec;'>.btn</b>." },
    { number: 25, code_css: "<b style='background-color: #ececec;'>font-size: 1.125rem;</b>", explanation_css: "Sets the font size of the <b style='background-color: #ececec;'>.btn</b> element to 1.125rem." },
    { number: 26, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the CSS rules for the <b style='background-color: #ececec;'>.btn</b> element." },
    { number: 27, code_css: "<b style='background-color: #ececec;'>/* Sets the maximum width and margin for the element with the id converter-form */</b>", explanation_css: "Comments to explain that the following rules set the maximum width and margin for the element with the id <b style='background-color: #ececec;'>converter-form</b>." },
    { number: 28, code_css: "<b style='background-color: #ececec;'>#converter-form {</b>", explanation_css: "Opens the CSS rules for the element with the id <b style='background-color: #ececec;'>converter-form</b>." },
    { number: 29, code_css: "<b style='background-color: #ececec;'>max-width: 500px;</b>", explanation_css: "Set the max width of the <b style='background-color: #ececec;'>#converter-form</b> element to 500px to keep the display responsive." },
    { number: 30, code_css: "<b style='background-color: #ececec;'>margin: 0 auto;</b>", explanation_css: "Automatically sets the margins of the <b style='background-color: #ececec;'>#converter-form</b> element to center the page." },
    { number: 31, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the CSS rules for the <b style='background-color: #ececec;'>#converter-form</b> element." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>document.getElementById('converter-form').addEventListener('submit', function(e) {</b>", explanation_js: "Add an event listener on the element with the id <b style='background-color: #ececec;'>converter-form</b> to handle the <b style='background-color: #ececec;'>submit</b> event, and execute a function when the form is submitted." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>e.preventDefault();</b>", explanation_js: "Prevents the default behavior of the form, which is to <b style='background-color: #ececec;'>submit</b> or refresh the page when the submit button is pressed." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>const amount = document.getElementById('amount').value;</b>", explanation_js: "Declare the variable <b style='background-color: #ececec;'>amount</b> and get the value from the element with id <b style='background-color: #ececec;'>amount</b>." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const fromCurrency = document.getElementById('from-currency').value;</b>", explanation_js: "Declare a variable <b style='background-color: #ececec;'>fromCurrency</b> and get the value from the element with the id <b style='background-color: #ececec;'>from-currency</b>." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>const toCurrency = document.getElementById('to-currency').value;</b>", explanation_js: "Declare a variable <b style='background-color: #ececec;'>toCurrency</b> and get the value from the element with the id <b style='background-color: #ececec;'>to-currency</b>." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>const exchangeRates = { ... }</b>", explanation_js: "Declares an <b style='background-color: #ececec;'>exchangeRates</b> object that contains exchange rates between various currencies, structured as a nested object with source and target currency keys." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>{ USD: { ... }, EUR: { ... }, GBP: { ... }, IDR: { ... }, JPY: { ... }, AUD: { ... }, CAD: { ... }, CHF: { ... }, CNY: { ... } }</b>", explanation_js: "Arrange each currency as an object in <b style='background-color: #ececec;'>exchangeRates</b>, each having a key for the target currency and its exchange rate." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>};</b>", explanation_js: "According to the declaration of <b style='background-color: #ececec;'>exchangeRates</b> rate objects." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>const result = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);</b>", explanation_js: "Calculates the conversion result by multiplying the <b style='background-color: #ececec;'>amount</b> by the appropriate exchange rate from <b style='background-color: #ececec;'>exchangeRates</b>. The <b style='background-color: #ececec;'>toFixed(2)</b> function is used to round the result to two decimal places." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;</b>", explanation_js: "Displays the conversion result in an element with id <b style='background-color: #ececec;'>result</b> as a string of the format <b style='background-color: #ececec;'>${amount} ${fromCurrency} = ${result} ${toCurrency}</b>." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the event listener function that was executed when the form was submitted." }
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