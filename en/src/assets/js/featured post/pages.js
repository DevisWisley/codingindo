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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Declares the document type as HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "A comment indicating the author and source." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Starts the HTML document and sets the language to English." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Begins the head section of the HTML document." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Sets the character encoding to UTF-8 for proper text rendering." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Ensures responsive design for mobile devices." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Text To Speech&lt;/title&gt;</b>", explanation_html: "Sets the title of the webpage shown on the browser tab." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Links to the Bootstrap CSS for styling." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.tailwindcss.com\"&gt;&lt;/script&gt;</b>", explanation_html: "Links to the Tailwind CSS JavaScript library for utility-first styling." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\" /&gt;</b>", explanation_html: "Links to Font Awesome for icon usage." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;style&gt; ... &lt;/style&gt;</b>", explanation_html: "Contains internal CSS for custom styles, including body, card, form elements, and buttons." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Ends the head section." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Begins the body section where the content will be rendered." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"card p-6 shadow-lg\"&gt;</b>", explanation_html: "Creates a styled card container for the content." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-3xl font-semibold text-center mb-4\"&gt;Text to Speech&lt;/h2&gt;</b>", explanation_html: "Adds a heading for the card." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex justify-content-between align-items-start\"&gt; ... &lt;/div&gt;</b>", explanation_html: "Creates a flex container for the text input and settings side-by-side." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group mb-4\" ... &gt; ... &lt;/div&gt;</b>", explanation_html: "Creates a form group with a text area for user input." },
    { number: 18, code_html: "Form groups for rate, pitch, and volume sliders with labels and value displays." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group mb-4\"&gt;</b>", explanation_html: "Starts the form group for language selection." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"languageSelect\" class=\"form-label\"&gt; ... &lt;/label&gt;</b>", explanation_html: "Label for language selection." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;select id=\"languageSelect\" class=\"form-select p-3\"&gt;&lt;/select&gt;</b>", explanation_html: "Dropdown for language selection." },
    { number: 22, code_html: "Similar form group structure for voice selection with a dropdown." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"speakBtn\" class=\"btn btn-primary w-full py-3 text-lg font-bold\"&gt; ... &lt;/button&gt;</b>", explanation_html: "Button to trigger the text-to-speech functionality." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Closes the card container." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Links to an external JavaScript file for the text-to-speech logic." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Links to the Bootstrap JavaScript bundle for interactive elements." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Closes the body section." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Ends the HTML document." }
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

const codeJsonExplanations = [
    { code_language: "<b style='background-color: #ececec;'>af</b>", language_name: "<b style='background-color: #ececec;'>Afrikaans (Suid-Afrika)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>South Africa</b>." },
    { code_language: "<b style='background-color: #ececec;'>sq</b>", language_name: "<b style='background-color: #ececec;'>Shqip (Shqipëri)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Albania</b>." },
    { code_language: "<b style='background-color: #ececec;'>am</b>", language_name: "<b style='background-color: #ececec;'>አማርኛ (ኢትዮጵያ)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Ethiopia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ar</b>", language_name: "<b style='background-color: #ececec;'>العربية (السعودية)</b>", explanation_json: "Arabic is the language spoken in <b style='background-color: #ececec;'>Saudi Arabia</b> and several other countries." },
    { code_language: "<b style='background-color: #ececec;'>az</b>", language_name: "<b style='background-color: #ececec;'>Azərbaycan (Azərbaycan)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Azerbaijan</b>." },
    { code_language: "<b style='background-color: #ececec;'>bn</b>", language_name: "<b style='background-color: #ececec;'>বাংলা (বাংলাদেশ)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Bangladesh</b>." },
    { code_language: "<b style='background-color: #ececec;'>bs</b>", language_name: "<b style='background-color: #ececec;'>Bosanski (Bosna i Hercegovina)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Bosnia and Herzegovina</b>." },
    { code_language: "<b style='background-color: #ececec;'>bg</b>", language_name: "<b style='background-color: #ececec;'>Български (България)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Bulgaria</b>." },
    { code_language: "<b style='background-color: #ececec;'>my</b>", language_name: "<b style='background-color: #ececec;'>ဗမာ (မြန်မာ)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Myanmar (Burma)</b>." },
    { code_language: "<b style='background-color: #ececec;'>ca</b>", language_name: "<b style='background-color: #ececec;'>Català (Andorra)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Andorra</b>." },
    { code_language: "<b style='background-color: #ececec;'>zh</b>", language_name: "<b style='background-color: #ececec;'>中文（中国）</b>", explanation_json: "Mandarin is used in <b style='background-color: #ececec;'>China</b>." },
    { code_language: "<b style='background-color: #ececec;'>hr</b>", language_name: "<b style='background-color: #ececec;'>Hrvatski (Hrvatska)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Croatia</b>." },
    { code_language: "<b style='background-color: #ececec;'>cs</b>", language_name: "<b style='background-color: #ececec;'>Čeština (Česká Republika)</b>", explanation_json: "The language spoken in the <b style='background-color: #ececec;'>Czech Republic</b>." },
    { code_language: "<b style='background-color: #ececec;'>da</b>", language_name: "<b style='background-color: #ececec;'>Dansk (Danmark)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Denmark</b>." },
    { code_language: "<b style='background-color: #ececec;'>nl</b>", language_name: "<b style='background-color: #ececec;'>Nederlands (Nederland)</b>", explanation_json: "The language used in the <b style='background-color: #ececec;'>Netherlands</b>." },
    { code_language: "<b style='background-color: #ececec;'>en</b>", language_name: "<b style='background-color: #ececec;'>English (United Kingdom)</b>", explanation_json: "English, used in the <b style='background-color: #ececec;'>United Kingdom</b> and English-speaking countries." },
    { code_language: "<b style='background-color: #ececec;'>et</b>", language_name: "<b style='background-color: #ececec;'>Eesti (Estonia)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Estonia</b>." },
    { code_language: "<b style='background-color: #ececec;'>fil</b>", language_name: "<b style='background-color: #ececec;'>Tagalog (Pilipinas)</b>", explanation_json: "The main language in the <b style='background-color: #ececec;'>Philippines</b>." },
    { code_language: "<b style='background-color: #ececec;'>fi</b>", language_name: "<b style='background-color: #ececec;'>Suomen (Suomi)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Finland</b>." },
    { code_language: "<b style='background-color: #ececec;'>fr</b>", language_name: "<b style='background-color: #ececec;'>Français (France)</b>", explanation_json: "French, spoken in <b style='background-color: #ececec;'>France</b> and some French-speaking countries." },
    { code_language: "<b style='background-color: #ececec;'>gl</b>", language_name: "<b style='background-color: #ececec;'>Galego (España)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Galicia</b>, Spain." },
    { code_language: "<b style='background-color: #ececec;'>ka</b>", language_name: "<b style='background-color: #ececec;'>ქართული (საქართველო)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Georgia</b>." },
    { code_language: "<b style='background-color: #ececec;'>de</b>", language_name: "<b style='background-color: #ececec;'>Deutsch (Deutschland)</b>", explanation_json: "The language used in <b style='background-color: #ececec;'>Germany</b>." },
    { code_language: "<b style='background-color: #ececec;'>el</b>", language_name: "<b style='background-color: #ececec;'>Ελληνικά (Ελλάδα)</b>", explanation_json: "Greek, spoken in <b style='background-color: #ececec;'>Greece</b>." },
    { code_language: "<b style='background-color: #ececec;'>gu</b>", language_name: "<b style='background-color: #ececec;'>ગુજરાતી (ભારત)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Gujarat</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>he</b>", language_name: "<b style='background-color: #ececec;'>עברית (ישראל)</b>", explanation_json: "Hebrew, spoken in <b style='background-color: #ececec;'>Israel</b>." },
    { code_language: "<b style='background-color: #ececec;'>hi</b>", language_name: "<b style='background-color: #ececec;'>हिन्दी (भारत)</b>", explanation_json: "Hindi, spoken in <b style='background-color: #ececec;'>India</b>." },
    { code_language: "<b style='background-color: #ececec;'>hu</b>", language_name: "<b style='background-color: #ececec;'>Magyar (Magyarország)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Hungary</b>." },
    { code_language: "<b style='background-color: #ececec;'>is</b>", language_name: "<b style='background-color: #ececec;'>Íslenska (Ísland)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Iceland</b>." },
    { code_language: "<b style='background-color: #ececec;'>id</b>", language_name: "<b style='background-color: #ececec;'>Bahasa Indonesia (Indonesia)</b>", explanation_json: "Official language in <b style='background-color: #ececec;'>Indonesia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ga</b>", language_name: "<b style='background-color: #ececec;'>Gaeilge (Éire)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Ireland</b>." },
    { code_language: "<b style='background-color: #ececec;'>it</b>", language_name: "<b style='background-color: #ececec;'>Italiano (Italia)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Italy</b>." },
    { code_language: "<b style='background-color: #ececec;'>ja</b>", language_name: "<b style='background-color: #ececec;'>日本語 (日本)</b>", explanation_json: "Japanese, spoken in <b style='background-color: #ececec;'>Japan</b>." },
    { code_language: "<b style='background-color: #ececec;'>jv</b>", language_name: "<b style='background-color: #ececec;'>Basa Jawa (Indonesia)</b>", explanation_json: "The language used in <b style='background-color: #ececec;'>Java</b>, Indonesia." },
    { code_language: "<b style='background-color: #ececec;'>kn</b>", language_name: "<b style='background-color: #ececec;'>ಕನ್ನಡ (ಕೆನಡಾ)</b>", explanation_json: "The language used in <b style='background-color: #ececec;'>Karnataka</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>kk</b>", language_name: "<b style='background-color: #ececec;'>Қазақ (Қазақстан)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Kazakhstan</b>." },
    { code_language: "<b style='background-color: #ececec;'>km</b>", language_name: "<b style='background-color: #ececec;'>ខ្មែរ (កម្ពុជា)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Cambodia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ko</b>", language_name: "<b style='background-color: #ececec;'>한국어 (대한민국)</b>", explanation_json: "Korean, spoken in <b style='background-color: #ececec;'>South Korea</b>." },
    { code_language: "<b style='background-color: #ececec;'>lo</b>", language_name: "<b style='background-color: #ececec;'>ລາວ (ປະເທດລາວ)</b>", explanation_json: "Laotian, spoken in <b style='background-color: #ececec;'>Laos</b>." },
    { code_language: "<b style='background-color: #ececec;'>lv</b>", language_name: "<b style='background-color: #ececec;'>Latviešu (Latvija)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Latvia</b>." },
    { code_language: "<b style='background-color: #ececec;'>lt</b>", language_name: "<b style='background-color: #ececec;'>Lietuvių (Lietuva)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Lithuania</b>." },
    { code_language: "<b style='background-color: #ececec;'>mk</b>", language_name: "<b style='background-color: #ececec;'>Македонски (Северна Македонија)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>North Macedonia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ms</b>", language_name: "<b style='background-color: #ececec;'>Bahasa Melayu (Malaysia)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Malaysia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ml</b>", language_name: "<b style='background-color: #ececec;'>മലയാളം (ഇന്ത്യ)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Kerala</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>mt</b>", language_name: "<b style='background-color: #ececec;'>Malti (Malta)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Malta</b>." },
    { code_language: "<b style='background-color: #ececec;'>mr</b>", language_name: "<b style='background-color: #ececec;'>मराठी (भारत)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Maharashtra</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>mn</b>", language_name: "<b style='background-color: #ececec;'>Монгол (Монгол)</b>", explanation_json: "Mongolian language, spoken in <b style='background-color: #ececec;'>Mongolia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ne</b>", language_name: "<b style='background-color: #ececec;'>नेपाली (नेपाल)</b>", explanation_json: "Nepali language, spoken in <b style='background-color: #ececec;'>Nepal</b>." },
    { code_language: "<b style='background-color: #ececec;'>nb</b>", language_name: "<b style='background-color: #ececec;'>Norsk (Norge)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Norway</b>." },
    { code_language: "<b style='background-color: #ececec;'>ps</b>", language_name: "<b style='background-color: #ececec;'>پښتو (افغانستان)</b>", explanation_json: "Pashto language, spoken in <b style='background-color: #ececec;'>Afghanistan</b>." },
    { code_language: "<b style='background-color: #ececec;'>fa</b>", language_name: "<b style='background-color: #ececec;'>فارسی (ایران)</b>", explanation_json: "Persian language, spoken in <b style='background-color: #ececec;'>Iran</b>." },
    { code_language: "<b style='background-color: #ececec;'>pl</b>", language_name: "<b style='background-color: #ececec;'>Polski (Polska)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Poland</b>." },
    { code_language: "<b style='background-color: #ececec;'>pt</b>", language_name: "<b style='background-color: #ececec;'>Português (Portugal)</b>", explanation_json: "Portuguese, spoken in <b style='background-color: #ececec;'>Portugal</b>." },
    { code_language: "<b style='background-color: #ececec;'>ro</b>", language_name: "<b style='background-color: #ececec;'>Română (România)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Romania</b>." },
    { code_language: "<b style='background-color: #ececec;'>ru</b>", language_name: "<b style='background-color: #ececec;'>Русский (Россия)</b>", explanation_json: "Russian language, spoken in <b style='background-color: #ececec;'>Russia</b>." },
    { code_language: "<b style='background-color: #ececec;'>sr</b>", language_name: "<b style='background-color: #ececec;'>Српски (Србија)</b>", explanation_json: "Serbian language, spoken in <b style='background-color: #ececec;'>Serbia</b>." },
    { code_language: "<b style='background-color: #ececec;'>si</b>", language_name: "<b style='background-color: #ececec;'>සිංහල (ශ්‍රී ලංකා)</b>", explanation_json: "Sinhalese language, spoken in <b style='background-color: #ececec;'>Sri Lanka</b>." },
    { code_language: "<b style='background-color: #ececec;'>sk</b>", language_name: "<b style='background-color: #ececec;'>Slovenčina (Slovensko)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Slovakia</b>." },
    { code_language: "<b style='background-color: #ececec;'>sl</b>", language_name: "<b style='background-color: #ececec;'>Slovenščina (Slovenija)</b>", explanation_json: "Languages ​​spoken in <b style='background-color: #ececec;'>Slovenia</b>." },
    { code_language: "<b style='background-color: #ececec;'>so</b>", language_name: "<b style='background-color: #ececec;'>Soomaali (Soomaaliya)</b>", explanation_json: "Somali language, spoken in <b style='background-color: #ececec;'>Somalia</b>." },
    { code_language: "<b style='background-color: #ececec;'>es</b>", language_name: "<b style='background-color: #ececec;'>Español (España)</b>", explanation_json: "Spanish, spoken in <b style='background-color: #ececec;'>Spain</b> and Spanish-speaking countries." },
    { code_language: "<b style='background-color: #ececec;'>su</b>", language_name: "<b style='background-color: #ececec;'>Basa Sunda (Indonésia)</b>", explanation_json: "Sundanese, spoken in <b style='background-color: #ececec;'>West Java</b>, Indonesia." },
    { code_language: "<b style='background-color: #ececec;'>sw</b>", language_name: "<b style='background-color: #ececec;'>Kiswahili (Kenya)</b>", explanation_json: "Swahili, spoken in <b style='background-color: #ececec;'>Kenya</b>." },
    { code_language: "<b style='background-color: #ececec;'>sv</b>", language_name: "<b style='background-color: #ececec;'>Svenska (Sverige)</b>", explanation_json: "The language spoken in <b style='background-color: #ececec;'>Sweden</b>." },
    { code_language: "<b style='background-color: #ececec;'>ta</b>", language_name: "<b style='background-color: #ececec;'>தமிழ் (சிங்கப்பூர்)</b>", explanation_json: "Tamil language, spoken in <b style='background-color: #ececec;'>Singapore</b> and India (Tamil Nadu)." },
    { code_language: "<b style='background-color: #ececec;'>te</b>", language_name: "<b style='background-color: #ececec;'>తెలుగు (భారతదేశం)</b>", explanation_json: "Telugu language, spoken in <b style='background-color: #ececec;'>India</b> (Andhra Pradesh)." },
    { code_language: "<b style='background-color: #ececec;'>th</b>", language_name: "<b style='background-color: #ececec;'>ไทย (ประเทศไทย)</b>", explanation_json: "Thai language, spoken in <b style='background-color: #ececec;'>Thailand</b>." },
    { code_language: "<b style='background-color: #ececec;'>tr</b>", language_name: "<b style='background-color: #ececec;'>Türkçe (Türkiye)</b>", explanation_json: "Turkish language, spoken in <b style='background-color: #ececec;'>Turkey</b>." },
    { code_language: "<b style='background-color: #ececec;'>uk</b>", language_name: "<b style='background-color: #ececec;'>Українська (Україна)</b>", explanation_json: "Ukrainian language, spoken in <b style='background-color: #ececec;'>Ukraine</b>." },
    { code_language: "<b style='background-color: #ececec;'>ur</b>", language_name: "<b style='background-color: #ececec;'>اردو (پاکستان)</b>", explanation_json: "Urdu, spoken in <b style='background-color: #ececec;'>Pakistan</b>." },
    { code_language: "<b style='background-color: #ececec;'>uz</b>", language_name: "<b style='background-color: #ececec;'>O'zbekcha (O'zbekiston)</b>", explanation_json: "Uzbek language, spoken in <b style='background-color: #ececec;'>Uzbekistan</b>." },
    { code_language: "<b style='background-color: #ececec;'>vi</b>", language_name: "<b style='background-color: #ececec;'>Tiếng Việt (Việt Nam)</b>", explanation_json: "Vietnamese, spoken in <b style='background-color: #ececec;'>Vietnam</b>." },
    { code_language: "<b style='background-color: #ececec;'>cy</b>", language_name: "<b style='background-color: #ececec;'>Cymraeg (Cymru)</b>", explanation_json: "Welsh, spoken in <b style='background-color: #ececec;'>Wales</b> (United Kingdom)." },
    { code_language: "<b style='background-color: #ececec;'>zu</b>", language_name: "<b style='background-color: #ececec;'>IsiZulu (Ningizimu Afrika)</b>", explanation_json: "Zulu language, spoken in <b style='background-color: #ececec;'>South Africa</b>." }
];

const tableJsonBody = document.getElementById("code-json-explanation-table");
codeJsonExplanations.forEach(item => {
    const row = `
        <tr>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono">${item.code_language}</td>
            <td class="py-2 px-4 text-sm text-gray-800 font-mono">${item.language_name}</td>
            <td class="py-2 px-4 text-sm text-gray-700">${item.explanation_json}</td>
        </tr>
    `;
    tableJsonBody.insertAdjacentHTML("beforeend", row);
});

const codeJsExplanations = [
    { number: 1, code_js: "<b style='background-color: #ececec;'>const textInput = document.getElementById('textInput');</b>", explanation_js: "Takes a text input element from the DOM to receive the text to be read out." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>const languageSelect = document.getElementById('languageSelect');</b>", explanation_js: "Fetch the language selection dropdown element from the DOM." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>const voiceSelect = document.getElementById('voiceSelect');</b>", explanation_js: "Gets the vote selection dropdown element from the DOM." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const speakBtn = document.getElementById('speakBtn');</b>", explanation_js: "Fetch the \"speak\" button element from the DOM to trigger text reading." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>const rateRange = document.getElementById('rateRange');</b>", explanation_js: "Takes a slider input element to set the reading speed from the DOM." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>const pitchRange = document.getElementById('pitchRange');</b>", explanation_js: "Takes the slider input element to set the reading pitch from the DOM." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>const volumeRange = document.getElementById('volumeRange');</b>", explanation_js: "Takes a slider input element to set the reading volume from the DOM." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>const rateValue = document.getElementById('rateValue');</b>", explanation_js: "Gets the element to display the speed value when the slider is changed." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>const pitchValue = document.getElementById('pitchValue');</b>", explanation_js: "Gets an element to display the pitch value when the slider is changed." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>const volumeValue = document.getElementById('volumeValue');</b>", explanation_js: "Gets the element to display the volume value when the slider is changed." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>let voices = [];</b>", explanation_js: "Initializes an empty array to store the list of available sounds." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>function loadLanguageNames() { ... }</b>", explanation_js: "Defines a function to load language names from an external JSON file." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>function populateVoices() { ... }</b>", explanation_js: "Defines a function to populate the voice dropdown element with the available voices, according to the selected language." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>function populateLanguages(languageNames) { ... }</b>", explanation_js: "Defines a function to populate the language dropdown element with the unique languages ​​available on the device." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>languageSelect.addEventListener('change', populateVoices);</b>", explanation_js: "Added event listener to reload available voices when language selected in dropdown is changed." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>rateRange.addEventListener('input', () => { ... });</b>", explanation_js: "Added event listener to update the speed value display when the slider is changed." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>pitchRange.addEventListener('input', () => { ... });</b>", explanation_js: "Added event listener to update the pitch value display when the slider is changed." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>volumeRange.addEventListener('input', () => { ... });</b>", explanation_js: "Added event listener to update the volume value display when the slider is changed." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>function speakText() { ... }</b>", explanation_js: "Defines a function to start text-to-speech with user-set parameters." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>speechSynthesis.onvoiceschanged = () => { ... };</b>", explanation_js: "Added event listener to reload the sound list when a sound is changed or available." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>speakBtn.addEventListener('click', speakText);</b>", explanation_js: "Added an event listener to trigger text reading when the \"speak\" button is clicked." }
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
                window.location.href = "/src/download/Text To Speech.rar";
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