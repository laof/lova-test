// const exec = require('child_process').exec;
const ts = require('gulp-typescript');
const tsp = ts.createProject('tsconfig.json');

const gulp = require('gulp');

const PATHS = {
    scripts: ['./src/**/*.ts'],
    output: './dist',
};

gulp.task('build-ts', () => {
    return gulp.src(['./**/*.ts', '!./src/backup/**/*.*', '!./node_modules/**/*.*', '!./gulpfile.ts'])
        .pipe(tsp())
        .pipe(gulp.dest(PATHS.output));
});


gulp.task('webapp', () => {

    return gulp.src('webapp/**/*').pipe(gulp.dest(PATHS.output + '/webapp'));
})

gulp.task('views', () => {

    return gulp.src('src/views/**/*').pipe(gulp.dest(PATHS.output + '/src/views'))

})

// gulp.task('templates', () => {
//     gulp.src(['./dist/src/app.config.js'])
//         .pipe(gulpReplace('SRC', 'DIST'))
//         .pipe(gulp.dest('./dist/src/app.config.js'));
// });

// gulp.task('backup', () => {

//     return gulp.src('src/backup/**/*').pipe(gulp.dest(PATHS.output + '/backup'))

// })

import * as fs from 'fs';

gulp.task('default', ['build-ts', 'webapp', 'views'], () => {

    let fileName = __dirname + '/dist/src/app.config.js';

    let text = fs.readFileSync(fileName, { encoding: 'utf8' });

    let replase = text.replace('SRC', 'DIST');

    fs.writeFileSync(fileName, replase);
    console.log('gulp end....');

});
