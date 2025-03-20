(function (navigator) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
}(window.navigator));