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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Declare the document type to ensure the browser understands this document as HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "HTML comments to include information about the coder and the website." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "The opening <b style='background-color: #ececec;'>&lt;html&gt;</b> element marks the start of an HTML document with the language attribute <b style='background-color: #ececec;'>en</b> (English)." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;head&gt;</b> element contains document metadata." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Comments to explain the function of the next tag." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Meta tag to specify character encoding as UTF-8 to support various characters." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag to make the viewport responsive on mobile devices --&gt;</b>", explanation_html: "Comments to explain the function of the viewport tag." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Meta tags to ensure responsive display on mobile devices." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Comments to explain the page title elements." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;3D Animated Block&lt;/title&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;title&gt;</b> element gives the browser tab the title \"3D Animated Block\"." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CSS file for styling --&gt;</b>", explanation_html: "Comments to explain links to external CSS files." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;link&gt;</b> tag links the document to an external CSS file named <b style='background-color: #ececec;'>style.css</b>." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "The closing <b style='background-color: #ececec;'>&lt;head&gt;</b> element." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;body&gt;</b> element contains the main content of the page." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- Container for 3D scenes --&gt;</b>", explanation_html: "Comments describing the container for 3D elements." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"scene\"&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the class <b style='background-color: #ececec;'>scene</b> serves as a container for the 3D scene." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;!-- Container for 3D cube --&gt;</b>", explanation_html: "Comments explaining the container for the 3D cube." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"cube\"&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the <b style='background-color: #ececec;'>cube</b> class acts as a container for a 3D cube." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;!-- Front side of the cube --&gt;</b>", explanation_html: "Comments on the front side of the cube." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"face front\"&gt;&lt;/div&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the class <b style='background-color: #ececec;'>face front</b> creates the front side of the cube." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;!-- Back side of the cube --&gt;</b>", explanation_html: "Comments on the back side of the cube." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"face back\"&gt;&lt;/div&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the <b style='background-color: #ececec;'>face back</b> class to create the back side of the cube." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;!-- Left side of the cube --&gt;</b>", explanation_html: "Comments for the left side of the cube." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"face left\"&gt;&lt;/div&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the class <b style='background-color: #ececec;'>face left</b> to create the left side of the cube." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;!-- Right side of the cube --&gt;</b>", explanation_html: "Comments for the right side of the cube." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"face right\"&gt;&lt;/div&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the class <b style='background-color: #ececec;'>face right</b> element with the class" },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;!-- Top side of the cube --&gt;</b>", explanation_html: "Comments for the top side of the cube." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"face top\"&gt;&lt;/div&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the class <b style='background-color: #ececec;'>face top</b> to create the top side of the cube." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;!-- Bottom side of the cube --&gt;</b>", explanation_html: "Comments on the bottom side of the cube." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"face bottom\"&gt;&lt;/div&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the class <b style='background-color: #ececec;'>face bottom</b> to create the bottom side of the cube." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "The closing <b style='background-color: #ececec;'>&lt;div&gt;</b> element for the <b style='background-color: #ececec;'>cube</b> class." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "The closing <b style='background-color: #ececec;'>&lt;div&gt;</b> element for the <b style='background-color: #ececec;'>scene</b> class." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to JavaScript file for functionality --&gt;</b>", explanation_html: "Comments explaining links to external JavaScript files." },
    { number: 34, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;script&gt;</b> tag is used to link a document to an external JavaScript file <b style='background-color: #ececec;'>script.js</b>." },
    { number: 35, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "The closing <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 36, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "The closing <b style='background-color: #ececec;'>&lt;html&gt;</b> element that marks the end of the HTML document." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>* {</b>", explanation_css: "Universal selector targeting all elements for basic reset." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>margin: 0;</b>", explanation_css: "Removes default margin from all elements." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>padding: 0;</b>", explanation_css: "Removes default padding from all elements." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>box-sizing: border-box;</b>", explanation_css: "Ensures padding and border do not affect element's total width/height." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the universal selector." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>body {</b>", explanation_css: "Starts styling for the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>height: 100vh;</b>", explanation_css: "Sets the body height to 100% of the viewport height." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>display: flex;</b>", explanation_css: "Applies a flex layout to center content horizontally and vertically." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>justify-content: center;</b>", explanation_css: "Centers content horizontally." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>align-items: center;</b>", explanation_css: "Centers content vertically." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>background: #f7f9fc;</b>", explanation_css: "Sets a light background color." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>font-family: Arial, sans-serif;</b>", explanation_css: "Sets the font family to Arial or sans-serif as a fallback." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the body styling block." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>.scene {</b>", explanation_css: "Starts styling for the <b style='background-color: #ececec;'>.scene</b> class." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>width: 250px;</b>", explanation_css: "Sets the width of the scene container to 250px." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>height: 250px;</b>", explanation_css: "Sets the height of the scene container to 250px." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>perspective: 1000px;</b>", explanation_css: "Provides a 3D perspective effect for child elements." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the <b style='background-color: #ececec;'>.scene</b> class styling." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>.cube {</b>", explanation_css: "Starts styling for the <b style='background-color: #ececec;'>.cube</b> class." },
    { number: 20, code_css: "<b style='background-color: #ececec;'>width: 100%;</b>", explanation_css: "Sets the cube width to 100% of its container." },
    { number: 21, code_css: "<b style='background-color: #ececec;'>height: 100%;</b>", explanation_css: "Sets the cube height to 100% of its container." },
    { number: 22, code_css: "<b style='background-color: #ececec;'>position: relative;</b>", explanation_css: "Positions the cube relative to its parent container." },
    { number: 23, code_css: "<b style='background-color: #ececec;'>transform-style: preserve-3d;</b>", explanation_css: "Maintains 3D transformation of child elements." },
    { number: 24, code_css: "<b style='background-color: #ececec;'>transform: rotateX(30deg) rotateY(30deg);</b>", explanation_css: "Initially rotates the cube 30 degrees on both X and Y axes." },
    { number: 25, code_css: "<b style='background-color: #ececec;'>animation: rotateCube 15s infinite linear;</b>", explanation_css: "Applies continuous rotation animation with a 15-second duration." },
    { number: 26, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the <b style='background-color: #ececec;'>.cube</b> class styling." },
    { number: 27, code_css: "<b style='background-color: #ececec;'>.face {</b>", explanation_css: "Starts styling for the <b style='background-color: #ececec;'>.face</b> class." },
    { number: 28, code_css: "<b style='background-color: #ececec;'>position: absolute;</b>", explanation_css: "Positions each face absolutely within the <b style='background-color: #ececec;'>.cube</b> container." },
    { number: 29, code_css: "<b style='background-color: #ececec;'>width: 250px;</b>", explanation_css: "Sets the width of each face to 250px." },
    { number: 30, code_css: "<b style='background-color: #ececec;'>height: 250px;</b>", explanation_css: "Sets the height of each face to 250px." },
    { number: 31, code_css: "<b style='background-color: #ececec;'>background: rgba(0, 150, 255, 0.8);</b>", explanation_css: "Sets a semi-transparent blue background." },
    { number: 32, code_css: "<b style='background-color: #ececec;'>border: 2px solid #fff;</b>", explanation_css: "Adds a white border around each face." },
    { number: 33, code_css: "<b style='background-color: #ececec;'>box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);</b>", explanation_css: "Adds a shadow effect for depth." },
    { number: 34, code_css: "<b style='background-color: #ececec;'>display: flex;</b>", explanation_css: "Uses flex layout for centering content inside each face." },
    { number: 35, code_css: "<b style='background-color: #ececec;'>justify-content: center;</b>", explanation_css: "Centers content horizontally within each face." },
    { number: 36, code_css: "<b style='background-color: #ececec;'>align-items: center;</b>", explanation_css: "Centers content vertically within each face." },
    { number: 37, code_css: "<b style='background-color: #ececec;'>font-size: 1.2rem;</b>", explanation_css: "Sets the font size to 1.2 rem units." },
    { number: 38, code_css: "<b style='background-color: #ececec;'>color: #fff;</b>", explanation_css: "Sets the text color to white." },
    { number: 39, code_css: "<b style='background-color: #ececec;'>font-weight: bold;</b>", explanation_css: "Makes the text bold." },
    { number: 40, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the <b style='background-color: #ececec;'>.face</b> class styling." },
    { number: 41, code_css: "<b style='background-color: #ececec;'>.front { transform: translateZ(125px); background: #1e90ff; }</b>", explanation_css: "Moves the front face forward 125px and sets its background color." },
    { number: 42, code_css: "<b style='background-color: #ececec;'>.back { transform: rotateY(180deg) translateZ(125px); background: #ff6347; }</b>", explanation_css: "Rotates the back face 180 degrees and moves it forward 125px." },
    { number: 43, code_css: "<b style='background-color: #ececec;'>.left { transform: rotateY(-90deg) translateZ(125px); background: #32cd32; }</b>", explanation_css: "Rotates the left face 90 degrees counterclockwise and moves it forward 125px." },
    { number: 44, code_css: "<b style='background-color: #ececec;'>.right { transform: rotateY(90deg) translateZ(125px); background: #ff4500; }</b>", explanation_css: "Rotates the right face 90 degrees clockwise and moves it forward 125px." },
    { number: 45, code_css: "<b style='background-color: #ececec;'>.top { transform: rotateX(90deg) translateZ(125px); background: #ffd700; }</b>", explanation_css: "Rotates the top face 90 degrees clockwise along the X-axis and moves it forward 125px." },
    { number: 46, code_css: "<b style='background-color: #ececec;'>.bottom { transform: rotateX(-90deg) translateZ(125px); background: #dcdcdc; }</b>", explanation_css: "Rotates the bottom face 90 degrees counterclockwise along the X-axis and moves it forward 125px." },
    { number: 47, code_css: "<b style='background-color: #ececec;'>@keyframes rotateCube {</b>", explanation_css: "Starts the keyframes for the cube animation." },
    { number: 48, code_css: "<b style='background-color: #ececec;'>0% { transform: rotateX(0deg) rotateY(0deg); }</b>", explanation_css: "Initial frame with no rotation." },
    { number: 49, code_css: "<b style='background-color: #ececec;'>100% { transform: rotateX(360deg) rotateY(360deg); }</b>", explanation_css: "Final frame rotates the cube 360 degrees on both axes." },
    { number: 50, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the <b style='background-color: #ececec;'>@keyframes</b> block." },
    { number: 51, code_css: "<b style='background-color: #ececec;'>@media (max-width: 600px) {</b>", explanation_css: "Starts a media query for screens with a maximum width of 600px." },
    { number: 52, code_css: "<b style='background-color: #ececec;'>.scene { width: 200px; height: 200px; }</b>", explanation_css: "Reduces the size of the <b style='background-color: #ececec;'>.scene</b> to 200px x 200px." },
    { number: 53, code_css: "<b style='background-color: #ececec;'>.face { width: 200px; height: 200px; }</b>", explanation_css: "Reduces the size of each <b style='background-color: #ececec;'>.face</b> to 200px x 200px." },
    { number: 54, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Closes the media query block." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>// Add event listener to detect mouse movement on elements with class 'scene'</b>", explanation_js: "A comment explaining the purpose of the upcoming code block." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>document.querySelector('.scene').addEventListener('mousemove', function(e) {</b>", explanation_js: "Selects the element with the class <b style='background-color: #ececec;'>scene</b> and attaches a <b style='background-color: #ececec;'>mousemove</b> event listener to it. The callback function takes an event object <b style='background-color: #ececec;'>e</b> as a parameter." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>const x = e.clientX / window.innerWidth - 0.5;</b>", explanation_js: "Calculates the relative horizontal mouse position as a normalized value between -0.5 and 0.5. <b style='background-color: #ececec;'>e.clientX</b> is the horizontal coordinate of the mouse, and <b style='background-color: #ececec;'>window.innerWidth</b> is the width of the browser window." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const y = e.clientY / window.innerHeight - 0.5;</b>", explanation_js: "Calculates the relative vertical mouse position as a normalized value between -0.5 and 0.5. <b style='background-color: #ececec;'>e.clientY</b> is the vertical coordinate of the mouse, and <b style='background-color: #ececec;'>window.innerHeight</b> is the height of the browser window." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>document.querySelector('.cube').style.transform = `rotateX(${y * 45}deg) rotateY(${x * 45}deg)`;</b>", explanation_js: "Applies a 3D transform to the element with the class <b style='background-color: #ececec;'>cube</b>, rotating it on the X-axis and Y-axis based on the calculated <b style='background-color: #ececec;'>x</b> and <b style='background-color: #ececec;'>y</b> values. The rotation angle is scaled by 45 degrees for better visibility." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>mousemove</b> event listener function." }
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
                window.location.href = "/src/download/3D Animated Blocks.rar";
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