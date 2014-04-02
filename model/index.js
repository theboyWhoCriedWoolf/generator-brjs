'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ModelGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the model subgenerator with the argument ' + this.name + '.');
  },

  files: function () {
    this.template('someModel.js', 'app/scripts/src/models/' + this.name + '.js' );
  }
});

module.exports = ModelGenerator;