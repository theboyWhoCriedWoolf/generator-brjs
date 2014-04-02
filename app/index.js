'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var RequireBackboneGenerator = yeoman.generators.Base.extend({
  
  init: function () 
  {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
      this.spawnCommand('gulp', ['serve']);
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic RequireBackbone generator.'));

    var prompts = [{
        type    : 'input',
        name    : 'applicationName',
        message : 'What would you like to name your awesome app?',
        default : 'BackboneApp'
     },{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: false
      },{
        name: 'Sass with Compass',
        value: 'includeCompass',
        checked: true
      },{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      }, {
        name: 'use BrowserSync',
        value: 'useBrowserSync',
        checked: true
      }]
    }];

    this.prompt(prompts, function (props) {

      var features = props.features;
      function hasFeature(feat) { return features.indexOf(feat) !== -1; }

      // manually deal with the response, get back and store the results.
      // we change a bit thishis way of doing to automatically do this in the self.prompt() method.
      this.applicationName  = props.applicationName;
      this.includeCompass   = hasFeature('includeCompass');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
      this.useBrowserSync   = hasFeature('useBrowserSync');

      done();
    }.bind(this));
  },

  setupGulp : function()
  {
    this.template('gulpfile.js', 'gulpfile.js');
  },

  bower : function()
  {
    this.template('_package.json', 'package.json');
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () 
  {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },

  git : function()
  {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  h5bp : function()
  {
    this.copy('favicon.ico', 'app/favicon.ico');
    this.copy('404.html', 'app/404.html');
    this.copy('robots.txt', 'app/robots.txt');
    this.copy('htaccess', 'app/.htaccess');
  },

  writeIndex : function()
  {
    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
    this.indexFile = this.engine(this.indexFile, this);

    // wire Bootstrap plugins
    if (this.includeBootstrap) {
      var bs = './bower_components/bootstrap' + (this.includeCompass ? '-sass-official/vendor/assets/javascripts/bootstrap/' : '/js/');
      this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
        bs + 'affix.js',
        bs + 'alert.js',
        bs + 'dropdown.js',
        bs + 'tooltip.js',
        bs + 'modal.js',
        bs + 'transition.js',
        bs + 'button.js',
        bs + 'popover.js',
        bs + 'carousel.js',
        bs + 'scrollspy.js',
        bs + 'collapse.js',
        bs + 'tab.js'
      ]);
    }

    // this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
    //   'components/jquery/jquery.js',
    //   'scripts/main.js'
    // ]);

    // this.indexFile = this.appendFiles({
    //   html: this.indexFile,
    //   fileType: 'js',
    //   optimizedPath: 'scripts/main.js',
    //   sourceFileList: ['../bower_components/requirejs/require.js'],
    //   'data-main' : 'scripts/main.js',
    //   searchPath: '{app,.tmp}'
    // });
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');

    this.mkdir('app/scripts');
    this.mkdir('app/scripts/libs');
    this.mkdir('app/styles');
    this.mkdir('app/images');

    this.mkdir('app/scripts/src');
    this.mkdir('app/scripts/src/collections');
    this.mkdir('app/scripts/src/models');
    this.mkdir('app/scripts/src/baseModules');
    this.mkdir('app/scripts/src/views');
    this.mkdir('app/scripts/src/utils');
    this.mkdir('app/scripts/src/loaders');

    this.write('app/index.html', this.indexFile);
   
  },

  makeAppViews : function()
  {
      this.copy('_main.js', 'app/scripts/main.js');
      this.copy('_config.js', 'app/scripts/config.js');
      // copy files to src
      this.copy('_ViewManager.js', 'app/scripts/src/ViewManager.js');
      this.copy('_viewBase.js', 'app/scripts/src/baseModules/_viewBase.js');
      this.copy('_Router.js', 'app/scripts/src/Router.js');
      this.copy('_tmplLoader.js', 'app/scripts/src/loaders/tmplLoader.js');
      this.copy('_application.js', 'app/scripts/src/application.js');
      // initial views
      this.template('_tmpAppViewModel.js', 'app/scripts/src/models/AppViewModel.js');
      this.copy('_tmpAppView.js', 'app/scripts/src/views/AppView.js');
      this.copy('_tmpAppView.html', 'app/templates/appView.html');
  },

  makeStyles : function()
  {
    this.mkdir('app/styles/fonts');
    if( this.includeCompass ) { this.directory('_styles', 'app/styles');  }
    else { this.copy( 'main.css', 'app/styles/application.css' ); }
  }
  

});

module.exports = RequireBackboneGenerator;

