// Event listener for encode button
document.getElementById('encode-btn').addEventListener('click', function() {
    var text = document.getElementById('input-text').value;
    var key = document.getElementById('secret-key').value;
    var encrypted = CryptoJS.AES.encrypt(text, key).toString();
    document.getElementById('output-text').value = encrypted;
});

// Event listener for decode button
document.getElementById('decode-btn').addEventListener('click', function() {
    var encryptedText = document.getElementById('input-text').value;
    var key = document.getElementById('secret-key').value;
    var decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    document.getElementById('output-text').value = decrypted;
});

// Event listener for swap button
document.getElementById('swap-btn').addEventListener('click', function() {
    var inputText = document.getElementById('input-text').value;
    var outputText = document.getElementById('output-text').value;
    document.getElementById('input-text').value = outputText;
    document.getElementById('output-text').value = inputText;
});

// Event listener for generate key button
document.getElementById('generate-key-btn').addEventListener('click', function() {
    var randomKey = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
    document.getElementById('secret-key').value = randomKey;
});