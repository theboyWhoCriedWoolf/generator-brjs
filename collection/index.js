'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var CollectionGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the collection subgenerator with the argument ' + this.name + '.');
  },

  files: function () {
    this.template('someCollection.js', 'app/scripts/src/collections/' + this.name + '.js' );
  }
});

module.exports = CollectionGenerator;