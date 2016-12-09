/**
 * Page title.
 *
 * @returns {{title: title, setTitle: setTitle}}
 * @constructor
 */
function Page() {
    var title = 'Book Shop';
    var newTitle;
    return {
        setTitle: function (pageTitle) {
            newTitle = pageTitle ;
        },
        title: function () {
            return title + newTitle;
        }
    };
}

angular
    .module("app")
    .factory("Page", Page);
