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
    { number: 1, code_html: "<b style='background-color: #ececec;'>&lt;!DOCTYPE html&gt;</b>", explanation_html: "Deklarasi tipe dokumen yang digunakan adalah HTML5." },
    { number: 2, code_html: "<b style='background-color: #ececec;'>&lt;!-- Coding By CodingIndo - https://codingindo.vercel.app/ --&gt;</b>", explanation_html: "Komentar yang menyatakan bahwa kode ini dibuat oleh CodingIndo, dan mencantumkan URL situs web mereka." },
    { number: 3, code_html: "<b style='background-color: #ececec;'>&lt;html lang=\"en\"&gt;</b>", explanation_html: "Tag pembuka untuk elemen <b style='background-color: #ececec;'>&lt;html&gt;</b> dengan atribut <b style='background-color: #ececec;'>lang=\"en\"</b> menunjukkan bahwa bahasa dokumen ini adalah bahasa Inggris." },
    { number: 4, code_html: "<b style='background-color: #ececec;'>&lt;head&gt;</b>", explanation_html: "Tag pembuka untuk elemen <b style='background-color: #ececec;'>&lt;head&gt;</b>, yang berisi metadata dan pengaturan untuk dokumen." },
    { number: 5, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag for character encoding --&gt;</b>", explanation_html: "Komentar yang menjelaskan bahwa baris berikut adalah tag meta untuk pengkodean karakter." },
    { number: 6, code_html: "<b style='background-color: #ececec;'>&lt;meta charset=\"UTF-8\"&gt;</b>", explanation_html: "Tag meta untuk mengatur pengkodean karakter ke UTF-8, sehingga dokumen mendukung berbagai karakter dan simbol." },
    { number: 7, code_html: "<b style='background-color: #ececec;'>&lt;!-- Meta tag to make the viewport responsive on mobile devices --&gt;</b>", explanation_html: "Komentar menunjukkan bahwa baris berikut adalah untuk menyesuaikan tampilan pada perangkat seluler." },
    { number: 8, code_html: "<b style='background-color: #ececec;'>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</b>", explanation_html: "Tag meta untuk membuat tampilan dokumen responsif pada perangkat seluler, dengan lebar tampilan sesuai perangkat dan skala awal 1." },
    { number: 9, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title --&gt;</b>", explanation_html: "Komentar yang menjelaskan bahwa baris berikutnya akan berisi judul halaman." },
    { number: 10, code_html: "<b style='background-color: #ececec;'>&lt;title&gt;Heatmap Color&lt;/title&gt;</b>", explanation_html: "Tag <b style='background-color: #ececec;'>&lt;title&gt;</b> menampilkan judul halaman \"Heatmap Warna\" pada tab browser." },
    { number: 11, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to CSS file for styling --&gt;</b>", explanation_html: "Komentar yang menunjukkan bahwa baris berikut adalah tautan ke berkas CSS eksternal untuk penataan gaya." },
    { number: 12, code_html: "<b style='background-color: #ececec;'>&lt;link rel=\"stylesheet\" href=\"style.css\"&gt;</b>", explanation_html: "Tag <b style='background-color: #ececec;'>&lt;link&gt;</b> terhubung ke file CSS eksternal <b style='background-color: #ececec;'>style.css</b> untuk menerapkan gaya ke halaman." },
    { number: 13, code_html: "<b style='background-color: #ececec;'>&lt;/head&gt;</b>", explanation_html: "Tag penutup untuk elemen <b style='background-color: #ececec;'>&lt;head&gt;</b>." },
    { number: 14, code_html: "<b style='background-color: #ececec;'>&lt;body&gt;</b>", explanation_html: "Tag pembuka untuk elemen <b style='background-color: #ececec;'>&lt;body&gt;</b>, yang berisi konten yang akan ditampilkan pada halaman web." },
    { number: 15, code_html: "<b style='background-color: #ececec;'>&lt;!-- Page title with centered text --&gt;</b>", explanation_html: "Komentar yang menunjukkan bahwa baris berikutnya adalah judul halaman dengan teks di tengah." },
    { number: 16, code_html: "<b style='background-color: #ececec;'>&lt;h1 style=\"text-align: center;\"&gt;Heatmap Color&lt;/h1&gt;</b>", explanation_html: "Tag <b style='background-color: #ececec;'>&lt;h1&gt;</b> menampilkan judul \"Heatmap Warna\" dengan teks di tengah." },
    { number: 17, code_html: "<b style='background-color: #ececec;'>&lt;!-- Div to display heatmap color --&gt;</b>", explanation_html: "Komentar menunjukkan bahwa elemen berikutnya adalah <b style='background-color: #ececec;'>&lt;div&gt;</b> untuk menampilkan heatmap warna." },
    { number: 18, code_html: "<b style='background-color: #ececec;'>&lt;div id=\"heatmap\" class=\"heatmap\"&gt;&lt;/div&gt;</b>", explanation_html: "Tag <b style='background-color: #ececec;'>&lt;div&gt;</b> dengan atribut <b style='background-color: #ececec;'>id=\"heatmap\"</b> dan <b style='background-color: #ececec;'>class=\"heatmap\"</b> menampilkan heatmap di halaman web." },
    { number: 19, code_html: "<b style='background-color: #ececec;'>&lt;!-- Link to JavaScript file for functionality --&gt;</b>", explanation_html: "Komentar yang menjelaskan bahwa baris berikut adalah tautan ke berkas JavaScript eksternal untuk menambahkan fungsionalitas." },
    { number: 20, code_html: "<b style='background-color: #ececec;'>&lt;script src=\"script.js\"&gt;&lt;/script&gt;</b>", explanation_html: "Tag <b style='background-color: #ececec;'>&lt;script&gt;</b> terhubung ke file JavaScript eksternal <b style='background-color: #ececec;'>script.js</b> untuk menambahkan fungsionalitas heatmap ke halaman web." },
    { number: 21, code_html: "<b style='background-color: #ececec;'>&lt;/body&gt;</b>", explanation_html: "Tag penutup untuk elemen <b style='background-color: #ececec;'>&lt;body&gt;</b>." },
    { number: 22, code_html: "<b style='background-color: #ececec;'>&lt;/html&gt;</b>", explanation_html: "Tag penutup untuk elemen <b style='background-color: #ececec;'>&lt;html&gt;</b>." }
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
    { number: 1, code_css: "<b style='background-color: #ececec;'>/* Sets the font for the entire body */</b>", explanation_css: "Komentar yang menjelaskan bahwa bagian berikut akan mengatur font untuk semua elemen di dalam <b style='background-color: #ececec;'>&lt;body&gt;</b>." },
    { number: 2, code_css: "<b style='background-color: #ececec;'>body {</b>", explanation_css: "Membuka deklarasi gaya untuk elemen <b style='background-color: #ececec;'>&lt;body&gt;</b>." },
    { number: 3, code_css: "<b style='background-color: #ececec;'>font-family: Arial, sans-serif;</b>", explanation_css: "Mengatur font untuk seluruh halaman agar menggunakan \"Arial\" sebagai font utama. Jika Arial tidak tersedia, font sans-serif lain akan digunakan." },
    { number: 4, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup deklarasi gaya untuk elemen <b style='background-color: #ececec;'>&lt;body&gt;</b>." },
    { number: 5, code_css: "<b style='background-color: #ececec;'>/* Sets the grid display for the heatmap */</b>", explanation_css: "Komentar menjelaskan bahwa bagian berikut akan mengatur tampilan grid untuk elemen dengan kelas <b style='background-color: #ececec;'>.heatmap</b>." },
    { number: 6, code_css: "<b style='background-color: #ececec;'>.heatmap {</b>", explanation_css: "Membuka deklarasi gaya untuk elemen dengan kelas <b style='background-color: #ececec;'>.heatmap</b>." },
    { number: 7, code_css: "<b style='background-color: #ececec;'>display: grid;</b>", explanation_css: "Mengatur elemen <b style='background-color: #ececec;'>.heatmap</b> untuk menggunakan tampilan grid, mengaktifkan tata letak berbasis grid untuk item di dalamnya." },
    { number: 8, code_css: "<b style='background-color: #ececec;'>grid-template-columns: repeat(5, 1fr);</b>", explanation_css: "Menentukan 5 kolom dalam grid, masing-masing mengambil 1 fraksi yang sama dari lebar container <b style='background-color: #ececec;'>.heatmap</b>." },
    { number: 9, code_css: "<b style='background-color: #ececec;'>gap: 2px;</b>", explanation_css: "Menambahkan jarak 2 piksel antara setiap elemen dalam grid, menciptakan pemisahan kecil antara elemen dalam heatmap." },
    { number: 10, code_css: "<b style='background-color: #ececec;'>max-width: 300px;</b>", explanation_css: "Membatasi lebar maksimum container <b style='background-color: #ececec;'>.heatmap</b> hingga 300 piksel, sehingga heatmap tidak meluas melampaui batas ini." },
    { number: 11, code_css: "<b style='background-color: #ececec;'>margin: 0 auto;</b>", explanation_css: "Atur margin atas dan bawah ke 0 serta margin kiri dan kanan ke otomatis, untuk membuat container <b style='background-color: #ececec;'>.heatmap</b> terpusat secara horizontal di halaman." },
    { number: 12, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup deklarasi gaya untuk elemen dengan kelas <b style='background-color: #ececec;'>.heatmap</b>." },
    { number: 13, code_css: "<b style='background-color: #ececec;'>/* Sets the appearance of each div in the heatmap */</b>", explanation_css: "Komentar menjelaskan bahwa bagian berikut akan mengontrol tampilan setiap elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> dalam <b style='background-color: #ececec;'>.heatmap</b>." },
    { number: 14, code_css: "<b style='background-color: #ececec;'>.heatmap div {</b>", explanation_css: "Membuka deklarasi gaya untuk setiap elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> di dalam container <b style='background-color: #ececec;'>.heatmap</b>." },
    { number: 15, code_css: "<b style='background-color: #ececec;'>padding: 20px;</b>", explanation_css: "Memberikan 20 piksel padding di dalam setiap elemen <b style='background-color: #ececec;'>&lt;div&gt;</b>, sehingga menyediakan ruang di dalam elemen." },
    { number: 16, code_css: "<b style='background-color: #ececec;'>text-align: center;</b>", explanation_css: "Atur teks di dalam setiap <b style='background-color: #ececec;'>&lt;div&gt;</b> agar rata tengah." },
    { number: 17, code_css: "<b style='background-color: #ececec;'>color: white;</b>", explanation_css: "Mengatur warna teks menjadi putih untuk meningkatkan kontras pada latar belakang heatmap yang biasanya lebih gelap." },
    { number: 18, code_css: "<b style='background-color: #ececec;'>font-weight: bold;</b>", explanation_css: "Mengatur teks di dalam setiap <b style='background-color: #ececec;'>&lt;div&gt;</b> menjadi tebal." },
    { number: 19, code_css: "<b style='background-color: #ececec;'>}</b>", explanation_css: "Menutup deklarasi gaya untuk setiap elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> di dalam <b style='background-color: #ececec;'>.heatmap</b>." }
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
    { number: 1, code_js: "<b style='background-color: #ececec;'>// Get element with id 'heatmap'</b>", explanation_js: "Komentar menunjukkan bahwa baris berikut akan mengambil elemen dengan id <b style='background-color: #ececec;'>'heatmap'</b>." },
    { number: 2, code_js: "<b style='background-color: #ececec;'>const heatmapContainer = document.getElementById('heatmap');</b>", explanation_js: "Nyatakan variabel <b style='background-color: #ececec;'>heatmapContainer</b> yang menyimpan elemen dengan <b style='background-color: #ececec;'>id=\"heatmap\"</b> dari DOM, yang akan menjadi container untuk heatmap." },
    { number: 3, code_js: "<b style='background-color: #ececec;'>// Data for heatmap</b>", explanation_js: "Komentar yang menunjukkan bahwa baris berikut akan menentukan data untuk heatmap." },
    { number: 4, code_js: "<b style='background-color: #ececec;'>const data = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]];</b>", explanation_js: "Mendeklarasikan variabel <b style='background-color: #ececec;'>data</b> yang berisi array 2D, di mana setiap elemen mewakili nilai dalam grid heatmap (5x5)." },
    { number: 5, code_js: "<b style='background-color: #ececec;'>// Function to get color based on value</b>", explanation_js: "Komentar yang menunjukkan bahwa baris berikut akan mendefinisikan fungsi untuk menentukan warna berdasarkan nilai yang diberikan." },
    { number: 6, code_js: "<b style='background-color: #ececec;'>function getColor(value) {</b>", explanation_js: "Menentukan fungsi <b style='background-color: #ececec;'>getColor</b> yang menerima parameter <b style='background-color: #ececec;'>value</b> dan mengembalikan warna berdasarkan nilai tersebut." },
    { number: 7, code_js: "<b style='background-color: #ececec;'>if (value <= 5) return 'rgb(198, 235, 255)';</b>", explanation_js: "Jika <b style='background-color: #ececec;'>value</b> kurang dari atau sama dengan 5, fungsi akan mengembalikan warna <b style='background-color: #ececec;'>rgb(198, 235, 255)</b>, yang merupakan warna biru muda." },
    { number: 8, code_js: "<b style='background-color: #ececec;'>if (value <= 10) return 'rgb(132, 196, 255)';</b>", explanation_js: "Jika <b style='background-color: #ececec;'>value</b> kurang dari atau sama dengan 10, fungsi mengembalikan warna <b style='background-color: #ececec;'>rgb(132, 196, 255)</b>, yang lebih gelap dari warna sebelumnya." },
    { number: 9, code_js: "<b style='background-color: #ececec;'>if (value <= 15) return 'rgb(66, 157, 255)';</b>", explanation_js: "Jika <b style='background-color: #ececec;'>value</b> kurang dari atau sama dengan 15, fungsi mengembalikan warna <b style='background-color: #ececec;'>rgb(66, 157, 255)</b>, yang bahkan lebih gelap." },
    { number: 10, code_js: "<b style='background-color: #ececec;'>if (value <= 20) return 'rgb(0, 118, 255)';</b>", explanation_js: "Jika <b style='background-color: #ececec;'>value</b> kurang dari atau sama dengan 20, fungsi tersebut mengembalikan warna <b style='background-color: #ececec;'>rgb(0, 118, 255)</b>, yang merupakan biru tua." },
    { number: 11, code_js: "<b style='background-color: #ececec;'>return 'rgb(0, 78, 170)';</b>", explanation_js: "Jika <b style='background-color: #ececec;'>value</b> lebih besar dari 20, fungsi mengembalikan warna <b style='background-color: #ececec;'>rgb(0, 78, 170)</b>, yang merupakan biru paling gelap dalam skala ini." },
    { number: 12, code_js: "<b style='background-color: #ececec;'>}</b>", explanation_js: "Menutup deklarasi fungsi <b style='background-color: #ececec;'>getColor</b>." },
    { number: 13, code_js: "<b style='background-color: #ececec;'>// Iterate through each row of data</b>", explanation_js: "Komentar yang menunjukkan bahwa baris berikutnya akan berulang pada setiap baris dalam data heatmap." },
    { number: 14, code_js: "<b style='background-color: #ececec;'>data.forEach(row => {</b>", explanation_js: "Menggunakan metode <b style='background-color: #ececec;'>forEach</b> untuk mengulang setiap <b style='background-color: #ececec;'>row</b> dalam array <b style='background-color: #ececec;'>data</b>." },
    { number: 15, code_js: "<b style='background-color: #ececec;'>// Iterate through each value in the row</b>", explanation_js: "Komentar yang menunjukkan bahwa baris berikutnya akan mengulangi setiap nilai dalam baris tersebut." },
    { number: 16, code_js: "<b style='background-color: #ececec;'>row.forEach(value => {</b>", explanation_js: "Menggunakan metode <b style='background-color: #ececec;'>forEach</b> untuk mengulang setiap <b style='background-color: #ececec;'>value</b> dalam satu <b style='background-color: #ececec;'>row</b>." },
    { number: 17, code_js: "<b style='background-color: #ececec;'>// Create a div element for each value</b>", explanation_js: "Komentar yang menunjukkan bahwa elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> akan dibuat untuk setiap nilai dalam grid." },
    { number: 18, code_js: "<b style='background-color: #ececec;'>const cell = document.createElement('div');</b>", explanation_js: "Mendeklarasikan variabel <b style='background-color: #ececec;'>cell</b> yang membuat elemen <b style='background-color: #ececec;'>&lt;div&gt;</b> baru untuk menampung nilai dari heatmap." },
    { number: 19, code_js: "<b style='background-color: #ececec;'>// Sets the background color based on the value</b>", explanation_js: "Komentar menunjukkan bahwa baris berikut akan mengatur warna latar belakang berdasarkan nilai." },
    { number: 20, code_js: "<b style='background-color: #ececec;'>cell.style.backgroundColor = getColor(value);</b>", explanation_js: "Mengatur warna latar belakang elemen <b style='background-color: #ececec;'>cell</b> dengan memanggil fungsi <b style='background-color: #ececec;'>getColor</b> untuk menentukan warna yang sesuai berdasarkan <b style='background-color: #ececec;'>value</b>." },
    { number: 21, code_js: "<b style='background-color: #ececec;'>// Add value text into div element</b>", explanation_js: "Komentar yang menunjukkan bahwa teks nilai akan ditambahkan ke elemen <b style='background-color: #ececec;'>&lt;div&gt;</b>." },
    { number: 22, code_js: "<b style='background-color: #ececec;'>cell.textContent = value;</b>", explanation_js: "Menyisipkan teks <b style='background-color: #ececec;'>value</b> ke dalam elemen <b style='background-color: #ececec;'>cell</b>, sehingga setiap sel menampilkan nilai yang sesuai." },
    { number: 23, code_js: "<b style='background-color: #ececec;'>// Add a div element to the heatmap container</b>", explanation_js: "Komentar yang menunjukkan bahwa elemen <b style='background-color: #ececec;'>cell</b> akan ditambahkan ke container heatmap." },
    { number: 24, code_js: "<b style='background-color: #ececec;'>heatmapContainer.appendChild(cell);</b>", explanation_js: "Menambahkan elemen <b style='background-color: #ececec;'>cell</b> ke elemen <b style='background-color: #ececec;'>heatmapContainer</b>, sehingga muncul di halaman sebagai bagian dari heatmap." },
    { number: 25, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Menutup <b style='background-color: #ececec;'>forEach</b> kedua, yang mengulangi nilai-nilai dalam setiap baris." },
    { number: 26, code_js: "<b style='background-color: #ececec;'>});</b>", explanation_js: "Menutup <b style='background-color: #ececec;'>forEach</b> pertama, yang mengulangi setiap baris dalam data heatmap." }
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
                window.location.href = "/src/download/Heatmap Color.rar";
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