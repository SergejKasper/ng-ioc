module.exports = (gulp, srcs, dist) => () => {
  const ts = require('typescript');
  const gulpts = require('gulp-typescript');
  const es = require('event-stream');
  const concat = require('gulp-concat');
  const sourcemaps = require('gulp-sourcemaps');

  srcs.forEach((src, i)=>{
    var tsStream = gulp.src(src);
    tsStream.pipe(sourcemaps.init()).pipe(gulpts({
        typescript: ts, // In my package.json I have "typescript": "~1.8.0-dev.20151128"
        target: 'ES5',
        module: 'amd',
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        sourceMap: true
    })).pipe(sourcemaps.write()).pipe(gulp.dest(dist[i]))
  })
};
