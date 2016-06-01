var gulp = require('gulp'),
    less = require('gulp-less');
var browserSync = require('browser-sync');


gulp.task('browser-sync', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('build-less', function(){
  gulp.src('./public/css/less/*.less')
    .pipe(less({ compress: true }))
    .on('error', function(e){console.log(e);} )
    .pipe(gulp.dest('./public/css'));

});

gulp.watch('./public/css/less/*.less', function(){
    gulp.run('build-less');
  });




gulp.task('default', ["build-less"]);



