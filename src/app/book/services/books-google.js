(function() {
    angular
        .module("bookShop")
        .factory("BooksGoogle", BooksGoogle);

    function BooksGoogle($http, Books) {
        return {
            getListGoogle: getListGoogle,
            addBook: addBook,
            addAllBooks: addAllBooks

        }
        var checkDate = checkDate;

        function getListGoogle(toFind) {
            var googleList = [];
            $http.get("https://www.googleapis.com/books/v1/volumes?q=" + toFind)

            .then(function(response) {


                _.forEach(response.data.items, function(element) {
                    var price = Math.floor((Math.random() * 50) + 9);

                    if (isBook(element.volumeInfo.authors, element.volumeInfo.categories,element.volumeInfo.description, element.volumeInfo.publishedDate)) {
                        googleList.push({
                            name: element.volumeInfo.title,
                            author: element.volumeInfo.authors[0],
                            description: element.volumeInfo.description,
                            category: element.volumeInfo.categories[0],
                            picture: element.volumeInfo.imageLinks.smallThumbnail,
                            releaseDate: element.volumeInfo.publishedDate,
                            price: price
                        });
                    }
                });

            });
            return googleList;
        }

        function addBook(bookData) {

            Books.create(bookData);

        }

        function addAllBooks(googleList) {
            _.forEach(googleList, function(element) {
                Books.create(element);
            });
        }

        function isBook(authors, categories, description, date) {
            if (authors && categories && description && checkDate(date)) {
                return true;
            }
            return false;
        }

        function checkDate(dateToCheck) {
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            return dateToCheck.match(regEx) !== null;

        }



    }

}());
