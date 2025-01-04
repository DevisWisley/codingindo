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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "The document type declaration used is HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Comments stating that this code was created by CodingIndo, and listing their website URL." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "The opening tag for the <b style='background-color: #ececec;'>&lt;html&gt;</b> element with the <b style='background-color: #ececec;'>lang=\"en\"</b> attribute indicates that the language of this document is English." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "The opening tag for the <b style='background-color: #ececec;'>&lt;head&gt;</b> element, which contains metadata and settings for the document." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "A comment explaining that the following line is a meta tag for character encoding." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Meta tag to set the character encoding to UTF-8, so that the document supports various characters and symbols." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag to make the viewport responsive on mobile devices --&gt;</b>", explanation_html: "The comment indicates that the following line is to adjust the display on mobile devices." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Meta tag to create a responsive document display on mobile devices, with a display width according to the device and an initial scale of 1." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "A comment explaining that the following line will contain the page title." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Heatmap Color&lt;/title&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;title&gt;</b> tag displays the title of the \"Heatmap Color\" page on the browser tab." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CSS file for styling --&gt;</b>", explanation_html: "A comment indicating that the following line is a link to an external CSS file for styling." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;link&gt;</b> tag links to an external CSS file <b style='background-color: #ececec;'>style.css</b> to apply styles to the page." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "The closing tag for the <b style='background-color: #ececec;'>&lt;head&gt;</b> element." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "The opening tag for the <b style='background-color: #ececec;'>&lt;body&gt;</b> element, which contains the content that will be displayed on the web page." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title with centered text --&gt;</b>", explanation_html: "A comment indicating that the following line is the page title with centered text." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;h1 style=\"text-align: center;\"&gt;Heatmap Color&lt;/h1&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;h1&gt;</b> tag displays the title \"Heatmap Color\" with centered text." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;!-- Div to display heatmap color --&gt;</b>", explanation_html: "The comment indicates that the next element is a <b style='background-color: #ececec;'>&lt;div&gt;</b> to display the heatmap colors." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"heatmap\" class=\"heatmap\"&gt;&lt;/div&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> tag with the attributes <b style='background-color: #ececec;'>id=\"heatmap\"</b> and <b style='background-color: #ececec;'>class=\"heatmap\"</b> to display a heatmap on a web page." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to JavaScript file for functionality --&gt;</b>", explanation_html: "A comment explaining that the following line is a link to an external JavaScript file to add functionality." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;script&gt;</b> tag links to an external JavaScript file <b style='background-color: #ececec;'>script.js</b> to add heatmap functionality to a web page." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "The closing tag for the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "The closing tag for the <b style='background-color: #ececec;'>&lt;html&gt;</b> element." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>/* Sets the font for the entire body */</b>", explanation_css: "A comment explaining that the following section will set the font for all elements inside <b style='background-color: #ececec;'>&lt;body&gt;</b>." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>body {</b>", explanation_css: "Opens the style declaration for the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>font-family: Arial, sans-serif;</b>", explanation_css: "Sets the font for the entire page to use \"Arial\" as the primary font. If Arial is not available, another sans-serif font will be used." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the style declaration for the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>/* Sets the grid display for the heatmap */</b>", explanation_css: "The comment explains that the following section will set the grid display for elements with the <b style='background-color: #ececec;'>.heatmap</b> class." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>.heatmap {</b>", explanation_css: "Opens the style declaration for an element with the <b style='background-color: #ececec;'>.heatmap</b> class." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>display: grid;</b>", explanation_css: "Sets the <b style='background-color: #ececec;'>.heatmap</b> element to use grid view, enabling a grid-based layout for the items within it." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>grid-template-columns: repeat(5, 1fr);</b>", explanation_css: "Defines 5 columns in the grid, each taking up 1 equal fraction of the width of the <b style='background-color: #ececec;'>.heatmap</b> container." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>gap: 2px;</b>", explanation_css: "Adds a 2 pixel spacing between each element in the grid, creating a small separation between elements in the heatmap." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>max-width: 300px;</b>", explanation_css: "Limits the maximum width of the <b style='background-color: #ececec;'>.heatmap</b> container to 300 pixels, so that the heatmap does not expand beyond this limit." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>margin: 0 auto;</b>", explanation_css: "Set the top and bottom margins to 0 and the left and right margins to auto, to make the <b style='background-color: #ececec;'>.heatmap</b> container horizontally centered on the page." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the style declaration for an element with the <b style='background-color: #ececec;'>.heatmap</b> class." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>/* Sets the appearance of each div in the heatmap */</b>", explanation_css: "The comment explains that the following section will control the appearance of each <b style='background-color: #ececec;'>&lt;div&gt;</b> element within the <b style='background-color: #ececec;'>.heatmap</b>." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>.heatmap div {</b>", explanation_css: "Opens the style declaration for each <b style='background-color: #ececec;'>&lt;div&gt;</b> element inside the <b style='background-color: #ececec;'>.heatmap</b> container." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>padding: 20px;</b>", explanation_css: "Gives 20 pixels of padding inside each <b style='background-color: #ececec;'>&lt;div&gt;</b> element, thus providing space inside the element." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>text-align: center;</b>", explanation_css: "Set the text inside each <b style='background-color: #ececec;'>&lt;div&gt;</b> to center align." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>color: white;</b>", explanation_css: "Sets the text color to white to increase contrast on the heatmap's usually darker background." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>font-weight: bold;</b>", explanation_css: "Sets the text inside each <b style='background-color: #ececec;'>&lt;div&gt;</b> to bold." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the style declaration for each <b style='background-color: #ececec;'>&lt;div&gt;</b> element inside <b style='background-color: #ececec;'>.heatmap</b>." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>// Get element with id 'heatmap'</b>", explanation_js: "The comment indicates that the following line will fetch the element with the id <b style='background-color: #ececec;'>'heatmap'</b>." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>const heatmapContainer = document.getElementById('heatmap');</b>", explanation_js: "Declare a variable <b style='background-color: #ececec;'>heatmapContainer</b> that stores the element with <b style='background-color: #ececec;'>id=\"heatmap\"</b> from the DOM, which will be the container for the heatmap." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>// Data for heatmap</b>", explanation_js: "A comment indicating that the following line will define the data for the heatmap." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const data = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]];</b>", explanation_js: "Declares a <b style='background-color: #ececec;'>data</b> variable containing a 2D array, where each element represents a value in a heatmap grid (5x5)." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>// Function to get color based on value</b>", explanation_js: "A comment indicating that the following line will define a function to determine the color based on a given value." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>function getColor(value) {</b>", explanation_js: "Defines a function <b style='background-color: #ececec;'>getColor</b> that accepts a <b style='background-color: #ececec;'>value</b> parameter and returns a color based on that value." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>if (value <= 5) return 'rgb(198, 235, 255)';</b>", explanation_js: "If the <b style='background-color: #ececec;'>value</b> is less than or equal to 5, the function returns the color <b style='background-color: #ececec;'>rgb(198, 235, 255)</b>, which is a light blue color." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>if (value <= 10) return 'rgb(132, 196, 255)';</b>", explanation_js: "If the <b style='background-color: #ececec;'>value</b> is less than or equal to 10, the function returns the color <b style='background-color: #ececec;'>rgb(132, 196, 255)</b>, which is darker than the previous color." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>if (value <= 15) return 'rgb(66, 157, 255)';</b>", explanation_js: "If the <b style='background-color: #ececec;'>value</b> is less than or equal to 15, the function returns the color <b style='background-color: #ececec;'>rgb(66, 157, 255)</b>, which is even darker." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>if (value <= 20) return 'rgb(0, 118, 255)';</b>", explanation_js: "If the <b style='background-color: #ececec;'>value</b> is less than or equal to 20, the function returns the color <b style='background-color: #ececec;'>rgb(0, 118, 255)</b>, which is a darker blue." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>return 'rgb(0, 78, 170)';</b>", explanation_js: "If the <b style='background-color: #ececec;'>value</b> is greater than 20, the function returns the color <b style='background-color: #ececec;'>rgb(0, 78, 170)</b>, which is the darkest blue in this scale." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>}</b>", explanation_js: "Closing the <b style='background-color: #ececec;'>getColor</b> function declaration." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>// Iterate through each row of data</b>", explanation_js: "A comment indicating that the following line will iterate over each row in the heatmap data." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>data.forEach(row => {</b>", explanation_js: "Using the <b style='background-color: #ececec;'>forEach</b> method to iterate over each <b style='background-color: #ececec;'>row</b> in the <b style='background-color: #ececec;'>data</b> array." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>// Iterate through each value in the row</b>", explanation_js: "A comment indicating that the following line will iterate over each value in the row." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>row.forEach(value => {</b>", explanation_js: "Using the <b style='background-color: #ececec;'>forEach</b> method to iterate over each <b style='background-color: #ececec;'>value</b> in a <b style='background-color: #ececec;'>row</b>." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>// Create a div element for each value</b>", explanation_js: "A comment indicating that a <b style='background-color: #ececec;'>&lt;div&gt;</b> element will be created for each value in the grid." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>const cell = document.createElement('div');</b>", explanation_js: "Declares a <b style='background-color: #ececec;'>cell</b> variable that creates a new <b style='background-color: #ececec;'>&lt;div&gt;</b> element to hold the values ​​from the heatmap." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>// Sets the background color based on the value</b>", explanation_js: "The comment indicates that the following line will set the background color based on the value." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>cell.style.backgroundColor = getColor(value);</b>", explanation_js: "Sets the background color of a <b style='background-color: #ececec;'>cell</b> element by calling the <b style='background-color: #ececec;'>getColor</b> function to determine the appropriate color based on the <b style='background-color: #ececec;'>value</b>." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>// Add value text into div element</b>", explanation_js: "A comment indicating that the value text will be added to the <b style='background-color: #ececec;'>&lt;div&gt;</b> element." },
    { number: 22, code_js: "<b style='background-color: #ececec;'>cell.textContent = value;</b>", explanation_js: "Inserts <b style='background-color: #ececec;'>value</b> text into <b style='background-color: #ececec;'>cell</b> elements, so that each cell shows the appropriate value." },
    { number: 23, code_js: "<b style='background-color: #ececec;'>// Add a div element to the heatmap container</b>", explanation_js: "A comment indicating that a <b style='background-color: #ececec;'>cell</b> element will be added to the heatmap container." },
    { number: 24, code_js: "<b style='background-color: #ececec;'>heatmapContainer.appendChild(cell);</b>", explanation_js: "Adds a <b style='background-color: #ececec;'>cell</b> element to the <b style='background-color: #ececec;'>heatmapContainer</b> element, so that it appears on the page as part of the heatmap." },
    { number: 25, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the second <b style='background-color: #ececec;'>forEach</b>, which iterates over the values ​​within each row." },
    { number: 26, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the first <b style='background-color: #ececec;'>forEach</b>, which iterates over each row in the heatmap data." }
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
                window.location.href = "/src/download/Heatmap Color.rar";
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