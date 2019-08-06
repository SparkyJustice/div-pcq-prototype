// Check for `node_modules` folder and warn if missing
var fs = require('fs');
var log4js = require('log4js'),
logger = log4js.getLogger();

if (!fs.existsSync(__dirname + '/node_modules')) {
  logger.error('ERROR: Node module folder missing. Try running `npm install`');
  process.exit(0);
}

// remove .port.tmp if it exists  
try {
  if (fs.existsSync(__dirname + '/.port.tmp')) {
    fs.unlinkSync(__dirname + '/.port.tmp');
  }
} catch(e){
  logger.error(e);
}

var gruntfile = __dirname + '/Gruntfile.js';

require(__dirname + '/node_modules/grunt/lib/grunt.js').cli({
  'gruntfile' : gruntfile
});

process.on('SIGINT', function() {

  // remove .port.tmp if it exists  
  try {
    if (fs.existsSync(__dirname + '/.port.tmp')) {
      fs.unlinkSync(__dirname + '/.port.tmp');
    }
  } catch(e){
    logger.error(e);
  }

  process.exit(0);

});
