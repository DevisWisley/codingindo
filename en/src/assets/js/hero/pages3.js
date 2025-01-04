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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Specifies the document type as HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Comments to indicate that the code was created by CodingIndo." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Opens an HTML element with the language set to \"en\" (English)." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Opens the head section for metadata and page settings." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Comments to explain that the following meta tags are used for character encoding." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Sets the page character encoding to UTF-8 to support a wider range of characters." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag to make the viewport responsive on mobile devices --&gt;</b>", explanation_html: "Comments explaining that the following tags are for making the page responsive on mobile devices." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Sets the viewport to adapt the page to the device width and initial scale of 1.0." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Comments to mark the title section of the page." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;AES Encoder/Decoder&lt;/title&gt;</b>", explanation_html: "Set the page title to \"AES Encoder/Decoder\" which will appear in the browser tab." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CSS file for styling --&gt;</b>", explanation_html: "Comments to explain that the following link connects to an external CSS file." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Links an external CSS file named <b style='background-color: #ececec;'>style.css</b> to provide styling to the page." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to Font Awesome for icons --&gt;</b>", explanation_html: "Comments to explain that the following link is used to add icons from Font Awesome." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\"&gt;</b>", explanation_html: "Connecting Font Awesome version 6.0.0 for icons within the app." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CryptoJS for encryption and decryption --&gt;</b>", explanation_html: "Comments to explain that the next script is used for encryption and decryption." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Connecting the CryptoJS library for encryption and decryption processes." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Close the head section." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Opens the body section that contains the main page content." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container\"&gt;</b>", explanation_html: "Opens a div element with the class \"container\" as the main container of the application." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;!-- Application title --&gt;</b>", explanation_html: "Comment to explain that the next element is the application title." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;h1&gt;AES Encoder/Decoder&lt;/h1&gt;</b>", explanation_html: "Create an application title \"AES Encoder/Decoder\"." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"tools\"&gt;</b>", explanation_html: "Opens a div element with the class \"tools\" as a container for input and output elements." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"tool\"&gt;</b>", explanation_html: "Opens a div element with the class \"tool\" for the main input container." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"key-container\"&gt;</b>", explanation_html: "Opens a div element with the class \"key-container\" for encryption key input." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;!-- Input to enter secret key --&gt;</b>", explanation_html: "Comments to explain that the following input is used to enter the encryption secret key." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;input type=\"text\" id=\"secret-key\" placeholder=\"Enter secret key\"&gt;</b>", explanation_html: "Create a text input to enter a secret key with the placeholder \"Enter secret key\"." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to generate random key --&gt;</b>", explanation_html: "Comments to explain that the following keys are used to generate random keys." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"generate-key-btn\"&gt;&lt;i class=\"fas fa-random\"&gt;&lt;/i&gt; Generate Random Key&lt;/button&gt;</b>", explanation_html: "Button to generate random key with icon from Font Awesome and text \"Generate Random Key\"." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Close the div with the class \"key-container\"." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;!-- Textarea to enter text to be encrypted or decrypted --&gt;</b>", explanation_html: "Comments to explain that the following textarea is used for text to be encrypted or decrypted." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;textarea id=\"input-text\" placeholder=\"Enter text here...\"&gt;&lt;/textarea&gt;</b>", explanation_html: "Create a textarea to enter text to be encrypted or decrypted, with the placeholder \"Enter text here...\"." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"button-group\"&gt;</b>", explanation_html: "Opens a div element with the class \"button-group\" to hold the action buttons." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to encrypt text --&gt;</b>", explanation_html: "Comments to explain that the following keys are used to encrypt text." },
    { number: 34, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"encode-btn\"&gt;&lt;i class=\"fas fa-lock\"&gt;&lt;/i&gt; Encode&lt;/button&gt;</b>", explanation_html: "Button to encrypt text with a lock icon from Font Awesome and the text \"Encode\"." },
    { number: 35, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to swap text between input and output --&gt;</b>", explanation_html: "Comments to explain that the following buttons are used to swap text between input and output." },
    { number: 36, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"swap-btn\"&gt;&lt;i class=\"fas fa-exchange-alt\"&gt;&lt;/i&gt; Swap&lt;/button&gt;</b>", explanation_html: "Button to swap text with an arrow icon from Font Awesome and the text \"Swap\"." },
    { number: 37, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to decrypt text --&gt;</b>", explanation_html: "Comments to explain that the following keys are used to decrypt text." },
    { number: 38, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"decode-btn\"&gt;&lt;i class=\"fas fa-unlock\"&gt;&lt;/i&gt; Decode&lt;/button&gt;</b>", explanation_html: "Button to decrypt text with an open lock icon from Font Awesome and the text \"Decode\"." },
    { number: 39, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Close the div with the class \"button-group\"." },
    { number: 40, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Close the div with the class \"tool\"." },
    { number: 41, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"tool\"&gt;</b>", explanation_html: "Opens a div element with the class \"tool\" for the output container." },
    { number: 42, code_html: "<b style='background-color: #ececec;'>&lt;!-- Textarea to display encrypted or decrypted text --&gt;</b>", explanation_html: "Comments to explain that the following textarea is used to display encrypted or decrypted text." },
    { number: 43, code_html: "<b style='background-color: #ececec;'>&lt;textarea id=\"output-text\" placeholder=\"Output text here...\"&gt;&lt;/textarea&gt;</b>", explanation_html: "Create a textarea to display the encryption or decryption results, with the placeholder \"Output text here...\"." },
    { number: 44, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Close the div with the class \"tool\"." },
    { number: 45, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Close the div with the class \"tools\"." },
    { number: 46, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Close the div with the class \"container\"." },
    { number: 47, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to JavaScript file for functionality --&gt;</b>", explanation_html: "Comments to indicate that the following script links an external JavaScript file." },
    { number: 48, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Connect an external JavaScript file named <b style='background-color: #ececec;'>script.js</b> to add functionality to the application." },
    { number: 49, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Close the body part." },
    { number: 50, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Closes an HTML element." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>/* Sets styles for the body element */</b>", explanation_css: "Comments explaining that the following styles are used for the body element." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>body { ... }</b>", explanation_css: "Sets styles for the body element, including font, margin, padding, gradient background, content placement, and height." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>/* Sets styles for container elements */</b>", explanation_css: "A comment explaining that the following style is used for elements with the container class." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>.container { ... }</b>", explanation_css: "Sets styles for elements with the container class, such as background color, padding, border-radius, and shadow." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the h1 element */</b>", explanation_css: "A comment explaining that the following style is used for the h1 element." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>h1 { ... }</b>", explanation_css: "Sets the color, margin, font size, and font thickness for the h1 element." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the tools element */</b>", explanation_css: "A comment explaining that the following style is used for elements with the class tools." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>.tools { ... }</b>", explanation_css: "Sets the flex-direction and spacing between elements for elements with the tools class." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the tool element */</b>", explanation_css: "A comment explaining that the following style is used for elements with the class tool." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>.tool { ... }</b>", explanation_css: "Sets the flex-direction and spacing between elements for elements with the tool class." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>/* Sets styles for key-container elements */</b>", explanation_css: "A comment explaining that the following style is used for elements with the key-container class." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>.key-container { ... }</b>", explanation_css: "Sets flex-direction, spacing between elements, and styling for elements with the key-container class." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a text input element */</b>", explanation_css: "A comment explaining that the following style is used for text input elements." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>input[type=\"text\"] { ... }</b>", explanation_css: "Sets the width, padding, border, border-radius, font-size, and transition for a text input element." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a text input element when focused */</b>", explanation_css: "A comment explaining that the following style is used when the text input element is in focus." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>input[type=\"text\"]:focus { ... }</b>", explanation_css: "Changes the border color and removes the outline when a text input element is in focus." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a textarea element */</b>", explanation_css: "A comment explaining that the following style is used for the textarea element." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>textarea { ... }</b>", explanation_css: "Sets the width, height, padding, border, border-radius, font-size, and transition for a textarea element." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a textarea element when it is focused */</b>", explanation_css: "A comment explaining that the following style is used when the textarea element is in focus." },
    { number: 20, code_css: "<b style='background-color: #ececec;'>textarea:focus { ... }</b>", explanation_css: "Changes the border color and removes the outline when a textarea element is in focus." },
    { number: 21, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element */</b>", explanation_css: "A comment explaining that the following style is used for the button element." },
    { number: 22, code_css: "<b style='background-color: #ececec;'>button { ... }</b>", explanation_css: "Set padding, border, background color, text color, cursor, font-size, font-weight, transition, and appearance for buttons." },
    { number: 23, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a button element on hover */</b>", explanation_css: "A comment explaining that the following style is used when the button element is hovered." },
    { number: 24, code_css: "<b style='background-color: #ececec;'>button:hover { ... }</b>", explanation_css: "Change the background color of the button on hover." },
    { number: 25, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element when active */</b>", explanation_css: "A comment explaining that the following style is used when the button element is active." },
    { number: 26, code_css: "<b style='background-color: #ececec;'>button:active { ... }</b>", explanation_css: "Reduces the scale of the button when pressed." },
    { number: 27, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element with id swap-btn */</b>", explanation_css: "A comment explaining that the following style is specific to the button with the id swap-btn." },
    { number: 28, code_css: "<b style='background-color: #ececec;'>#swap-btn { ... }</b>", explanation_css: "Sets the background color of the button with the id swap-btn." },
    { number: 29, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element with id swap-btn on hover */</b>", explanation_css: "Comment explaining that the following style is used when swap-btn is hovered." },
    { number: 30, code_css: "<b style='background-color: #ececec;'>#swap-btn:hover { ... }</b>", explanation_css: "Changes the background color of the button with the id swap-btn on hover." },
    { number: 31, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button-group element */</b>", explanation_css: "A comment explaining that the following style is used for elements with the class button-group." },
    { number: 32, code_css: "<b style='background-color: #ececec;'>.button-group { ... }</b>", explanation_css: "Sets the flex-direction and spacing between elements for elements with the button-group class." },
    { number: 33, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button elements inside the button-group */</b>", explanation_css: "A comment explaining that the following style is used for buttons in a button-group." },
    { number: 34, code_css: "<b style='background-color: #ececec;'>.button-group button { ... }</b>", explanation_css: "Sets the width of the button in a button-group element to fill the full width." },
    { number: 35, code_css: "<b style='background-color: #ececec;'>/* Sets styles for elements in media queries with a minimum width of 768px */</b>", explanation_css: "Comments to explain that the following styles apply on screens with a minimum width of 768px." },
    { number: 36, code_css: "<b style='background-color: #ececec;'>.key-container { ... }</b>", explanation_css: "Sets flex-direction and element styling in key-container class for screen widths of 768px and above." },
    { number: 37, code_css: "<b style='background-color: #ececec;'>input[type=\"text\"] { ... }</b>", explanation_css: "Sets the width of the text input so that it does not fill the full width on screens with a minimum width of 768px." },
    { number: 38, code_css: "<b style='background-color: #ececec;'>.button-group { ... }</b>", explanation_css: "Change the flex-direction and align the buttons in the button-group for a minimum screen width of 768px." },
    { number: 39, code_css: "<b style='background-color: #ececec;'>.button-group button { ... }</b>", explanation_css: "Sets the width of the button in the button-group to fit the content on a screen width of at least 768px." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>// Event listener for encode button</b>", explanation_js: "A comment explaining that the following line is an event listener for the encode button." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>document.getElementById('encode-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Added an event listener for the button with the id <b style='background-color: #ececec;'>encode-btn</b>, which will be executed when the button is clicked." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>var text = document.getElementById('input-text').value;</b>", explanation_js: "Gets the value of the element with the id <b style='background-color: #ececec;'>input-text</b> and stores it in the <b style='background-color: #ececec;'>text</b> variable." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>var key = document.getElementById('secret-key').value;</b>", explanation_js: "Gets the value of the element with id <b style='background-color: #ececec;'>secret-key</b> and stores it in the <b style='background-color: #ececec;'>key</b> variable." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>var encrypted = CryptoJS.AES.encrypt(text, key).toString();</b>", explanation_js: "Encrypt <b style='background-color: #ececec;'>text</b> using the <b style='background-color: #ececec;'>key</b> with the AES algorithm from CryptoJS and store the encryption result in an <b style='background-color: #ececec;'>encrypted</b> variable." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>document.getElementById('output-text').value = encrypted;</b>", explanation_js: "Displays encrypted text on the element with the id <b style='background-color: #ececec;'>output-text</b>." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the event listener function for the encode button." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>// Event listener for decode button</b>", explanation_js: "The comment explains that the following line is an event listener for the decode button." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>document.getElementById('decode-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Added an event listener for the button with the id <b style='background-color: #ececec;'>decode-btn</b>, which will be executed when the button is clicked." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>var encryptedText = document.getElementById('input-text').value;</b>", explanation_js: "Gets the value of the element with id <b style='background-color: #ececec;'>input-text</b> and stores it in the <b style='background-color: #ececec;'>encryptedText</b> variable." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>var key = document.getElementById('secret-key').value;</b>", explanation_js: "Gets the value of the element with id <b style='background-color: #ececec;'>secret-key</b> and stores it in the <b style='background-color: #ececec;'>key</b> variable." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>var decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);</b>", explanation_js: "Decrypts <b style='background-color: #ececec;'>encryptedText</b> using the key <b style='background-color: #ececec;'>key</b> and converts it to UTF-8 text, then stores the decrypted result in the <b style='background-color: #ececec;'>decrypted</b> variable." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>document.getElementById('output-text').value = decrypted;</b>", explanation_js: "Displays the decrypted text on the element with the id <b style='background-color: #ececec;'>output-text</b>." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the event listener function for the decode button." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>// Event listener for swap button</b>", explanation_js: "The comment explains that the following line is an event listener for the swap button." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>document.getElementById('swap-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Added an event listener for the button with id <b style='background-color: #ececec;'>swap-btn</b>, which will be executed when the button is clicked." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>var inputText = document.getElementById('input-text').value;</b>", explanation_js: "Gets the value from the element with the id <b style='background-color: #ececec;'>input-text</b> and stores it in the <b style='background-color: #ececec;'>inputText</b> variable." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>var outputText = document.getElementById('output-text').value;</b>", explanation_js: "Gets the value of the element with id <b style='background-color: #ececec;'>output-text</b> and stores it in the variable <b style='background-color: #ececec;'>outputText</b>." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>document.getElementById('input-text').value = outputText;</b>", explanation_js: "Exchanges the text in the <b style='background-color: #ececec;'>input-text</b> element with the value from <b style='background-color: #ececec;'>outputText</b>." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>document.getElementById('output-text').value = inputText;</b>", explanation_js: "Exchanges the text in the <b style='background-color: #ececec;'>output-text</b> element with the value from <b style='background-color: #ececec;'>inputText</b>." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the event listener function for the swap button.</b>." },
    { number: 22, code_js: "<b style='background-color: #ececec;'>// Event listener for generate key button</b>", explanation_js: "The comment explains that the following line is an event listener for the generate key button.</b>." },
    { number: 23, code_js: "<b style='background-color: #ececec;'>document.getElementById('generate-key-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Added an event listener for the button with the id <b style='background-color: #ececec;'>generate-key-btn</b>, which will be executed when the button is clicked.</b>." },
    { number: 24, code_js: "<b style='background-color: #ececec;'>var randomKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);</b>", explanation_js: "Generate a 16-byte random key using CryptoJS and convert it to hexadecimal format, then store it in the <b style='background-color: #ececec;'>randomKey</b>.</b>." },
    { number: 25, code_js: "<b style='background-color: #ececec;'>document.getElementById('secret-key').value = randomKey;</b>", explanation_js: "Returns a random key generated on the element with id <b style='background-color: #ececec;'>secret-key</b>.</b>." },
    { number: 26, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Close the event listener function for the generate key button.</b>." }
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
                window.location.href = "/src/download/AES Encoder Decoder.rar";
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