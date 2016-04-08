module.exports = (gulp) => () => {
  git = require('gulp-git'),
  bump = require('gulp-bump'),
  inquirer = require('inquirer');
  var questions = [
    {
      type: 'input',
      name: 'bump',
      message: 'Are you sure you want to bump the patch version? [Y/N]'
    }
  ];

  inquirer.prompt( questions, function( answers ) {
    if(answers.bump === 'Y') {

      return gulp.src(['./package.json', './bower.json'])
          .pipe(bump({type: 'patch'}))
          .pipe(gulp.dest('./'))
          .pipe(git.commit('bump patch version'))
          .pipe(filter('package.json'))  // read package.json for the new version
          .pipe(tagVersion());           // create tag

    }
  });
};
