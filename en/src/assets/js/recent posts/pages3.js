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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Defines the document type as HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Comments indicating that the code was created by CodingIndo." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "The HTML opening tag with the <b style='background-color: #ececec;'>lang=\"en\"</b> attribute sets the document language as English." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "The opening tag of the <b style='background-color: #ececec;'>&lt;head&gt;</b> element, where metadata and external resources are loaded." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta charset to define character encoding --&gt;</b>", explanation_html: "Comments to explain the next charset meta element." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Sets the document's character encoding to UTF-8 to support a wide range of characters." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta viewport to set responsive display --&gt;</b>", explanation_html: "Comments to explain the next viewport meta element." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Sets the viewport for a responsive page to fit the device screen width." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Title for page title --&gt;</b>", explanation_html: "Comments to explain the <b style='background-color: #ececec;'>&lt;title&gt;</b> element." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Bar Chart&lt;/title&gt;</b>", explanation_html: "Displays the page title as \"Bar Chart\" in the browser tab." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to Bootstrap CSS for styling --&gt;</b>", explanation_html: "Comments to indicate that Bootstrap is used for styling." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Load Bootstrap stylesheets from a CDN to take advantage of Bootstrap CSS components and styles." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to TailwindCSS for styling --&gt;</b>", explanation_html: "Comments explaining that Tailwind CSS is used for additional styling." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Load Tailwind CSS from CDN for additional styling with Tailwind." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- Script for Chart.js library --&gt;</b>", explanation_html: "Comments indicating that the Chart.js library was used to create the chart." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/chart.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Load the Chart.js library from a CDN to create and display charts." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "The closing tag of the <b style='background-color: #ececec;'>&lt;head&gt;</b> element." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;body class=\"bg-gray-100\"&gt;</b>", explanation_html: "The opening tag of the <b style='background-color: #ececec;'>&lt;body&gt;</b> element with the <b style='background-color: #ececec;'>bg-gray-100</b> class from Tailwind gives the page a light gray background color." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;!-- Main container with top margin --&gt;</b>", explanation_html: "Comments to indicate the main element with a top margin." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container mx-auto mt-5\"&gt;</b>", explanation_html: "Create a <b style='background-color: #ececec;'>&lt;div&gt;</b> element as the main container with the Bootstrap <b style='background-color: #ececec;'>container</b> class and the Tailwind classes <b style='background-color: #ececec;'>mx-auto</b> (horizontally centered) and <b style='background-color: #ececec;'>mt-5</b> (top margin)." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;!-- Heading for chart title --&gt;</b>", explanation_html: "Comments to indicate the chart title heading." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-center text-2xl font-bold mb-4\"&gt;Bar Chart&lt;/h2&gt;</b>", explanation_html: "Add a \"Bar Chart\" title with large, bold, centered text using the Tailwind <b style='background-color: #ececec;'>text-2xl</b>, <b style='background-color: #ececec;'>font-bold</b>, and <b style='background-color: #ececec;'>text-center</b>." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;!-- Div for canvas chart with styling --&gt;</b>", explanation_html: "Comments to describe the <b style='background-color: #ececec;'>&lt;div&gt;</b> element for the chart canvas." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"bg-white p-5 rounded-lg shadow\"&gt;</b>", explanation_html: "A <b style='background-color: #ececec;'>&lt;div&gt;</b> element with the Tailwind classes <b style='background-color: #ececec;'>bg-white</b>, <b style='background-color: #ececec;'>p-5</b> (padding), <b style='background-color: #ececec;'>rounded-lg</b> (rounded corners), and <b style='background-color: #ececec;'>shadow</b> (shadow effect) acts as the chart canvas container." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;!-- Canvas to display bar chart --&gt;</b>", explanation_html: "Comments to explain the next <b style='background-color: #ececec;'>&lt;canvas&gt;</b> element." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;canvas id=\"barChart\"&gt;&lt;/canvas&gt;</b>", explanation_html: "The <b style='background-color: #ececec;'>&lt;canvas&gt;</b> element with <b style='background-color: #ececec;'>id=\"barChart\"</b> to display a bar chart using Chart.js." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "The closing tag of the <b style='background-color: #ececec;'>&lt;div&gt;</b> element for the chart canvas container." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "The closing tag of the <b style='background-color: #ececec;'>&lt;div&gt;</b> element for the main container." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;!-- Script for external JavaScript file --&gt;</b>", explanation_html: "Comments to indicate calling external JavaScript files." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Loads an external JavaScript file <b style='background-color: #ececec;'>script.js</b> which contains the graphing logic and other functionality." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "The closing tag of the <b style='background-color: #ececec;'>&lt;body&gt;</b> element." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "The closing tag of the <b style='background-color: #ececec;'>&lt;html&gt;</b> element." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>// Get the context from the canvas element with id 'barChart'</b>", explanation_js: "Comments to explain that this code takes context from the canvas element with <b style='background-color: #ececec;'>id=\"barChart\"</b>." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>const ctx = document.getElementById('barChart').getContext('2d');</b>", explanation_js: "Gets the 2D context of the canvas element with <b style='background-color: #ececec;'>id=\"barChart\"</b>, which is needed by Chart.js to draw the chart." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>// Create a new chart with type 'bar'</b>", explanation_js: "Comments to explain that the following line of code will create a new chart of type 'bar'." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const barChart = new Chart(ctx, {</b>", explanation_js: "Create a new <b style='background-color: #ececec;'>Chart</b> object with the <b style='background-color: #ececec;'>ctx</b> context, and start configuring the bar chart." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>type: 'bar',</b>", explanation_js: "Specifies the chart type as 'bar'." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>data: {</b>", explanation_js: "Opens the data elements to define the data to be displayed in the chart." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>// Label for the x-axis</b>", explanation_js: "Comment to explain that this section sets the labels for the x-axis." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],</b>", explanation_js: "Defines labels for the x-axis with the month names from January to July." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>datasets: [{</b>", explanation_js: "Opens the dataset element to define a graph data set." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>// Labels for the dataset</b>", explanation_js: "Comments to explain that these are labels for a dataset." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>label: 'Sales',</b>", explanation_js: "Set the dataset label as 'Sales', which will be displayed in the chart legend. " },
    { number: 12, code_js: "<b style='background-color: #ececec;'>// Data for chart</b>", explanation_js: "Comments to indicate this section contains data for the graph." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>data: [65, 59, 80, 81, 56, 55, 40],</b>", explanation_js: "Provides the data to be displayed on the graph for each month, according to the order of the labels on the x-axis." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>// Background color for each bar</b>", explanation_js: "Comments to indicate the background color of each bar." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>backgroundColor: [</b>", explanation_js: "Opens the <b style='background-color: #ececec;'>backgroundColor</b> array to specify the background color for each graph bar." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'</b>", explanation_js: "Sets a transparent color for each bar using RGBA (red, green, blue, alpha values)." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>],</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>backgroundColor</b> array." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>// Border color for each bar</b>", explanation_js: "Comment to explain that the following line determines the border color of each chart bar." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>borderColor: [</b>", explanation_js: "Opens the <b style='background-color: #ececec;'>borderColor</b> array to specify the border color of each chart bar." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'</b>", explanation_js: "Set a full border color (with alpha 1) for each bar." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>],</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>borderColor</b> array." },
    { number: 22, code_js: "<b style='background-color: #ececec;'>// Border thickness</b>", explanation_js: "Comment to indicate that the following line specifies the border thickness." },
    { number: 23, code_js: "<b style='background-color: #ececec;'>borderWidth: 1</b>", explanation_js: "Set the border thickness for each bar to 1 pixel." },
    { number: 24, code_js: "<b style='background-color: #ececec;'>}]</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>datasets</b> element." },
    { number: 25, code_js: "<b style='background-color: #ececec;'>},</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>data</b> element." },
    { number: 26, code_js: "<b style='background-color: #ececec;'>options: {</b>", explanation_js: "Opens the <b style='background-color: #ececec;'>options</b> element to set chart options, including scale and appearance." },
    { number: 27, code_js: "<b style='background-color: #ececec;'>scales: {</b>", explanation_js: "Opens the <b style='background-color: #ececec;'>scales</b> element to set the chart scale." },
    { number: 28, code_js: "<b style='background-color: #ececec;'>y: {</b>", explanation_js: "Opens the scale for the y-axis." },
    { number: 29, code_js: "<b style='background-color: #ececec;'>// Start the y-axis from zero</b>", explanation_js: "Comment to indicate that the y-axis will start at zero." },
    { number: 30, code_js: "<b style='background-color: #ececec;'>beginAtZero: true</b>", explanation_js: "Sets the y-axis to start at zero." },
    { number: 31, code_js: "<b style='background-color: #ececec;'>}</b>", explanation_js: "Closes the y-axis scale." },
    { number: 32, code_js: "<b style='background-color: #ececec;'>}</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>scales</b> element." },
    { number: 33, code_js: "<b style='background-color: #ececec;'>}</b>", explanation_js: "Closes the <b style='background-color: #ececec;'>options</b> element." },
    { number: 34, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Close the <b style='background-color: #ececec;'>Chart</b> object and complete the chart configuration." }
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
                window.location.href = "/src/download/Bar Chart.rar";
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