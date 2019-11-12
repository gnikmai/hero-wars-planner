// Define variables.
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var imagemin     = require('gulp-imagemin');
var notify       = require('gulp-notify');
var postcss      = require('gulp-postcss');
var run          = require('gulp-run');
var runSequence  = require('run-sequence');
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');

var paths        = require('./_assets/gulp_config/paths');


/*
 * @task: gulp - default task, serve the site in a dev environment.
 * @task: gulp build - build process for prod environment, all assets minified.
 * @task: gulp clean - remove all expendable files (/assets/ and /_site/).
 */

/*
 * Handle SCSS styles
 */

// Production build
// Process styles, add vendor prefixes, minify, output to the appropriate location.
gulp.task('build:styles', function() {
    return sass(paths.sassFiles + '/main.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    })
      .pipe(postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] })]) )
      .pipe(cleancss())
      .pipe(gulp.dest(paths.jekyllCssFiles))
      .pipe(gulp.dest(paths.siteCssFiles))
      .on('error', gutil.log);
});

// Local build
// Process styles with line numbers, add vendor prefixes, output to the appropriate location.
gulp.task('build:styles:local', function() {
    return sass(paths.sassFiles + '/main.scss', {
        style: 'expanded',
        lineNumbers: true,
        container: 'gulp-ruby-sass',
        trace: true,
        loadPath: [paths.sassFiles]
    })
      .pipe(postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] })]) )
      .pipe(gulp.dest(paths.jekyllCssFiles))
      .pipe(gulp.dest(paths.siteCssFiles))
      .pipe(browserSync.stream())
      .on('error', gutil.log);
});


/*
 * Handle scripts
 */

// Concatenate library scripts, uglify, output to the appropriate location.
// include jQuery first
gulp.task('build:scripts', function() {
    return gulp.src([paths.jsFiles + '/lib/jquery-3.3.1.min.js', paths.jsFilesGlob])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles))
        .on('error', gutil.log);
});

gulp.task('build:scripts:local', function() {
    return gulp.src(paths.jsFilesGlob)
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .pipe(gulp.dest(paths.siteJsFiles))
        .on('error', gutil.log);
});


/*
 * Handle images
 */

// Optimize and copy image files to the appropriate location.
gulp.task('build:images', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

gulp.task('build:images:local', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});


/*
 * Handle font files
 */

// Copy font  files to the appropriate location.
gulp.task('build:fonts', function() {
    return gulp.src(paths.fontFiles + '/*/**.*')
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});


/*
 * Handle video files
 */
gulp.task('build:videos', function() {
    return gulp.src(paths.videoFilesGlob)
        .pipe(gulp.dest(paths.jekyllVideoFiles))
        .pipe(gulp.dest(paths.siteVideoFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

/*
 * Handle pdf files
 */
gulp.task('build:pdf', function() {
    return gulp.src(paths.pdfFilesGlob)
        .pipe(gulp.dest(paths.jekyllPdfFiles))
        .pipe(gulp.dest(paths.sitePdfFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});


/*
 * Clean task
 */

gulp.task('clean', function(callback) {
    del(['_site', 'assets']);
    callback();
});


/*
 * Build task
 */

// Runs jekyll build command.
gulp.task('build:jekyll', function() {
    return gulp.src('')
        .pipe(run('bundle exec jekyll build --config _config.yml'))
        .on('error', gutil.log);
});

// Runs jekyll build command using local config.
gulp.task('build:jekyll:local', function() {
    return gulp.src('')
        .pipe(run('bundle exec jekyll build --config _config.yml,_config.dev.yml'))
        .on('error', gutil.log);
});

// Builds site anew using local config.
gulp.task('build:local', function(callback) {
    runSequence(
        'clean',
        'build:jekyll:local',
        ['build:scripts:local', 
        'build:images:local', 
        'build:styles:local', 
        'build:fonts',
        'build:videos',
        'build:pdf'],
        callback);
});

// Special tasks for building and then reloading BrowserSync.
gulp.task('build:jekyll:watch', ['build:jekyll:local'], function(callback) {
    browserSync.reload();
    callback();
});

gulp.task('build:scripts:watch', ['build:scripts:local'], function(callback) {
    browserSync.reload();
    callback();
});



// Production build with minified assets
gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'build:jekyll',
        ['build:scripts', 
        'build:images', 
        'build:styles', 
        'build:fonts',
        'build:videos',
        'build:pdf'],
        callback);
});

// Static Server + watching files.
// Note: passing anything besides hard-coded literal paths with globs doesn't
// seem to work with gulp.watch().
gulp.task('default', ['build:local'], function() {

    browserSync.init({
        server: paths.siteDir,
        ghostMode: true, // Toggle to mirror clicks, reloads etc. (performance)
        logFileChanges: true,
        open: true        // Toggle to automatically open page when starting.
    });

    // Watch site settings.
    gulp.watch(['_config.yml', '_config.dev.yml'], ['build:jekyll:watch']);

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch('_assets/sass/**/*.scss', ['build:styles:local']);

    // Watch .js files.
    gulp.watch('_assets/js/**/*.js', ['build:scripts:watch']);

    // Watch html and markdown files.
    gulp.watch(['**/*.+(html|md|markdown|MD|json)', '!_site/**/*.*'], ['build:jekyll:watch']);

    // Watch data files.
    gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);
});

// Updates Ruby gems
gulp.task('bundler', function() {
    return gulp.src('')
        .pipe(run('bundle install'))
        .pipe(run('bundle update'))
        .pipe(notify({ message: 'Bundle Update Complete' }))
        .on('error', gutil.log);
});