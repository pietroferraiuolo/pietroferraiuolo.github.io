document.addEventListener('DOMContentLoaded', function () {
    const emailLink = document.getElementById('emailLink');

    emailLink.addEventListener('click', function (event) {
        event.preventDefault(); // Previene il comportamento di default del link
        const email = emailLink.textContent;
        copyTextToClipboard(email);
    });

    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(function () {
            console.log('Email copiata negli appunti: ', text);
        }).catch(function (err) {
            console.error('Errore durante la copia dell\'email: ', err);
        });
    }
});
