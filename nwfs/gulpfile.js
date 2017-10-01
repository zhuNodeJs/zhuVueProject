
/**
 * gulp settings
 */

var gulp = require('gulp'),
    sass = require("gulp-sass"),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    cheerio = require('gulp-cheerio'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    htmlmin = require('gulp-htmlmin'),
    minimist = require('minimist');

console.log(
    '\n\n************************************************\n\n'
    +'命令说明：\n\n'
    +'gulp: 开发阶段编译sass，监控文件修改自动刷新页面；\n\n'
    +'gulp build --path ***: "***"表示正在开发的项目名称： 压缩、合并、混淆css、js，到public文件夹中;\n\n'
    +'gulp publicServe:打开浏览器执行public文件夹代码;\n\n'
    +'************************************************\n'
);
//根据参数设置项目文件夹
var knownOptions = {
    string: 'path'
};
var options = minimist(process.argv.slice(2), knownOptions);
var projectName = options.path?options.path:'nwfs_01';
console.log('当前选择的项目文件夹是：'+projectName+'\n\n######################\n\n');

//合并后的css文件和ionic的css文件
var commendCssFile = [
    './lib/ionic/css/ionic.min.css',
    './stylesheets/style.min.css'
];
//合并后的js文件和框架自带的js文件
var commendJsFile = [
    './lib/ionic/js/ionic.bundle.min.js',
    './lib/config.js',
    './js/main.min.js'
];

//组合出合并压缩后的js,css文件的引用标签
var packFn = function(arr,type){
    var linkTemplate = function(path){
        return '<link rel="stylesheet" href="'+path+'">'
    };

    var jsTemplate = function(path){
        return '<script type="text/javascript" src="'+path+'"></script>'
    };
    var str = '';
    arr.forEach(function(item){
        if(type == 'js'){
            str += jsTemplate(item);
        } else if(type == 'css'){
            str += linkTemplate(item);
        }
    });
    return str;
};

//语法检查
// gulp.task('jshint',function(){
//     return gulp.src('./js/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });
//将scss转化为css
gulp.task("sass", function () {
    return gulp.src(projectName+"/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest(projectName+"/stylesheets"));
});
//合并、压缩css文件
gulp.task('cssConcat',['sass'],function(){
    gulp.src(projectName+'/stylesheets/*.css')
        .pipe(concat('style.css'))
        //.pipe(gulp.dest('public/stylesheets'))
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/stylesheets'))
});

//合并、压缩js文件
gulp.task('jsConcat', function() {
    return gulp.src(projectName+'/js/**/*.js') //注意，此处特意如此，避免顺序导致的问题
        .pipe(concat('main.js'))
        //.pipe(gulp.dest('public/js'))
        .pipe(ngAnnotate())
        .pipe(uglify({outSourceMap: false}))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});


//复制项目文件夹中的views中的HTML到public文件夹中
gulp.task('copyViews',  function() {
    return gulp.src(projectName+'/views/**/*')
        .pipe(gulp.dest('public/views'));
});

//复制项目文件夹中index.html页面，清除多余的Link和script只保留合并后的css和js文件引用
gulp.task('indexHtml',function(){
    return gulp.src(projectName+'/index.html')
        .pipe(cheerio(function($){
            $('script').remove();
            $('link').remove();
            $('head').append(packFn(commendCssFile,'css'));
            $('body').append(packFn(commendJsFile,'js'));
        }))
        .pipe(gulp.dest('public'));

});
//压缩public文件夹中的index页面
gulp.task('indexmin',['indexHtml'], function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('public/index.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('public'));
});

//复制项目文件夹中的，图片，SVG文件到public文件夹中
gulp.task('copyImg',function(){
    return gulp.src([projectName+'/stylesheets/**/*','!'+projectName+'/stylesheets/*.css'])
        .pipe(gulp.dest('public/stylesheets'));

});
//复制项目文件夹中的lib文件夹到public文件夹中
gulp.task('copyLib',  function() {
    return gulp.src(projectName+'/lib/**/*')
        .pipe(gulp.dest('public/lib'));
});

//复制项目文件夹中的json文件夹里的storeDetailDescription.json到public文件夹中
gulp.task('copyJson',  function() {
    return gulp.src(projectName+'/json/storeDetailDescription.json')
        .pipe(gulp.dest('public/json'));
});

//监控项目文件夹下css,js,html文件修改，刷新浏览器
gulp.task('watch',function(){
    gulp.watch(projectName+'/scss/*.scss',['sass']).on('change',reload);
    gulp.watch(projectName+'/js/**/*.js').on('change',reload);
    gulp.watch(projectName+'/views/**/*.html').on('change',reload);
    gulp.watch(projectName+'/index.html').on('change',reload);
});


//开发阶段在在浏览器运行
gulp.task('serve',function(){
    browserSync.init({
        server:{
            baseDir:projectName+'/'
        },
        directory: true

    });
});

//在浏览器中运行public文件夹代码
gulp.task('publicServe',function(){
    browserSync.init({
        server:{
            baseDir:'public/',
            index:"public/index.html"
        },
        directory: true

    });
});

//默认任务：编译sass文件
gulp.task("default", ["watch","serve"], function () {
    console.log('默认任务执行完毕。。。');
});

//执行发布任务，压缩合并代码
gulp.task("build", ["cssConcat","jsConcat","copyViews","indexmin","copyImg","copyLib","publicServe","copyJson"], function () {
    console.log('public执行完毕。。。');
});




