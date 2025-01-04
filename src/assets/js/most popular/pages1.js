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
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Komentar yang menunjukkan penulis atau sumber kode." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Membuka dokumen HTML dan menetapkan atribut bahasa ke Bahasa Inggris." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Memulai bagian kepala, berisi metadata dan sumber daya yang tertaut." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Menentukan pengkodean karakter sebagai UTF-8 untuk kompatibilitas yang lebih baik dengan berbagai bahasa." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Memastikan halaman responsif dengan menyesuaikan lebar perangkat." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Temperature Unit&lt;/title&gt;</b>", explanation_html: "Mengatur judul halaman web yang ditampilkan pada tab browser." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Tautan ke berkas CSS lokal untuk gaya khusus." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Tautan ke kerangka kerja CSS Bootstrap untuk gaya yang telah dibuat sebelumnya." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;link href=\"https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css\" rel=\"stylesheet\"&gt;</b>", explanation_html: "Tautan ke kerangka kerja CSS Tailwind untuk gaya yang mengutamakan utilitas." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Menutup bagian kepala." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Membuka bagian isi dokumen tempat konten utama ditempatkan." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"converter-card\"&gt;</b>", explanation_html: "Elemen container untuk konverter suhu." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;h2 class=\"text-center text-2xl font-bold mb-4\"&gt;Temperature Unit&lt;/h2&gt;</b>", explanation_html: "Judul untuk konverter, diberi gaya menggunakan kelas CSS Tailwind untuk ukuran, ketebalan, dan margin." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;form id=\"converterForm\" class=\"space-y-4\"&gt;</b>", explanation_html: "Memulai formulir untuk masukan pengguna dengan spasi vertikal antar grup formulir." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group\"&gt;...&lt;/div&gt;</b>", explanation_html: "Grup formulir untuk bidang masukan suhu, termasuk elemen label dan input." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"temperature\" class=\"form-label\"&gt;Enter Temperature:&lt;/label&gt;</b>", explanation_html: "Label untuk input suhu, diberi gaya dengan kelas Bootstrap." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;input type=\"number\" id=\"temperature\" class=\"form-control\" placeholder=\"Enter value\" required&gt;</b>", explanation_html: "Bidang input angka yang diberi gaya menggunakan Bootstrap, dengan tempat penampung dan atribut yang diperlukan untuk validasi." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group\"&gt;...&lt;/div&gt;</b>", explanation_html: "Grup formulir untuk memilih unit suhu asli." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"fromUnit\" class=\"form-label\"&gt;From Unit:&lt;/label&gt;</b>", explanation_html: "Label untuk menu dropdown pemilihan unit asli." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;select id=\"fromUnit\" class=\"form-select\"&gt;...&lt;/select&gt;</b>", explanation_html: "Menu tarik-turun untuk memilih unit suhu asli, diberi gaya menggunakan Bootstrap." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group\"&gt;...&lt;/div&gt;</b>", explanation_html: "Grup formulir untuk memilih unit suhu tujuan." },
    { number: 23, code_html: "<b style='background-color: #ececec;'>&lt;label for=\"toUnit\" class=\"form-label\"&gt;To Unit:&lt;/label&gt;</b>", explanation_html: "Label untuk menu dropdown pemilihan unit tujuan." },
    { number: 24, code_html: "<b style='background-color: #ececec;'>&lt;select id=\"toUnit\" class=\"form-select\"&gt;...&lt;/select&gt;</b>", explanation_html: "Menu dropdown untuk memilih unit suhu tujuan." },
    { number: 25, code_html: "<b style='background-color: #ececec;'>&lt;div class=\"form-group text-center\"&gt;...&lt;/div&gt;</b>", explanation_html: "Grup formulir yang berisi tombol \"Convert\", dipusatkan menggunakan kelas Bootstrap." },
    { number: 26, code_html: "<b style='background-color: #ececec;'>&lt;button type=\"submit\" class=\"btn btn-primary btn-lg w-100\"&gt;Convert&lt;/button&gt;</b>", explanation_html: "Tombol kirim bergaya tombol Bootstrap besar dan lebar penuh." },
    { number: 27, code_html: "<b style='background-color: #ececec;'>&lt;/form&gt;</b>", explanation_html: "Menutup elemen formulir." },
    { number: 28, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"result\" class=\"mt-4 text-center\"&gt;&lt;/div&gt;</b>", explanation_html: "Div untuk menampilkan hasil konversi, diberi gaya margin atas dan teks di tengah." },
    { number: 29, code_html: "<b style='background-color: #ececec;'>&lt;/div&gt;</b>", explanation_html: "Menutup div container utama untuk kartu konverter." },
    { number: 30, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Tautan ke berkas JavaScript eksternal untuk menangani logika formulir." },
    { number: 31, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Tautan ke bundel JavaScript Bootstrap untuk komponen interaktif." },
    { number: 32, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Menutup bagian badan." },
    { number: 33, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Menutup dokumen HTML." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>body {</b>", explanation_css: "Memulai gaya untuk elemen <b style='background-color: #ececec;'>body</b>." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>background: linear-gradient(135deg, #667eea, #764ba2);</b>", explanation_css: "Mengatur latar belakang ke gradien diagonal yang bertransisi dari <b style='background-color: #ececec;'>#667eea</b> ke <b style='background-color: #ececec;'>#764ba2</b>." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>min-height: 100vh;</b>", explanation_css: "Memastikan badan memiliki tinggi minimal 100% dari tinggi viewport." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>display: flex;</b>", explanation_css: "Menerapkan tata letak flexbox ke bodi untuk tujuan penyelarasan." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>justify-content: center;</b>", explanation_css: "Memusatkan elemen anak secara horizontal di dalam badan." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>align-items: center;</b>", explanation_css: "Memusatkan elemen anak secara vertikal di dalam badan." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>font-family: 'Poppins', sans-serif;</b>", explanation_css: "Mengatur fonta teks ke <b style='background-color: #ececec;'>Poppins</b>, dengan fallback ke <b style='background-color: #ececec;'>sans-serif</b>." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup blok gaya tubuh." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>.converter-card {</b>", explanation_css: "Memulai gaya untuk elemen dengan kelas <b style='background-color: #ececec;'>converter-card</b>." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>background-color: white;</b>", explanation_css: "Mengatur warna latar belakang kartu menjadi putih." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>border-radius: 1rem;</b>", explanation_css: "Menambahkan sudut membulat pada kartu dengan radius 1rem." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);</b>", explanation_css: "Menerapkan efek bayangan untuk memberikan sedikit elevasi pada kartu." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>padding: 2rem;</b>", explanation_css: "Menambahkan 2rem bantalan di dalam kartu." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>max-width: 400px;</b>", explanation_css: "Mengatur lebar maksimum kartu menjadi 400 piksel." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>width: 100%;</b>", explanation_css: "Memastikan kartu menempati lebar penuh container, hingga lebar maksimum." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup blok gaya <b style='background-color: #ececec;'>.converter-card</b>." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>.converter-card h2 {</b>", explanation_css: "Memulai gaya untuk elemen <b style='background-color: #ececec;'>h2</b> di dalam <b style='background-color: #ececec;'>.converter-card</b>." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>color: #764ba2;</b>", explanation_css: "Mengatur warna teks <b style='background-color: #ececec;'>h2</b> ke <b style='background-color: #ececec;'>#764ba2</b>." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup blok gaya <b style='background-color: #ececec;'>h2</b> dalam <b style='background-color: #ececec;'>.converter-card</b>." },
    { number: 20, code_css: "<b style='background-color: #ececec;'>.btn-primary {</b>", explanation_css: "Memulai gaya untuk elemen dengan kelas <b style='background-color: #ececec;'>btn-primary</b>." },
    { number: 21, code_css: "<b style='background-color: #ececec;'>background-color: #667eea;</b>", explanation_css: "Mengatur warna latar belakang tombol ke <b style='background-color: #ececec;'>#667eea</b>." },
    { number: 22, code_css: "<b style='background-color: #ececec;'>border-color: #667eea;</b>", explanation_css: "Mengatur warna batas tombol ke <b style='background-color: #ececec;'>#667eea</b>." },
    { number: 23, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup blok gaya <b style='background-color: #ececec;'>.btn-primary</b>." },
    { number: 24, code_css: "<b style='background-color: #ececec;'>.btn-primary:hover {</b>", explanation_css: "Memulai penataan status hover untuk elemen dengan kelas <b style='background-color: #ececec;'>btn-primary</b>." },
    { number: 25, code_css: "<b style='background-color: #ececec;'>background-color: #764ba2;</b>", explanation_css: "Mengubah warna latar belakang tombol menjadi <b style='background-color: #ececec;'>#764ba2</b> saat diarahkan." },
    { number: 26, code_css: "<b style='background-color: #ececec;'>border-color: #764ba2;</b>", explanation_css: "Mengubah warna batas tombol menjadi <b style='background-color: #ececec;'>#764ba2</b> saat diarahkan." },
    { number: 27, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup blok gaya status hover untuk <b style='background-color: #ececec;'>.btn-primary</b>." },
    { number: 28, code_css: "<b style='background-color: #ececec;'>#result {</b>", explanation_css: "Memulai penataan gaya untuk elemen dengan <b style='background-color: #ececec;'>id result</b>." },
    { number: 29, code_css: "<b style='background-color: #ececec;'>color: #764ba2;</b>", explanation_css: "Mengatur warna teks ke <b style='background-color: #ececec;'>#764ba2</b>." },
    { number: 30, code_css: "<b style='background-color: #ececec;'>font-weight: bold;</b>", explanation_css: "Membuat teks tebal." },
    { number: 31, code_css: "<b style='background-color: #ececec;'>font-size: 1.25rem;</b>", explanation_css: "Mengatur ukuran font menjadi <b style='background-color: #ececec;'>1.25rem</b>." },
    { number: 32, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup blok gaya <b style='background-color: #ececec;'>#result</b>." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>document.getElementById('converterForm').addEventListener('submit', function(e) {</b>", explanation_js: "Menambahkan event listener ke formulir dengan <b style='background-color: #ececec;'>id=\"converterForm\"</b>. Event listener mendengarkan peristiwa <b style='background-color: #ececec;'>submit</b> dan memicu fungsi saat formulir dikirimkan." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>e.preventDefault();</b>", explanation_js: "Mencegah perilaku pengiriman formulir default (yang akan memuat ulang halaman)." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>const temp = parseFloat(document.getElementById('temperature').value);</b>", explanation_js: "Mengambil nilai bidang input suhu (<b style='background-color: #ececec;'>id=\"temperature\"</b>) dan mengubahnya menjadi angka titik-mengambang." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const fromUnit = document.getElementById('fromUnit').value;</b>", explanation_js: "Mengambil nilai yang dipilih dari dropdown \"From Unit\" (<b style='background-color: #ececec;'>id=\"fromUnit\"</b>)." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>const toUnit = document.getElementById('toUnit').value;</b>", explanation_js: "Mengambil nilai yang dipilih dari menu dropdown \"To Unit\" (<b style='background-color: #ececec;'>id=\"toUnit\"</b>)." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>let result;</b>", explanation_js: "Mendeklarasikan variabel <b style='background-color: #ececec;'>result</b> untuk menampung konversi." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>if (isNaN(temp)) {</b>", explanation_js: "Memeriksa apakah nilai suhu yang dimasukkan adalah angka yang valid menggunakan <b style='background-color: #ececec;'>isNaN()</b>." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>result = \"Silakan masukkan suhu yang valid.\";</b>", explanation_js: "Jika nilai suhu tidak valid (bukan angka), tetapkan variabel <b style='background-color: #ececec;'>result</b> dengan pesan kesalahan dalam bahasa Indonesia (\"Silakan masukkan suhu yang valid\")." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>} else {</b>", explanation_js: "Jika nilai suhu valid, lanjutkan dengan mengonversi suhu." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>result = convertTemperature(temp, fromUnit, toUnit);</b>", explanation_js: "Memanggil fungsi <b style='background-color: #ececec;'>convertTemperature</b> untuk melakukan konversi dan menyimpan hasilnya." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>}</b>", explanation_js: "Menutup blok <b style='background-color: #ececec;'>if</b> untuk memvalidasi masukan suhu." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>document.getElementById('result').textContent = result;</b>", explanation_js: "Menampilkan hasil konversi (atau pesan kesalahan) dalam elemen <b style='background-color: #ececec;'>id=\"result\"</b> dengan mengatur konten teksnya." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Menutup pendengar acara untuk pengiriman formulir." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>function convertTemperature(temp, from, to) {</b>", explanation_js: "Menentukan fungsi <b style='background-color: #ececec;'>convertTemperature</b> yang mengambil <b style='background-color: #ececec;'>temp</b> (nilai suhu), <b style='background-color: #ececec;'>from</b> (unit asli), dan <b style='background-color: #ececec;'>to</b> (unit target) sebagai parameter." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>let kelvin;</b>", explanation_js: "Mendeklarasikan variabel <b style='background-color: #ececec;'>kelvin</b> untuk menampung nilai suhu dalam Kelvin, karena konversi dilakukan menggunakan Kelvin sebagai unit perantara." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>switch (from) { ... }</b>", explanation_js: "Pernyataan <b style='background-color: #ececec;'>switch</b> yang mengubah suhu masukan (<b style='background-color: #ececec;'>suhu</b>) dari satuan awal (<b style='background-color: #ececec;'>from</b>) ke Kelvin. Setiap <b style='background-color: #ececec;'>kasus</b> sesuai dengan satuan suhu yang berbeda dan melakukan konversi yang sesuai." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>let finalTemp;</b>", explanation_js: "Mendeklarasikan variabel <b style='background-color: #ececec;'>finalTemp</b> untuk menahan suhu setelah mengubahnya dari Kelvin ke unit target." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>switch (to) { ... }</b>", explanation_js: "Pernyataan <b style='background-color: #ececec;'>switch</b> kedua yang mengonversi suhu dalam Kelvin (<b style='background-color: #ececec;'>kelvin</b>) ke satuan target (<b style='background-color: #ececec;'>to</b>). Setiap <b style='background-color: #ececec;'>kasus</b> sesuai dengan satuan target yang berbeda dan melakukan konversi." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>return `${temp} ${from} = ${finalTemp.toFixed(2)} ${to}`;</b>", explanation_js: "Mengembalikan hasil konversi sebagai string, menampilkan suhu asli, unit asli, suhu yang dikonversi, dan unit target, diformat ke dua tempat desimal." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>}</b>", explanation_js: "Menutup fungsi <b style='background-color: #ececec;'>convertTemperature</b>." }
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
                window.location.href = "/src/download/Temperature Unit.rar";
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