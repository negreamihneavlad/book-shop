/**
 *
 * @param $http
 * @param Book
 * @returns {{getListGoogle: getListGoogle, addBook: addBook, addAllBooks: addAllBooks}}
 * @constructor
 * @ngInject
 */
function BooksGoogle($http, Book) {
    return {
        getListGoogle: getListGoogle,
        addBook: addBook,
        addAllBooks: addAllBooks
    };

    //////////////////////////////

    /**
     * Request to get books from Google API
     *
     * @param toFind
     * @returns {Array}
     */
    function getListGoogle(toFind) {
        var googleList = [];
        return $http.get("https://www.googleapis.com/books/v1/volumes?q=" + toFind)
            .then(function (response) {
                _.map(response.data.items, function (element) {
                    var price = (Math.random() * 50 + 9).toFixed(2);

                    if (isBook(element.volumeInfo.authors, element.volumeInfo.categories, element.volumeInfo.description, element.volumeInfo.publishedDate, element.volumeInfo.industryIdentifiers)) {
                        googleList.push({
                            name: element.volumeInfo.title,
                            author: element.volumeInfo.authors[0],
                            description: element.volumeInfo.description,
                            category: element.volumeInfo.categories[0],
                            picture: element.volumeInfo.imageLinks.smallThumbnail,
                            releaseDate: element.volumeInfo.publishedDate,
                            price: price,
                            publisher: element.volumeInfo.publisher,
                            isbn: element.volumeInfo.industryIdentifiers[1].type + ' ' + element.volumeInfo.industryIdentifiers[1].identifier,
                            pages: element.volumeInfo.pageCount
                        });
                    }
                });
                return googleList;
            });
    }

    /**
     * Add book to DB
     *
     * @param bookData
     */
    function addBook(bookData) {
        Book.create(bookData);
    }

    /**
     * Add all books to DB
     *
     * @param googleList
     */
    function addAllBooks(googleList) {
        _.forEach(googleList, function (element) {
            Book.create(element);
        });
    }

    /**
     * Check if all informations about book exists
     *
     * @param authors
     * @param categories
     * @param description
     * @param date
     * @param isbn
     * @returns {boolean}
     */
    function isBook(authors, categories, description, date, isbn) {
        if (authors && categories && description && checkDate(date) && isbn) {
            return true;
        }
        return false;
    }

    /**
     * Check if date has requested format
     *
     * @param dateToCheck
     * @returns {boolean}
     */
    function checkDate(dateToCheck) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        return dateToCheck.match(regEx) !== null;
    }
}

angular
    .module("bookShop")
    .factory("BooksGoogle", BooksGoogle);
