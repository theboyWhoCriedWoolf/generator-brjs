'use strict';

var gulp        = require('gulp');  
var open        = require('open');
var wiredep     = require('wiredep').stream;
var browserSync = require('browser-sync');
var $           = require('gulp-load-plugins')();
var connect     = require('gulp-connect' );
var htmlhint    = require("gulp-htmlhint");


/***************
 * SETTINGS
 ***************/
 
 var props = {
    baseDir     : './app',
    dist        : './dist',
    // styles
    styles  : {
        root    : './app/styles',
        file    : './app/styles/application.scss',
        css     : './app/styles/*.css',
        scss    : './app/styles/*.scss',
        folder  : '.app/styles/**/*.scss'
    },
    // html
    html : {
        index       : './app/*.html',
        templates   : './app/templates/**/*.html',
        all         : './app/**/*.html'
    },
    // scripts
    scripts : {
        app : './app/scripts/**/*.js',
        vendor : './app/bower_components'
    }
 }


/***************
 * WATCH TASKS
 ***************/


gulp.task('sass', function() {
    return gulp.src( props.styles.file )
        .pipe($.compass({
            sass    : props.styles.root,
            css     : props.styles.root,
            require : 'breakpoint'
        }))
        .pipe(gulp.dest( props.styles.root ))
       <% if (!useBrowserSync) { %>  .pipe(connect.reload()) <% } %>;
});

gulp.task('lint', function() {
    return gulp.src( props.scripts.app )
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
         <% if (!useBrowserSync) { %>  .pipe(connect.reload()) <% } %>;
});

gulp.task('htmlLint', function() {
    return gulp.src( props.html.templates )
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    <% if (!useBrowserSync) { %>  .pipe(connect.reload()) <% } %>;
});

gulp.task('browser-sync', function() {  
    browserSync.init([ props.styles.css , props.scripts.app, props.html.all ], {
        server: {
            baseDir: props.baseDir,
        },
        debugInfo       : true,
        injectChanges   : true, //FALSE - Full page reload 
        ghostMode: {
            clicks: true,
            links: false,
            forms: true,
            scroll: false
        }
    });
});

// Inject Bower components
gulp.task('wiredep', function () {
    gulp.src( props.styles.scss )
        .pipe(wiredep({
            directory   : props.scripts.vendor,
            ignorePath  : props.scripts.vendor
        }))
        .pipe(gulp.dest( props.styles.root ));

    gulp.src( props.html.index )
        .pipe(wiredep({
            directory: props.scripts.vendor,
            ignorePath: props.baseDir
        }))
        .pipe(gulp.dest( props.baseDir ));
});


// ********************


/************
 * SERVER
 ************/

// Connect
gulp.task( 'connect', connect.server({
    root: ['app'],
    port: 9000,
    <% if (!useBrowserSync) { %>  livereload: true <% } %>
}));

<% if (useBrowserSync) { %> 
    gulp.task( 'serve', [ 'watch' ] );
<% } else { %>
    gulp.task( 'serve', [ 'connect', 'watch' ], function() { open("http://localhost:9000"); });
<% } %>

// ********************

gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['clean', 'html' ] );

/************
 * WATCH
 ************/

gulp.task('watch', [ 'sass', 'browser-sync' ], function () {  

    // Watch .scss files
    gulp.watch( props.styles.folder, ['sass']);

    // Watch .js files
    gulp.watch( props.scripts.app, [ 'lint' ]);

    // Watch html files
    gulp.watch( [ props.html.all ], [ 'htmlLint' ]);

    // Watch bower files
    gulp.watch('bower.json', ['wiredep']);
});



