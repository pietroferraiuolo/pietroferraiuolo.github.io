document.addEventListener('DOMContentLoaded', function () {
    const copyEmailButton = document.getElementById('copyEmailButton');
    const emailLink = document.getElementById('emailLink');

    copyEmailButton.addEventListener('click', function () {
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
