document.addEventListener('DOMContentLoaded', function () {
    const emailLink = document.getElementById('emailLink');
    const copyMessage = document.getElementById('copyMessage');

    emailLink.addEventListener('click', function (event) {
        event.preventDefault(); // Previene il comportamento di default del link
        const email = emailLink.textContent;
        copyTextToClipboard(email);
    });

    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function () {
            console.log('Email copiata negli appunti: ', text);
            showCopyMessage();
        }).catch(function (err) {
            console.error('Errore durante la copia dell\'email: ', err);
        });
    }

    function showCopyMessage() {
        copyMessage.style.display = 'inline';
        setTimeout(function () {
            copyMessage.style.display = 'none';
        }, 2000); // Nasconde il messaggio dopo 2 secondi
    }
});
