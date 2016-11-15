function shortenText() {
    return function(text, customNrLetters) {
        var nrLetters = customNrLetters || 15;

        if (text.length > nrLetters) {
            return text.slice(0, nrLetters) + '...';
        }
        return text;
    };
}
angular
    .module("bookShop")
    .filter("shortenText", shortenText);
