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
            console.error('Gagal menyalin kode: ', err);
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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Mendeklarasikan jenis dokumen sebagai HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Komentar yang menunjukkan penulis dan sumber." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Memulai dokumen HTML dan mengatur bahasa ke Bahasa Inggris." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Memulai bagian kepala dokumen HTML." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Mengatur pengkodean karakter ke UTF-8 untuk pemrosesan teks yang tepat." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Memastikan desain responsif untuk perangkat seluler." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Text To Speech&lt;/title&gt;</b>", explanation_html: "Mengatur judul halaman web yang ditampilkan pada tab browser." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Tautan ke Bootstrap CSS untuk penataan gaya." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.tailwindcss.com\"&gt;&lt;/script&gt;</b>", explanation_html: "Tautan ke pustaka JavaScript TailwindCSS untuk gaya yang mengutamakan utilitas." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\" /&gt;</b>", explanation_html: "Tautan ke Font Awesome untuk penggunaan ikon." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;style&gt; ... &lt;/style&gt;</b>", explanation_html: "Berisi CSS internal untuk gaya khusus, termasuk elemen badan, kartu, formulir, dan tombol." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Mengakhiri bagian kepala." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Memulai bagian isi di mana konten akan ditampilkan." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"card p-6 shadow-lg\"&gt;</b>", explanation_html: "Membuat container kartu bergaya untuk konten." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-3xl font-semibold text-center mb-4\"&gt;Text to Speech&lt;/h2&gt;</b>", explanation_html: "Menambahkan judul untuk kartu." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex justify-content-between align-items-start\"&gt; ... &lt;/div&gt;</b>", explanation_html: "Membuat wadah fleksibel untuk masukan teks dan pengaturan secara berdampingan." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group mb-4\" ... &gt; ... &lt;/div&gt;</b>", explanation_html: "Membuat grup formulir dengan area teks untuk masukan pengguna." },
    { number: 18, code_html: "Form groups for rate, pitch, and volume sliders with labels and value displays." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group mb-4\"&gt;</b>", explanation_html: "Memulai grup formulir untuk pemilihan bahasa." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"languageSelect\" class=\"form-label\"&gt; ... &lt;/label&gt;</b>", explanation_html: "Label untuk pemilihan bahasa." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;select id=\"languageSelect\" class=\"form-select p-3\"&gt;&lt;/select&gt;</b>", explanation_html: "Menu dropdown untuk pemilihan bahasa." },
    { number: 22, code_html: "Similar form group structure for voice selection with a dropdown." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"speakBtn\" class=\"btn btn-primary w-full py-3 text-lg font-bold\"&gt; ... &lt;/button&gt;</b>", explanation_html: "Tombol untuk memicu fungsi text-to-speech." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup container kartu." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Tautan ke berkas JavaScript eksternal untuk logika text-to-speech." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Tautan ke bundel JavaScript Bootstrap untuk elemen interaktif." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Menutup bagian badan." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Mengakhiri dokumen HTML." }
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
    { code_language: "<b style='background-color: #ececec;'>af</b>", language_name: "<b style='background-color: #ececec;'>Afrikaans (Suid-Afrika)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Afrika Selatan</b>." },
    { code_language: "<b style='background-color: #ececec;'>sq</b>", language_name: "<b style='background-color: #ececec;'>Shqip (Shqipëri)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Albania</b>." },
    { code_language: "<b style='background-color: #ececec;'>am</b>", language_name: "<b style='background-color: #ececec;'>አማርኛ (ኢትዮጵያ)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Etiopia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ar</b>", language_name: "<b style='background-color: #ececec;'>العربية (السعودية)</b>", explanation_json: "Bahasa Arab adalah bahasa yang digunakan di <b style='background-color: #ececec;'>Arab Saudi</b> dan beberapa negara lain." },
    { code_language: "<b style='background-color: #ececec;'>az</b>", language_name: "<b style='background-color: #ececec;'>Azərbaycan (Azərbaycan)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Azerbaijan</b>." },
    { code_language: "<b style='background-color: #ececec;'>bn</b>", language_name: "<b style='background-color: #ececec;'>বাংলা (বাংলাদেশ)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Bangladesh</b>." },
    { code_language: "<b style='background-color: #ececec;'>bs</b>", language_name: "<b style='background-color: #ececec;'>Bosanski (Bosna i Hercegovina)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Bosnia dan Herzegovina</b>." },
    { code_language: "<b style='background-color: #ececec;'>bg</b>", language_name: "<b style='background-color: #ececec;'>Български (България)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Bulgaria</b>." },
    { code_language: "<b style='background-color: #ececec;'>my</b>", language_name: "<b style='background-color: #ececec;'>ဗမာ (မြန်မာ)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Myanmar (Burma)</b>." },
    { code_language: "<b style='background-color: #ececec;'>ca</b>", language_name: "<b style='background-color: #ececec;'>Català (Andorra)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Andorra</b>." },
    { code_language: "<b style='background-color: #ececec;'>zh</b>", language_name: "<b style='background-color: #ececec;'>中文（中国）</b>", explanation_json: "Bahasa Mandarin digunakan di <b style='background-color: #ececec;'>Tiongkok</b>." },
    { code_language: "<b style='background-color: #ececec;'>hr</b>", language_name: "<b style='background-color: #ececec;'>Hrvatski (Hrvatska)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Kroasia</b>." },
    { code_language: "<b style='background-color: #ececec;'>cs</b>", language_name: "<b style='background-color: #ececec;'>Čeština (Česká Republika)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Republik Ceko</b>." },
    { code_language: "<b style='background-color: #ececec;'>da</b>", language_name: "<b style='background-color: #ececec;'>Dansk (Danmark)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Denmark</b>." },
    { code_language: "<b style='background-color: #ececec;'>nl</b>", language_name: "<b style='background-color: #ececec;'>Nederlands (Nederland)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Belanda</b>." },
    { code_language: "<b style='background-color: #ececec;'>en</b>", language_name: "<b style='background-color: #ececec;'>English (United Kingdom)</b>", explanation_json: "Bahasa Inggris, digunakan di <b style='background-color: #ececec;'>Britania Raya</b> dan negara-negara berbahasa Inggris." },
    { code_language: "<b style='background-color: #ececec;'>et</b>", language_name: "<b style='background-color: #ececec;'>Eesti (Estonia)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Estonia</b>." },
    { code_language: "<b style='background-color: #ececec;'>fil</b>", language_name: "<b style='background-color: #ececec;'>Tagalog (Pilipinas)</b>", explanation_json: "Bahasa utama di <b style='background-color: #ececec;'>Filipina</b>." },
    { code_language: "<b style='background-color: #ececec;'>fi</b>", language_name: "<b style='background-color: #ececec;'>Suomen (Suomi)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Finlandia</b>." },
    { code_language: "<b style='background-color: #ececec;'>fr</b>", language_name: "<b style='background-color: #ececec;'>Français (France)</b>", explanation_json: "Bahasa Prancis, dituturkan di <b style='background-color: #ececec;'>Prancis</b> dan beberapa negara berbahasa Prancis." },
    { code_language: "<b style='background-color: #ececec;'>gl</b>", language_name: "<b style='background-color: #ececec;'>Galego (España)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Galicia</b>, Spanyol." },
    { code_language: "<b style='background-color: #ececec;'>ka</b>", language_name: "<b style='background-color: #ececec;'>ქართული (საქართველო)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Georgia</b>." },
    { code_language: "<b style='background-color: #ececec;'>de</b>", language_name: "<b style='background-color: #ececec;'>Deutsch (Deutschland)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Jerman</b>." },
    { code_language: "<b style='background-color: #ececec;'>el</b>", language_name: "<b style='background-color: #ececec;'>Ελληνικά (Ελλάδα)</b>", explanation_json: "Bahasa Yunani, dituturkan di <b style='background-color: #ececec;'>Yunani</b>." },
    { code_language: "<b style='background-color: #ececec;'>gu</b>", language_name: "<b style='background-color: #ececec;'>ગુજરાતી (ભારત)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Gujarat</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>he</b>", language_name: "<b style='background-color: #ececec;'>עברית (ישראל)</b>", explanation_json: "Bahasa Ibrani, digunakan di <b style='background-color: #ececec;'>Israel</b>." },
    { code_language: "<b style='background-color: #ececec;'>hi</b>", language_name: "<b style='background-color: #ececec;'>हिन्दी (भारत)</b>", explanation_json: "Bahasa Hindi, digunakan di <b style='background-color: #ececec;'>India</b>." },
    { code_language: "<b style='background-color: #ececec;'>hu</b>", language_name: "<b style='background-color: #ececec;'>Magyar (Magyarország)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Hungaria</b>." },
    { code_language: "<b style='background-color: #ececec;'>is</b>", language_name: "<b style='background-color: #ececec;'>Íslenska (Ísland)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Islandia</b>." },
    { code_language: "<b style='background-color: #ececec;'>id</b>", language_name: "<b style='background-color: #ececec;'>Bahasa Indonesia (Indonesia)</b>", explanation_json: "Bahasa resmi di <b style='background-color: #ececec;'>Indonesia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ga</b>", language_name: "<b style='background-color: #ececec;'>Gaeilge (Éire)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Irlandia</b>." },
    { code_language: "<b style='background-color: #ececec;'>it</b>", language_name: "<b style='background-color: #ececec;'>Italiano (Italia)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Italia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ja</b>", language_name: "<b style='background-color: #ececec;'>日本語 (日本)</b>", explanation_json: "Bahasa Jepang, dituturkan di <b style='background-color: #ececec;'>Jepang</b>." },
    { code_language: "<b style='background-color: #ececec;'>jv</b>", language_name: "<b style='background-color: #ececec;'>Basa Jawa (Indonesia)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Jawa</b>, Indonesia." },
    { code_language: "<b style='background-color: #ececec;'>kn</b>", language_name: "<b style='background-color: #ececec;'>ಕನ್ನಡ (ಕೆನಡಾ)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Karnataka</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>kk</b>", language_name: "<b style='background-color: #ececec;'>Қазақ (Қазақстан)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Kazakhstan</b>." },
    { code_language: "<b style='background-color: #ececec;'>km</b>", language_name: "<b style='background-color: #ececec;'>ខ្មែរ (កម្ពុជា)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Kamboja</b>." },
    { code_language: "<b style='background-color: #ececec;'>ko</b>", language_name: "<b style='background-color: #ececec;'>한국어 (대한민국)</b>", explanation_json: "Bahasa Korea, digunakan di <b style='background-color: #ececec;'>Korea Selatan</b>." },
    { code_language: "<b style='background-color: #ececec;'>lo</b>", language_name: "<b style='background-color: #ececec;'>ລາວ (ປະເທດລາວ)</b>", explanation_json: "Bahasa Laos, digunakan di <b style='background-color: #ececec;'>Laos</b>." },
    { code_language: "<b style='background-color: #ececec;'>lv</b>", language_name: "<b style='background-color: #ececec;'>Latviešu (Latvija)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Latvia</b>." },
    { code_language: "<b style='background-color: #ececec;'>lt</b>", language_name: "<b style='background-color: #ececec;'>Lietuvių (Lietuva)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Lithuania</b>." },
    { code_language: "<b style='background-color: #ececec;'>mk</b>", language_name: "<b style='background-color: #ececec;'>Македонски (Северна Македонија)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Makedonia Utara</b>." },
    { code_language: "<b style='background-color: #ececec;'>ms</b>", language_name: "<b style='background-color: #ececec;'>Bahasa Melayu (Malaysia)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Malaysia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ml</b>", language_name: "<b style='background-color: #ececec;'>മലയാളം (ഇന്ത്യ)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Kerala</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>mt</b>", language_name: "<b style='background-color: #ececec;'>Malti (Malta)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Malta</b>." },
    { code_language: "<b style='background-color: #ececec;'>mr</b>", language_name: "<b style='background-color: #ececec;'>मराठी (भारत)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Maharashtra</b>, India." },
    { code_language: "<b style='background-color: #ececec;'>mn</b>", language_name: "<b style='background-color: #ececec;'>Монгол (Монгол)</b>", explanation_json: "Bahasa Mongolia, dituturkan di <b style='background-color: #ececec;'>Mongolia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ne</b>", language_name: "<b style='background-color: #ececec;'>नेपाली (नेपाल)</b>", explanation_json: "Bahasa Nepal, digunakan di <b style='background-color: #ececec;'>Nepal</b>." },
    { code_language: "<b style='background-color: #ececec;'>nb</b>", language_name: "<b style='background-color: #ececec;'>Norsk (Norge)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Norwegia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ps</b>", language_name: "<b style='background-color: #ececec;'>پښتو (افغانستان)</b>", explanation_json: "Bahasa Pashto, digunakan di <b style='background-color: #ececec;'>Afghanistan</b>." },
    { code_language: "<b style='background-color: #ececec;'>fa</b>", language_name: "<b style='background-color: #ececec;'>فارسی (ایران)</b>", explanation_json: "Bahasa Persia, digunakan di <b style='background-color: #ececec;'>Iran</b>." },
    { code_language: "<b style='background-color: #ececec;'>pl</b>", language_name: "<b style='background-color: #ececec;'>Polski (Polska)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Polandia</b>." },
    { code_language: "<b style='background-color: #ececec;'>pt</b>", language_name: "<b style='background-color: #ececec;'>Português (Portugal)</b>", explanation_json: "Bahasa Portugis, dituturkan di <b style='background-color: #ececec;'>Portugal</b>." },
    { code_language: "<b style='background-color: #ececec;'>ro</b>", language_name: "<b style='background-color: #ececec;'>Română (România)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Rumania</b>." },
    { code_language: "<b style='background-color: #ececec;'>ru</b>", language_name: "<b style='background-color: #ececec;'>Русский (Россия)</b>", explanation_json: "Bahasa Rusia, digunakan di <b style='background-color: #ececec;'>Rusia</b>." },
    { code_language: "<b style='background-color: #ececec;'>sr</b>", language_name: "<b style='background-color: #ececec;'>Српски (Србија)</b>", explanation_json: "Bahasa Serbia, dituturkan di <b style='background-color: #ececec;'>Serbia</b>." },
    { code_language: "<b style='background-color: #ececec;'>si</b>", language_name: "<b style='background-color: #ececec;'>සිංහල (ශ්‍රී ලංකා)</b>", explanation_json: "Bahasa Sinhala, digunakan di <b style='background-color: #ececec;'>Sri Lanka</b>." },
    { code_language: "<b style='background-color: #ececec;'>sk</b>", language_name: "<b style='background-color: #ececec;'>Slovenčina (Slovensko)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Slowakia</b>." },
    { code_language: "<b style='background-color: #ececec;'>sl</b>", language_name: "<b style='background-color: #ececec;'>Slovenščina (Slovenija)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Slovenia</b>." },
    { code_language: "<b style='background-color: #ececec;'>so</b>", language_name: "<b style='background-color: #ececec;'>Soomaali (Soomaaliya)</b>", explanation_json: "Bahasa Somalia, digunakan di <b style='background-color: #ececec;'>Somalia</b>." },
    { code_language: "<b style='background-color: #ececec;'>es</b>", language_name: "<b style='background-color: #ececec;'>Español (España)</b>", explanation_json: "Bahasa Spanyol, dituturkan di <b style='background-color: #ececec;'>Spanyol</b> dan negara-negara berbahasa Spanyol." },
    { code_language: "<b style='background-color: #ececec;'>su</b>", language_name: "<b style='background-color: #ececec;'>Basa Sunda (Indonésia)</b>", explanation_json: "Bahasa Sunda, dituturkan di <b style='background-color: #ececec;'>Jawa Barat</b>, Indonesia." },
    { code_language: "<b style='background-color: #ececec;'>sw</b>", language_name: "<b style='background-color: #ececec;'>Kiswahili (Kenya)</b>", explanation_json: "Bahasa Swahili, digunakan di <b style='background-color: #ececec;'>Kenya</b>." },
    { code_language: "<b style='background-color: #ececec;'>sv</b>", language_name: "<b style='background-color: #ececec;'>Svenska (Sverige)</b>", explanation_json: "Bahasa yang digunakan di <b style='background-color: #ececec;'>Swedia</b>." },
    { code_language: "<b style='background-color: #ececec;'>ta</b>", language_name: "<b style='background-color: #ececec;'>தமிழ் (சிங்கப்பூர்)</b>", explanation_json: "Bahasa Tamil, digunakan di <b style='background-color: #ececec;'>Singapura</b> dan India (Tamil Nadu)." },
    { code_language: "<b style='background-color: #ececec;'>te</b>", language_name: "<b style='background-color: #ececec;'>తెలుగు (భారతదేశం)</b>", explanation_json: "Bahasa Telugu, digunakan di <b style='background-color: #ececec;'>India</b> (Andhra Pradesh)." },
    { code_language: "<b style='background-color: #ececec;'>th</b>", language_name: "<b style='background-color: #ececec;'>ไทย (ประเทศไทย)</b>", explanation_json: "Bahasa Thailand, digunakan di <b style='background-color: #ececec;'>Thailand</b>." },
    { code_language: "<b style='background-color: #ececec;'>tr</b>", language_name: "<b style='background-color: #ececec;'>Türkçe (Türkiye)</b>", explanation_json: "Bahasa Turki, dituturkan di <b style='background-color: #ececec;'>Turkey</b>." },
    { code_language: "<b style='background-color: #ececec;'>uk</b>", language_name: "<b style='background-color: #ececec;'>Українська (Україна)</b>", explanation_json: "Bahasa Ukraina, dituturkan di <b style='background-color: #ececec;'>Ukraina</b>." },
    { code_language: "<b style='background-color: #ececec;'>ur</b>", language_name: "<b style='background-color: #ececec;'>اردو (پاکستان)</b>", explanation_json: "Bahasa Urdu, digunakan di <b style='background-color: #ececec;'>Pakistan</b>." },
    { code_language: "<b style='background-color: #ececec;'>uz</b>", language_name: "<b style='background-color: #ececec;'>O'zbekcha (O'zbekiston)</b>", explanation_json: "Bahasa Uzbekistan, dituturkan di <b style='background-color: #ececec;'>Uzbekistan</b>." },
    { code_language: "<b style='background-color: #ececec;'>vi</b>", language_name: "<b style='background-color: #ececec;'>Tiếng Việt (Việt Nam)</b>", explanation_json: "Bahasa Vietnam, digunakan di <b style='background-color: #ececec;'>Vietnam</b>." },
    { code_language: "<b style='background-color: #ececec;'>cy</b>", language_name: "<b style='background-color: #ececec;'>Cymraeg (Cymru)</b>", explanation_json: "Bahasa Welsh, dituturkan di <b style='background-color: #ececec;'>Wales</b> (Britania Raya)." },
    { code_language: "<b style='background-color: #ececec;'>zu</b>", language_name: "<b style='background-color: #ececec;'>IsiZulu (Ningizimu Afrika)</b>", explanation_json: "Bahasa Zulu, digunakan di <b style='background-color: #ececec;'>Afrika Selatan</b>." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>const textInput = document.getElementById('textInput');</b>", explanation_js: "Mengambil elemen masukan teks dari DOM untuk menerima teks yang akan dibacakan." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>const languageSelect = document.getElementById('languageSelect');</b>", explanation_js: "Ambil elemen dropdown pilihan bahasa dari DOM." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>const voiceSelect = document.getElementById('voiceSelect');</b>", explanation_js: "Mendapatkan elemen dropdown pemilihan suara dari DOM." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const speakBtn = document.getElementById('speakBtn');</b>", explanation_js: "Ambil elemen tombol \"speak\" dari DOM untuk memicu pembacaan teks." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>const rateRange = document.getElementById('rateRange');</b>", explanation_js: "Mengambil elemen input slider untuk mengatur kecepatan baca dari DOM." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>const pitchRange = document.getElementById('pitchRange');</b>", explanation_js: "Mengambil elemen input slider untuk mengatur pitch pembacaan dari DOM." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>const volumeRange = document.getElementById('volumeRange');</b>", explanation_js: "Mengambil elemen input slider untuk mengatur volume pembacaan dari DOM." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>const rateValue = document.getElementById('rateValue');</b>", explanation_js: "Mendapatkan elemen untuk menampilkan nilai kecepatan saat penggeser diubah." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>const pitchValue = document.getElementById('pitchValue');</b>", explanation_js: "Mendapatkan elemen untuk menampilkan nilai pitch saat slider diubah." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>const volumeValue = document.getElementById('volumeValue');</b>", explanation_js: "Mendapatkan elemen untuk menampilkan nilai volume saat penggeser diubah." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>let voices = [];</b>", explanation_js: "Menginisialisasi array kosong untuk menyimpan daftar suara yang tersedia." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>function loadLanguageNames() { ... }</b>", explanation_js: "Menentukan fungsi untuk memuat nama bahasa dari file JSON eksternal." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>function populateVoices() { ... }</b>", explanation_js: "Menentukan fungsi untuk mengisi elemen dropdown suara dengan suara yang tersedia, sesuai dengan bahasa yang dipilih." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>function populateLanguages(languageNames) { ... }</b>", explanation_js: "Menentukan fungsi untuk mengisi elemen dropdown bahasa dengan bahasa unik yang tersedia pada perangkat." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>languageSelect.addEventListener('change', populateVoices);</b>", explanation_js: "Menambahkan pendengar acara untuk memuat ulang suara yang tersedia saat bahasa yang dipilih pada menu dropdown diubah." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>rateRange.addEventListener('input', () => { ... });</b>", explanation_js: "Menambahkan pendengar peristiwa untuk memperbarui tampilan nilai kecepatan saat penggeser diubah." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>pitchRange.addEventListener('input', () => { ... });</b>", explanation_js: "Menambahkan pendengar peristiwa untuk memperbarui tampilan nilai nada saat penggeser diubah." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>volumeRange.addEventListener('input', () => { ... });</b>", explanation_js: "Menambahkan pendengar peristiwa untuk memperbarui tampilan nilai volume saat penggeser diubah." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>function speakText() { ... }</b>", explanation_js: "Menentukan fungsi untuk memulai text-to-speech dengan parameter yang ditetapkan pengguna." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>speechSynthesis.onvoiceschanged = () => { ... };</b>", explanation_js: "Menambahkan pendengar peristiwa untuk memuat ulang daftar suara saat suara diubah atau tersedia." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>speakBtn.addEventListener('click', speakText);</b>", explanation_js: "Menambahkan pendengar peristiwa untuk memicu pembacaan teks saat tombol \"speak\" diklik." }
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
            progressText.textContent = 'Pengunduhan selesai!';
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
            progressText.textContent = `${progress}% selesai`;
        }
    }, 500);

    document.getElementById("cancelDownload").addEventListener("click", function() {
        clearInterval(interval);
        progressBar.style.width = '0%';
        progressText.textContent = '0% selesai';
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
            <button class="btn btn-link text-sm reply-btn">Membalas</button>
            <div class="ml-4 mt-3 hidden reply-form">
                <input type="text" class="form-control reply-name mb-2" placeholder="Masukkan nama Anda..." required>
                <input type="email" class="form-control reply-email mb-2" placeholder="Masukkan email Anda..." required>
                <textarea rows="2" class="form-control reply-text mb-2" placeholder="Tuliskan balasan Anda..." required></textarea>
                <button type="button" class="btn btn-secondary btn-sm submit-reply">Kirim Balasan</button>
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
            alert('Semua kolom harus diisi!');
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
        snackbar.innerHTML = '<i class="uil uil-check-circle"></i> URL telah disalin ke papan klip!';
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
        console.error('Gagal menyalin URL: ', err);
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
    showSnackbar('fas fa-check-circle', 'Anda sedang online!', 'linear-gradient(to right, #0f5132, #198754)');
});

window.addEventListener('offline', () => {
    showSnackbar('fas fa-times-circle', 'Anda sedang offline!', 'linear-gradient(to right, #842029, #dc3545)');
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