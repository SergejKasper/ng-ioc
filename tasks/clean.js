module.exports = (gulp, dirs) => () => {
  const del = require('del');
  const path = require('path');

  return del(dirs.map((dir)=>{
    return [path.join(dir, '**', '*.js'),
    '!' + path.join(dir, '*.conf.js'),
    path.join(dir, '**', '*.js.map')]
  }).reduce((dirPrev, dirNext)=>{
    return dirPrev.concat(dirNext)
  }),function(err, deletedFiles) {
    if(deletedFiles.length) {
      util.log('Deleted', util.colors.red(deletedFiles.join(' ,')) );
    } else {
      util.log(util.colors.yellow('/dist directory empty - nothing to delete'));
    }
  });
};
