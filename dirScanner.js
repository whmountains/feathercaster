var fs     = require('fs');
var d      = require('debug')('dirScanner');
var _      = require('lodash');
var fpcalc = require('fpcalc');
var path   = require('path');
var async  = require('async');

// var uuid = function(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b}

var scanDir = module.exports = function(dir, callback) {
  fs.readdir(dir, function(err, files) {

    if (err) {
      callback('Error scanning ' + dir + ': ' + err);
      return;
    }

    async.map(files, function(fileName, callback) {

      var filePath = path.join(dir, fileName);

      fs.lstat(filePath, function(err, stat) {

        if (err) {
          callback('Error stating ' + filePath + ': ' + err);
          return;
        }

        if (stat.isFile()) {
          fpcalc(filePath, function(err, print) {

            if (err) {
              //silently ignore errors probably caused by non-audio files
              callback(null, null);
              return;
            }

            callback(null, {
              kind: 'audio',
              path: filePath,
              fingerprint: print.fingerprint,
              duration: print.duration
            });

          });
        }

        else if (stat.isDirectory()) {
          scanDir(filePath, function(err, files) {

            if (err) {
              callback('error scanning directory: ' + err);
              return;
            }

            callback(null, {
              kind: 'directory',
              path: filePath,
              contents: files
            });

          });
        }

        else callback(null, null);

      });

    }, function(err, dirtyFiles) {

      if (err) {
        callback('error analyzing contents of directory: ' + err);
        return;
      }

      var cleanFiles = _.compact(dirtyFiles);
      callback(null, cleanFiles);

    });

  });
};
