module.exports = (gulp, conf) => () => {
  const path = require('path');
  const typeDoc = require('gulp-typedoc');
  const tsConfig = conf.tsConfig;
  const compilerOptions = tsConfig.compilerOptions;

  delete compilerOptions.sourceMap;
  compilerOptions.out = conf.docsDir;
  compilerOptions.name = conf.packageJson.name;
  compilerOptions.mode = 'file';

  return gulp
    .src(conf.ts.src)
    .pipe(typeDoc(compilerOptions));
};
