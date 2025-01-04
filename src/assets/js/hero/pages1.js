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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Mendeklarasikan jenis dokumen HTML." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Komentar yang menunjukkan koder, yaitu \"CodingIndo\"." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Elemen pembuka HTML dengan bahasa dokumen diatur ke Bahasa Inggris." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Bagian pembukaan untuk metadata dokumen HTML." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Komentar untuk tag meta pengkodean karakter." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Mengatur pengkodean karakter halaman ke UTF-8." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for setting the viewport to be responsive on mobile devices --&gt;</b>", explanation_html: "Komentar untuk tag meta untuk tampilan responsif pada perangkat seluler." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Mengatur area pandang agar responsif terhadap lebar layar perangkat dan skala awal 1,0." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Komentar pada judul halaman." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Currency Converter&lt;/title&gt;</b>", explanation_html: "Tetapkan judul halaman menjadi \"Currency Converter\"." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CSS file for styling --&gt;</b>", explanation_html: "Komentar untuk tautan ke berkas CSS eksternal." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Tautkan file CSS eksternal untuk gaya tambahan." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;!-- Bootstrap CSS link for styling --&gt;</b>", explanation_html: "Komentar untuk tautan ke Bootstrap CSS." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Menghubungkan Bootstrap CDN untuk gaya bawaan Bootstrap 5." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- TailwindCSS link for styling --&gt;</b>", explanation_html: "Komentar untuk tautan ke Tailwind CSS." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Menghubungkan Tailwind CSS CDN untuk gaya dengan utilitas Tailwind." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Penutup elemen <b style='background-color: #ececec;'>&lt;head&gt;</b>." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;body class=\"bg-gray-50\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;body&gt;</b> dengan latar belakang abu-abu muda menggunakan kelas TailwindCSS." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container mt-5\"&gt;</b>", explanation_html: "Membuka div dengan kelas <b style='background-color: #ececec;'>container</b> Bootstrap dan margin atas (<b style='background-color: #ececec;'>mt-5</b>)." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"card shadow p-5 rounded-xl border-0\"&gt;</b>", explanation_html: "Buat elemen kartu dengan kelas Bootstrap dan Tailwind untuk menyediakan bayangan, bantalan, sudut membulat, dan tanpa batas." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;!-- Application title --&gt;</b>", explanation_html: "Komentar pada judul aplikasi." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-center mb-5 text-3xl font-extrabold text-gray-800\"&gt;Currency Converter&lt;/h2&gt;</b>", explanation_html: "Menampilkan judul aplikasi dalam teks besar, tebal, berwarna abu-abu gelap, dan berada di tengah." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;!-- Form for currency conversion --&gt;</b>", explanation_html: "Komentar untuk formulir konversi mata uang." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;form id=\"converter-form\"&gt;</b>", explanation_html: "Membuka elemen formulir dengan id <b style='background-color: #ececec;'>converter-form</b>." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Membuka div untuk mengelompokkan elemen input, dengan margin bawah (<b style='background-color: #ececec;'>mb-4</b>)." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Komentar untuk label dan jumlah yang dimasukkan." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"amount\" class=\"form-label text-gray-700 font-medium\"&gt;Amount&lt;/label&gt;</b>", explanation_html: "Label untuk masukan kuantitas dengan teks abu-abu dan font sedang." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;input type=\"number\" class=\"form-control rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"amount\" placeholder=\"Enter amount\" required&gt;</b>", explanation_html: "Input jenis <b style='background-color: #ececec;'>number</b> untuk jumlah uang dengan gaya Bootstrap dan Tailwind, termasuk batas abu-abu, fokus biru, dan tempat placeholder \"Enter amount\"." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup div untuk jumlah yang dimasukkan." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Membuka div untuk input mata uang awal, dengan margin bawah (<b style='background-color: #ececec;'>mb-4</b>)." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;!-- Label and select for the source currency --&gt;</b>", explanation_html: "Komentar tentang label dan pilihan mata uang awal." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"from-currency\" class=\"form-label text-gray-700 font-medium\"&gt;From&lt;/label&gt;</b>", explanation_html: "Label untuk mata uang awal dengan teks abu-abu dan font sedang." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"from-currency\"&gt;</b>", explanation_html: "Elemen <b style='background-color: #ececec;'>&lt;select&gt;</b> untuk memilih mata uang awal dengan kelas Bootstrap dan Tailwind, fokus biru." },
    { number: 34, code_html: "<b style='background-color: #ececec;'>&lt;option value=\"USD\" selected&gt;USD - United States Dollar&lt;/option&gt; <i>to</i> &lt;option value=\"CNY\">CNY - Chinese Yuan (China)&lt;/option&gt;</b>", explanation_html: "Opsi dipilih untuk berbagai mata uang, seperti USD, EUR, GBP, dll. Opsi pertama dipilih sebagai default." },
    { number: 35, code_html: "<b style='background-color: #ececec;'>&lt;/select&gt;</b>", explanation_html: "Menutup elemen pilihan untuk mata uang awal." },
    { number: 36, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup div untuk input mata uang awal." },
    { number: 37, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"mb-4\"&gt;</b>", explanation_html: "Membuka div untuk input mata uang tujuan dengan margin bawah (<b style='background-color: #ececec;'>mb-4</b>)." },
    { number: 38, code_html: "<b style='background-color: #ececec;'>&lt;!-- Label and select for destination currency --&gt;</b>", explanation_html: "Komentar tentang label dan pilihan mata uang tujuan." },
    { number: 39, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"to-currency\" class=\"form-label text-gray-700 font-medium\"&gt;To&lt;/label&gt;</b>", explanation_html: "Label untuk mata uang tujuan dengan teks abu-abu dan font sedang." },
    { number: 40, code_html: "<b style='background-color: #ececec;'>&lt;select class=\"form-select rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500\" id=\"to-currency\"&gt;</b>", explanation_html: "Elemen <b style='background-color: #ececec;'>&lt;select&gt;</b> untuk memilih mata uang target dengan kelas Bootstrap dan Tailwind, fokus biru." },
    { number: 41, code_html: "<b style='background-color: #ececec;'>&lt;option value=\"USD\"&gt;USD - United States Dollar&lt;/option&gt; <i>to</i> &lt;option value=\"CNY\">CNY - Chinese Yuan (China)&lt;/option&gt;</b>", explanation_html: "Pilihan dalam memilih berbagai mata uang tujuan seperti USD, EUR, GBP, dll." },
    { number: 42, code_html: "<b style='background-color: #ececec;'>&lt;/select&gt;</b>", explanation_html: "Menutup elemen yang dipilih untuk mata uang target." },
    { number: 43, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup div untuk input mata uang tujuan." },
    { number: 44, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"text-center\"&gt;</b>", explanation_html: "Membuka div untuk tombol konversi, dengan teks rata tengah." },
    { number: 45, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to perform conversion --&gt;</b>", explanation_html: "Komentar untuk tombol konversi." },
    { number: 46, code_html: "<b style='background-color: #ececec;'>&lt;button type=\"submit\" class=\"btn btn-primary btn-lg px-5 py-3 shadow-lg hover:shadow-xl rounded-full bg-blue-600 hover:bg-blue-700 transition-transform transform hover:-translate-y-1\"&gt;Convert&lt;/button&gt;</b>", explanation_html: "Tombol untuk mengirimkan formulir dengan kelas Bootstrap dan Tailwind, efek hover, bayangan, animasi, dan warna biru." },
    { number: 47, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup div untuk tombol konversi." },
    { number: 48, code_html: "<b style='background-color: #ececec;'>&lt;/form&gt;</b>", explanation_html: "Menutup elemen formulir." },
    { number: 49, code_html: "<b style='background-color: #ececec;'>&lt;!-- Div to display conversion results --&gt;</b>", explanation_html: "Komentar untuk div yang dikonversi." },
    { number: 50, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"result\" class=\"text-center mt-4 text-gray-800 text-xl font-bold\"&gt;&lt;/div&gt;</b>", explanation_html: "Div untuk menampilkan hasil konversi, dengan teks besar, tebal, dan berwarna abu-abu gelap." },
    { number: 51, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup div untuk elemen kartu." },
    { number: 52, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup div container utama." },
    { number: 53, code_html: "<b style='background-color: #ececec;'>&lt;!-- JavaScript file link for functionality --&gt;</b>", explanation_html: "Komentar untuk file JavaScript eksternal." },
    { number: 54, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Hubungkan file JavaScript eksternal untuk fungsionalitas konversi." },
    { number: 55, code_html: "<b style='background-color: #ececec;'>&lt;!-- Bootstrap JavaScript link for functionality --&gt;</b>", explanation_html: "Komentar untuk Bootstrap JavaScript." },
    { number: 56, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Menghubungkan Bootstrap JavaScript CDN untuk fungsi interaktif Bootstrap." },
    { number: 57, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;body&gt;</b>." },
    { number: 58, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;html&gt;</b>." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>/* Sets the font for the body element */</b>", explanation_css: "Komentar untuk menjelaskan bahwa aturan berikut akan mengatur font pada elemen <b style='background-color: #ececec;'>body</b>." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>body {</b>", explanation_css: "Membuka aturan CSS untuk elemen <b style='background-color: #ececec;'>body</b>." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>font-family: 'Inter', sans-serif;</b>", explanation_css: "Mengatur font <b style='background-color: #ececec;'>Inter</b> sebagai font utama pada <b style='background-color: #ececec;'>body</b>; elemen menggunakan <b style='background-color: #ececec;'>sans-serif</b> sebagai fallback." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup aturan CSS untuk elemen <b style='background-color: #ececec;'>body</b>." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>/* Sets the background and border radius for elements with class card */</b>", explanation_css: "Komentar untuk menjelaskan bahwa aturan berikut menetapkan latar belakang dan radius batas elemen dengan kelas <b style='background-color: #ececec;'>kartu</b>." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>.card {</b>", explanation_css: "Membuka aturan CSS untuk elemen dengan kelas <b style='background-color: #ececec;'>.card</b>." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>background-color: #f8f9fa;</b>", explanation_css: "Mengatur warna latar belakang elemen <b style='background-color: #ececec;'>.card</b> menjadi abu-abu muda (#f8f9fa)." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>border-radius: 1rem;</b>", explanation_css: "Mengatur sudut elemen <b style='background-color: #ececec;'>.card</b> agar melengkung dengan radius 1rem." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup aturan CSS untuk elemen <b style='background-color: #ececec;'>.card</b> ." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>/* Set the background, border, and transition for elements with the form-control and form-select classes */</b>", explanation_css: "Komentar untuk menjelaskan bahwa aturan berikut menetapkan latar belakang, batas, dan transisi untuk elemen dengan kelas <b style='background-color: #ececec;'>form-control</b> dan <b style='background-color: #ececec;'>form-select</b>." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>.form-control,</b>", explanation_css: "Membuka aturan CSS untuk elemen dengan kelas <b style='background-color: #ececec;'>.form-control</b>." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>.form-select {</b>", explanation_css: "Menggabungkan aturan CSS untuk elemen dengan kelas <b style='background-color: #ececec;'>.form-select</b> bersama dengan <b style='background-color: #ececec;'>.form-control</b>." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>background-color: #f1f5f9;</b>", explanation_css: "Atur warna latar belakang menjadi abu-abu muda (#f1f5f9)." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>border: 1px solid #cbd5e1;</b>", explanation_css: "Tetapkan batas 1px dengan warna abu-abu (#cbd5e1)." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>transition: border-color 0.3s ease, box-shadow 0.3s ease;</b>", explanation_css: "Mengatur transisi halus untuk perubahan warna batas dan bayangan kotak selama 0,3 detik." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup aturan CSS untuk <b style='background-color: #ececec;'>.form-control</b> dan <b style='background-color: #ececec;'>.form-select</b>." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>/* Sets the border and box-shadow when an element with the class form-control and form-select is in focus */</b>", explanation_css: "Komentar menjelaskan bahwa aturan berikut mengatur bayangan batas dan kotak saat elemen <b style='background-color: #ececec;'>.form-control</b> dan <b style='background-color: #ececec;'>.form-select</b> mendapat fokus." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>.form-control:focus,</b>", explanation_css: "Membuka aturan CSS untuk elemen <b style='background-color: #ececec;'>.form-control</b> yang menjadi fokus." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>.form-select:focus {</b>", explanation_css: "Menggabungkan aturan CSS untuk elemen <b style='background-color: #ececec;'>.form-select</b> dalam status fokus bersama dengan <b style='background-color: #ececec;'>.form-control</b>." },
    { number: 20, code_css: "<b style='background-color: #ececec;'>border-color: #6366f1;</b>", explanation_css: "Mengubah warna batas menjadi biru (dengan kode warna #6366f1) saat elemen difokuskan." },
    { number: 21, code_css: "<b style='background-color: #ececec;'>box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);</b>", explanation_css: "Menambahkan bayangan biru semi-transparan dengan ukuran 0,2rem saat elemen difokuskan." },
    { number: 22, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup aturan CSS untuk <b style='background-color: #ececec;'>.form-control</b> dan <b style='background-color: #ececec;'>.form-select</b> dalam status fokus." },
    { number: 23, code_css: "<b style='background-color: #ececec;'>/* Sets the font size for elements with class btn */</b>", explanation_css: "Komentar untuk menjelaskan bahwa aturan berikut menetapkan ukuran font untuk elemen dengan kelas <b style='background-color: #ececec;'>btn</b>." },
    { number: 24, code_css: "<b style='background-color: #ececec;'>.btn {</b>", explanation_css: "Membuka aturan CSS untuk elemen dengan kelas <b style='background-color: #ececec;'>.btn</b>." },
    { number: 25, code_css: "<b style='background-color: #ececec;'>font-size: 1.125rem;</b>", explanation_css: "Mengatur ukuran font elemen <b style='background-color: #ececec;'>.btn</b> menjadi 1,125rem." },
    { number: 26, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup aturan CSS untuk elemen <b style='background-color: #ececec;'>.btn</b>." },
    { number: 27, code_css: "<b style='background-color: #ececec;'>/* Sets the maximum width and margin for the element with the id converter-form */</b>", explanation_css: "Komentar untuk menjelaskan bahwa aturan berikut menetapkan lebar dan margin maksimum untuk elemen dengan id <b style='background-color: #ececec;'>converter-form</b>." },
    { number: 28, code_css: "<b style='background-color: #ececec;'>#converter-form {</b>", explanation_css: "Membuka aturan CSS untuk elemen dengan id <b style='background-color: #ececec;'>converter-form</b>." },
    { number: 29, code_css: "<b style='background-color: #ececec;'>max-width: 500px;</b>", explanation_css: "Atur lebar maksimum elemen <b style='background-color: #ececec;'>#converter-form</b> ke 500 piksel agar tampilan tetap responsif." },
    { number: 30, code_css: "<b style='background-color: #ececec;'>margin: 0 auto;</b>", explanation_css: "Secara otomatis mengatur margin elemen <b style='background-color: #ececec;'>#converter-form</b> untuk memusatkan halaman." },
    { number: 31, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup aturan CSS untuk elemen <b style='background-color: #ececec;'>#converter-form</b>." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>document.getElementById('converter-form').addEventListener('submit', function(e) {</b>", explanation_js: "Tambahkan pendengar peristiwa pada elemen dengan id <b style='background-color: #ececec;'>converter-form</b> untuk menangani peristiwa <b style='background-color: #ececec;'>submit</b>, dan jalankan fungsi saat formulir dikirimkan." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>e.preventDefault();</b>", explanation_js: "Mencegah perilaku default formulir, yaitu <b style='background-color: #ececec;'>mengirimkan</b> atau menyegarkan halaman saat tombol kirim ditekan." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>const amount = document.getElementById('amount').value;</b>", explanation_js: "Nyatakan variabel <b style='background-color: #ececec;'>amount</b> dan dapatkan nilai dari elemen dengan id <b style='background-color: #ececec;'>amount</b>." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const fromCurrency = document.getElementById('from-currency').value;</b>", explanation_js: "Nyatakan variabel <b style='background-color: #ececec;'>fromCurrency</b> dan dapatkan nilai dari elemen dengan id <b style='background-color: #ececec;'>from-currency</b>." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>const toCurrency = document.getElementById('to-currency').value;</b>", explanation_js: "Nyatakan variabel <b style='background-color: #ececec;'>toCurrency</b> dan dapatkan nilai dari elemen dengan id <b style='background-color: #ececec;'>to-currency</b>." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>const exchangeRates = { ... }</b>", explanation_js: "Mendeklarasikan objek <b style='background-color: #ececec;'>exchangeRates</b> yang berisi nilai tukar antara berbagai mata uang, terstruktur sebagai objek bersarang dengan kunci mata uang sumber dan target." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>{ USD: { ... }, EUR: { ... }, GBP: { ... }, IDR: { ... }, JPY: { ... }, AUD: { ... }, CAD: { ... }, CHF: { ... }, CNY: { ... } }</b>", explanation_js: "Atur setiap mata uang sebagai objek dalam <b style='background-color: #ececec;'>exchangeRates</b>, masing-masing memiliki kunci untuk mata uang target dan nilai tukarnya." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>};</b>", explanation_js: "Menurut deklarasi objek nilai tukar <b style='background-color: #ececec;'>exchangeRates</b>." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>const result = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);</b>", explanation_js: "Menghitung hasil konversi dengan mengalikan <b style='background-color: #ececec;'>amount</b> dengan nilai tukar yang sesuai dari <b style='background-color: #ececec;'>exchangeRates</b>. Fungsi <b style='background-color: #ececec;'>toFixed(2)</b> digunakan untuk membulatkan hasil ke dua tempat desimal." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;</b>", explanation_js: "Menampilkan hasil konversi dalam elemen dengan id <b style='background-color: #ececec;'>result</b> sebagai string format <b style='background-color: #ececec;'>${amount} ${fromCurrency} = ${result} ${toCurrency}</b>." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Menutup fungsi pendengar peristiwa yang dieksekusi saat formulir dikirimkan." }
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
                window.location.href = "/src/download/Currency Converter.rar";
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
        commentTitle.textContent = `${commentCount} Komentar`;
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
                <textarea rows="2" class="form-control reply-text mb-2" placeholder="Tulis balasan Anda..." required></textarea>
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
                alert('Semua kolom balasan harus diisi!');
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
        console.error('Gagal salin URL: ', err);
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