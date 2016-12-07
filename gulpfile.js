var gulp = require('gulp');
var del = require("del");
var argv = require("yargs");
var rename = require("gulp-rename");
var slash = require("gulp-slash");
var sass = require("gulp-sass");
var cssmin = require("gulp-cssmin");
var sourcemaps = require("gulp-sourcemaps");
var minifyHtml = require("gulp-minify-html");
var ngTemplates = require("gulp-ng-templates");
var wrap = require("gulp-wrap");
var concat = require("gulp-concat");
var ngAnnotate = require("gulp-ng-annotate");
var uglify = require("gulp-uglify");
var jshint = require("gulp-jshint");

/**
 * Build directory.
 */

var BUILD_DIRECTORY = (argv.argv.d || ".") + "/build";

/**
 * Config.
 */
var CONFIG = {
    sass: {
        src: "src/assets/scss/app.scss",
        watch: "src/assets/scss/**/*.scss",
        compiled: "app.css",
        dest: BUILD_DIRECTORY + "/assets/css"

    },
    js: {
        frameworks: {
            src: [
                "bower_components/jquery/dist/jquery.js",
                "bower_components/angular/angular.js",
                "bower_components/angular-ui-router/release/angular-ui-router.js",
                "bower_components/lodash/dist/lodash.js",
                "bower_components/sifter/sifter.min.js",
                "bower_components/microplugin/src/microplugin.js",
                "bower_components/angular-selectize2/dist/angular-selectize.js",
                "bower_components/selectize/dist/js/standalone/selectize.min.js",
                "bower_components/cookies-js/dist/cookies.js",
                "bower_components/angular-filter/dist/angular-filter.min.js",
                "bower_components/url-to/url-to.js",
                "bower_components/angular-loading-bar/build/loading-bar.js",
                "bower_components/angularUtils-pagination/dirPagination.js"
            ],
            compiled: "frameworks.js"
        },
        app: {
            src: [
                "src/app/app.js",
                "src/app/app-controller.js",
                "src/app/page-title.js",
                "src/app/authentication/auth.js",
                "src/app/book/bookShop.js",
                "src/app/book/services/pager.js",
                "src/app/book/controllers/manage-books-controller.js",
                "src/app/book/controllers/add-edit-controller.js",
                "src/app/book/controllers/find-google-controller.js",
                "src/app/book/controllers/manage-books-controller.js",
                "src/app/book/controllers/book-details-controller.js",
                "src/app/book/controllers/search-books-controller.js",
                "src/app/book/controllers/book-list-controller.js",
                "src/app/authentication/controllers/login-controller.js",
                "src/app/authentication/controllers/update-password-controller.js",
                "src/app/authentication/controllers/forgot-password-controller.js",
                "src/app/authentication/controllers/reset-password-controller.js",
                "src/app/authentication/controllers/account-editor.js",
                "src/app/authentication/controllers/logout-controller.js",
                "src/app/authentication/controllers/sign-up-controller.js",
                "src/app/book/filters/shorten-text.js",
                "src/app/book/services/books-google.js",
                "src/app/book/services/books.js",
                "src/app/authentication/services/authentication.js",
                "src/app/authentication/services/session.js",
                "src/app/authentication/services/account.js",
                "src/app/authentication/services/auth-interceptor.js",
                "src/app/authentication/services/auth-guard.js",
                "src/app/authentication/services/admin-guard.js",
                "src/app/authentication/constants/auth-events.js",
                "src/app/authentication/constants/account-events.js",
                "src/app/authentication/constants/account-api-urls.js",
                "src/app/book/constants/books-api-urls.js",
                "src/app/authentication/constants/auth-api-urls.js",
                "src/app/authentication/directives/show-only-for-admins.js",
                "src/app/authentication/directives/password-confirmation.js",
                "src/app/layout/layout.js",
                "src/app/book/sidebar/directives/sidebar.js",
                "src/app/layout/controllers/main-controller.js"
            ],
            compiled: "app.js"
        },
        templates: {
            src: "src/app/**/*.html",
            options: {
                base: "src"
            },
            compiled: "templates.js"
        },
        dest: BUILD_DIRECTORY + "/assets/js"
    },
    lint: {
        src: [
            "gulpfile.js",
            "src/app/**/*.js"
        ]
    },
    assets: {
        src: [
            "src/assets/img/**/*",
            "src/assets/fonts/**/*"
        ],
        options: {
            base: "src/assets"
        },
        dest: BUILD_DIRECTORY + "/assets"
    }
};


/**
 * Uglify a JS file.
 *
 * @param directory
 * @param filename
 * @returns {*}
 */
function uglifyJs(directory, filename) {
    return gulp.src(directory + "/" + filename)
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(CONFIG.js.dest));
}

/**
 * Build app.css.
 */
gulp.task("buildAppCss", function() {
    return gulp.src(CONFIG.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest(CONFIG.sass.dest));
});

/**
 * Build app.min.css.
 */
gulp.task("minifyAppCss", ["buildAppCss"], function() {
    return gulp.src(CONFIG.sass.dest + "/" + CONFIG.sass.compiled)
        .pipe(cssmin())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(CONFIG.sass.dest));
});

/**
 * Build frameworks.js.
 */
gulp.task("buildFrameworksJs", function() {
    return gulp.src(CONFIG.js.frameworks.src)
        .pipe(concat(CONFIG.js.frameworks.compiled))
        .pipe(gulp.dest(CONFIG.js.dest));
});

/**
 * Build frameworks.min.js.
 */
gulp.task("minifyFrameworksJs", ["buildFrameworksJs"], function() {
    return uglifyJs(CONFIG.js.dest, CONFIG.js.frameworks.compiled);
});

/**
 * Build templates.js.
 */
gulp.task("buildTemplatesJs", function() {
    function renamePath(path, base) {
        path = slash(path);
        base = slash(base);        

        var dirName = slash(__dirname);
        return path.replace(dirName + "/" + base + "/", "");
    }

    return gulp.src(CONFIG.js.templates.src, CONFIG.js.templates.options)
        .pipe(minifyHtml({
            empty: true,
            quotes: true
        }))
        .pipe(ngTemplates({
            standalone: true,
            module: "templates",
            path: renamePath
        }))
        .pipe(wrap("(function(window, angular, undefined) {\n\n\"use strict\";\n\n<%= contents %>\n})(window, angular);"))
        .pipe(concat(CONFIG.js.templates.compiled))
        .pipe(gulp.dest(CONFIG.js.dest));

});

/**
 * Build templates.min.js.
 */
gulp.task("minifyTemplatesJs", ["buildTemplatesJs"], function() {
    return uglifyJs(CONFIG.js.dest, CONFIG.js.templates.compiled);
});

/**
 * Build app.js.
 */
gulp.task("buildAppJs", function() {
    return gulp.src(CONFIG.js.app.src)
        .pipe(wrap("(function(window, angular, undefined) {\n\n\"use strict\";\n\n<%= contents %>\n})(window, angular);"))
        .pipe(concat(CONFIG.js.app.compiled))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(CONFIG.js.dest));
});

/**
 * Build app.min.js.
 */
gulp.task("minifyAppJs", ["buildAppJs"], function() {
    return uglifyJs(CONFIG.js.dest, CONFIG.js.app.compiled);
});

/**
 * Copy index.html.
 */
gulp.task("copyIndexHtml", function() {
    gulp.src("src/index.html")
        .pipe(gulp.dest(BUILD_DIRECTORY));
});

/**
 * Copy assets.
 */
gulp.task("copyAssets", function() {
    gulp.src(CONFIG.assets.src, CONFIG.assets.options)
        .pipe(gulp.dest(CONFIG.assets.dest));
});

/**
 * Clean the build folder.
 */
gulp.task("clean", function() {
    del(BUILD_DIRECTORY + "/**/*");
});


/**
 * Default.
 */
gulp.task("default", ["buildAppCss", "buildFrameworksJs", "buildTemplatesJs", "buildAppJs", "copyIndexHtml", "copyAssets"]);

/**
 * Build.
 */
gulp.task("build", ["default", "minifyAppCss", "minifyFrameworksJs", "minifyTemplatesJs", "minifyAppJs"]);

/**
 * Lint.
 */
gulp.task("lint", function() {
    return gulp.src(CONFIG.lint.src)
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

/**
 * Watch.
 */
gulp.task("watch", function() {
    gulp.watch("src/index.html", ["copyIndexHtml"]);
    gulp.watch(CONFIG.assets.src, ["copyAssets"]);
    gulp.watch(CONFIG.sass.watch, ["buildAppCss"]);
    gulp.watch(CONFIG.js.templates.src, ["buildTemplatesJs"]);
    gulp.watch(CONFIG.js.app.src, ["buildAppJs"]);
});
