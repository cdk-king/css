document.getElementById('content3Submit').addEventListener('click', function() {
    document.getElementById("iframeResult2").contentWindow.document.open();
    document.getElementById("iframeResult2").contentWindow.document.write(document.getElementById('textareaCode2').value);
    document.getElementById("iframeResult2").contentWindow.document.close();
});