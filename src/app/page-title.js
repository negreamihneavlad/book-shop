/**
 * Page title.
 *
 * @returns {{title: title, setTitle: setTitle}}
 * @constructor
 */
function Page() {
    var title;
    return {
        setTitle: function (newTitle) {
            title = newTitle;
        },
        title: function () {
            return title;
        }
    };
}

angular
    .module("app")
    .factory("Page", Page);
