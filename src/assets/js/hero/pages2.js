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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Menentukan jenis dokumen sebagai HTML5 untuk memastikan kompatibilitas dengan semua browser modern." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Komentar yang menyatakan sumber kode ini berasal dari CodingIndo." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;html&gt;</b> dan mengatur bahasa halaman ke Bahasa Inggris." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;head&gt;</b> yang berisi metadata dan referensi CSS/JavaScript untuk halaman ini." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Komentar pada elemen <b style='background-color: #ececec;'>&lt;meta&gt;</b> berikutnya yang mengatur pengkodean karakter." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Atur pengkodean karakter ke UTF-8 untuk mendukung berbagai karakter internasional." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for setting the viewport to be responsive on mobile devices --&gt;</b>", explanation_html: "Komentar pada viewport untuk responsivitas pada perangkat seluler." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Atur tampilan awal pada perangkat seluler agar halaman menjadi responsif." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Komentar pada elemen <b style='background-color: #ececec;'>&lt;title&gt;</b>." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Calculator&lt;/title&gt;</b>", explanation_html: "Mengatur judul halaman yang akan muncul di tab browser." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Connecting Bootstrap CSS --&gt;</b>", explanation_html: "Komentar mengenai referensi ke Bootstrap CSS." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Termasuk Bootstrap CSS versi 5.3.0 untuk gaya komponen." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;!-- Connecting TailwindCSS --&gt;</b>", explanation_html: "Komentar mengenai referensi ke Tailwind CSS." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.tailwindcss.com\"&gt;&lt;/script&gt;</b>", explanation_html: "Termasuk pustaka CSS Tailwind untuk gaya responsif tambahan." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;style&gt;...&lt;/style&gt;</b>", explanation_html: "Memuat CSS khusus untuk menata elemen kalkulator dan tampilannya." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;head&gt;</b>." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;body&gt;</b> yang berisi konten utama halaman." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"container\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> dengan kelas <b style='background-color: #ececec;'>container</b> sebagai pembungkus utama untuk kalkulator dan riwayat perhitungan." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"calculator\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> dengan kelas <b style='background-color: #ececec;'>calculator</b> untuk membungkus kalkulator." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"display\" class=\"display mb-4\"&gt;0&lt;/div&gt;</b>", explanation_html: "Tampilan layar kalkulator untuk menampilkan angka atau hasil operasi." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;!-- Memory button --&gt;</b>", explanation_html: "Komentar tentang tombol memori pada kalkulator." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex flex-wrap\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> dengan kelas <b style='background-color: #ececec;'>d-flex flex-wrap</b> untuk membungkus tombol memori dalam baris yang fleksibel." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom btn-memory flex-grow-1\"...&lt;/button&gt;</b>", explanation_html: "Tombol memori <b style='background-color: #ececec;'>MC</b>, <b style='background-color: #ececec;'>MR</b>, <b style='background-color: #ececec;'>M+</b>, dan <b style='background-color: #ececec;'>M-</b> untuk mengelola memori kalkulator (hapus, panggil, tambah, kurangi)." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;!-- Clear, delete, percent, and divide buttons --&gt;</b>", explanation_html: "Komentar mengenai tombol <b style='background-color: #ececec;'>Clear</b>, <b style='background-color: #ececec;'>Delete</b>, <b style='background-color: #ececec;'>%</b>, dan <b style='background-color: #ececec;'>Divide</b>." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex flex-wrap\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> untuk mengelompokkan tombol <b style='background-color: #ececec;'>Clear</b>, <b style='background-color: #ececec;'>Delete</b>, <b style='background-color: #ececec;'>%</b>, dan <b style='background-color: #ececec;'>Divide</b>." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "Tombol <b style='background-color: #ececec;'>C</b>, <b style='background-color: #ececec;'>⌫</b>, <b style='background-color: #ececec;'>%</b>, dan <b style='background-color: #ececec;'>÷</b> untuk fungsi kalkulator dasar." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 7, 8, 9, and times --&gt;</b>", explanation_html: "Komentar pada tombol angka <b style='background-color: #ececec;'>7</b>, <b style='background-color: #ececec;'>8</b>, <b style='background-color: #ececec;'>9</b>, dan <b style='background-color: #ececec;'>×</b>." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "Tombol angka <b style='background-color: #ececec;'>7</b>, <b style='background-color: #ececec;'>8</b>, <b style='background-color: #ececec;'>9</b>, dan <b style='background-color: #ececec;'>×</b> untuk memasukkan angka dan operator perkalian." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 4, 5, 6, and less --&gt;</b>", explanation_html: "Komentar pada tombol angka <b style='background-color: #ececec;'>4</b>, <b style='background-color: #ececec;'>5</b>, <b style='background-color: #ececec;'>6</b>, dan <b style='background-color: #ececec;'>−</b>." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "Tombol angka <b style='background-color: #ececec;'>4</b>, <b style='background-color: #ececec;'>5</b>, <b style='background-color: #ececec;'>6</b>, dan <b style='background-color: #ececec;'>−</b> digunakan untuk memasukkan angka dan operator pengurangan." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 1, 2, 3, and plus --&gt;</b>", explanation_html: "Komentar pada tombol angka <b style='background-color: #ececec;'>1</b>, <b style='background-color: #ececec;'>2</b>, <b style='background-color: #ececec;'>3</b>, dan <b style='background-color: #ececec;'>+</b>." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "Tombol angka <b style='background-color: #ececec;'>1</b>, <b style='background-color: #ececec;'>2</b>, <b style='background-color: #ececec;'>3</b>, dan <b style='background-color: #ececec;'>+</b> digunakan untuk memasukkan angka dan operator penjumlahan." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;!-- Number keys 0, period, root, and equals --&gt;</b>", explanation_html: "Komentar pada tombol angka <b style='background-color: #ececec;'>0</b>, <b style='background-color: #ececec;'>.</b> (desimal), <b style='background-color: #ececec;'>√</b> (akar), dan <b style='background-color: #ececec;'>=</b>." },
    { number: 34, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "Tombol <b style='background-color: #ececec;'>0</b>, <b style='background-color: #ececec;'>.</b> (desimal), <b style='background-color: #ececec;'>√</b> (akar), dan <b style='background-color: #ececec;'>=</b> adalah untuk fungsi matematika dan hasil perhitungan." },
    { number: 35, code_html: "<b style='background-color: #ececec;'>&lt;!-- Rank button 2, Rank button 3, and Rank n buttons --&gt;</b>", explanation_html: "Komentar mengenai tombol daya (persegi, kubik, pangkat n)." },
    { number: 36, code_html: "<b style='background-color: #ececec;'>...&lt;button class=\"btn btn-custom\"...&lt;/button&gt;</b>", explanation_html: "Tombol <b style='background-color: #ececec;'>x²</b>, <b style='background-color: #ececec;'>x³</b>, dan <b style='background-color: #ececec;'>^</b> untuk menghitung eksponen angka yang dimasukkan." },
    { number: 37, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> kalkulator." },
    { number: 38, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"history-container\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> dengan kelas <b style='background-color: #ececec;'>history-container</b> untuk menampilkan riwayat perhitungan." },
    { number: 39, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"d-flex justify-between align-items-center mb-2\"&gt;</b>", explanation_html: "Membuka elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> untuk mengelompokkan judul riwayat dan menghapus tombol riwayat." },
    { number: 40, code_html: "<b style='background-color: #ececec;'>&lt;h5&gt;History&lt;/h5&gt;</b>", explanation_html: "Menampilkan judul \"History\" sebagai bagian riwayat perhitungan." },
    { number: 41, code_html: "<b style='background-color: #ececec;'>&lt;button class=\"btn btn-clear-history\" onclick=\"clearHistory()\"&gt;Clear History&lt;/button&gt;</b>", explanation_html: "Tombol untuk menghapus seluruh riwayat perhitungan pada kalkulator." },
    { number: 42, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> yang berisi judul dan tombol hapus riwayat." },
    { number: 43, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"history\" class=\"history\"&gt;&lt;/div&gt;</b>", explanation_html: "Elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> dengan id <b style='background-color: #ececec;'>history</b> untuk menampilkan riwayat perhitungan." },
    { number: 44, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> riwayat." },
    { number: 45, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> container." },
    { number: 46, code_html: "<b style='background-color: #ececec;'>&lt;!-- Links a custom JavaScript file for this page --&gt;</b>", explanation_html: "Komentar tentang berkas JavaScript khusus untuk halaman ini." },
    { number: 47, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Hubungkan file JavaScript eksternal <b style='background-color: #ececec;'>script.js</b> untuk logika kalkulator." },
    { number: 48, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;body&gt;</b>." },
    { number: 49, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Menutup elemen <b style='background-color: #ececec;'>&lt;html&gt;</b>." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>let display = document.getElementById('display');</b>", explanation_js: "Mendapatkan elemen dengan id <b style='background-color: #ececec;'>display</b> dari DOM dan menyimpannya dalam variabel <b style='background-color: #ececec;'>display</b>." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>let history = document.getElementById('history');</b>", explanation_js: "Mendapatkan elemen dengan id <b style='background-color: #ececec;'>history</b> dari DOM dan menyimpannya dalam variabel <b style='background-color: #ececec;'>history</b>." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>let memory = 0;</b>", explanation_js: "Menentukan variabel memori untuk menyimpan nilai memori dengan nilai awal 0." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>function clearDisplay()</b>", explanation_js: "Berfungsi untuk menghapus layar kalkulator, mengubah isi elemen <b style='background-color: #ececec;'>display</b> menjadi '0'." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>function deleteLast()</b>", explanation_js: "Fungsi untuk menghapus karakter terakhir pada <b style='background-color: #ececec;'>display</b>. Jika <b style='background-color: #ececec;'>display</b> kosong setelah penghapusan, maka akan diisi dengan '0'." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>function appendNumber(number)</b>", explanation_js: "Fungsi untuk menambahkan angka ke <b style='background-color: #ececec;'>display</b>. Jika <b style='background-color: #ececec;'>display</b> berisi '0', angka akan menggantikannya. Jika tidak, angka akan ditambahkan ke akhir teks yang ada." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>function appendOperator(operator)</b>", explanation_js: "Berfungsi untuk menambahkan operator (seperti +, -, *, /) ke <b style='background-color: #ececec;'>display</b>, dengan menambahkan spasi sebelum dan sesudah operator untuk memisahkannya dari angka lainnya." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>function calculateResult()</b>", explanation_js: "Fungsi untuk menghitung hasil ekspresi matematika pada <b style='background-color: #ececec;'>display</b> menggunakan <b style='background-color: #ececec;'>eval</b>. Jika berhasil, hasilnya akan ditampilkan dan ditambahkan ke riwayat." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>function calculateSquareRoot()</b>", explanation_js: "Fungsi untuk menghitung akar kuadrat dari nilai yang <b style='background-color: #ececec;'>display</b>. Jika berhasil, hasilnya akan ditampilkan dan ditambahkan ke riwayat." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>function memoryClear()</b>", explanation_js: "Berfungsi untuk menghapus nilai dalam <b style='background-color: #ececec;'>memory</b>, mengatur <b style='background-color: #ececec;'>memory</b> ke 0." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>function memoryRecall()</b>", explanation_js: "Berfungsi untuk menampilkan nilai <b style='background-color: #ececec;'>memory</b> pada <b style='background-color: #ececec;'>display</b>." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>function memoryAdd()</b>", explanation_js: "Fungsi untuk menambahkan nilai pada <b style='background-color: #ececec;'>display</b> ke <b style='background-color: #ececec;'>memory</b>. Nilai pada <b style='background-color: #ececec;'>display</b> diubah menjadi angka menggunakan <b style='background-color: #ececec;'>parseFloat</b>." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>function memorySubtract()</b>", explanation_js: "Fungsi untuk mengurangi nilai yang <b style='background-color: #ececec;'>display</b> dari <b style='background-color: #ececec;'>memory</b>. Nilai yang <b style='background-color: #ececec;'>display</b> diubah menjadi angka menggunakan <b style='background-color: #ececec;'>parseFloat</b>." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>function addToHistory(entry)</b>", explanation_js: "Fungsi untuk menambahkan entri ke dalam riwayat. Buat elemen <b style='background-color: #ececec;'>div</b> baru dengan kelas <b style='background-color: #ececec;'>history-item</b> dan tambahkan teks <b style='background-color: #ececec;'>entry</b> dan tambahkan di awal <b style='background-color: #ececec;'>history</b>." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>function clearHistory()</b>", explanation_js: "Berfungsi untuk menghapus semua entri dalam riwayat, dengan mengosongkan konten elemen <b style='background-color: #ececec;'>history</b>." }
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
                window.location.href = "/src/download/Calculator.rar";
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