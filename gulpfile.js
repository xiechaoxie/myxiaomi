let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let uglify = require("gulp-uglify");
let babel = require("gulp-babel");

gulp.task("copyall", async() => {
    // 压缩html
    gulp.watch("./*.html", async() => {
        gulp.src("./*.html")
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest("D:\\phpStudy\\WWW\\myxiaomi"));
    });

    // 压缩js
    gulp.watch(["./js/*.js", "!./src/js/jquery-3.2.1.min.js"], async() => {
        gulp.src("./js/*.js")
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(gulp.dest("D:\\phpStudy\\WWW\\myxiaomi\\js"));
    });

    // 把php文件夹里的所有代码原封不动的复制到服务器目录下
    gulp.watch("./php2/**/*", async() => {
        gulp.src("./php2/**/*")
            .pipe(gulp.dest("D:\\phpStudy\\WWW\\myxiaomi\\php2"));
    });

    gulp.watch("./*.php", async() => {
        gulp.src("./*.php")
            .pipe(gulp.dest("D:\\phpStudy\\WWW\\myxiaomi"));
    });

    gulp.watch("./css/**/*", async() => {
        gulp.src("./css/**/*")
            .pipe(gulp.dest("D:\\phpStudy\\WWW\\myxiaomi\\css"));
    });

    gulp.watch("./icon/**/*", async() => {
        gulp.src("./icon/**/*")
            .pipe(gulp.dest("D:\\phpStudy\\WWW\\myxiaomi\\icon"));
    });

    gulp.watch("./images/**/*", async() => {
        gulp.src("./images/**/*")
            .pipe(gulp.dest("D:\\phpStudy\\WWW\\myxiaomi\\images"));
    });

});