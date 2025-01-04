// Get text input element from DOM
const textInput = document.getElementById('textInput');
// Get the language select element from the DOM
const languageSelect = document.getElementById('languageSelect');
// Get the sound select element from the DOM
const voiceSelect = document.getElementById('voiceSelect');
// Get the talk button element from the DOM
const speakBtn = document.getElementById('speakBtn');
// Get the speed range element from the DOM
const rateRange = document.getElementById('rateRange');
// Get the tone range element from the DOM
const pitchRange = document.getElementById('pitchRange');
// Get volume range elements from DOM
const volumeRange = document.getElementById('volumeRange');
// Get the speed value element from the DOM
const rateValue = document.getElementById('rateValue');
// Get the tone value element from the DOM
const pitchValue = document.getElementById('pitchValue');
// Get the volume value element from the DOM
const volumeValue = document.getElementById('volumeValue');

// Initialize an array to store sounds
let voices = [];

// Object to store language names
const languageNames = {
    "af": "Afrikaans (Suid-Afrika)",
    "sq": "Shqip (Shqipëri)",
    "am": "አማርኛ (ኢትዮጵያ)",
    "ar": "العربية (السعودية)",
    "az": "Azərbaycan (Azərbaycan)",
    "bn": "বাংলা (বাংলাদেশ)",
    "bs": "Bosanski (Bosna i Hercegovina)",
    "bg": "Български (България)",
    "my": "ဗမာ (မြန်မာ)",
    "ca": "Català (Andorra)",
    "zh": "中文（中国）",
    "hr": "Hrvatski (Hrvatska)",
    "cs": "Čeština (Česká Republika)",
    "da": "Dansk (Danmark)",
    "nl": "Nederlands (Nederland)",
    "en": "English (United Kingdom)",
    "et": "Eesti (Estonia)",
    "fil": "Tagalog (Pilipinas)",
    "fi": "Suomen (Suomi)",
    "fr": "Français (France)",
    "gl": "Galego (España)",
    "ka": "ქართული (საქართველო)",
    "de": "Deutsch (Deutschland)",
    "el": "Ελληνικά (Ελλάδα)",
    "gu": "ગુજરાતી (ભારત)",
    "he": "עברית (ישראל)",
    "hi": "हिन्दी (भारत)",
    "hu": "Magyar (Magyarország)",
    "is": "Íslenska (Ísland)",
    "id": "Bahasa Indonesia (Indonesia)",
    "ga": "Gaeilge (Éire)",
    "it": "Italiano (Italia)",
    "ja": "日本語 (日本)",
    "jv": "Basa Jawa (Indonesia)",
    "kn": "ಕನ್ನಡ (ಕೆನಡಾ)",
    "kk": "Қазақ (Қазақстан)",
    "km": "ខ្មែរ (កម្ពុជា)",
    "ko": "한국어 (대한민국)",
    "lo": "ລາວ (ປະເທດລາວ)",
    "lv": "Latviešu (Latvija)",
    "lt": "Lietuvių (Lietuva)",
    "mk": "Македонски (Северна Македонија)",
    "ms": "Bahasa Melayu (Malaysia)",
    "ml": "മലയാളം (ഇന്ത്യ)",
    "mt": "Malti (Malta)",
    "mr": "मराठी (भारत)",
    "mn": "Монгол (Монгол)",
    "ne": "नेपाली (नेपाल)",
    "nb": "Norsk (Norge)",
    "ps": "پښتو (افغانستان)",
    "fa": "فارسی (ایران)",
    "pl": "Polski (Polska)",
    "pt": "Português (Portugal)",
    "ro": "Română (România)",
    "ru": "Русский (Россия)",
    "sr": "Српски (Србија)",
    "si": "සිංහල (ශ්‍රී ලංකා)",
    "sk": "Slovenčina (Slovensko)",
    "sl": "Slovenščina (Slovenija)",
    "so": "Soomaali (Soomaaliya)",
    "es": "Español (España)",
    "su": "Basa Sunda (Indonésia)",
    "sw": "Kiswahili (Kenya)",
    "sv": "Svenska (Sverige)",
    "ta": "தமிழ் (சிங்கப்பூர்)",
    "te": "తెలుగు (భారతదేశం)",
    "th": "ไทย (ประเทศไทย)",
    "tr": "Türkçe (Türkiye)",
    "uk": "Українська (Україна)",
    "ur": "اردو (پاکستان)",
    "uz": "O'zbekcha (O'zbekiston)",
    "vi": "Tiếng Việt (Việt Nam)",
    "cy": "Cymraeg (Cymru)",
    "zu": "IsiZulu (Ningizimu Afrika)",
};

// Function to fill the sound list
function populateVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    const selectedLang = languageSelect.value;
    voices
        .filter(voice => voice.lang.startsWith(selectedLang))
        .forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name;
            voiceSelect.appendChild(option);
        });
}

// Function to fill the language list
function populateLanguages() {
    const uniqueLangs = [...new Set(voices.map(voice => voice.lang.split('-')[0]))];
    languageSelect.innerHTML = '';
    uniqueLangs.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = languageNames[lang] || lang;
        languageSelect.appendChild(option);
    });
    populateVoices();
}

// Add event listener for changes to language select
languageSelect.addEventListener('change', populateVoices);

// Add event listener for changes to speed range
rateRange.addEventListener('input', () => {
    rateValue.textContent = rateRange.value;
});

// Add event listener for changes to pitch range
pitchRange.addEventListener('input', () => {
    pitchValue.textContent = pitchRange.value;
});

// Add event listener for changes to volume range
volumeRange.addEventListener('input', () => {
    volumeValue.textContent = Math.round(volumeRange.value * 100);
});

// Function to start text to speech
function speakText() {
    const text = textInput.value;
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceName = voiceSelect.value;
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
    utterance.voice = selectedVoice;
    utterance.rate = rateRange.value;
    utterance.pitch = pitchRange.value;
    utterance.volume = volumeRange.value;
    speechSynthesis.speak(utterance);
}

// Add event listener for changes to the sound list
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
    populateLanguages();
};

// Add event listener for speak button
speakBtn.addEventListener('click', speakText);