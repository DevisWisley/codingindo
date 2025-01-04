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

function copyText(elementId) {
    var copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand("copy");
}

function cutText(elementId) {
    var cutText = document.getElementById(elementId);
    cutText.select();
    document.execCommand("cut");
}

function pasteText(elementId) {
    navigator.clipboard.readText().then(text => {
        document.getElementById(elementId).value = text;
        convertText();
    });
}

function clearText(elementId) {
    document.getElementById(elementId).value = "";
}

function shareText(elementId) {
    var shareText = document.getElementById(elementId).value;
    if (navigator.share) {
        navigator.share({
            title: 'Shared Text',
            text: shareText
        }).catch(console.error);
    } else {
        alert("Sharing not supported on this browser.");
    }
}

function saveTextToFile(elementId) {
    const text = document.getElementById(elementId).value;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted_text.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

function printText(elementId) {
    const printContents = document.getElementById(elementId).value;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function convertText() {
    let input = document.getElementById('inputText').value;
    let method = document.getElementById('conversionMethod').value;
    let crazinessLevelContainer = document.getElementById('crazinessLevelContainer');
    let crazinessLevel = document.getElementById('crazinessLevel');
    let output = ''; 

    const colorMethods = ['colorToSmali', 'colorToDecimal', 'colorToARGB'];
    if (colorMethods.includes(method)) {
        document.getElementById('colorPickerContainer').style.display = 'block';
        if (!input) {
            input = document.getElementById('colorPicker').value;
        }
    } else {
        document.getElementById('colorPickerContainer').style.display = 'none';
    }

    if (method === 'textToZalgo') {
        crazinessLevelContainer.style.display = 'block';
    } else {
        crazinessLevelContainer.style.display = 'none';
    }

    if (!input) {
        document.getElementById('outputHash').value = '';
        return;
    }

    switch (method) {
        case 'md5':
            output = CryptoJS.MD5(input).toString();
            break;
        case 'sha1':
            output = CryptoJS.SHA1(input).toString();
            break;
        case 'sha2':
            output = CryptoJS.SHA256(input).toString(CryptoJS.enc.Base64);
            break;
        case 'sha3':
            output = sha3_256(input);
            break;
        case 'sha224':
            output = CryptoJS.SHA224(input).toString();
            break;
        case 'sha256':
            output = CryptoJS.SHA256(input).toString();
            break;
        case 'sha384':
            output = CryptoJS.SHA384(input).toString();
            break;
        case 'sha512':
            output = CryptoJS.SHA512(input).toString();
            break;
        case 'crc32':
            output = CRC32.str(input).toString(16);
            break;
        case 'ripemd160':
            output = CryptoJS.RIPEMD160(input).toString(CryptoJS.enc.Hex);
            break;
        case 'decToBin':
            output = parseInt(input, 10).toString(2);
            break;
        case 'decToOct':
            output = parseInt(input, 10).toString(8);
            break;
        case 'decToHex':
            output = parseInt(input, 10).toString(16);
            break;
        case 'decToHex0x0':
            output = '0x' + parseInt(input, 10).toString(16);
            break;
        case 'decToHex0x00000000':
            output = '0x' + parseInt(input, 10).toString(16).padStart(8, '0');
            break;
        case "floatToBin":
            output = floatToBinary(input);
            break;
        case "floatToOct":
            output = floatToOctal(input);
            break;
        case "floatToHex":
            output = floatToHexadecimal(input);
            break;
        case "floatToHex0x0":
            output = floatToHexadecimal(input, "0x");
            break;
        case "floatToHex0x00000000":
            output = floatToHexadecimal(input, "0x").padStart(10, "0");
            break;
        case 'jsonToMessagePack':
            try {
                const jsonData = JSON.parse(input);
                const serializedData = msgpack.encode(jsonData);
                output = serializedData.toString('hex');
            } catch (e) {
                alert('Invalid JSON');
            }
            break;
        case 'utf8':
            output = textToUtfArray(input, "utf-8");
            break;
        case 'utf16':
            output = textToUtfArray(input, "utf-16");
            break;
        case 'utf16le':
            output = textToUtfArray(input, "utf-16le");
            break;
        case 'utf16be':
            output = textToUtfArray(input, "utf-16be");
            break;
        case 'iso88591':
            output = textToUtfArray(input, "iso-8859-1");
            break;
        case 'cp1251':
            output = textToUtfArray(input, "windows-1251");
            break;
        case 'ascii':
            output = textToUtfArray(input, "ascii");
            break;
        case 'iso10126':
            output = textToIso10126(input);
            break;
        case 'jsonEncoding':
            try {
                const parsed = JSON.parse(input);
                output = JSON.stringify(parsed, null, 2);
            } catch (e) {
                output = JSON.stringify({ text: input }, null, 2);
            }
            break;
        case 'urlEncoding':
            output = encodeURIComponent(input);
            break;
        case 'colorToSmali':
            output = colorToSmali(input);
            break;
        case 'colorToDecimal':
            output = colorToDecimal(input);
            break;
        case 'colorToARGB':
            output = colorToARGB(input);
            break;
        case 'numberToWord':
            output = convertNumberToWord(input);
            break;
        case 'numberFormatting':
            output = parseFloat(input).toLocaleString();
            break;
        case 'upsideDown':
            output = input.split('').map(char => upsideDownMap[char] || char).reverse().join('');
            break;
        case 'reverseText':
            output = input.split('').reverse().join('');
            break;
        case 'wingdingText':
            output = convertWingding(input);
            break;
        case 'textToZalgo':
            output = textToZalgo(input, crazinessLevel.value);
            break;
        case 'stringsByte':
            output = 'String str = (new String(new byte[]{' + Array.from(new TextEncoder().encode(input)).join(',') + '}));';
            break;
        case 'stringsBase64':
            output = 'String str = (new String(Base64.decode("' + btoa(input) + '", 0)));';
            break;
    }
    document.getElementById('outputHash').value = output;
}

function floatToBinary(floatNum) {
    let [integer, fraction] = floatNum.split('.').map(Number);
    let intPart = integer.toString(2);
    let fracPart = fraction ? '.' + fractionToBinary(fraction) : '';
    return intPart + fracPart;
}

function fractionToBinary(fraction) {
    let result = '';
    let frac = '0.' + fraction;
    let number = parseFloat(frac);
    while (number > 0 && result.length < 23) {
        number *= 2;
        if (number >= 1) {
            result += '1';
            number -= 1;
        } else {
            result += '0';
        }
    }
    return result;
}

function floatToOctal(floatNum) {
    let [integer, fraction] = floatNum.split('.').map(Number);
    let intPart = integer.toString(8);
    let fracPart = fraction ? '.' + fractionToOctal(fraction) : '';
    return intPart + fracPart;
}

function fractionToOctal(fraction) {
    let result = '';
    let frac = '0.' + fraction;
    let number = parseFloat(frac);
    while (number > 0 && result.length < 6) {
        number *= 8;
        result += Math.floor(number);
        number -= Math.floor(number);
    }
    return result;
}

function floatToHexadecimal(floatNum, prefix = '') {
    let [integer, fraction] = floatNum.split('.').map(Number);
    let intPart = integer.toString(16);
    let fracPart = fraction ? '.' + fractionToHexadecimal(fraction) : '';
    return prefix + intPart + fracPart;
}

function fractionToHexadecimal(fraction) {
    let result = '';
    let frac = '0.' + fraction;
    let number = parseFloat(frac);
    while (number > 0 && result.length < 13) {
        number *= 16;
        result += Math.floor(number).toString(16);
        number -= Math.floor(number);
    }
    return result;
}

function textToUtfArray(text, encoding) {
    return Array.from(new TextEncoder(encoding).encode(text)).join(', ');
}

function textToIso10126(text) {
    const paddingLength = Math.floor(Math.random() * 16) + 1;
    const paddedText = text + ' '.repeat(paddingLength);
    const encryptedText = btoa(paddedText);
    return encryptedText;
}

function updateColor() {
    document.getElementById('inputText').value = document.getElementById('colorPicker').value;
    convertText();
}

function colorToSmali(color) {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
    return `0x${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function colorToDecimal(color) {
    return parseInt(color.slice(1), 16);
}

function colorToARGB(color) {
    let a = 255;
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);
    return `${a}, ${r}, ${g}, ${b}`;
}

function convertNumberToWord(number) {
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    number = parseInt(number);

    if (number === 0) return 'zero';
    if (number < 10) return ones[number];
    if (number < 20) return teens[number - 11];
    if (number < 100) return tens[Math.floor(number / 10)] + (number % 10 > 0 ? ' ' + ones[number % 10] : '');

    return 'Number too large';
}

const upsideDownMap = {
    '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ',
    '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
    'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ',
    'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ',
    'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O',
    'P': 'Ԁ', 'Q': 'Q', 'R': 'ɹ', 'S': 'S', 'T': '┴',
    'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄',
    'Z': 'Z', 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 
    'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ',
    'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
    'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's',
    't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
    'y': 'ʎ', 'z': 'z'
};

function convertWingding(text) {
    return text.split('').map(char => wingdingMap[char.toLowerCase()] || char).join('');
}

const wingdingMap = {
    "0":"📁︎", "1":"📂︎", "2":"📄︎", "3":"🗏︎", "4":"🗐︎",
    "5":"🗄︎", "6":"⌛︎", "7":"🖮︎", "8":"🖰︎", "9":"🖲︎",
    "!":"✏︎", "\"":"✂︎", "#":"✁︎", "$":"👓︎", "%":"🕭︎",
    "&":"🕮︎", "'":"🕯︎", "(":"🕿︎", ")":"✆︎", "*":"🖂︎",
    "+":"🖃︎", ",":"📪︎", "-":"📫︎", ".":"📬︎", "/":"📭︎",
    ":":"🖳︎", ";":"🖴︎", "<":"🖫︎", "=":"🖬︎", ">":"✇︎",
    "?":"✍︎", "A":"✌︎", "B":"👌︎", "C":"👍︎", "D":"👎︎",
    "E":"☜︎", "F":"☞︎", "G":"☝︎", "H":"☟︎", "I":"✋︎",
    "J":"☺︎", "K":"😐︎", "L":"☹︎", "M":"💣︎", "N":"☠︎",
    "O":"⚐︎", "P":"🏱︎", "Q":"✈︎", "R":"☼︎", "S":"💧︎",
    "T":"❄︎", "U":"🕆︎", "V":"✞︎", "W":"🕈︎", "X":"✠︎",
    "Y":"✡︎", "Z":"☪︎", "[":"☯︎", "\\":"ॐ︎", "]":"☸︎",
    "^":"♈︎", "_":"♉︎" ,"`":"♊︎", "a":"♋︎", "b":"♌︎",
    "c":"♍︎", "d":"♎︎", "e":"♏︎", "f":"♐︎", "g":"♑︎",
    "h":"♒︎", "i":"♓︎", "j":"🙰", "k":"🙵", "l":"●︎",
    "m":"❍︎", "n":"■︎", "o":"□︎", "p":"◻︎", "q":"❑︎",
    "r":"❒︎", "s":"⬧︎", "t":"⧫︎", "u":"◆︎", "v":"❖︎",
    "w":"⬥︎", "x":"⌧︎", "y":"⍓︎", "z":"⌘︎", "{":"❀︎",
    "|":"✿︎", "}":"❝︎" , "~":"❞︎" , "":"▯︎", "€":"⓪︎",
    "":"①︎", "‚":"②︎", "ƒ":"③︎", "„":"④︎", "…":"⑤︎",
    "†":"⑥︎", "‡":"⑦︎", "ˆ":"⑧︎", "‰":"⑨︎", "Š":"⑩︎",
    "‹":"⓿︎", "Œ":"❶︎", "":"❷︎", "Ž":"❸︎", "":"❹︎",
    "":"❺︎", "‘":"❻︎", "’":"❼︎", "“":"❽︎", "”":"❾︎",
    "•":"❿︎", "–":"◻︎", "—":"◻︎", "˜":"◻︎", "™":"◻︎",
    "š":"◻︎", "›":"◻︎", "œ":"◻︎", "":"◻︎", "ž":"·︎",
    "Ÿ":"•︎", "¡":"○︎", "¢":"⭕︎", "£":"◻︎", "¤":"◉︎",
    "¥":"◎︎", "¦":"◻︎", "§":"▪︎", "¨":"◻︎", "©":"◻︎",
    "ª":"✦︎", "«":"★︎", "¬":"✶︎", "®":"✹︎", "¯":"✵︎",
    "°":"◻︎", "±":"⌖︎", "²":"⟡︎", "³":"⌑︎", "´":"◻︎",
    "µ":"✪︎", "¶":"✰︎", "·":"🕐︎", "¸":"🕑︎", "¹":"🕒︎",
    "º":"🕓︎", "»":"🕔︎", "¼":"🕕︎", "½":"🕖︎", "¾":"🕗︎",
    "¿":"🕘︎", "À":"🕙︎", "Á":"🕚︎", "Â":"🕛︎", "Ã":"◻︎",
    "Ä":"◻︎", "Å":"◻︎", "Æ":"◻︎", "Ç":"◻︎", "È":"◻︎",
    "É":"◻︎", "Ê":"◻︎", "Ë":"◻︎", "Ì":"◻︎", "Í":"◻︎",
    "Î":"◻︎", "Ï":"◻︎", "Ð":"◻︎", "Ñ":"◻︎", "Ò":"◻︎",
    "Ó":"◻︎", "Ô":"◻︎", "Õ":"⌫︎", "Ö":"⌦︎", "×":"◻︎",
    "Ø":"➢︎", "Ù":"◻︎", "Ú":"◻︎", "Û":"◻︎", "Ü":"➲︎",
    "Ý":"◻︎", "Þ":"◻︎", "ß":"◻︎", "à":"◻︎", "á":"◻︎",
    "â":"◻︎", "ã":"◻︎", "ä":"◻︎", "å":"◻︎", "æ":"◻︎",
    "ç":"◻︎", "è":"➔︎", "é":"◻︎", "ê":"◻︎", "ë":"◻︎",
    "ì":"◻︎", "í":"◻︎", "î":"◻︎", "ï":"⇦︎", "ð":"⇨︎",
    "ñ":"⇧︎", "ò":"⇩︎", "ó":"⬄︎", "ô":"⇳︎", "õ":"⬀︎",
    "ö":"⬁︎", "÷":"⬃︎", "ø":"⬂︎", "ù":"▭︎", "ú":"▫︎",
    "û":"✗︎", "ü":"✓︎", "ý":"☒︎", "þ":"☑︎", "ÿ":"◻︎"
};

function updateCrazinessLevel() {
    const crazinessLevel = document.getElementById('crazinessLevel').value;
    document.getElementById('crazinessLevelValue').textContent = crazinessLevel;
    document.getElementById('crazinessLevelProgress').style.width = `${crazinessLevel * 10}%`;
    document.getElementById('crazinessLevelProgress').setAttribute('aria-valuenow', crazinessLevel);
    document.getElementById('crazinessLevelProgress').style.transition = 'width 0.5s ease-in-out';
    document.getElementById('crazinessLevelProgress').style.background = `linear-gradient(to right, rgba(13, 110, 253, ${crazinessLevel / 10}), rgba(255, 0, 0, ${crazinessLevel / 10}))`;
    convertText();
}

function textToZalgo(text, level = 0) {
    const zalgoMap = {
        high: ['̍', '̎', '̄', '̅', '̇', '̈', '̊', '̋', '̌', '̀', '́'],
        low: ['̘', '̙', '̚', '̛', '̜', '̝', '̞', '̟', '̠', '͈', '͉'],
        mid: ['͉', '͍', '͎', '͏', '͐', '͑', '͒', '͓', '͔', '͕']
    };

    const chars = text.split('');
    return chars.map(char => {
        let zalgoChar = char;
        const num = Math.floor(Math.random() * level);
        const maps = [zalgoMap.high, zalgoMap.mid, zalgoMap.low];
        for (let i = 0; i < num; i++) {
            const zalgoSet = maps[Math.floor(Math.random() * 3)];
            zalgoChar += zalgoSet[Math.floor(Math.random() * zalgoSet.length)];
        }
        return zalgoChar;
    }).join('');
}

document.querySelector(".buy-me-coffee-button").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#bmc-wbtn").click(); 
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