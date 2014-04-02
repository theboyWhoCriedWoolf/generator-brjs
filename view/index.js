'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ViewGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the view subgenerator with the argument ' + this.name + '.');
  },

  files: function () {
    this.template('someView.js', 'app/scripts/src/views/' + this.name + '.js' );
  }
});

module.exports = ViewGenerator;