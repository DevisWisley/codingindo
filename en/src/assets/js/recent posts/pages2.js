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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Declares the document type and version of HTML being used, in this case, HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "A comment specifying the author and their website." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "The opening tag for the HTML document with the <b style='background-color: #ececec;'>lang</b> attribute set to English." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "The opening tag for the document head section." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta charset to define character encoding --&gt;</b>", explanation_html: "A comment explaining the purpose of the following <b style='background-color: #ececec;'>meta</b> tag." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Sets the character encoding to UTF-8, ensuring that the page displays special characters correctly." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta viewport to set responsive display --&gt;</b>", explanation_html: "A comment explaining the next <b style='background-color: #ececec;'>meta</b> tag." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Ensures the page is responsive and scales properly on different devices." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Title for page title --&gt;</b>", explanation_html: "A comment explaining the purpose of the <b style='background-color: #ececec;'>title</b> tag." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Button Ripple Effect&lt;/title&gt;</b>", explanation_html: "Sets the title of the web page as shown on the browser tab." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Stylesheet link to link CSS files --&gt;</b>", explanation_html: "A comment explaining the purpose of the <b style='background-color: #ececec;'>link</b> tag." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"styles.css\"&gt;</b>", explanation_html: "Links an external CSS file called <b style='background-color: #ececec;'>styles.css</b> to the document." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Closes the head section." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "The opening tag for the body section, which contains the content displayed on the page." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- Container for ripple effect button --&gt;</b>", explanation_html: "A comment describing the container for the button." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"button-container\"&gt;</b>", explanation_html: "Creates a <b style='background-color: #ececec;'>div</b> element with a class named <b style='background-color: #ececec;'>button-container</b>, which can be used for styling or layout purposes." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button with ripple effect --&gt;</b>", explanation_html: "A comment explaining the button’s function." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;button class=\"ripple-button\"&gt;Click Me&lt;/button&gt;</b>", explanation_html: "Creates a <b style='background-color: #ececec;'>button</b> element with the text \"Click Me\" and the class <b style='background-color: #ececec;'>ripple-button</b> for adding custom styling or JavaScript functionality." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the <b style='background-color: #ececec;'>div</b> element." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;!-- Script to link JavaScript files --&gt;</b>", explanation_html: "A comment explaining the purpose of the <b style='background-color: #ececec;'>script</b> tag." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Links an external JavaScript file named <b style='background-color: #ececec;'>script.js</b> to add interactivity or logic." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Closes the body section." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Closes the HTML document." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>/* Sets the body display to be centered and have a background color */</b>", explanation_css: "A comment explaining the styles applied to the <b style='background-color: #ececec;'>body</b>." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>body {</b>", explanation_css: "Starts the <b style='background-color: #ececec;'>body</b> styling block." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>display: flex;</b>", explanation_css: "Sets the <b style='background-color: #ececec;'>body</b> display mode to <b style='background-color: #ececec;'>flex</b>, enabling flexbox properties." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>justify-content: center;</b>", explanation_css: "Horizontally centers the content within the <b style='background-color: #ececec;'>body</b>." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>align-items: center;</b>", explanation_css: "Vertically centers the content within the <b style='background-color: #ececec;'>body</b>." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>height: 100vh;</b>", explanation_css: "Sets the <b style='background-color: #ececec;'>body</b> height to the full viewport height." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>margin: 0;</b>", explanation_css: "Removes any default margin from the <b style='background-color: #ececec;'>body</b>." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>background-color: #f0f0f0;</b>", explanation_css: "Sets the background color of the <b style='background-color: #ececec;'>body</b> to a light gray (<b style='background-color: #ececec;'>#f0f0f0</b>)." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the <b style='background-color: #ececec;'>body</b> styling block." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>/* Sets the relative position for the button container */</b>", explanation_css: "A comment describing the purpose of <b style='background-color: #ececec;'>.button-container</b>." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>.button-container {</b>", explanation_css: "Starts the <b style='background-color: #ececec;'>.button-container</b> styling block." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>position: relative;</b>", explanation_css: "Sets the <b style='background-color: #ececec;'>position</b> of the <b style='background-color: #ececec;'>.button-container</b> to <b style='background-color: #ececec;'>relative</b> for positioning child elements." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the <b style='background-color: #ececec;'>.button-container</b> styling block." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>/* Set the appearance of the ripple button */</b>", explanation_css: "A comment explaining the styling for <b style='background-color: #ececec;'>.ripple-button</b>." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>.ripple-button {</b>", explanation_css: "Starts the <b style='background-color: #ececec;'>.ripple-button</b> styling block." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>position: relative;</b>", explanation_css: "Sets the <b style='background-color: #ececec;'>position</b> to <b style='background-color: #ececec;'>relative</b> for containing the pseudo-element (<b style='background-color: #ececec;'>::after</b>)." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>overflow: hidden;</b>", explanation_css: "Hides any content that overflows the button boundaries." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>background: linear-gradient(45deg, #ff6b6b, #f94d6a, #ffca3a, #6a4df9, #3ab7ff);</b>", explanation_css: "Sets a multi-color gradient background at a 45-degree angle." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>background-size: 300% 300%;</b>", explanation_css: "Enlarges the gradient background for smoother animation." },
    { number: 20, code_css: "<b style='background-color: #ececec;'>border: none;</b>", explanation_css: "Removes the default border from the button." },
    { number: 21, code_css: "<b style='background-color: #ececec;'>border-radius: 8px;</b>", explanation_css: "Rounds the corners of the button." },
    { number: 22, code_css: "<b style='background-color: #ececec;'>padding: 15px 30px;</b>", explanation_css: "Adds padding inside the button." },
    { number: 23, code_css: "<b style='background-color: #ececec;'>color: white;</b>", explanation_css: "Sets the button text color to white." },
    { number: 24, code_css: "<b style='background-color: #ececec;'>font-size: 18px;</b>", explanation_css: "Sets the font size of the button text." },
    { number: 25, code_css: "<b style='background-color: #ececec;'>cursor: pointer;</b>", explanation_css: "Changes the cursor to a pointer when hovered over the button." },
    { number: 26, code_css: "<b style='background-color: #ececec;'>outline: none;</b>", explanation_css: "Removes the outline when the button is focused." },
    { number: 27, code_css: "<b style='background-color: #ececec;'>transition: background-position 1s;</b>", explanation_css: "Adds a smooth transition effect for the background position." },
    { number: 28, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the <b style='background-color: #ececec;'>.ripple-button</b> styling block." },
    { number: 29, code_css: "<b style='background-color: #ececec;'>/* Sets the hover effect on the ripple button */</b>", explanation_css: "A comment explaining the hover effect." },
    { number: 30, code_css: "<b style='background-color: #ececec;'>.ripple-button:hover {</b>", explanation_css: "Starts the hover effect styling block." },
    { number: 31, code_css: "<b style='background-color: #ececec;'>background-position: right center;</b>", explanation_css: "Moves the background position when hovered to create an animation." },
    { number: 32, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the hover effect styling block." },
    { number: 33, code_css: "<b style='background-color: #ececec;'>/* Sets the after effect on the ripple button */</b>", explanation_css: "A comment explaining the pseudo-element styling." },
    { number: 34, code_css: "<b style='background-color: #ececec;'>.ripple-button::after {</b>", explanation_css: "Starts the <b style='background-color: #ececec;'>::after</b> pseudo-element styling block for <b style='background-color: #ececec;'>.ripple-button</b>." },
    { number: 35, code_css: "<b style='background-color: #ececec;'>content: '';</b>", explanation_css: "Inserts an empty content string." },
    { number: 36, code_css: "<b style='background-color: #ececec;'>position: absolute;</b>", explanation_css: "Positions the element absolutely within the button." },
    { number: 37, code_css: "<b style='background-color: #ececec;'>border-radius: 50%;</b>", explanation_css: "Gives the element a circular shape." },
    { number: 38, code_css: "<b style='background-color: #ececec;'>width: 100px;</b>", explanation_css: "Sets the width of the pseudo-element." },
    { number: 39, code_css: "<b style='background-color: #ececec;'>height: 100px;</b>", explanation_css: "Sets the height of the pseudo-element." },
    { number: 40, code_css: "<b style='background-color: #ececec;'>background-color: rgba(255, 255, 255, 0.6);</b>", explanation_css: "Sets the background color with transparency." },
    { number: 41, code_css: "<b style='background-color: #ececec;'>opacity: 0;</b>", explanation_css: "Makes the element initially transparent." },
    { number: 42, code_css: "<b style='background-color: #ececec;'>transform: scale(1);</b>", explanation_css: "Sets the initial scale to normal size." },
    { number: 43, code_css: "<b style='background-color: #ececec;'>transition: transform 0.5s, opacity 1s;</b>", explanation_css: "Adds transitions for scale and opacity." },
    { number: 44, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the pseudo-element styling block." },
    { number: 45, code_css: "<b style='background-color: #ececec;'>/* Sets the ripple span display on the button */</b>", explanation_css: "A comment explaining the styling for the ripple span." },
    { number: 46, code_css: "<b style='background-color: #ececec;'>.ripple-button span.ripple {</b>", explanation_css: "Starts the <b style='background-color: #ececec;'>.ripple</b> span styling block." },
    { number: 47, code_css: "<b style='background-color: #ececec;'>position: absolute;</b>", explanation_css: "Positions the span absolutely within the button." },
    { number: 48, code_css: "<b style='background-color: #ececec;'>border-radius: 50%;</b>", explanation_css: "Gives the span a circular shape." },
    { number: 49, code_css: "<b style='background-color: #ececec;'>background-color: rgba(255, 255, 255, 0.5);</b>", explanation_css: "Sets a semi-transparent white background." },
    { number: 50, code_css: "<b style='background-color: #ececec;'>transform: scale(0);</b>", explanation_css: "Sets the initial scale to 0 for animation." },
    { number: 51, code_css: "<b style='background-color: #ececec;'>animation: ripple-animation 0.6s linear;</b>", explanation_css: "Applies the <b style='background-color: #ececec;'>ripple-animation</b> for 0.6s in a linear fashion." },
    { number: 52, code_css: "<b style='background-color: #ececec;'>pointer-events: none;</b>", explanation_css: "Prevents the span from capturing pointer events." },
    { number: 53, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the <b style='background-color: #ececec;'>.ripple</b> span styling block." },
    { number: 54, code_css: "<b style='background-color: #ececec;'>/* Set the ripple animation */</b>", explanation_css: "A comment explaining the keyframe animation." },
    { number: 55, code_css: "<b style='background-color: #ececec;'>@keyframes ripple-animation {</b>", explanation_css: "Starts the keyframes block for the <b style='background-color: #ececec;'>ripple-animation</b>." },
    { number: 56, code_css: "<b style='background-color: #ececec;'>to {</b>", explanation_css: "Specifies the end state of the animation." },
    { number: 57, code_css: "<b style='background-color: #ececec;'>transform: scale(4);</b>", explanation_css: "Expands the element 4 times its original size." },
    { number: 58, code_css: "<b style='background-color: #ececec;'>opacity: 0;</b>", explanation_css: "Makes the element fully transparent by the end of the animation." },
    { number: 59, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the <b style='background-color: #ececec;'>to</b> keyframe block." },
    { number: 60, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Ends the <b style='background-color: #ececec;'>@keyframes</b> block." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>// Add an event listener for clicks on elements with class 'ripple-button'</b>", explanation_js: "A comment explaining that an event listener will be added to handle click events on elements with the class <b style='background-color: #ececec;'>ripple-button</b>." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>document.querySelector('.ripple-button').addEventListener('click', function (e) {</b>", explanation_js: "Selects the first element with the class <b style='background-color: #ececec;'>ripple-button</b> and adds a <b style='background-color: #ececec;'>click</b> event listener that triggers an anonymous function when the button is clicked." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>// Create a new 'span' element for the ripple effect</b>", explanation_js: "A comment explaining the creation of a new <b style='background-color: #ececec;'>span</b> element for the ripple effect." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const ripple = document.createElement('span');</b>", explanation_js: "Creates a new <b style='background-color: #ececec;'>span</b> element and assigns it to the variable <b style='background-color: #ececec;'>ripple</b>." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>// Get the clicked button element</b>", explanation_js: "A comment explaining that the current button being clicked is retrieved." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>const button = e.currentTarget;</b>", explanation_js: "Assigns the button that was clicked (<b style='background-color: #ececec;'>e.currentTarget</b>) to the variable <b style='background-color: #ececec;'>button</b>." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>// Get the size and position of the button</b>", explanation_js: "A comment explaining that the button's size and position are being retrieved." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>const rect = button.getBoundingClientRect();</b>", explanation_js: "Retrieves the size and position of the button relative to the viewport and assigns it to <b style='background-color: #ececec;'>rect</b>." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>// Calculate ripple size based on button size</b>", explanation_js: "A comment explaining how the size of the ripple is calculated." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>const size = Math.max(rect.width, rect.height);</b>", explanation_js: "Calculates the ripple's size as the larger of the button's width or height." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>// Calculate the x position of the ripple</b>", explanation_js: "A comment explaining how the x-coordinate for the ripple's position is calculated." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>const x = e.clientX - rect.left - size / 2;</b>", explanation_js: "Calculates the x-coordinate for the ripple's position relative to the button." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>// Calculate the y position of the ripple</b>", explanation_js: "A comment explaining how the y-coordinate for the ripple's position is calculated." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>const y = e.clientY - rect.top - size / 2;</b>", explanation_js: "Calculates the y-coordinate for the ripple's position relative to the button." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>// Set the ripple size</b>", explanation_js: "A comment explaining that the size of the ripple element is being set." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>ripple.style.width = ripple.style.height = `${size}px`;</b>", explanation_js: "Sets both the width and height of the <b style='background-color: #ececec;'>ripple</b> element to the calculated size." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>// Set the left position of the ripple</b>", explanation_js: "A comment explaining that the left position of the ripple is being set." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>ripple.style.left = `${x}px`;</b>", explanation_js: "Sets the <b style='background-color: #ececec;'>left</b> CSS property of the <b style='background-color: #ececec;'>ripple</b> element." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>// Set the top position of the ripple</b>", explanation_js: "A comment explaining that the top position of the ripple is being set." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>ripple.style.top = `${y}px`;</b>", explanation_js: "Sets the <b style='background-color: #ececec;'>top</b> CSS property of the <b style='background-color: #ececec;'>ripple</b> element." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>// Add 'ripple' class to span element</b>", explanation_js: "A comment explaining that the <b style='background-color: #ececec;'>ripple</b> class is added to the element for styling and animation." },
    { number: 22, code_js: "<b style='background-color: #ececec;'>ripple.classList.add('ripple');</b>", explanation_js: "Adds the <b style='background-color: #ececec;'>ripple</b> class to the <b style='background-color: #ececec;'>ripple</b> element." },
    { number: 23, code_js: "<b style='background-color: #ececec;'>// Add ripple element to the button</b>", explanation_js: "A comment explaining that the <b style='background-color: #ececec;'>ripple</b> element is appended to the button." },
    { number: 24, code_js: "<b style='background-color: #ececec;'>button.appendChild(ripple);</b>", explanation_js: "Appends the <b style='background-color: #ececec;'>ripple</b> element to the <b style='background-color: #ececec;'>button</b> as a child." },
    { number: 25, code_js: "<b style='background-color: #ececec;'>// Remove the ripple element after the animation is complete</b>", explanation_js: "A comment explaining that the <b style='background-color: #ececec;'>ripple</b> element will be removed after the animation finishes." },
    { number: 26, code_js: "<b style='background-color: #ececec;'>ripple.addEventListener('animationend', () => {</b>", explanation_js: "Adds an event listener to the <b style='background-color: #ececec;'>ripple</b> element that listens for the <b style='background-color: #ececec;'>animationend</b> event." },
    { number: 27, code_js: "<b style='background-color: #ececec;'>ripple.remove();</b>", explanation_js: "Removes the <b style='background-color: #ececec;'>ripple</b> element from the DOM once the animation ends." },
    { number: 28, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the event listener's function block." },
    { number: 29, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>click</b> event listener function block." }
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
                window.location.href = "/src/download/Button Ripple Effect.rar";
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