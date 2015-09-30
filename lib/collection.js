var _ = require('lodash');
var Path = require('path');
var FS = require('fs');

var Collection = module.exports = function(opts) {
  var self = this;
  self.options = _.extend({}, opts);
  self.options.outputFile = self.options.outputFile ||
      Path.join(self.options.staticDirectory, self.options.outputDirectory, self.options.name + '.' + self.options.type)
  self.options.files = self.options.files.map(function(filename) {
    return Path.join(self.options.staticDirectory, self.options.inputDirectory, filename);
  });
}

Collection.prototype.compile = function() {
  var self = this;
  var concat = this.options.files.map(function(filename) {
    return FS.readFileSync(filename);
  }).join('\n');
  FS.writeFileSync(this.options.outputFile, concat);
}

Collection.prototype.render = function() {
  var self = this;
  var filename = Path.join('/', self.options.inputDirectory, self.options.name + '.' + self.options.type);
  if (self.options.type === 'js') {
    return '<script type="text/javascript" src="' + filename + '"></script>';
  } else if (self.options.type === 'css') {
    return '<link rel="stylesheet" type="text/css" href="' + filename + '">';
  }
}