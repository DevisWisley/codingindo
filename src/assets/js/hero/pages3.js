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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Menentukan jenis dokumen sebagai HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Komentar untuk menunjukkan bahwa kode tersebut dibuat oleh CodingIndo." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Membuka elemen HTML dengan bahasa yang diatur ke \"en\" (Bahasa Inggris)." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Membuka bagian kepala untuk metadata dan pengaturan halaman." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa tag meta berikut digunakan untuk pengkodean karakter." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Mengatur pengkodean karakter halaman ke UTF-8 untuk mendukung rentang karakter yang lebih luas." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag to make the viewport responsive on mobile devices --&gt;</b>", explanation_html: "Komentar yang menjelaskan bahwa tag berikut dimaksudkan untuk membuat halaman responsif pada perangkat seluler." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Mengatur area pandang untuk menyesuaikan halaman dengan lebar perangkat dan skala awal 1,0." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Komentar untuk menandai bagian judul halaman." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;AES Encoder/Decoder&lt;/title&gt;</b>", explanation_html: "Atur judul halaman menjadi \"AES Enkoder/Dekoder\" yang akan muncul di tab browser." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CSS file for styling --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa tautan berikut terhubung ke berkas CSS eksternal." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Menghubungkan berkas CSS eksternal bernama <b style='background-color: #ececec;'>style.css</b> untuk memberikan gaya pada halaman." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to Font Awesome for icons --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa tautan berikut digunakan untuk menambahkan ikon dari Font Awesome." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css\"&gt;</b>", explanation_html: "Menghubungkan Font Awesome versi 6.0.0 untuk ikon dalam aplikasi." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CryptoJS for encryption and decryption --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa skrip berikutnya digunakan untuk enkripsi dan dekripsi." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Menghubungkan pustaka CryptoJS untuk proses enkripsi dan dekripsi." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Tutup bagian kepala." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Membuka bagian badan yang berisi konten halaman utama." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container\"&gt;</b>", explanation_html: "Membuka elemen div dengan kelas \"container\" sebagai container utama aplikasi." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;!-- Application title --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa elemen berikutnya adalah judul aplikasi." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;h1&gt;AES Encoder/Decoder&lt;/h1&gt;</b>", explanation_html: "Buat judul aplikasi \"AES Encoder/Decoder\"." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"tools\"&gt;</b>", explanation_html: "Membuka elemen div dengan kelas \"tools\" sebagai container untuk elemen input dan output." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"tool\"&gt;</b>", explanation_html: "Membuka elemen div dengan kelas \"tool\" untuk container masukan utama." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"key-container\"&gt;</b>", explanation_html: "Membuka elemen div dengan kelas \"key-container\" untuk input kunci enkripsi." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;!-- Input to enter secret key --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa input berikut digunakan untuk memasukkan kunci rahasia enkripsi." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;input type=\"text\" id=\"secret-key\" placeholder=\"Enter secret key\"&gt;</b>", explanation_html: "Buat masukan teks untuk memasukkan kunci rahasia dengan placeholder \"Enter secret key\"." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to generate random key --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa kunci berikut digunakan untuk menghasilkan kunci acak." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"generate-key-btn\"&gt;&lt;i class=\"fas fa-random\"&gt;&lt;/i&gt; Generate Random Key&lt;/button&gt;</b>", explanation_html: "Tombol untuk menghasilkan kunci acak dengan ikon dari Font Awesome dan teks \"Generate Random Key\"." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Tutup div dengan kelas \"key-container\"." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;!-- Textarea to enter text to be encrypted or decrypted --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa textarea berikut digunakan untuk teks yang akan dienkripsi atau didekripsi." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;textarea id=\"input-text\" placeholder=\"Enter text here...\"&gt;&lt;/textarea&gt;</b>", explanation_html: "Buat textarea untuk memasukkan teks yang akan dienkripsi atau didekripsi, dengan placeholder \"Enter text here...\"." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"button-group\"&gt;</b>", explanation_html: "Membuka elemen div dengan kelas \"button-group\" untuk menampung tombol tindakan." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to encrypt text --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa kunci berikut digunakan untuk mengenkripsi teks." },
    { number: 34, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"encode-btn\"&gt;&lt;i class=\"fas fa-lock\"&gt;&lt;/i&gt; Encode&lt;/button&gt;</b>", explanation_html: "Tombol untuk mengenkripsi teks dengan ikon gembok dari Font Awesome dan teks \"Encode\"." },
    { number: 35, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to swap text between input and output --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa tombol berikut digunakan untuk menukar teks antara masukan dan keluaran." },
    { number: 36, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"swap-btn\"&gt;&lt;i class=\"fas fa-exchange-alt\"&gt;&lt;/i&gt; Swap&lt;/button&gt;</b>", explanation_html: "Tombol untuk menukar teks dengan ikon panah dari Font Awesome dan teks \"Swap\"." },
    { number: 37, code_html: "<b style='background-color: #ececec;'>&lt;!-- Button to decrypt text --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa kunci berikut digunakan untuk mendekripsi teks." },
    { number: 38, code_html: "<b style='background-color: #ececec;'>&lt;button id=\"decode-btn\"&gt;&lt;i class=\"fas fa-unlock\"&gt;&lt;/i&gt; Decode&lt;/button&gt;</b>", explanation_html: "Tombol untuk mendekripsi teks dengan ikon kunci terbuka dari Font Awesome dan teks \"Decode\"." },
    { number: 39, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Tutup div dengan kelas \"button-group\"." },
    { number: 40, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Tutup div dengan kelas \"tool\"." },
    { number: 41, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"tool\"&gt;</b>", explanation_html: "Membuka elemen div dengan kelas \"tool\" untuk container keluaran." },
    { number: 42, code_html: "<b style='background-color: #ececec;'>&lt;!-- Textarea to display encrypted or decrypted text --&gt;</b>", explanation_html: "Komentar untuk menjelaskan bahwa textarea berikut digunakan untuk menampilkan teks terenkripsi atau terdekripsi." },
    { number: 43, code_html: "<b style='background-color: #ececec;'>&lt;textarea id=\"output-text\" placeholder=\"Output text here...\"&gt;&lt;/textarea&gt;</b>", explanation_html: "Buat textarea untuk menampilkan hasil enkripsi atau dekripsi, dengan placeholder \"Output text here...\"." },
    { number: 44, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Tutup div dengan kelas \"tool\"." },
    { number: 45, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Tutup div dengan kelas \"tools\"." },
    { number: 46, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Tutup div dengan kelas \"container\"." },
    { number: 47, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to JavaScript file for functionality --&gt;</b>", explanation_html: "Komentar untuk menunjukkan bahwa skrip berikut menautkan berkas JavaScript eksternal." },
    { number: 48, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Hubungkan file JavaScript eksternal bernama <b style='background-color: #ececec;'>script.js</b> untuk menambahkan fungsionalitas ke aplikasi." },
    { number: 49, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Tutup bagian tubuh." },
    { number: 50, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Menutup elemen HTML." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>/* Sets styles for the body element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen body." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>body { ... }</b>", explanation_css: "Mengatur gaya untuk elemen badan, termasuk font, margin, padding, latar belakang gradien, penempatan konten, dan tinggi." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>/* Sets styles for container elements */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen dengan kelas kontainer." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>.container { ... }</b>", explanation_css: "Mengatur gaya untuk elemen dengan kelas wadah, seperti warna latar belakang, padding, border-radius, dan bayangan." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the h1 element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen h1." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>h1 { ... }</b>", explanation_css: "Mengatur warna, margin, ukuran font, dan ketebalan font untuk elemen h1." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the tools element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen dengan alat kelas." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>.tools { ... }</b>", explanation_css: "Mengatur flex-direction dan jarak antar elemen untuk elemen dengan kelas alat." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the tool element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen dengan alat kelas." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>.tool { ... }</b>", explanation_css: "Mengatur flex-direction dan jarak antar elemen untuk elemen dengan kelas alat." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>/* Sets styles for key-container elements */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen dengan kelas key-container." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>.key-container { ... }</b>", explanation_css: "Mengatur flex-direction, jarak antar elemen, dan gaya untuk elemen dengan kelas key-container." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a text input element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen masukan teks." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>input[type=\"text\"] { ... }</b>", explanation_css: "Mengatur lebar, padding, batas, border-radius, font-size, dan transisi untuk elemen masukan teks." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a text input element when focused */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan saat elemen input teks menjadi fokus." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>input[type=\"text\"]:focus { ... }</b>", explanation_css: "Mengubah warna batas dan menghapus garis tepi saat elemen masukan teks difokuskan." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a textarea element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen textarea." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>textarea { ... }</b>", explanation_css: "Mengatur lebar, tinggi, padding, batas, border-radius, font-size, dan transisi untuk elemen textarea." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a textarea element when it is focused */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan saat elemen textarea menjadi fokus." },
    { number: 20, code_css: "<b style='background-color: #ececec;'>textarea:focus { ... }</b>", explanation_css: "Mengubah warna batas dan menghapus garis luar saat elemen textarea menjadi fokus." },
    { number: 21, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen tombol." },
    { number: 22, code_css: "<b style='background-color: #ececec;'>button { ... }</b>", explanation_css: "Atur padding, batas, warna latar belakang, warna teks, kursor, font-size, font-weight, transisi, dan tampilan untuk tombol." },
    { number: 23, code_css: "<b style='background-color: #ececec;'>/* Sets the style for a button element on hover */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan saat elemen tombol diarahkan." },
    { number: 24, code_css: "<b style='background-color: #ececec;'>button:hover { ... }</b>", explanation_css: "Ubah warna latar belakang tombol saat mengarahkan kursor." },
    { number: 25, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element when active */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan saat elemen tombol aktif." },
    { number: 26, code_css: "<b style='background-color: #ececec;'>button:active { ... }</b>", explanation_css: "Mengurangi skala tombol saat ditekan." },
    { number: 27, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element with id swap-btn */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut khusus untuk tombol dengan id swap-btn." },
    { number: 28, code_css: "<b style='background-color: #ececec;'>#swap-btn { ... }</b>", explanation_css: "Mengatur warna latar belakang tombol dengan id swap-btn." },
    { number: 29, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button element with id swap-btn on hover */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan saat swap-btn diarahkan." },
    { number: 30, code_css: "<b style='background-color: #ececec;'>#swap-btn:hover { ... }</b>", explanation_css: "Mengubah warna latar belakang tombol dengan id swap-btn saat diarahkan." },
    { number: 31, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button-group element */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk elemen dengan kelas button-group." },
    { number: 32, code_css: "<b style='background-color: #ececec;'>.button-group { ... }</b>", explanation_css: "Mengatur arah fleksibel dan jarak antar elemen untuk elemen dengan kelas button-group." },
    { number: 33, code_css: "<b style='background-color: #ececec;'>/* Sets the style for the button elements inside the button-group */</b>", explanation_css: "Komentar yang menjelaskan bahwa gaya berikut digunakan untuk tombol dalam button-group." },
    { number: 34, code_css: "<b style='background-color: #ececec;'>.button-group button { ... }</b>", explanation_css: "Mengatur lebar tombol dalam elemen button-group untuk mengisi lebar penuh." },
    { number: 35, code_css: "<b style='background-color: #ececec;'>/* Sets styles for elements in media queries with a minimum width of 768px */</b>", explanation_css: "Komentar untuk menjelaskan bahwa gaya berikut berlaku pada layar dengan lebar minimum 768px." },
    { number: 36, code_css: "<b style='background-color: #ececec;'>.key-container { ... }</b>", explanation_css: "Mengatur flex-direction dan gaya elemen di kelas key-container untuk lebar layar 768 piksel dan lebih." },
    { number: 37, code_css: "<b style='background-color: #ececec;'>input[type=\"text\"] { ... }</b>", explanation_css: "Mengatur lebar masukan teks sehingga tidak memenuhi lebar penuh pada layar dengan lebar minimum 768 piksel." },
    { number: 38, code_css: "<b style='background-color: #ececec;'>.button-group { ... }</b>", explanation_css: "Ubah flex-direction dan sejajarkan tombol dalam button-group untuk lebar layar minimum 768px." },
    { number: 39, code_css: "<b style='background-color: #ececec;'>.button-group button { ... }</b>", explanation_css: "Mengatur lebar tombol dalam button-group agar sesuai dengan konten pada lebar layar minimal 768 piksel." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>// Event listener for encode button</b>", explanation_js: "Komentar yang menjelaskan bahwa baris berikut adalah pendengar peristiwa untuk tombol enkode." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>document.getElementById('encode-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Menambahkan pendengar acara untuk tombol dengan id <b style='background-color: #ececec;'>encode-btn</b>, yang akan dieksekusi saat tombol diklik." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>var text = document.getElementById('input-text').value;</b>", explanation_js: "Mendapatkan nilai elemen dengan id <b style='background-color: #ececec;'>input-text</b> dan menyimpannya dalam variabel <b style='background-color: #ececec;'>text</b>." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>var key = document.getElementById('secret-key').value;</b>", explanation_js: "Mendapatkan nilai elemen dengan id <b style='background-color: #ececec;'>secret-key</b> dan menyimpannya dalam variabel <b style='background-color: #ececec;'>key</b>." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>var encrypted = CryptoJS.AES.encrypt(text, key).toString();</b>", explanation_js: "Enkripsi <b style='background-color: #ececec;'>text</b> menggunakan <b style='background-color: #ececec;'>key</b> dengan algoritma AES dari CryptoJS dan simpan hasil enkripsi dalam variabel <b style='background-color: #ececec;'>encrypted</b>." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>document.getElementById('output-text').value = encrypted;</b>", explanation_js: "Menampilkan teks terenkripsi pada elemen dengan id <b style='background-color: #ececec;'>output-text</b>." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Menutup fungsi pendengar peristiwa untuk tombol enkode." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>// Event listener for decode button</b>", explanation_js: "Komentar menjelaskan bahwa baris berikut adalah pendengar peristiwa untuk tombol dekode." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>document.getElementById('decode-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Menambahkan pendengar acara untuk tombol dengan id <b style='background-color: #ececec;'>decode-btn</b>, yang akan dieksekusi saat tombol diklik." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>var encryptedText = document.getElementById('input-text').value;</b>", explanation_js: "Mendapatkan nilai elemen dengan id <b style='background-color: #ececec;'>input-text</b> dan menyimpannya dalam variabel <b style='background-color: #ececec;'>encryptedText</b>." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>var key = document.getElementById('secret-key').value;</b>", explanation_js: "Mendapatkan nilai elemen dengan id <b style='background-color: #ececec;'>secret-key</b> dan menyimpannya dalam variabel <b style='background-color: #ececec;'>key</b>." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>var decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);</b>", explanation_js: "Mendekripsi <b style='background-color: #ececec;'>encryptedText</b> menggunakan kunci <b style='background-color: #ececec;'>key</b> dan mengubahnya menjadi teks UTF-8, lalu menyimpan hasil dekripsi dalam variabel <b style='background-color: #ececec;'>decrypted</b>." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>document.getElementById('output-text').value = decrypted;</b>", explanation_js: "Menampilkan teks yang didekripsi pada elemen dengan id <b style='background-color: #ececec;'>output-text</b>." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Menutup fungsi pendengar peristiwa untuk tombol dekode." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>// Event listener for swap button</b>", explanation_js: "Komentar menjelaskan bahwa baris berikut adalah pendengar peristiwa untuk tombol tukar." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>document.getElementById('swap-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Menambahkan pendengar acara untuk tombol dengan <b style='background-color: #ececec;'>swap-btn</b>, yang akan dieksekusi saat tombol diklik." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>var inputText = document.getElementById('input-text').value;</b>", explanation_js: "Mendapatkan nilai dari elemen dengan id <b style='background-color: #ececec;'>input-text</b> dan menyimpannya dalam variabel <b style='background-color: #ececec;'>inputText</b>." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>var outputText = document.getElementById('output-text').value;</b>", explanation_js: "Mendapatkan nilai elemen dengan id <b style='background-color: #ececec;'>output-text</b> dan menyimpannya dalam variabel <b style='background-color: #ececec;'>outputText</b>." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>document.getElementById('input-text').value = outputText;</b>", explanation_js: "Menukar teks dalam elemen <b style='background-color: #ececec;'>input-text</b> dengan nilai dari <b style='background-color: #ececec;'>outputText</b>." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>document.getElementById('output-text').value = inputText;</b>", explanation_js: "Menukar teks dalam elemen <b style='background-color: #ececec;'>output-text</b> dengan nilai dari <b style='background-color: #ececec;'>inputText</b>." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Menutup fungsi pendengar acara untuk tombol tukar.</b>." },
    { number: 22, code_js: "<b style='background-color: #ececec;'>// Event listener for generate key button</b>", explanation_js: "Komentar menjelaskan bahwa baris berikut adalah pendengar peristiwa untuk tombol buat kunci.</b>." },
    { number: 23, code_js: "<b style='background-color: #ececec;'>document.getElementById('generate-key-btn').addEventListener('click', function() { ... });</b>", explanation_js: "Menambahkan pendengar acara untuk tombol dengan id <b style='background-color: #ececec;'>generate-key-btn</b>, yang akan dieksekusi saat tombol diklik.</b>." },
    { number: 24, code_js: "<b style='background-color: #ececec;'>var randomKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);</b>", explanation_js: "Hasilkan kunci acak 16-byte menggunakan CryptoJS dan konversi ke format heksadesimal, lalu simpan di <b style='background-color: #ececec;'>randomKey</b>.</b>." },
    { number: 25, code_js: "<b style='background-color: #ececec;'>document.getElementById('secret-key').value = randomKey;</b>", explanation_js: "Mengembalikan kunci acak yang dibuat pada elemen dengan id <b style='background-color: #ececec;'>secret-key</b>.</b>." },
    { number: 26, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Tutup fungsi pendengar acara untuk tombol buat kunci.</b>." }
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
                window.location.href = "/src/download/AES Encoder Decoder.rar";
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